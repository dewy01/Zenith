using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;
using backend.Dto.Projects;
using backend.Dto.ProjectTasks;
using backend.Dto.Pagination;

namespace backend.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

        public ProjectRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task<ProjectByStatusDto> GetProjectById(int projectId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var project = await _context.Projects
                .Include(p => p.ProjectTasks)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.UserID == userId && x.ProjectID == projectId);

            if (project == null)
            {
                throw new NotFoundException("Project not found");
            }

            var Backlog = project.ProjectTasks.Where(pt => pt.Status == "Backlog").OrderBy(x => x.EditTime);
            var inProgress = project.ProjectTasks.Where(pt => pt.Status == "in Progress").OrderBy(x => x.EditTime);
            var Review = project.ProjectTasks.Where(pt => pt.Status == "For Review").OrderBy(x => x.EditTime);
            var Closed = project.ProjectTasks.Where(pt => pt.Status == "Closed").OrderBy(x => x.EditTime);

            var projectDto = new ProjectByStatusDto
            {
                ProjectID = project.ProjectID,
                Title = project.Title,
                Deadline = project.Deadline,
                Description = project.Description,
                Status = project.Status,
                Backlog = _mapper.Map<Collection<ProjectTaskShortDto>>(Backlog),
                inProgress = _mapper.Map<Collection<ProjectTaskShortDto>>(inProgress),
                Review = _mapper.Map<Collection<ProjectTaskShortDto>>(Review),
                Closed = _mapper.Map<Collection<ProjectTaskShortDto>>(Closed),
            };

            return projectDto;
        }

        public async Task<PaginationResponseDto<AllProjectsDto>> GetAllProjects(PaginationRequestDto paginationRequest)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var query = _context.Projects
                .Include(p => p.ProjectTasks)
                .Where(x => x.UserID == userId);

            if (!string.IsNullOrEmpty(paginationRequest.Filter))
            {
                query = query.Where(p => p.Title.Contains(paginationRequest.Filter));
            }

            var totalItems = await query.CountAsync();

            var projects = await query
                .OrderBy(p => p.ProjectID)
                .Skip((paginationRequest.PageNumber - 1) * paginationRequest.PageSize)
                .Take(paginationRequest.PageSize)
                .AsNoTracking()
                .ToListAsync();

            if (projects.Count == 0)
            {
                return new PaginationResponseDto<AllProjectsDto>();
            }

            var projectDtos = new List<AllProjectsDto>();
            foreach (var project in projects)
            {
                projectDtos.Add(new AllProjectsDto
                {
                    ProjectID = project.ProjectID,
                    Title = project.Title,
                    Deadline = project.Deadline,
                    Description = project.Description,
                    Status = project.Status,
                    Completion = project.ProjectTasks.Count() != 0
                        ? (float)Math.Truncate(((float)project.ProjectTasks.Where(x => x.Status == "Closed").ToList().Count() / (float)project.ProjectTasks.Count()) * 100)
                        : 0,
                    isOutdated = project.Deadline < DateTime.Now && project.Status == "in Progress"
                });
            }

            var repsonse =  new PaginationResponseDto<AllProjectsDto> 
            { 
                Items = projectDtos, 
                TotalItems = totalItems, 
                PageNumber = paginationRequest.PageNumber, 
                PageSize = paginationRequest.PageSize,
                TotalPages = (int)Math.Ceiling(totalItems / (double)paginationRequest.PageSize),
            };

            return repsonse;
        }

        public async Task AddProject(AddProjectDto dto)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var newProject = new Project
            {
                UserID = userId.Value,
                Title = dto.Title,
                Status = dto.Status,
                Deadline = dto.Deadline,
                Description = dto.Description,
            };

            await _context.Projects.AddAsync(newProject);
            await _context.SaveChangesAsync();

            var notification = new ProjectNotification
            {
                UserID = userId.Value,
                Message = $"{dto.Title} deadline is approaching on {dto.Deadline:MMMM dd, yyyy}.",
                DateTime = dto.Deadline,
                Project = newProject,
                ProjectID = newProject.ProjectID
            };

            await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProject(EditProjectDto dto, int projectId)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var project = await _context.Projects
                .SingleOrDefaultAsync(project => project.UserID == userId && project.ProjectID == projectId);

            if (dto.Title != null || dto.Title != "")
            {
                project.Title = dto.Title;
            }
            project.Status = dto.Status;
            project.Deadline = dto.Deadline;
            project.Description = dto.Description;

            var notification = await _context.Notifications
                .SingleOrDefaultAsync(notification => notification.NotificationID == project.NotificationID);

            if (notification != null)
            {
                notification.Message = $"{project.Title} deadline is approaching on {project.Deadline:MMMM dd, yyyy}.";
                notification.DateTime = dto.Deadline;
                _context.Notifications.Update(notification);
                await _context.SaveChangesAsync();
            }

            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProject(int projectId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var project = await _context.Projects
                .SingleOrDefaultAsync(project => project.UserID == userId && project.ProjectID == projectId);

            _context.Projects.Remove(project);

            var notification = await _context.Notifications
                .SingleOrDefaultAsync(notification => notification.NotificationID == project.NotificationID);

            if (notification != null)
            {
                _context.Notifications.Remove(notification);
            }

            await _context.SaveChangesAsync();
        }
    }
}

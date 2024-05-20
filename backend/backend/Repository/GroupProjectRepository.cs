using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;
using Microsoft.EntityFrameworkCore.Metadata;
using backend.Dto.Projects;
using backend.Dto.GroupProjects;
using backend.Dto.GroupProjectTasks;

namespace backend.Repository
{
    public class GroupProjectRepository : IGroupProjectRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

        public GroupProjectRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task<GroupProjectByStatusDto> GetGroupProjectById(int projectId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var currentUserRole = await _context.GroupRoles
                .SingleOrDefaultAsync(g => g.UserId == userId);

            if (currentUserRole == null)
            {
                throw new NotFoundException("Role not found");
            }


            var userGroup = await _context.Groups.Include(g => g.Users).SingleOrDefaultAsync(x => x.GroupID == x.Users.SingleOrDefault(u => u.UserID == userId).GroupID);
            var project = await _context.GroupProjects.Include(p => p.GroupProjectTasks).SingleOrDefaultAsync(x=>x.Group.GroupID == userGroup.GroupID && x.GroupProjectID == projectId);

            var Backlog = project.GroupProjectTasks.Where(pt => pt.Status == "Backlog").OrderBy(x=>x.EditTime);
            var inProgress = project.GroupProjectTasks.Where(pt => pt.Status == "in Progress").OrderBy(x => x.EditTime);
            var Review = project.GroupProjectTasks.Where(pt => pt.Status == "For Review").OrderBy(x => x.EditTime);
            var Closed = project.GroupProjectTasks.Where(pt => pt.Status == "Closed").OrderBy(x => x.EditTime);


            var projectDto = new GroupProjectByStatusDto
            {
                ProjectID = project.GroupProjectID,
                Title = project.Title,
                Deadline = project.Deadline,
                Description = project.Description,
                Status = project.Status,
                Backlog = _mapper.Map<Collection<GroupProjectTaskShortDto>>(Backlog, opt => {
                    opt.Items["CurrentUserId"] = userId;
                    opt.Items["CurrentUserRole"] = currentUserRole.Role;
                }),
                inProgress = _mapper.Map<Collection<GroupProjectTaskShortDto>>(inProgress, opt => {
                    opt.Items["CurrentUserId"] = userId;
                    opt.Items["CurrentUserRole"] = currentUserRole.Role;
                }),
                Review = _mapper.Map<Collection<GroupProjectTaskShortDto>>(Review, opt => {
                    opt.Items["CurrentUserId"] = userId;
                    opt.Items["CurrentUserRole"] = currentUserRole.Role;
                }),
                Closed = _mapper.Map<Collection<GroupProjectTaskShortDto>>(Closed, opt => {
                    opt.Items["CurrentUserId"] = -1;
                    opt.Items["CurrentUserRole"] = currentUserRole.Role;
                }),
            };

            return projectDto;
        }

        public async Task<IEnumerable<AllGroupProjectsDto>> GetAllGroupProjects()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var userGroup = await _context.Groups.Include(g => g.Users).SingleOrDefaultAsync(x => x.GroupID == x.Users.SingleOrDefault(u => u.UserID == userId).GroupID);
            var projects = await _context.GroupProjects.Include(p=>p.GroupProjectTasks).Where(x => x.GroupID == userGroup.GroupID).ToListAsync();
            if (projects.Count == 0) { return new List<AllGroupProjectsDto>(); }
            var projectDtos = new List<AllGroupProjectsDto>();
            foreach (GroupProject project in projects)
            {
                projectDtos.Add(new AllGroupProjectsDto
                {
                    GroupProjectID = project.GroupProjectID,
                    Title = project.Title,
                    Deadline = project.Deadline,
                    Description = project.Description,
                    Status = project.Status,
                    Completion = project.GroupProjectTasks.Count() != 0 ? (float)Math.Truncate(((float)project.GroupProjectTasks.Where(x => x.Status == "Closed").ToList().Count() / (float)project.GroupProjectTasks.Count()) * 100) : 0,
                    isOutdated = project.Deadline < DateTime.Now && project.Status == "in Progress"
                });
            }


            return projectDtos;
        }

        public async Task AddGroupProject(AddGroupProjectDto dto)
        {
            var userId = _userContextRepository.GetUserId;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserID == userId);

            if (userId == null || user == null)
            {
                throw new NotFoundException("User not found");
            }

            var newProject = new GroupProject
            {
                GroupID = dto.GroupID,
                Title = dto.Title,
                Status = dto.Status,
                Deadline= dto.Deadline,
                Description= dto.Description,
            };

            await _context.GroupProjects.AddAsync(newProject);
            await _context.SaveChangesAsync();

            var notification = new GroupProjectNotification
            {
                UserID = user.UserID,
                Message = $"{dto.Title} deadline is approaching on {dto.Deadline:MMMM dd, yyyy}.",
                DateTime = dto.Deadline,
                GroupProject = newProject,
                GroupProjectID = newProject.GroupProjectID
            };

            await _context.Notifications.AddAsync(notification);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateGroupProject(EditProjectDto dto , int projectId)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var userGroup = await _context.Groups.Include(g => g.Users).SingleOrDefaultAsync(x => x.GroupID == x.Users.SingleOrDefault(u => u.UserID == userId).GroupID);
            var project = await _context.GroupProjects.Include(p => p.GroupProjectTasks).SingleOrDefaultAsync(x => x.Group.GroupID == userGroup.GroupID && x.GroupProjectID == projectId);


            project.Title = dto.Title;
            project.Status = dto.Status;
            project.Deadline = dto.Deadline;
            project.Description = dto.Description;

            var notification = await _context.Notifications.SingleOrDefaultAsync(x => x.NotificationID == project.NotificationID);
            notification.Message = $"{dto.Title} deadline is approaching on {dto.Deadline:MMMM dd, yyyy}.";
            notification.DateTime = dto.Deadline;

            _context.GroupProjects.Update(project);
            _context.Notifications.Update(notification);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteGroupProject(int projectId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var userGroup = await _context.Groups.Include(g => g.Users).SingleOrDefaultAsync(x => x.GroupID == x.Users.SingleOrDefault(u => u.UserID == userId).GroupID);
            var project = await _context.GroupProjects.Include(p => p.GroupProjectTasks).SingleOrDefaultAsync(x => x.Group.GroupID == userGroup.GroupID && x.GroupProjectID == projectId);
            _context.GroupProjects.Remove(project);
            var notification = await _context.Notifications.SingleOrDefaultAsync(x => x.NotificationID == project.NotificationID);
            if (notification != null)
            {
                _context.Notifications.Remove(notification);
            }
            await _context.SaveChangesAsync();
        }
    }
}

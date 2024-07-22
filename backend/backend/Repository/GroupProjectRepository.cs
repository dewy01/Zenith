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
using backend.Dto.Pagination;

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
                .AsNoTracking()
                .SingleOrDefaultAsync(g => g.UserId == userId);

            if (currentUserRole == null)
            {
                throw new NotFoundException("Role not found");
            }


            var userGroup = await _context.Groups
                .Include(g => g.Users)
                .SingleOrDefaultAsync(x => x.GroupID == x.Users.SingleOrDefault(u => u.UserID == userId).GroupID);

            var project = await _context.GroupProjects
                .Include(p => p.GroupProjectTasks)
                .SingleOrDefaultAsync(x=>x.Group.GroupID == userGroup.GroupID && x.GroupProjectID == projectId);

            var Backlog = project.GroupProjectTasks.Where(pt => pt.Status == "Backlog").OrderByDescending(x=>x.EditTime);
            var inProgress = project.GroupProjectTasks.Where(pt => pt.Status == "in Progress").OrderByDescending(x => x.EditTime);
            var Review = project.GroupProjectTasks.Where(pt => pt.Status == "For Review").OrderByDescending(x => x.EditTime);
            var Closed = project.GroupProjectTasks.Where(pt => pt.Status == "Closed").OrderByDescending(x => x.EditTime);


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

        public async Task<PaginationResponseDto<AllGroupProjectsDto>> GetAllGroupProjects(PaginationRequestDto paginationRequest)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var userGroup = await _context.Groups
                .AsNoTracking()
                .Include(g => g.Users)
                .SingleOrDefaultAsync(x => x.GroupID == x.Users.SingleOrDefault(u => u.UserID == userId).GroupID);

            if (userGroup == null)
            {
                throw new NotFoundException("User's group not found");
            }

            var query = _context.GroupProjects
                .AsNoTracking()
                .Include(p => p.GroupProjectTasks)
                .Where(x => x.GroupID == userGroup.GroupID);

            if (!string.IsNullOrEmpty(paginationRequest.Filter))
            {
                query = query.Where(p => p.Title.Contains(paginationRequest.Filter));
            }

            var totalItems = await query.CountAsync();

            var projects = await query
                .OrderByDescending(p => p.GroupProjectID)
                .Skip((paginationRequest.PageNumber - 1) * paginationRequest.PageSize)
                .Take(paginationRequest.PageSize)
                .AsNoTracking()
                .ToListAsync();

            if (projects.Count == 0)
            {
                return new PaginationResponseDto<AllGroupProjectsDto>();
            }

            var projectDtos = projects.Select(project => new AllGroupProjectsDto
            {
                GroupProjectID = project.GroupProjectID,
                Title = project.Title,
                Deadline = project.Deadline,
                Description = project.Description,
                Status = project.Status,
                Completion = project.GroupProjectTasks.Count != 0
                    ? (float)Math.Truncate(((float)project.GroupProjectTasks.Count(x => x.Status == "Closed") / project.GroupProjectTasks.Count) * 100)
                    : 0,
                isOutdated = project.Deadline < DateTime.Now && project.Status == "in Progress"
            }).ToList();

            var response = new PaginationResponseDto<AllGroupProjectsDto>
            {
                Items = projectDtos,
                TotalItems = totalItems,
                PageNumber = paginationRequest.PageNumber,
                PageSize = paginationRequest.PageSize,
                TotalPages = (int)Math.Ceiling(totalItems / (double)paginationRequest.PageSize),
            };

            return response;
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

            _context.GroupProjects.Update(project);

            var notification = await _context.Notifications.SingleOrDefaultAsync(x => x.NotificationID == project.NotificationID);
            if (notification != null)
            {
                notification.Message = $"{dto.Title} deadline is approaching on {dto.Deadline:MMMM dd, yyyy}.";
                notification.DateTime = dto.Deadline;
                _context.Notifications.Update(notification);
            }

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
            var notification = await _context.Notifications.SingleOrDefaultAsync(x => x.NotificationID == project.NotificationID);
            if (notification != null)
            {
                _context.Notifications.Remove(notification);
  
            }

            _context.GroupProjects.Remove(project);
            await _context.SaveChangesAsync();
        }
    }
}

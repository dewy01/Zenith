using AutoMapper;
using backend.Data;
using backend.Dto.GroupProjectTasks;
using backend.Dto.ProjectTasks;
using backend.Exceptions;
using backend.Interface;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class GroupProjectTaskRepository : IGroupProjectTaskRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

        public GroupProjectTaskRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task<GroupProjectTaskDto> GetProjectTaskById(int groupProjectTaskId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var group = await _context.Groups
                .Include(g => g.Users)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.GroupID == x.Users.SingleOrDefault(u => u.UserID == userId).GroupID);
            if (group == null)
            {
                throw new NotFoundException("Group not found");
            }

            var projectTask = await _context.GroupProjectTasks
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.GroupProject.GroupID == group.GroupID && x.GroupProjectTaskID == groupProjectTaskId);

            if (projectTask == null)
            {
                throw new NotFoundException("Task not found");
            }

            var projectTaskDto = new GroupProjectTaskDto
            {
                Title = projectTask.Title,
                Status = projectTask.Status,
                Category = projectTask.Category,
                Description = projectTask.Description,
                User = projectTask.User.Username,
            };

            return projectTaskDto;
        }

        public async Task AddProjectTask(AddGroupProjectTaskDto dto)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var taskUser = await _context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.UserID == dto.UserId);

            if (taskUser == null)
            {
                throw new NotFoundException("Task user not found");
            }

            var newProjectTask = new GroupProjectTask
            {
                GroupProjectID = dto.ProjectID,
                Title = dto.Title,
                Status = dto.Status,
                Description = dto.Description,
                Category = dto.Category,
                EditTime = DateTime.UtcNow,
                UserID = taskUser.UserID,
            };

            await _context.GroupProjectTasks.AddAsync(newProjectTask);
            await _context.SaveChangesAsync();
        }

        public async Task ChangeProjectTaskStatus(ProjectTaskStatusDto status, int groupProjectTaskId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var group = await _context.Groups
                .Include(g => g.Users)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.GroupID == x.Users.SingleOrDefault(u => u.UserID == userId).GroupID);
            if (group == null)
            {
                throw new NotFoundException("Group not found");
            }

            var projectTask = await _context.GroupProjectTasks
                .SingleOrDefaultAsync(x => x.GroupProject.GroupID == group.GroupID && x.GroupProjectTaskID == groupProjectTaskId);

            if (projectTask == null)
            {
                throw new NotFoundException("Task not found");
            }

            projectTask.Status = status.Status;
            projectTask.EditTime = DateTime.UtcNow;

            _context.GroupProjectTasks.Update(projectTask);

            await UpdateProjectStatus(projectTask.GroupProjectID);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateProjectTask(AddGroupProjectTaskDto dto, int groupProjectTaskId)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var group = await _context.Groups
                .Include(g => g.Users)
                .AsNoTracking() 
                .SingleOrDefaultAsync(x => x.GroupID == x.Users.SingleOrDefault(u => u.UserID == userId).GroupID);
            if (group == null)
            {
                throw new NotFoundException("Group not found");
            }

            var projectTask = await _context.GroupProjectTasks
                .SingleOrDefaultAsync(x => x.GroupProject.GroupID == group.GroupID && x.GroupProjectTaskID == groupProjectTaskId);

            if (projectTask == null)
            {
                throw new NotFoundException("Task not found");
            }

            var taskUser = await _context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.UserID == dto.UserId);

            if (taskUser == null)
            {
                throw new NotFoundException("Task user not found");
            }

            projectTask.Title = dto.Title;
            if (projectTask.Status != dto.Status)
            {
                projectTask.EditTime = DateTime.UtcNow;
            }
            projectTask.Status = dto.Status;
            projectTask.Description = dto.Description;
            projectTask.Category = dto.Category;
            projectTask.UserID = taskUser.UserID;

            _context.GroupProjectTasks.Update(projectTask);
            await UpdateProjectStatus(projectTask.GroupProjectID);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteProjectTask(int groupProjectTaskId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var group = await _context.Groups
                .Include(g => g.Users)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Users.Any(u => u.UserID == userId));

            if (group == null)
            {
                throw new NotFoundException("Group not found");
            }

            var projectTask = await _context.GroupProjectTasks
                .SingleOrDefaultAsync(x => x.GroupProject.GroupID == group.GroupID && x.GroupProjectTaskID == groupProjectTaskId);

            if (projectTask == null)
            {
                throw new NotFoundException("Task not found");
            }

            _context.GroupProjectTasks.Remove(projectTask);
            await _context.SaveChangesAsync();
        }

        private async Task UpdateProjectStatus(int projectId)
        {
            var project = await _context.GroupProjects
                .Include(p => p.GroupProjectTasks)
                .SingleOrDefaultAsync(x => x.GroupProjectID == projectId);

            if (project != null && project.Status != "on Hold")
            {
                bool allTasksClosed = project.GroupProjectTasks.All(task => task.Status == "Closed");

                if (!allTasksClosed)
                {
                    project.Status = "in Progress";
                }
                else
                {
                    project.Status = "Done";
                }

                _context.GroupProjects.Update(project);
                await _context.SaveChangesAsync();
            }
        }
    }
}

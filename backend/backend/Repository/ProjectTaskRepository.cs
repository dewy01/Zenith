using AutoMapper;
using backend.Data;
using backend.Dto.ProjectTasks;
using backend.Exceptions;
using backend.Interface;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ProjectTaskRepository : IProjectTaskRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

        public ProjectTaskRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task<ProjectTaskDto> GetProjectTaskById(int projectTaskId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var projectTask = await _context.ProjectTasks.SingleOrDefaultAsync(x => x.Project.UserID == userId && x.ProjectTaskID == projectTaskId);
            var projectTaskDto = new ProjectTaskDto
            {
                Title = projectTask.Title,
                Status = projectTask.Status,
                Category = projectTask.Category,
                Description = projectTask.Description,
            };

            return projectTaskDto;
        }


        public async Task AddProjectTask(AddProjectTaskDto dto)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var newProjectTask = new ProjectTask
            {  
                ProjectID = dto.ProjectID,
                Title = dto.Title,
                Status = dto.Status,
                Description = dto.Description,
                Category = dto.Category,
                EditTime = DateTime.UtcNow
            };

            await _context.ProjectTasks.AddAsync(newProjectTask);
            await _context.SaveChangesAsync();
        }

        public async Task ChangeProjectTaskStatus(ProjectTaskStatusDto status, int projectTaskId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var projectTask = await _context.ProjectTasks.SingleOrDefaultAsync(x => x.Project.UserID == userId && x.ProjectTaskID == projectTaskId);

            projectTask.Status = status.Status;
            projectTask.EditTime = DateTime.UtcNow;

            _context.Update(projectTask);

            await UpdateProjectStatus(projectTask.ProjectID);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateProjectTask(ProjectTaskDto dto, int projectTaskId)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var projectTask = await _context.ProjectTasks.SingleOrDefaultAsync(x => x.Project.UserID == userId && x.ProjectTaskID == projectTaskId);

            projectTask.Title = dto.Title;
            if (projectTask.Status != dto.Status)
            {
                projectTask.EditTime = DateTime.UtcNow;
            }
            projectTask.Status = dto.Status;
            projectTask.Description = dto.Description;
            projectTask.Category = dto.Category;

            _context.Update(projectTask);
            await UpdateProjectStatus(projectTask.ProjectID);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteProjectTask(int projectTaskId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var projectTask = await _context.ProjectTasks.SingleOrDefaultAsync(x => x.Project.UserID == userId && x.ProjectTaskID == projectTaskId);
            _context.Remove(projectTask);
            await _context.SaveChangesAsync();
        }

        private async Task UpdateProjectStatus(int projectId)
        {
            var project = await _context.Projects
                .Include(p => p.ProjectTasks)
                .SingleOrDefaultAsync(x => x.ProjectID == projectId);

            if (project != null && project.Status != "on Hold")
            {
                bool allTasksClosed = project.ProjectTasks.All(task => task.Status == "Closed");

                if (!allTasksClosed)
                {
                    project.Status = "in Progress";
                }
                else
                {
                    project.Status = "Done";
                }

                _context.Update(project);
                await _context.SaveChangesAsync();
            }
        }

    }
}

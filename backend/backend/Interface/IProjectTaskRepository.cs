using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interface
{
    public interface IProjectTaskRepository
    {
        Task<ProjectTaskDto> GetProjectTaskById(int projectTaskId);
        Task AddProjectTask(AddProjectTaskDto projectTask);
        Task UpdateProjectTask(ProjectTaskDto projectTask, int projectTaskId);

        Task ChangeProjectTaskStatus(ProjectTaskStatusDto status, int projectTaskId);
        Task DeleteProjectTask(int projectTaskId);
    }
}

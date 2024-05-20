using backend.Dto.GroupProjectTasks;
using backend.Dto.ProjectTasks;
using backend.Models;

namespace backend.Interface
{
    public interface IGroupProjectTaskRepository
    {
        Task<GroupProjectTaskDto> GetProjectTaskById(int groupProjectTaskId);
        Task AddProjectTask(AddGroupProjectTaskDto dto);
        Task UpdateProjectTask(AddGroupProjectTaskDto dto, int groupProjectTaskId);
        Task ChangeProjectTaskStatus(ProjectTaskStatusDto status, int groupProjectTaskId);
        Task DeleteProjectTask(int groupProjectTaskId);
    }
}

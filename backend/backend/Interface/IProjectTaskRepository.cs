using backend.Models;

namespace backend.Interface
{
    public interface IProjectTaskRepository
    {
        ProjectTask GetProjectTaskById(int projectTaskId);
        List<ProjectTask> GetAllProjectTasks();
        void AddProjectTask(ProjectTask projectTask);
        void UpdateProjectTask(ProjectTask projectTask);
        void DeleteProjectTask(int projectTaskId);
    }
}

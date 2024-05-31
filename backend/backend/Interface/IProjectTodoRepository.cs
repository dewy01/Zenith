using backend.Dto.ProjectTodo;
using backend.Models;

namespace backend.Interface
{
    public interface IProjectTodoRepository
    {
        Task<ProjectsTodoDto> GetAllProjects();
        Task AddProject(AddProjectTodoDto project);
        Task UpdateProject(AddProjectTodoDto project, int projectId);
        Task DeleteProject(int projectId);
        Task<ProjectTodoDto> GetProjectById(int projectId);
    }
}

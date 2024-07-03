using backend.Dto.Pagination;
using backend.Dto.ProjectTodo;
using backend.Models;

namespace backend.Interface
{
    public interface IProjectTodoRepository
    {
        Task<PaginationResponseDto<AllProjectsTodoDto>> GetAllProjects(bool isDone, PaginationRequestDto paginationRequest);
        Task AddProject(AddProjectTodoDto project);
        Task UpdateProject(AddProjectTodoDto project, int projectId);
        Task DeleteProject(int projectId);
        Task<ProjectTodoDto> GetProjectById(int projectId);
    }
}

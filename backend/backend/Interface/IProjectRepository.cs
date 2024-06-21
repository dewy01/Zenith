using backend.Dto.Pagination;
using backend.Dto.Projects;
using backend.Models;

namespace backend.Interface
{
    public interface IProjectRepository
    {
        Task<ProjectByStatusDto> GetProjectById(int projectId);
        Task<PaginationResponseDto<AllProjectsDto>> GetAllProjects(PaginationRequestDto paginationRequest);
        Task AddProject(AddProjectDto project);
        Task UpdateProject(EditProjectDto project, int projectId);
        Task DeleteProject(int projectId);
    }
}

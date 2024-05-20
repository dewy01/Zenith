using backend.Dto.Projects;
using backend.Models;

namespace backend.Interface
{
    public interface IProjectRepository
    {
        Task<ProjectByStatusDto> GetProjectById(int projectId);
        Task<IEnumerable<AllProjectsDto>> GetAllProjects();
        Task AddProject(AddProjectDto project);
        Task UpdateProject(EditProjectDto project, int projectId);
        Task DeleteProject(int projectId);
    }
}

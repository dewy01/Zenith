using backend.Dto;
using backend.Models;

namespace backend.Interface
{
    public interface IGroupProjectRepository
    {
        Task<ProjectByStatusDto> GetGroupProjectById(int projectId);
        Task<IEnumerable<AllGroupProjectsDto>> GetAllGroupProjects();
        Task AddGroupProject(AddGroupProjectDto dto);
        Task UpdateGroupProject(EditProjectDto dto, int projectId);
        Task DeleteGroupProject(int projectId);
    }
}

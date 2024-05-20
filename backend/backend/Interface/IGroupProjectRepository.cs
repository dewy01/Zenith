using backend.Dto.GroupProjects;
using backend.Dto.Projects;
using backend.Models;

namespace backend.Interface
{
    public interface IGroupProjectRepository
    {
        Task<GroupProjectByStatusDto> GetGroupProjectById(int projectId);
        Task<IEnumerable<AllGroupProjectsDto>> GetAllGroupProjects();
        Task AddGroupProject(AddGroupProjectDto dto);
        Task UpdateGroupProject(EditProjectDto dto, int projectId);
        Task DeleteGroupProject(int projectId);
    }
}

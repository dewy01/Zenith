using backend.Models;

namespace backend.Interface
{
    public interface IProjectRepository
    {
        Project GetProjectById(int projectId);
        List<Project> GetAllProjects();
        void AddProject(Project project);
        void UpdateProject(Project project);
        void DeleteProject(int projectId);
    }
}

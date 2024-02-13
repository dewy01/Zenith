using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;

namespace backend.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _context;

        public ProjectRepository(DataContext context)
        {
            _context = context;
        }

        public Project GetProjectById(int projectId)
        {
            var result = _context.Projects.FirstOrDefault(p => p.ProjectID == projectId);

            if (result == null) 
            {
                throw new NotFoundException("Project not found");
            }

            return result;
        }

        public List<Project> GetAllProjects()
        {
            return _context.Projects.ToList();
        }

        public void AddProject(Project project)
        {
            _context.Projects.Add(project);
            _context.SaveChanges();
        }

        public void UpdateProject(Project project)
        {
            _context.Projects.Update(project);
            _context.SaveChanges();
        }

        public void DeleteProject(int projectId)
        {
            var project = _context.Projects.Find(projectId);
            if (project != null)
            {
                _context.Projects.Remove(project);
                _context.SaveChanges();
            }
        }
    }
}

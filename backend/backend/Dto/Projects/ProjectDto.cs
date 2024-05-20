using backend.Dto.ProjectTasks;
using backend.Models;

namespace backend.Dto.Projects
{
    public class ProjectDto
    {
        public int ProjectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public string Status { get; set; }
        public ICollection<ProjectTaskShortDto> ProjectTasks { get; set; }
    }
}

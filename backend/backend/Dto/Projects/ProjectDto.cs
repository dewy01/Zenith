using backend.Dto.ProjectTasks;
using backend.Enums;
using backend.Models;

namespace backend.Dto.Projects
{
    public class ProjectDto
    {
        public int ProjectID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }
        public ICollection<ProjectTaskShortDto>? ProjectTasks { get; set; }
    }
}

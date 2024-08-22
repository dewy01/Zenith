using backend.Dto.ProjectTasks;
using backend.Enums;

namespace backend.Dto.Projects
{
    public class ProjectByStatusDto
    {
        public int ProjectID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }
        public ICollection<ProjectTaskShortDto>? Backlog { get; set; }
        public ICollection<ProjectTaskShortDto>? inProgress { get; set; }
        public ICollection<ProjectTaskShortDto>? Review { get; set; }
        public ICollection<ProjectTaskShortDto>? Closed { get; set; }
    }
}

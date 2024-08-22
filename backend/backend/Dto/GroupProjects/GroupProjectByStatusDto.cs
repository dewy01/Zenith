using backend.Dto.GroupProjectTasks;
using backend.Enums;

namespace backend.Dto.GroupProjects
{
    public class GroupProjectByStatusDto
    {
        public int ProjectID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }
        public string? User { get; set; }
        public ICollection<GroupProjectTaskShortDto>? Backlog { get; set; }
        public ICollection<GroupProjectTaskShortDto>? inProgress { get; set; }
        public ICollection<GroupProjectTaskShortDto>? Review { get; set; }
        public ICollection<GroupProjectTaskShortDto>? Closed { get; set; }
    }
}

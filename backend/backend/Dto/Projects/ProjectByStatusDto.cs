using backend.Dto.ProjectTasks;

namespace backend.Dto.Projects
{
    public class ProjectByStatusDto
    {
        public int ProjectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public string Status { get; set; }
        public ICollection<ProjectTaskShortDto> Backlog { get; set; }
        public ICollection<ProjectTaskShortDto> inProgress { get; set; }
        public ICollection<ProjectTaskShortDto> Review { get; set; }
        public ICollection<ProjectTaskShortDto> Closed { get; set; }
    }
}

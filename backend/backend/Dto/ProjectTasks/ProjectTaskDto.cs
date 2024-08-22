using backend.Enums;

namespace backend.Dto.ProjectTasks
{
    public class ProjectTaskDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public ProjectTaskStatus Status { get; set; }
    }
}

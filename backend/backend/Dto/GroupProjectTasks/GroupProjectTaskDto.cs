using backend.Enums;

namespace backend.Dto.GroupProjectTasks
{
    public class GroupProjectTaskDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public required string User { get; set; }
        public string? UserImage { get; set; }
    }
}

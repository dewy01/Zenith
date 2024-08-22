using backend.Enums;

namespace backend.Dto.GroupProjectTasks
{
    public class AddGroupProjectTaskDto
    {
        public int ProjectID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public int UserId { get; set; }
    }
}

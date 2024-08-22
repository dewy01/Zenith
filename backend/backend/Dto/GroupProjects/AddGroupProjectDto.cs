using backend.Enums;

namespace backend.Dto.GroupProjects
{
    public class AddGroupProjectDto
    {
        public required string Title { get; set; }
        public int GroupID { get; set; }
        public required string Description { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }
    }
}

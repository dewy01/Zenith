using backend.Enums;

namespace backend.Dto.Projects
{
    public class EditProjectDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }
    }
}

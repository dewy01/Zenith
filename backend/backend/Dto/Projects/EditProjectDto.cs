using backend.Enums;

namespace backend.Dto.Projects
{
    public class EditProjectDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }
    }
}

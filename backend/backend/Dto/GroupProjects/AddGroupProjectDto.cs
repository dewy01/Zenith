using backend.Enums;

namespace backend.Dto.GroupProjects
{
    public class AddGroupProjectDto
    {
        public string Title { get; set; }
        public int GroupID { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }
    }
}

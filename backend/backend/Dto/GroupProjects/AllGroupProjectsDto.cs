using backend.Enums;

namespace backend.Dto.GroupProjects
{
    public class AllGroupProjectsDto
    {
        public int GroupProjectID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }
        public float Completion { get; set; }
        public bool isOutdated { get; set; }
    }
}

using backend.Enums;

namespace backend.Dto.Projects
{
    public class AllProjectsDto
    {
        public int ProjectID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }
        public float Completion { get; set; }
        public bool isOutdated { get; set; }

    }
}

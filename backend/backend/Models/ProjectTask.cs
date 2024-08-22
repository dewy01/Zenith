using backend.Enums;

namespace backend.Models
{
    public class ProjectTask
    {
        public int ProjectTaskID { get; set; }
        public int ProjectID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public DateTime EditTime { get; set; }

        public virtual Project? Project { get; set; }

    }
}

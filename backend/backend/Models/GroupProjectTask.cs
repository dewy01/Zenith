using backend.Enums;

namespace backend.Models
{
    public class GroupProjectTask
    {
        public int GroupProjectTaskID { get; set; }
        public int GroupProjectID { get; set; }
        public int UserID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public DateTime EditTime { get; set; }

        public virtual GroupProject? GroupProject { get; set; }
        public virtual User? User { get; set; }
    }
}

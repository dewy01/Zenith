using backend.Enums;

namespace backend.Models
{
    public class GroupProjectTask
    {
        public int GroupProjectTaskID { get; set; }
        public int GroupProjectID { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public DateTime EditTime { get; set; }

        public virtual GroupProject GroupProject { get; set; }
        public virtual User? User { get; set; }
    }
}

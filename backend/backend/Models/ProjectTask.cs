using backend.Enums;

namespace backend.Models
{
    public class ProjectTask
    {
        public int ProjectTaskID { get; set; }
        public int ProjectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public DateTime EditTime { get; set; }

        public virtual Project Project { get; set; }

    }
}

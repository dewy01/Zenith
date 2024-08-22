using backend.Enums;

namespace backend.Models
{
    public class Project
    {
        public int ProjectID { get; set; }
        public int UserID { get; set; }
        public int? NotificationID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<ProjectTask>? ProjectTasks { get; set; }
        public virtual ProjectNotification? Notification { get; set; }

    }
}

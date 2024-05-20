namespace backend.Models
{
    public class Project
    {
        public int ProjectID { get; set; }
        public int UserID { get; set; }
        public int? NotificationID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public string Status { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<ProjectTask> ProjectTasks { get; set; }
        public virtual ProjectNotification? Notification { get; set; }

    }
}

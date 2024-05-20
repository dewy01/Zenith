namespace backend.Models
{
    public class GroupProject
    {
        public int GroupProjectID { get; set; }
        public int GroupID { get; set; }
        public int? NotificationID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public string Status { get; set; }


        public virtual ICollection<GroupProjectTask> GroupProjectTasks { get; set; }
        public virtual Group Group { get; set; }
        public virtual GroupProjectNotification? Notification { get; set; }
    }
}

namespace backend.Models
{
    public class Notification
    {
        public int NotificationID { get; set; }
        public int UserID { get; set; }
        public string Message { get; set; }
        public DateTime DateTime { get; set; }
        public bool isActive { get; set; } = false;
        public bool isRead { get; set; } = false;
        public string Discriminator { get; set; }

        public virtual User User { get; set; }

    }

    public class GroupProjectNotification : Notification
    {
        public int GroupProjectID { get; set; }
        public GroupProject GroupProject { get; set; }
    }

    public class ProjectNotification : Notification
    {
        public int ProjectID { get; set; }
        public Project Project { get; set; }
    }

    public class CalendarEventNotification : Notification
    {
        public int CalendarEventID { get; set; }
        public CalendarEvent CalendarEvent { get; set; }
    }
}

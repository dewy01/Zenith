namespace backend.Dto.Notifications
{
    public class NotificationDto
    {
        public List<GroupProjectNotificationDto>? GroupProjectNotifications { get; set; }
        public List<ProjectNotificationDto>? ProjectNotifications { get; set; }
        public List<CalendarEventNotificationDto>? CalendarEventNotifications { get; set; }
    }

    public class GroupProjectNotificationDto
    {
        public int NotificationID { get; set; }
        public required string Message { get; set; }
        public DateTime DateTime { get; set; }
        public bool isActive { get; set; }
        public bool isRead { get; set; }
        public int GroupProjectID { get; set; }
    }

    public class ProjectNotificationDto
    {
        public int NotificationID { get; set; }
        public required string Message { get; set; }
        public DateTime DateTime { get; set; }
        public bool isActive { get; set; }
        public bool isRead { get; set; }
        public int ProjectID { get; set; }
    }

    public class CalendarEventNotificationDto
    {
        public int NotificationID { get; set; }
        public required string Message { get; set; }
        public DateTime DateTime { get; set; }
        public bool isActive { get; set; }
        public bool isRead { get; set; }
        public int CalendarEventID { get; set; }
    }
}

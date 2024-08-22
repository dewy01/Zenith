namespace backend.Models
{
    public class CalendarEvent
    {
        public int EventID { get; set; }
        public int UserID { get; set; }
        public int? NotificationID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime DateTime { get; set; }
        public required string EventColor { get; set; }

        public virtual User? User { get; set; }
        public virtual CalendarEventNotification? Notification { get; set; }

    }
}

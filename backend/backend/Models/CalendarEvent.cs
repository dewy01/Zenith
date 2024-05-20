namespace backend.Models
{
    public class CalendarEvent
    {
        public int EventID { get; set; }
        public int UserID { get; set; }
        public int? NotificationID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateTime { get; set; }
        public string EventColor { get; set; }

        public virtual User User { get; set; }
        public virtual CalendarEventNotification? Notification { get; set; }

    }
}

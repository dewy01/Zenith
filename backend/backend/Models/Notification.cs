namespace backend.Models
{
    public class Notification
    {
        public int NotificationID { get; set; }
        public int UserID { get; set; }
        public string Message { get; set; }
        public DateTime DateTime { get; set; }
        public bool Status { get; set; }

        public virtual User User { get; set; }

    }
}

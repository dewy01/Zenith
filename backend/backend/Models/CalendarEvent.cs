namespace backend.Models
{
    public class CalendarEvent
    {
        public int EventID { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateTime { get; set; }
        public bool Reminder { get; set; }

        public virtual User User { get; set; }

    }
}

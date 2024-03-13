namespace backend.Dto
{
    public class AllCalendarEventsDto
    {
        public int EventID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateTime { get; set; }
        public string EventColor { get; set; }
    }
}

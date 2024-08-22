namespace backend.Dto.CalendarEvents
{
    public class AllCalendarEventsDto
    {
        public int EventID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime DateTime { get; set; }
        public required string EventColor { get; set; }
    }
}

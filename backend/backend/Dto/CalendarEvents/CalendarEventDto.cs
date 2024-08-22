namespace backend.Dto.CalendarEvents
{
    public class CalendarEventDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string DateTime { get; set; }
        public required string EventColor { get; set; }
    }
}

using backend.Models;

namespace backend.Interface
{
    public interface ICalendarEventRepository
    {
        CalendarEvent GetCalendarEventById(int calendarEventId);
        List<CalendarEvent> GetAllCalendarEvents();
        void AddCalendarEvent(CalendarEvent calendarEvent);
        void UpdateCalendarEvent(CalendarEvent calendarEvent);
        void DeleteCalendarEvent(int calendarEventId);
    }
}

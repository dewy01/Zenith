using backend.Dto.CalendarEvents;
using backend.Models;

namespace backend.Interface
{
    public interface ICalendarEventRepository
    {
        Task<List<AllCalendarEventsDto>> GetAllEventsBetween(string from, string to, Dictionary<string, bool> colors);
        Task AddEvent(CalendarEventDto dto);
        Task UpdateEvent(CalendarEventDto dto, int eventId);
        Task DeleteEvent(int eventId);
    }
}

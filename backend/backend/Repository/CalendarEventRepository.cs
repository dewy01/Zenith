using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using System.Collections.Generic;
using System.Linq;

namespace backend.Repository
{
    public class CalendarEventRepository : ICalendarEventRepository
    {
        private readonly DataContext _context;

        public CalendarEventRepository(DataContext context)
        {
            _context = context;
        }

        public CalendarEvent GetCalendarEventById(int eventId)
        {
            var result = _context.CalendarEvents.FirstOrDefault(ce => ce.EventID == eventId);

            if (result == null)
            {
                throw new NotFoundException("CalendarEvent not found");
            }

            return result;
        }

        public List<CalendarEvent> GetAllCalendarEvents()
        {
            return _context.CalendarEvents.ToList();
        }

        public void AddCalendarEvent(CalendarEvent calendarEvent)
        {
            _context.CalendarEvents.Add(calendarEvent);
            _context.SaveChanges();
        }

        public void UpdateCalendarEvent(CalendarEvent calendarEvent)
        {
            _context.CalendarEvents.Update(calendarEvent);
            _context.SaveChanges();
        }

        public void DeleteCalendarEvent(int eventId)
        {
            var calendarEvent = _context.CalendarEvents.Find(eventId);
            if (calendarEvent != null)
            {
                _context.CalendarEvents.Remove(calendarEvent);
                _context.SaveChanges();
            }
        }
    }
}

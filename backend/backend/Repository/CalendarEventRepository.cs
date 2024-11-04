using backend.Data;
using backend.Exceptions;
using backend.Interface;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.Extensions.Hosting;
using backend.Dto.CalendarEvents;
using System.Globalization;

namespace backend.Repository
{
    public class CalendarEventRepository : ICalendarEventRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;
        // As long as colors in DB are just color codes, need to decode by static dictionary
        private Dictionary<string, string> colorNameToCode = new Dictionary<string, string>
        {
            { "Yellow", "#f57c00" },
            { "Red", "#d32f2f" },
            { "Green", "#388e3c" },
            { "Blue", "#0288d1" },
            { "Purple", "#ab47bc" }
        };


        public CalendarEventRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task AddEvent(CalendarEventDto dto)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            DateTime parsedDateTime;
            try
            {
                parsedDateTime = DateTime.ParseExact(dto.DateTime, "dd.MM.yyyy", CultureInfo.InvariantCulture);
            }
            catch (FormatException)
            {
                throw new ArgumentException("Date format is invalid. Please use DD.MM.YYYY.");
            }

            var newEvent = new CalendarEvent
            {
                UserID = userId.Value,
                Title = dto.Title,
                Description = dto.Description,
                DateTime = parsedDateTime,
                EventColor = dto.EventColor,
            };

            await _context.CalendarEvents.AddAsync(newEvent);
            await _context.SaveChangesAsync();

            var notification = new CalendarEventNotification
            {
                UserID = userId.Value,
                Message = $"{dto.Title} is scheduled on {newEvent.DateTime:MMMM dd, yyyy}",
                DateTime = newEvent.DateTime,
                CalendarEvent = newEvent,
                CalendarEventID = newEvent.EventID
            };

            await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteEvent(int eventId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var ev = await _context.CalendarEvents.SingleOrDefaultAsync(ev => ev.UserID == userId && ev.EventID == eventId);

            if (ev == null)
            {
                throw new NotFoundException("User not found");
            }

            _context.CalendarEvents.Remove(ev);
            var notification = await _context.Notifications
                .SingleOrDefaultAsync(notification => notification.NotificationID == ev.NotificationID);

            if (notification != null)
            {
                _context.Notifications.Remove(notification);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<List<AllCalendarEventsDto>> GetAllEventsBetween(string from, string to, Dictionary<string, bool> colors)
        {
            var userId = _userContextRepository.GetUserId;

            var startDate = DateTime.ParseExact(from, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            var endDate = DateTime.ParseExact(to, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            var userEvents = await _context.CalendarEvents
                .AsNoTracking()
                .Where(ev => ev.UserID == userId && ev.DateTime >= startDate && ev.DateTime <= endDate)
                .ToListAsync();

            if (userEvents.Count == 0)
            {
                return new List<AllCalendarEventsDto>();
            }

            var selectedColorCodes = colors
                .Where(c => c.Value)
                .Select(c => colorNameToCode[c.Key])
                .ToHashSet();

            var filteredEvents = userEvents.Where(ev => selectedColorCodes.Contains(ev.EventColor)).ToList();

            var eventsDto = _mapper.Map<List<AllCalendarEventsDto>>(filteredEvents);

            return eventsDto;
        }


        public async Task UpdateEvent(CalendarEventDto dto, int eventId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var ev = await _context.CalendarEvents.SingleOrDefaultAsync(ev => ev.UserID == userId && ev.EventID == eventId);

            if (ev == null)
            {
                throw new NotFoundException("Event not found");
            }

            DateTime parsedDateTime;
            try
            {
                parsedDateTime = DateTime.ParseExact(dto.DateTime, "dd.MM.yyyy", CultureInfo.InvariantCulture);
            }
            catch (FormatException)
            {
                throw new ArgumentException("Date format is invalid. Please use DD.MM.YYYY.");
            }

            ev.Title = dto.Title;
            ev.DateTime = parsedDateTime;
            ev.EventColor = dto.EventColor;
            ev.Description = dto.Description;

            _context.CalendarEvents.Update(ev);
            await _context.SaveChangesAsync();

            var notification = await _context.Notifications
                .SingleOrDefaultAsync(notification => notification.NotificationID == ev.NotificationID);

            if (notification != null)
            {
                notification.Message = $"{ev.Title} is rescheduled on {ev.DateTime:MMMM dd, yyyy}";
                notification.DateTime = parsedDateTime; // Update to the new parsed date
                _context.Notifications.Update(notification);
                await _context.SaveChangesAsync();
            }
        }
    }
}

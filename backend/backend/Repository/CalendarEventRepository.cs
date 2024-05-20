using backend.Data;
using backend.Exceptions;
using backend.Interface;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.Extensions.Hosting;
using backend.Dto.CalendarEvents;

namespace backend.Repository
{
    public class CalendarEventRepository : ICalendarEventRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

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

            var newEvent = new CalendarEvent
            {
                UserID = userId.Value,
                Title = dto.Title,
                Description = dto.Description,
                DateTime = DateTime.Parse(dto.DateTime),
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
            _context.CalendarEvents.Remove(ev);
            var notification = await _context.Notifications
                .SingleOrDefaultAsync(notification => notification.NotificationID == ev.NotificationID);
            if (notification != null)
            {
                _context.Notifications.Remove(notification);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<List<AllCalendarEventsDto>> GetAllEventsBetween(string from, string to)
        {
            List<CalendarEvent> userEvents;
            var userId = _userContextRepository.GetUserId;
            userEvents = await _context.CalendarEvents
                .Where(ev => ev.UserID == userId && ev.DateTime >= DateTime.Parse(from) && ev.DateTime <= DateTime.Parse(to)) 
                .ToListAsync();
            if (userEvents.Count == 0) { return new List<AllCalendarEventsDto>(); }
            var eventsDto = _mapper.Map<List<AllCalendarEventsDto>>(userEvents);
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
            
            ev.Title = dto.Title;
            ev.DateTime = DateTime.Parse(dto.DateTime);
            ev.EventColor = dto.EventColor;
            ev.Description  = dto.Description;

            _context.CalendarEvents.Update(ev);
            await _context.SaveChangesAsync();

            var notification = await _context.Notifications
                .SingleOrDefaultAsync(notification => notification.NotificationID == ev.NotificationID);

            if (notification != null)
            {
                notification.Message = $"{ev.Title} is rescheduled on {ev.DateTime:MMMM dd, yyyy}";
                notification.DateTime = DateTime.Parse(dto.DateTime);
                _context.Notifications.Update(notification);
                await _context.SaveChangesAsync();
            }
        }
    }
}

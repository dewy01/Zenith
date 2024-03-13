using backend.Dto;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/calendar")]
    [ApiController]
    public class CalendarEventController : ControllerBase
    {
        private readonly ICalendarEventRepository _calendarService;
        public CalendarEventController(ICalendarEventRepository noteService)
        {
            _calendarService = noteService;
        }

        [HttpGet("getEventBetween")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AllCalendarEventsDto>>> GetAllEvents(EventPaginationDto dto)
        {
            var events = await _calendarService.GetAllEventsBetween(dto);
            return await Task.FromResult(Ok(events));
        }

        [HttpPost("addEvent")]
        [Authorize]
        public async Task<ActionResult> addEvent(CalendarEventDto dto)
        {
            await _calendarService.AddEvent(dto);
            return await Task.FromResult(Ok());
        }

        [HttpPatch("updateEvent/{eventId}")]
        [Authorize]
        public async Task<ActionResult> updateNote(CalendarEventDto dto, [FromRoute] int eventId)
        {
            await _calendarService.UpdateEvent(dto, eventId);
            return await Task.FromResult(Ok());
        }

        [HttpDelete("deleteEvent/{eventId}")]
        [Authorize]
        public async Task<ActionResult> deleteNote([FromRoute] int eventId)
        {
            await _calendarService.DeleteEvent(eventId);
            return await Task.FromResult(Ok());
        }

    }
}

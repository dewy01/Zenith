using backend.Dto.CalendarEvents;
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

        [HttpGet("getEventBetween/{from}/{to}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AllCalendarEventsDto>>> GetAllEvents([FromRoute]  string from, [FromRoute] string to)
        {
            var events = await _calendarService.GetAllEventsBetween(from, to);
            return Ok(events);
        }

        [HttpPost("addEvent")]
        [Authorize]
        public async Task<ActionResult> addEvent(CalendarEventDto dto)
        {
            await _calendarService.AddEvent(dto);
            return Ok();
        }

        [HttpPatch("updateEvent/{eventId}")]
        [Authorize]
        public async Task<ActionResult> updateNote(CalendarEventDto dto, [FromRoute] int eventId)
        {
            await _calendarService.UpdateEvent(dto, eventId);
            return Ok();
        }

        [HttpDelete("deleteEvent/{eventId}")]
        [Authorize]
        public async Task<ActionResult> deleteNote([FromRoute] int eventId)
        {
            await _calendarService.DeleteEvent(eventId);
            return Ok();
        }

    }
}

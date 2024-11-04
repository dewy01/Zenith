using backend.Dto.Pagination;
using backend.Dto.Todos;
using backend.Dto.CalendarEvents;
using backend.Dto.Dashboard;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardRepository _dashboardService;

        public DashboardController(IDashboardRepository dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("getTodoDashboard")]
        [Authorize]
        public async Task<ActionResult<DashboardTodoDto>> GetTodoCompletion()
        {
            var completionPercentage = await _dashboardService.GetTodoCompletion();
            return Ok(completionPercentage);
        }

        [HttpGet("getEventsDashboard")]
        [Authorize]
        public async Task<ActionResult<List<AllCalendarEventsDto>>> GetClosestEvents()
        {
            int maxEvents = 3;
            var events = await _dashboardService.GetClosestEvents(maxEvents);
            return Ok(events);
        }

        [HttpGet("getNotesDashboard")]
        [Authorize]
        public async Task<ActionResult<List<DashboardNoteDto>>> GetLatestNotes()
        {
            int maxNotes = 3;
            var notes = await _dashboardService.GetLatestNotes(maxNotes);
            return Ok(notes);
        }

        [HttpGet("getProjectsDashboard")]
        [Authorize]
        public async Task<ActionResult<DashboardProjectSummaryDto>> GetApproachingDeadlineProjects()
        {
            int daysThreshold = 3;
            var projects = await _dashboardService.GetApproachingDeadlineProjects(daysThreshold);
            return Ok(projects);
        }

        [HttpGet("getGroupProjectsDashboard")]
        [Authorize]
        public async Task<ActionResult<DashboardGroupProjectSummaryDto>> GetApproachingDeadlineGroupProjects()
        {
            int daysThreshold = 3;
            var groupProjects = await _dashboardService.GetApproachingDeadlineGroupProjects(daysThreshold);
            return Ok(groupProjects);
        }
    }
}

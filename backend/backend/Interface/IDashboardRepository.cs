using backend.Dto.CalendarEvents;
using backend.Dto.Dashboard;

namespace backend.Interface
{
    public interface IDashboardRepository
    {
        Task<DashboardTodoDto> GetTodoCompletion();
        Task<List<AllCalendarEventsDto>> GetClosestEvents(int maxEvents = 5);
        Task<List<DashboardNoteDto>> GetLatestNotes(int maxNotes = 5);
        Task<DashboardProjectSummaryDto> GetApproachingDeadlineProjects(int daysThreshold = 7);
        Task<DashboardGroupProjectSummaryDto> GetApproachingDeadlineGroupProjects(int daysThreshold = 7);
    }
}

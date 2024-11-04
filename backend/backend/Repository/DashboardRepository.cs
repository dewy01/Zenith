using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using backend.Dto.Todos;
using backend.Dto.CalendarEvents;
using backend.Dto.Dashboard;
using backend.Enums;

namespace backend.Repository
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

        public DashboardRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task<DashboardTodoDto> GetTodoCompletion()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var todos = await _context.ProjectTodos
                .AsNoTracking()
                .Where(x => x.UserID == userId)
                .ToListAsync();

            var totalTodos = todos.Count;
            var completedTodos = todos.Count(x => x.IsDone);

            var completionPercentage = totalTodos > 0 ? (int)((completedTodos / (double)totalTodos) * 100) : 0;

            return new DashboardTodoDto
            {
                CompletionPercentage = completionPercentage,
                TotalTodos = totalTodos,
                CompletedTodos = completedTodos
            };
        }



        public async Task<List<AllCalendarEventsDto>> GetClosestEvents(int maxEvents)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var futureEvents = await _context.CalendarEvents
                .AsNoTracking()
                .Where(ev => ev.UserID == userId && ev.DateTime >= DateTime.Now)
                .OrderBy(ev => ev.DateTime)
                .ToListAsync();

            var totalEvents = futureEvents.Count;

            if (totalEvents < maxEvents)
            {
                var remainingEventsCount = maxEvents - totalEvents;

                var pastEvents = await _context.CalendarEvents
                    .AsNoTracking()
                    .Where(ev => ev.UserID == userId && ev.DateTime < DateTime.Now)
                    .OrderByDescending(ev => ev.DateTime)
                    .Take(remainingEventsCount)
                    .ToListAsync();

                futureEvents.AddRange(pastEvents);
            }

            return _mapper.Map<List<AllCalendarEventsDto>>(futureEvents.Take(maxEvents).ToList());
        }

        public async Task<List<DashboardNoteDto>> GetLatestNotes(int maxNotes)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var notes = await _context.Notes
                .AsNoTracking()
                .Where(note => note.UserID == userId)
                .OrderByDescending(note => note.CreatedAt)
                .ToListAsync();

            var latestNotes = notes.Select(note => new DashboardNoteDto
            {
                NoteID = note.NoteID,
                Title = note.Title,
                ShortDescription = string.IsNullOrEmpty(note.Content)
                    ? ""
                    : (note.Content.Length > 100 ? note.Content.Substring(0, 100) + "..." : note.Content)
            }).ToList();

            return latestNotes.Take(maxNotes).ToList();
        }

        public async Task<DashboardProjectSummaryDto> GetApproachingDeadlineProjects(int daysThreshold)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var thresholdDate = DateTime.Now.AddDays(daysThreshold);

            var approachingProjects = await _context.Projects
                .Where(p => p.UserID == userId &&
                            p.Status != ProjectStatus.Done &&
                            p.Deadline < thresholdDate)
                .Include(p => p.ProjectTasks)
                .AsNoTracking()
                .ToListAsync();

            var approachingProjectDtos = approachingProjects.Select(project => new DashboardProjectDto
            {
                ProjectID = project.ProjectID,
                Title = project.Title,
                Deadline = project.Deadline,
                Description = project.Description,
                Status = project.Status,
                CompletionPercentage = project.ProjectTasks != null && project.ProjectTasks.Count() != 0
                    ? (float)Math.Truncate((float)project.ProjectTasks.Count(x => x.Status == ProjectTaskStatus.Closed) / project.ProjectTasks.Count() * 100)
                    : 0,
            }).Take(3).ToList();

            var allProjects = await _context.Projects
                .Where(p => p.UserID == userId) 
                .Include(p => p.ProjectTasks)
                .AsNoTracking()
                .ToListAsync();

            var projectCountByStatus = allProjects.GroupBy(p => p.Status)
                .ToDictionary(g => g.Key, g => g.Count());

            return new DashboardProjectSummaryDto
            {
                Projects = approachingProjectDtos,
                ProjectsCountByStatus = projectCountByStatus
            };
        }



        public async Task<DashboardGroupProjectSummaryDto> GetApproachingDeadlineGroupProjects(int daysThreshold)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserID == userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            var userGroup = await _context.Groups
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.GroupID == user.GroupID);

            if (userGroup == null)
            {
                throw new NotFoundException("User's group not found");
            }

            var thresholdDate = DateTime.Now.AddDays(daysThreshold);

            var approachingGroupProjects = await _context.GroupProjects
                .Where(p => p.GroupID == userGroup.GroupID &&
                            p.Status != ProjectStatus.Done &&
                            p.Deadline < thresholdDate)
                .Include(p => p.GroupProjectTasks)
                .AsNoTracking()
                .ToListAsync();

            var approachingGroupProjectDtos = approachingGroupProjects.Select(project => new DashboardGroupProjectDto
            {
                GroupProjectID = project.GroupProjectID,
                Title = project.Title,
                Deadline = project.Deadline,
                Description = project.Description,
                Status = project.Status,
                CompletionPercentage = project.GroupProjectTasks != null && project.GroupProjectTasks.Count != 0
                    ? (float)Math.Truncate((float)project.GroupProjectTasks.Count(x => x.Status == ProjectTaskStatus.Closed) / project.GroupProjectTasks.Count * 100)
                    : 0,
            }).Take(3).ToList();

            var allGroupProjects = await _context.GroupProjects
                .Where(p => p.GroupID == userGroup.GroupID) 
                .Include(p => p.GroupProjectTasks)
                .AsNoTracking()
                .ToListAsync();

            var projectCountByStatus = allGroupProjects.GroupBy(p => p.Status)
                .ToDictionary(g => g.Key, g => g.Count());

            return new DashboardGroupProjectSummaryDto
            {
                Projects = approachingGroupProjectDtos,
                ProjectsCountByStatus = projectCountByStatus
            };
        }





    }
}

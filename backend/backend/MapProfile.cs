    using AutoMapper;
using backend.Dto;
using backend.Models;

namespace backend

{
    public class MapProfile : Profile
    {
        public MapProfile() 
        {
            CreateMap<Note, AllNotesDto>();
            CreateMap<Project, AllProjectsDto>();
            CreateMap<ProjectTask, ProjectTaskShortDto>();
            CreateMap<GroupProjectTask, GroupProjectTaskShortDto>()
                .ForMember(dest => dest.ProjectTaskID, opt => opt.MapFrom(src => src.GroupProjectTaskID))
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User != null ? src.User.Username : null))
                .ForMember(dest => dest.CanEdit, opt => opt.MapFrom((src, dest, destMember, context) =>
                {
                    var currentUserId = context.Items["CurrentUserId"] as int?;
                    var currentUserRole = context.Items["CurrentUserRole"] as Enums.GroupRole?;

                    var isTaskOwner = src.User?.UserID== currentUserId;
                    var isAdminOrModerator = currentUserRole == Enums.GroupRole.Admin || currentUserRole == Enums.GroupRole.Moderator;

                    return isTaskOwner || isAdminOrModerator;
                }));


            CreateMap<ProjectTodo, AllProjectsTodoDto>();
            CreateMap<Todo, TodoDto>();
            CreateMap<CalendarEvent, AllCalendarEventsDto>();
            CreateMap<GroupProject, AllGroupProjectsDto>();
            CreateMap<User, GroupUsersDto>();
        }
    }
}

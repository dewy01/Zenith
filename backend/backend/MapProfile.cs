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
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User != null ? src.User.Username : null));

            CreateMap<ProjectTodo, AllProjectsTodoDto>();
            CreateMap<Todo, TodoDto>();
            CreateMap<CalendarEvent, AllCalendarEventsDto>();
            CreateMap<GroupProject, AllGroupProjectsDto>();
            CreateMap<User, GroupUsersDto>();
        }
    }
}

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
            CreateMap<ProjectTodo, AllProjectsTodoDto>();
            CreateMap<Todo, TodoDto>();
            CreateMap<CalendarEvent, AllCalendarEventsDto>();
        }
    }
}

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
        }
    }
}

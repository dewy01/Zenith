using backend.Data;
using backend.Dto;
using backend.Exceptions;
using backend.Interface;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using AutoMapper;
using Microsoft.Extensions.Hosting;

namespace backend.Repository
{
    public class NoteRepository : INoteRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

        public NoteRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task AddNote()
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var newNote = new Note
            {
                UserID = userId.Value,
                Title = "Untitled",
                CreatedAt = DateTime.Now,
                Content = "",
            };

            await _context.Notes.AddAsync(newNote);
            await _context.SaveChangesAsync();
        }

        public void DeleteNote(int noteId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<AllNotesDto>> GetAllNotes()
        {
            List<Note> userNotes;
            var userId = _userContextRepository.GetUserId;
            userNotes = await _context.Notes
                .Where(note => note.UserID == userId)
                .ToListAsync();
            if (userNotes.Count == 0) { return new List<AllNotesDto>(); }
            var noteDtos = _mapper.Map<List<AllNotesDto>>(userNotes);
            return noteDtos;
        }

        public Note GetNoteById(int noteId)
        {
            throw new NotImplementedException();
        }

        public void UpdateNote(Note note)
        {
            throw new NotImplementedException();
        }
    }
}

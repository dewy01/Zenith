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

        public async Task DeleteNote(int noteId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null) 
            {
                throw new NotFoundException("User not found");
            }
            var note = await _context.Notes.SingleOrDefaultAsync(note => note.UserID == userId && note.NoteID == noteId);
            _context.Remove(note);
            await _context.SaveChangesAsync();
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

        public async Task<EditNoteDto> GetNoteById(int noteId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var note = await _context.Notes.SingleOrDefaultAsync(note=>note.UserID == userId && note.NoteID == noteId);
            var noteDto = new EditNoteDto 
            { 
                Title = note.Title,
                Content = note.Content,
            };
            return noteDto;
        }

        public async Task UpdateNote(EditNoteDto dto, int noteId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var note = await _context.Notes.SingleOrDefaultAsync(note => note.UserID == userId && note.NoteID == noteId);
            note.Title = dto.Title;
            note.Content = dto.Content;
            _context.Notes.Update(note);
            await _context.SaveChangesAsync();

        }
    }
}

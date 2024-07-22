using backend.Data;
using backend.Exceptions;
using backend.Interface;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using AutoMapper;
using Microsoft.Extensions.Hosting;
using System.Security.Cryptography;
using backend.Dto.Notes;
using backend.Dto.Pagination;

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
                Content = " ",
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

            var note = await _context.Notes
                .SingleOrDefaultAsync(note => note.UserID == userId && note.NoteID == noteId);
            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
        }

        public async Task<PaginationResponseDto<AllNotesDto>> GetAllNotes(PaginationRequestDto paginationRequest)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var query = _context.Notes
                .Where(note => note.UserID == userId)
                .AsNoTracking();

            if (!string.IsNullOrEmpty(paginationRequest.Filter))
            {
                query = query.Where(note => note.Title.Contains(paginationRequest.Filter));
            }

            var totalItems = await query.CountAsync();

            var userNotes = await query
                .OrderByDescending(note => note.NoteID)
                .Skip((paginationRequest.PageNumber - 1) * paginationRequest.PageSize)
                .Take(paginationRequest.PageSize)
                .ToListAsync();

            if (userNotes.Count == 0)
            {
                return new PaginationResponseDto<AllNotesDto>();
            }

            var noteDtos = _mapper.Map<List<AllNotesDto>>(userNotes);

            var response = new PaginationResponseDto<AllNotesDto>
            {
                Items = noteDtos,
                TotalItems = totalItems,
                PageNumber = paginationRequest.PageNumber,
                PageSize = paginationRequest.PageSize,
                TotalPages = (int)Math.Ceiling(totalItems / (double)paginationRequest.PageSize),
            };

            return response;
        }


        public async Task<EditNoteDto> GetNoteById(int noteId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var note = await _context.Notes
                .AsNoTracking() 
                .SingleOrDefaultAsync(note => note.UserID == userId && note.NoteID == noteId);

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

            var note = await _context.Notes
                .SingleOrDefaultAsync(note => note.UserID == userId && note.NoteID == noteId);

            if (dto.Title != null && dto.Title != "")
            {
                note.Title = dto.Title;
            }

            note.Content = dto.Content;
            _context.Notes.Update(note);
            await _context.SaveChangesAsync();
        }

        public async Task<string> GetShareToken(int noteId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var note = await _context.Notes
                .SingleOrDefaultAsync(note => note.UserID == userId && note.NoteID == noteId);

            var token = "NT-";

            if (note.TokenResetTime > DateTime.Now)
            {
                token = note.ShareToken;
            }
            else
            {
                token += Convert.ToHexString(RandomNumberGenerator.GetBytes(4));
                note.ShareToken = token;
                note.TokenResetTime = DateTime.Now.AddMinutes(10);
                _context.Notes.Update(note);
                await _context.SaveChangesAsync();
            }

            return token;
        }

        public async Task<EditNoteDto> GetNoteFromToken(string token)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var note = await _context.Notes
                .AsNoTracking()
                .SingleOrDefaultAsync(note => note.ShareToken == token && note.TokenResetTime > DateTime.Now);

            if (note == null)
            {
                throw new NotFoundException("Note not found");
            }

            var noteDto = new EditNoteDto
            {
                Title = note.Title,
                Content = note.Content,
            };

            var newNote = new Note()
            {
                UserID = userId.Value,
                Title = note.Title,
                Content = note.Content,
                CreatedAt = DateTime.Now,
            };

            await _context.Notes.AddAsync(newNote);
            await _context.SaveChangesAsync();

            return noteDto;
        }
    }
}

using backend.Dto;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/notes")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _noteService;
        public NoteController(INoteRepository noteService)
        {
            _noteService = noteService;
        }

        [HttpGet("getAllNotes")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AllNotesDto>>> GetAllNotes()
        {
            var notes = await _noteService.GetAllNotes();
            return await Task.FromResult(Ok(notes));
        }
        [HttpGet("getNoteById")]
        [Authorize]
        public async Task<ActionResult<EditNoteDto>> GetNoteById(int noteId)
        {
            var note = await _noteService.GetNoteById(noteId);
            return await Task.FromResult(Ok(note));
        }
        [HttpPost("addNote")]
        [Authorize]
        public async Task<ActionResult> addNote()
        {
            await _noteService.AddNote();
            return await Task.FromResult(Ok());
        }

        [HttpPatch("updateNote")]
        [Authorize]
        public async Task<ActionResult> updateNote(EditNoteDto dto)
        {
            await _noteService.UpdateNote(dto);
            return await Task.FromResult(Ok());
        }

        [HttpDelete("deleteNote")]
        [Authorize]
        public async Task<ActionResult> deleteNote(int noteId)
        {
            await _noteService.DeleteNote(noteId);
            return await Task.FromResult(Ok());
        }

    }
}

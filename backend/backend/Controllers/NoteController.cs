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
        [HttpGet("getNoteById/{noteId}")]
        [Authorize]
        public async Task<ActionResult<EditNoteDto>> GetNoteById([FromRoute] int noteId)
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

        [HttpPatch("updateNote/{noteId}")]
        [Authorize]
        public async Task<ActionResult> updateNote(EditNoteDto dto, [FromRoute] int noteId)
        {
            await _noteService.UpdateNote(dto,noteId);
            return await Task.FromResult(Ok());
        }

        [HttpDelete("deleteNote/{noteId}")]
        [Authorize]
        public async Task<ActionResult> deleteNote([FromRoute] int noteId)
        {
            await _noteService.DeleteNote(noteId);
            return await Task.FromResult(Ok());
        }

    }
}

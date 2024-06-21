using backend.Dto.Notes;
using backend.Dto.Pagination;
using backend.Interface;
using backend.Models;
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
        public async Task<ActionResult<PaginationResponseDto<AllNotesDto>>> GetAllNotes([FromQuery] PaginationRequestDto paginationRequest)
        {
            var notes = await _noteService.GetAllNotes(paginationRequest);
            return Ok(notes);
        }
        [HttpGet("getNoteById/{noteId}")]
        [Authorize]
        public async Task<ActionResult<EditNoteDto>> GetNoteById([FromRoute] int noteId)
        {
            var note = await _noteService.GetNoteById(noteId);
            return Ok(note);
        }
        [HttpPost("addNote")]
        [Authorize]
        public async Task<ActionResult> addNote()
        {
            await _noteService.AddNote();
            return Ok();
        }

        [HttpPatch("updateNote/{noteId}")]
        [Authorize]
        public async Task<ActionResult> updateNote(EditNoteDto dto, [FromRoute] int noteId)
        {
            await _noteService.UpdateNote(dto,noteId);
            return Ok();
        }

        [HttpDelete("deleteNote/{noteId}")]
        [Authorize]
        public async Task<ActionResult> deleteNote([FromRoute] int noteId)
        {
            await _noteService.DeleteNote(noteId);
            return Ok();
        }

        [HttpGet("getShareToken/{noteId}")]
        [Authorize]
        public async Task<ActionResult<string>> getShareToken([FromRoute] int noteId)
        {
            string token = await _noteService.GetShareToken(noteId);
            return Ok(token);
        }

        [HttpGet("getNoteFromToken/{token}")]
        [Authorize]
        public async Task<ActionResult<EditNoteDto>> getNoteFromToken([FromRoute] string token)
        {
            var note = await _noteService.GetNoteFromToken(token);
            return Ok(note);
        }

    }
}

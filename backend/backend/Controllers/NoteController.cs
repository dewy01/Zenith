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

        [HttpPost("addNote")]
        [Authorize]
        public async Task<ActionResult> addNote()
        {
            await _noteService.AddNote();
            return await Task.FromResult(Ok());
        }
    }
}

using backend.Dto;
using backend.Models;
using Task = System.Threading.Tasks.Task;

namespace backend.Interface
{
    public interface INoteRepository
    {
        Task<EditNoteDto> GetNoteById(int noteId);
        Task<List<AllNotesDto>> GetAllNotes();
        Task AddNote();
        Task UpdateNote(EditNoteDto dto, int noteId);
        Task DeleteNote(int noteId);
    }
}

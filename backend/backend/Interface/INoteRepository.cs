using backend.Dto;
using backend.Models;
using Task = System.Threading.Tasks.Task;

namespace backend.Interface
{
    public interface INoteRepository
    {
        Note GetNoteById(int noteId);
        Task<List<AllNotesDto>> GetAllNotes();
        Task AddNote();
        void UpdateNote(Note note);
        void DeleteNote(int noteId);
    }
}

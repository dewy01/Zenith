using backend.Models;

namespace backend.Interface
{
    public interface INoteRepository
    {
        Note GetNoteById(int noteId);
        List<Note> GetAllNotes();
        void AddNote(Note note);
        void UpdateNote(Note note);
        void DeleteNote(int noteId);
    }
}

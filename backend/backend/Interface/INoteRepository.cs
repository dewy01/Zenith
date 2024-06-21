using backend.Dto.Notes;
using backend.Dto.Pagination;
using backend.Models;
using Task = System.Threading.Tasks.Task;

namespace backend.Interface
{
    public interface INoteRepository
    {
        Task<EditNoteDto> GetNoteById(int noteId);
        Task<PaginationResponseDto<AllNotesDto>> GetAllNotes(PaginationRequestDto pagination);
        Task AddNote();
        Task UpdateNote(EditNoteDto dto, int noteId);
        Task DeleteNote(int noteId);

        Task<string> GetShareToken(int noteId);
        Task<EditNoteDto> GetNoteFromToken(string tokenId);
    }
}

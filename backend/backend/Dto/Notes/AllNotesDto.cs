namespace backend.Dto.Notes
{
    public class AllNotesDto
    {

        public int NoteID { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}

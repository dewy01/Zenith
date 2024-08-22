namespace backend.Models
{
    public class Note
    {
        public int NoteID { get; set; }
        public int UserID { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? ShareToken { get; set; }
        public DateTime? TokenResetTime { get; set; }

        public virtual User? User { get; set; }

    }
}

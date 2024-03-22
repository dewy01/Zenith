namespace backend.Models
{
    public class Note
    {
        public int NoteID { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? ShareToken { get; set; }
        public DateTime? TokenResetTime { get; set; }

        public virtual User User { get; set; }

    }
}

namespace backend.Models
{
    public class KanbanTask
    {
        public int KanbanTaskID { get; set; }
        public int UserID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public int Priority { get; set; }
        public DateTime Deadline { get; set; }
        public required string Category { get; set; }
        public required string Status { get; set; }

        public virtual User? User { get; set; }
    }
}

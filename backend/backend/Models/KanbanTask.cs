namespace backend.Models
{
    public class KanbanTask
    {
        public int KanbanTaskID { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public DateTime Deadline { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }

        public virtual User User { get; set; }
    }
}

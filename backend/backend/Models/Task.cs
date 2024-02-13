namespace backend.Models
{
    public class Task
    {
        public int TaskID { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public DateTime Deadline { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<ProjectTask> ProjectTasks { get; set; }
    }
}

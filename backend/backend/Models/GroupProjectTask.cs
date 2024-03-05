namespace backend.Models
{
    public class GroupProjectTask
    {
        public int GroupProjectTaskID { get; set; }
        public int GroupProjectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public DateTime Deadline { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }

        public virtual GroupProject GroupProject { get; set; }
    }
}

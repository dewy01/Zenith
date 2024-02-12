namespace backend.Models
{
    public class ProjectTask
    {
        public int ProjectTaskID { get; set; }
        public int ProjectID { get; set; }
        public int TaskID { get; set; }

        public virtual Project Project { get; set; }
        public virtual Task Task { get; set; }

    }
}

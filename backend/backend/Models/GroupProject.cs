namespace backend.Models
{
    public class GroupProject
    {
        public int GroupProjectID { get; set; }
        public int ProjectID { get; set; }
        public int GroupID { get; set; }

        public virtual Project Project { get; set; }
        public virtual Group Group { get; set; }
        public virtual List<GroupProjectTask> GroupProjectTasks { get; set; }
    }
}

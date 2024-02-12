namespace backend.Models
{
    public class GroupProjectTaskAsignee
    {
        public int AssignmentID { get; set; }
        public int GroupProjectTaskID { get; set; }
        public int UserID { get; set; }
        public string Status { get; set; }

        public virtual GroupProjectTask GroupProjectTask { get; set; }
        public virtual User User { get; set; }
    }
}

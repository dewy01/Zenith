using backend.Enums;

namespace backend.Models
{
    public class GroupProject
    {
        public int GroupProjectID { get; set; }
        public int GroupID { get; set; }
        public int? NotificationID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }


        public virtual ICollection<GroupProjectTask>? GroupProjectTasks { get; set; }
        public virtual Group? Group { get; set; }
        public virtual GroupProjectNotification? Notification { get; set; }
    }
}

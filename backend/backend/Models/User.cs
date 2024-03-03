using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string VerificationToken { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }


        public virtual UserPreferences Preferences { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<Note> Notes { get; set; }
        public virtual ICollection<CalendarEvent> CalendarEvents { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
        public virtual ICollection<GroupMember> GroupMembers { get; set; }
        public virtual ICollection<KanbanTask> KanbanTasks { get; set; }
    }
}

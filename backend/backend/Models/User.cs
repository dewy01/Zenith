using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }

        public virtual Role Role { get; set; }
        public virtual UserPreferences Preferences { get; set; }
        public virtual List<Task> Tasks { get; set; }
        public virtual List<Project> Projects { get; set; }
        public virtual List<Note> Notes { get; set; }
        public virtual List<CalendarEvent> CalendarEvents { get; set; }
        public virtual List<Notification> Notifications { get; set; }
        public virtual List<GroupMember> GroupMembers { get; set; }
    }
}

using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
        public string VerificationToken { get; set; }
        public string? PasswordResetToken { get; set; }
        public DateTime? PasswordResetTime { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Roles Role { get; set; }
        public int? GroupID { get; set; }
        public string? Image {  get; set; }

        public virtual UserPreferences Preferences { get; set; }
        public virtual Group Group { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<Note> Notes { get; set; }
        public virtual ICollection<CalendarEvent> CalendarEvents { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
        public virtual ICollection<KanbanTask> KanbanTasks { get; set; }
        public virtual ICollection<ProjectTodo> ProjectTodos { get; set; }
    }
}

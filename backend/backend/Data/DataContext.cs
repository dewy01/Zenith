    using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {


        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectTask> ProjectTasks { get; set; }
        public DbSet<TaskCategory> TaskCategories { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<CalendarEvent> CalendarEvents { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupMember> GroupMembers { get; set; }
        public DbSet<GroupProject> GroupProjects { get; set; }
        public DbSet<GroupProjectTask> GroupProjectTasks { get; set; }
        public DbSet<GroupProjectTaskAsignee> GroupProjectTaskAssignees { get; set; }
        public DbSet<UserPreferences> UserPreferences { get; set; }
        public DbSet<KanbanTask> KanbanTasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
               .HasKey(u => u.UserID);

            modelBuilder.Entity<Role>()
                .HasKey(r => r.RoleID);

            modelBuilder.Entity<Models.Task>()
                .HasKey(t => t.TaskID);

            modelBuilder.Entity<Project>()
                .HasKey(p => p.ProjectID);

            modelBuilder.Entity<ProjectTask>()
                 .HasKey(pt => pt.ProjectTaskID);

            modelBuilder.Entity<TaskCategory>()
                .HasKey(tc => tc.CategoryID);

            modelBuilder.Entity<Note>()
                .HasKey(n => n.NoteID);

            modelBuilder.Entity<CalendarEvent>()
                .HasKey(ce => ce.EventID);

            modelBuilder.Entity<Notification>()
                .HasKey(n => n.NotificationID);

            modelBuilder.Entity<Group>()
                .HasKey(g => g.GroupID);

            modelBuilder.Entity<GroupMember>()
                .HasKey(gm => gm.GroupMemberID);

            modelBuilder.Entity<GroupProject>()
                .HasKey(gp => gp.GroupProjectID);

            modelBuilder.Entity<GroupProjectTask>()
                .HasKey(gpt => gpt.GroupProjectTaskID);

            modelBuilder.Entity<GroupProjectTaskAsignee>()
                .HasKey(gpta => gpta.AssignmentID);

            modelBuilder.Entity<KanbanTask>()
                .HasKey(kt => kt.KanbanTaskID); 

            modelBuilder.Entity<UserPreferences>()
                .HasKey(up => up.PreferencesID);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Preferences)
                .WithOne(up => up.User)
                .HasForeignKey<UserPreferences>(up => up.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Tasks)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Projects)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Notes)
                .WithOne(n => n.User)
                .HasForeignKey(n => n.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.CalendarEvents)
                .WithOne(ce => ce.User)
                .HasForeignKey(ce => ce.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Notifications)
                .WithOne(n => n.User)
                .HasForeignKey(n => n.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.GroupMembers)
                .WithOne(gm => gm.User)
                .HasForeignKey(gm => gm.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Models.Task>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tasks)
                .HasForeignKey(t => t.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Models.Task>()
                .HasMany(t => t.ProjectTasks)
                .WithOne(pt => pt.Task)
                .HasForeignKey(pt => pt.TaskID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Project>()
                .HasOne(p => p.User)
                .WithMany(u => u.Projects)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Project>()
                .HasMany(p => p.ProjectTasks)
                .WithOne(pt => pt.Project)
                .HasForeignKey(pt => pt.ProjectID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ProjectTask>()
                .HasOne(pt => pt.Project)
                .WithMany(p => p.ProjectTasks)
                .HasForeignKey(pt => pt.ProjectID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ProjectTask>()
                .HasOne(pt => pt.Task)
                .WithMany(t => t.ProjectTasks)
                .HasForeignKey(pt => pt.TaskID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GroupProjectTaskAsignee>()
                .HasOne(gpta => gpta.GroupProjectTask)
                .WithMany()
                .HasForeignKey(gpta => gpta.GroupProjectTaskID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GroupProjectTaskAsignee>()
                .HasOne(gpta => gpta.User)
                .WithMany()
                .HasForeignKey(gpta => gpta.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);

        }

    }
}

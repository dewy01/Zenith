﻿    using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {


        }

        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectTask> ProjectTasks { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<CalendarEvent> CalendarEvents { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupProject> GroupProjects { get; set; }
        public DbSet<GroupProjectTask> GroupProjectTasks { get; set; }
        public DbSet<UserPreferences> UserPreferences { get; set; }
        public DbSet<KanbanTask> KanbanTasks { get; set; }
        public DbSet<ProjectTodo> ProjectTodos { get; set; }
        public DbSet<Todo> Todos { get; set; }
        public DbSet<GroupRole> GroupRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
               .HasKey(u => u.UserID);


            modelBuilder.Entity<Project>()
                .HasKey(p => p.ProjectID);

            modelBuilder.Entity<ProjectTask>()
                 .HasKey(pt => pt.ProjectTaskID);


            modelBuilder.Entity<Todo>()
                .HasKey(t => t.TodoID);

            modelBuilder.Entity<ProjectTodo>()
                 .HasKey(pt => pt.ProjectTodoID);


            modelBuilder.Entity<Note>()
                .HasKey(n => n.NoteID);

            modelBuilder.Entity<CalendarEvent>()
                .HasKey(ce => ce.EventID);

            modelBuilder.Entity<Notification>()
                .HasKey(n => n.NotificationID);

            modelBuilder.Entity<Group>()
                .HasKey(g => g.GroupID);

            modelBuilder.Entity<GroupProject>()
                .HasKey(gp => gp.GroupProjectID);

            modelBuilder.Entity<GroupProjectTask>()
                .HasKey(gpt => gpt.GroupProjectTaskID);

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
                .HasOne(u => u.Group)
                .WithMany(g => g.Users)
                .HasForeignKey(u => u.GroupID)
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
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ProjectTodo>()
                .HasOne(p => p.User)
                .WithMany(u => u.ProjectTodos)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ProjectTodo>()
                .HasMany(p => p.Todos)
                .WithOne(pt => pt.ProjectTodo)
                .HasForeignKey(pt => pt.ProjectTodoID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Todo>()
                .HasOne(pt => pt.ProjectTodo)
                .WithMany(p => p.Todos)
                .HasForeignKey(pt => pt.ProjectTodoID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<GroupProjectTask>()
                .HasOne(gpt => gpt.GroupProject)
                .WithMany(gp => gp.GroupProjectTasks)
                .HasForeignKey(gpt => gpt.GroupProjectID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<GroupProjectTask>()
                .HasOne(gpt => gpt.User)
                .WithMany()
                .HasForeignKey(gpt => gpt.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Group>()
                .HasMany(p => p.Users)
                .WithOne(pt => pt.Group)
                .HasForeignKey(pt => pt.GroupID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GroupRole>()
                .HasKey(gr => new { gr.UserId, gr.GroupId });

            modelBuilder.Entity<GroupRole>()
                .HasOne(gr => gr.User)
                .WithMany()
                .HasForeignKey(gr => gr.UserId);

            modelBuilder.Entity<GroupRole>()
                .HasOne(gr => gr.Group)
                .WithMany()
                .HasForeignKey(gr => gr.GroupId);

            modelBuilder.Entity<Notification>().HasDiscriminator(x => x.Discriminator);

            modelBuilder.Entity<CalendarEventNotification>()
                 .HasOne(x => x.CalendarEvent)
                 .WithOne(x => x.Notification)
                 .HasForeignKey<CalendarEvent>(x => x.NotificationID)
                 .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<GroupProjectNotification>()
                .HasOne(x => x.GroupProject)
                .WithOne(x => x.Notification)
                .HasForeignKey<GroupProject>(x => x.NotificationID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ProjectNotification>()
                .HasOne(x => x.Project)
                .WithOne(x => x.Notification)
                .HasForeignKey<Project>(x => x.NotificationID)
                .OnDelete(DeleteBehavior.NoAction);

            base.OnModelCreating(modelBuilder);

        }

    }
}

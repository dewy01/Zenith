﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.CalendarEvent", b =>
                {
                    b.Property<int>("EventID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EventID"));

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EventColor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("NotificationID")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("EventID");

                    b.HasIndex("NotificationID")
                        .IsUnique()
                        .HasFilter("[NotificationID] IS NOT NULL");

                    b.HasIndex("UserID");

                    b.ToTable("CalendarEvents", (string)null);
                });

            modelBuilder.Entity("backend.Models.Group", b =>
                {
                    b.Property<int>("GroupID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GroupID"));

                    b.Property<string>("GroupName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InviteToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("TokenResetTime")
                        .HasColumnType("datetime2");

                    b.HasKey("GroupID");

                    b.ToTable("Groups", (string)null);
                });

            modelBuilder.Entity("backend.Models.GroupProject", b =>
                {
                    b.Property<int>("GroupProjectID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GroupProjectID"));

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GroupID")
                        .HasColumnType("int");

                    b.Property<int?>("NotificationID")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GroupProjectID");

                    b.HasIndex("GroupID");

                    b.HasIndex("NotificationID")
                        .IsUnique()
                        .HasFilter("[NotificationID] IS NOT NULL");

                    b.ToTable("GroupProjects", (string)null);
                });

            modelBuilder.Entity("backend.Models.GroupProjectTask", b =>
                {
                    b.Property<int>("GroupProjectTaskID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GroupProjectTaskID"));

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EditTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("GroupProjectID")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("GroupProjectTaskID");

                    b.HasIndex("GroupProjectID");

                    b.HasIndex("UserID");

                    b.ToTable("GroupProjectTasks", (string)null);
                });

            modelBuilder.Entity("backend.Models.GroupRole", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("GroupId")
                        .HasColumnType("int");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.HasKey("UserId", "GroupId");

                    b.HasIndex("GroupId");

                    b.ToTable("GroupRoles", (string)null);
                });

            modelBuilder.Entity("backend.Models.KanbanTask", b =>
                {
                    b.Property<int>("KanbanTaskID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("KanbanTaskID"));

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("KanbanTaskID");

                    b.HasIndex("UserID");

                    b.ToTable("KanbanTasks", (string)null);
                });

            modelBuilder.Entity("backend.Models.Note", b =>
                {
                    b.Property<int>("NoteID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("NoteID"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("ShareToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("TokenResetTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("NoteID");

                    b.HasIndex("UserID");

                    b.ToTable("Notes", (string)null);
                });

            modelBuilder.Entity("backend.Models.Notification", b =>
                {
                    b.Property<int>("NotificationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("NotificationID"));

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(34)
                        .HasColumnType("nvarchar(34)");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.Property<bool>("isActive")
                        .HasColumnType("bit");

                    b.Property<bool>("isRead")
                        .HasColumnType("bit");

                    b.HasKey("NotificationID");

                    b.HasIndex("UserID");

                    b.ToTable("Notifications", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("Notification");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("backend.Models.Project", b =>
                {
                    b.Property<int>("ProjectID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProjectID"));

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("NotificationID")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ProjectID");

                    b.HasIndex("NotificationID")
                        .IsUnique()
                        .HasFilter("[NotificationID] IS NOT NULL");

                    b.HasIndex("UserID");

                    b.ToTable("Projects", (string)null);
                });

            modelBuilder.Entity("backend.Models.ProjectTask", b =>
                {
                    b.Property<int>("ProjectTaskID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProjectTaskID"));

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EditTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("ProjectID")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProjectTaskID");

                    b.HasIndex("ProjectID");

                    b.ToTable("ProjectTasks", (string)null);
                });

            modelBuilder.Entity("backend.Models.ProjectTodo", b =>
                {
                    b.Property<int>("ProjectTodoID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProjectTodoID"));

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ProjectTodoID");

                    b.HasIndex("UserID");

                    b.ToTable("ProjectTodos", (string)null);
                });

            modelBuilder.Entity("backend.Models.Role", b =>
                {
                    b.Property<int>("RoleID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RoleID"));

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RoleID");

                    b.ToTable("Roles", (string)null);
                });

            modelBuilder.Entity("backend.Models.Todo", b =>
                {
                    b.Property<int>("TodoID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TodoID"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDone")
                        .HasColumnType("bit");

                    b.Property<int>("ProjectTodoID")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TodoID");

                    b.HasIndex("ProjectTodoID");

                    b.ToTable("Todos", (string)null);
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("GroupID")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("PasswordResetTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("PasswordResetToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VerificationToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserID");

                    b.HasIndex("GroupID");

                    b.HasIndex("RoleId");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("backend.Models.UserPreferences", b =>
                {
                    b.Property<int>("PreferencesID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PreferencesID"));

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Reminder")
                        .HasColumnType("int");

                    b.Property<string>("Routes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Theme")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("PreferencesID");

                    b.HasIndex("UserID")
                        .IsUnique();

                    b.ToTable("UserPreferences", (string)null);
                });

            modelBuilder.Entity("backend.Models.CalendarEventNotification", b =>
                {
                    b.HasBaseType("backend.Models.Notification");

                    b.Property<int>("CalendarEventID")
                        .HasColumnType("int");

                    b.HasDiscriminator().HasValue("CalendarEventNotification");
                });

            modelBuilder.Entity("backend.Models.GroupProjectNotification", b =>
                {
                    b.HasBaseType("backend.Models.Notification");

                    b.Property<int>("GroupProjectID")
                        .HasColumnType("int");

                    b.HasDiscriminator().HasValue("GroupProjectNotification");
                });

            modelBuilder.Entity("backend.Models.ProjectNotification", b =>
                {
                    b.HasBaseType("backend.Models.Notification");

                    b.Property<int>("ProjectID")
                        .HasColumnType("int");

                    b.HasDiscriminator().HasValue("ProjectNotification");
                });

            modelBuilder.Entity("backend.Models.CalendarEvent", b =>
                {
                    b.HasOne("backend.Models.CalendarEventNotification", "Notification")
                        .WithOne("CalendarEvent")
                        .HasForeignKey("backend.Models.CalendarEvent", "NotificationID")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("backend.Models.User", "User")
                        .WithMany("CalendarEvents")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Notification");

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.GroupProject", b =>
                {
                    b.HasOne("backend.Models.Group", "Group")
                        .WithMany("GroupProjects")
                        .HasForeignKey("GroupID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.GroupProjectNotification", "Notification")
                        .WithOne("GroupProject")
                        .HasForeignKey("backend.Models.GroupProject", "NotificationID")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Group");

                    b.Navigation("Notification");
                });

            modelBuilder.Entity("backend.Models.GroupProjectTask", b =>
                {
                    b.HasOne("backend.Models.GroupProject", "GroupProject")
                        .WithMany("GroupProjectTasks")
                        .HasForeignKey("GroupProjectID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GroupProject");

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.GroupRole", b =>
                {
                    b.HasOne("backend.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.KanbanTask", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithMany("KanbanTasks")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Note", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithMany("Notes")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Notification", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Project", b =>
                {
                    b.HasOne("backend.Models.ProjectNotification", "Notification")
                        .WithOne("Project")
                        .HasForeignKey("backend.Models.Project", "NotificationID")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("backend.Models.User", "User")
                        .WithMany("Projects")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Notification");

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.ProjectTask", b =>
                {
                    b.HasOne("backend.Models.Project", "Project")
                        .WithMany("ProjectTasks")
                        .HasForeignKey("ProjectID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("backend.Models.ProjectTodo", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithMany("ProjectTodos")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Todo", b =>
                {
                    b.HasOne("backend.Models.ProjectTodo", "ProjectTodo")
                        .WithMany("Todos")
                        .HasForeignKey("ProjectTodoID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ProjectTodo");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.HasOne("backend.Models.Group", "Group")
                        .WithMany("Users")
                        .HasForeignKey("GroupID")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("backend.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("backend.Models.UserPreferences", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithOne("Preferences")
                        .HasForeignKey("backend.Models.UserPreferences", "UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Group", b =>
                {
                    b.Navigation("GroupProjects");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("backend.Models.GroupProject", b =>
                {
                    b.Navigation("GroupProjectTasks");
                });

            modelBuilder.Entity("backend.Models.Project", b =>
                {
                    b.Navigation("ProjectTasks");
                });

            modelBuilder.Entity("backend.Models.ProjectTodo", b =>
                {
                    b.Navigation("Todos");
                });

            modelBuilder.Entity("backend.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Navigation("CalendarEvents");

                    b.Navigation("KanbanTasks");

                    b.Navigation("Notes");

                    b.Navigation("Notifications");

                    b.Navigation("Preferences")
                        .IsRequired();

                    b.Navigation("ProjectTodos");

                    b.Navigation("Projects");
                });

            modelBuilder.Entity("backend.Models.CalendarEventNotification", b =>
                {
                    b.Navigation("CalendarEvent")
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.GroupProjectNotification", b =>
                {
                    b.Navigation("GroupProject")
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.ProjectNotification", b =>
                {
                    b.Navigation("Project")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}

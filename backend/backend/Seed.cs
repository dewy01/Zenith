using backend.Data;
using backend.Models;
using System;
using System.Linq;

namespace backend
{
    public class Seed
    {
        private readonly DataContext dataContext;

        public Seed(DataContext context)
        {
            this.dataContext = context;
        }

        public void SeedData()
        {
            dataContext.Database.EnsureCreated();

            if (!dataContext.Users.Any())
            {
                var user1 = new User { Username = "user1", Password = "password1", Email = "user1@example.com" };
                var user2 = new User { Username = "user2", Password = "password2", Email = "user2@example.com" };
                dataContext.Users.AddRange(user1, user2);

                var group1 = new Group { GroupName = "Group1" };
                var group2 = new Group { GroupName = "Group2" };
                dataContext.Groups.AddRange(group1, group2);

                var groupMember1 = new GroupMember { User = user1, Group = group1 };
                var groupMember2 = new GroupMember { User = user2, Group = group2 };
                dataContext.GroupMembers.AddRange(groupMember1, groupMember2);

                var project1 = new Project { Title = "Project1", Description = "Description1", Deadline = DateTime.Now.AddDays(30), Status = "Active", User = user1 };
                var project2 = new Project { Title = "Project2", Description = "Description2", Deadline = DateTime.Now.AddDays(45), Status = "Active", User = user2 };
                dataContext.Projects.AddRange(project1, project2);

                var groupProject1 = new GroupProject { Group = group1};
                var groupProject2 = new GroupProject { Group = group2};
                dataContext.GroupProjects.AddRange(groupProject1, groupProject2);

                var groupProjectTask1 = new GroupProjectTask
                {
                    Title = "GroupTask1",
                    Description = "Group task description 1",
                    Priority = 1,
                    Deadline = DateTime.Now.AddDays(20),
                    Category = "Category1",
                    Status = "In Progress",
                    GroupProject = groupProject1
                };

                var groupProjectTask2 = new GroupProjectTask
                {
                    Title = "GroupTask2",
                    Description = "Group task description 2",
                    Priority = 2,
                    Deadline = DateTime.Now.AddDays(25),
                    Category = "Category2",
                    Status = "To Do",
                    GroupProject = groupProject2
                };

                dataContext.GroupProjectTasks.AddRange(groupProjectTask1, groupProjectTask2);

                var userPreferences1 = new UserPreferences { Theme = "Dark", User = user1 };
                var userPreferences2 = new UserPreferences { Theme = "Light", User = user2 };
                dataContext.UserPreferences.AddRange(userPreferences1, userPreferences2);

                dataContext.SaveChanges();
            }
        }
    }
}

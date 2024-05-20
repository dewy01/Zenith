using backend.Data;
using backend.Dto;
using backend.Exceptions;
using backend.Interface;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;
using AutoMapper;
using Microsoft.Extensions.Hosting;
using System.Security.Cryptography;

namespace backend.Repository
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

        public NotificationRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task MarkAsRead(int id)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var notification = await _context.Notifications.SingleOrDefaultAsync(x=>x.NotificationID == id);
            if (notification == null)
            {
                throw new Exception("Notification not found");
            }
            
            notification.isRead = true;
            _context.Notifications.Update(notification);

            await _context.SaveChangesAsync();
        }


        public async Task<NotificationDto> GetNotifications()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            
            var userRole = await _context.GroupRoles.SingleOrDefaultAsync(x=>x.UserId == userId);

            var notifications = await _context.Notifications.Where(x => x.UserID == userId && x.isActive == true && x.isRead==false).ToListAsync();

            var notificationList = new NotificationDto() {
                GroupProjectNotifications = new List<GroupProjectNotificationDto>(),
                ProjectNotifications = new List<ProjectNotificationDto>(),
                CalendarEventNotifications = new List<CalendarEventNotificationDto>(),
            };

            foreach (var notification in notifications)
            {
                switch (notification)
                {
                    case GroupProjectNotification groupProjectNotification:
                        if(userRole.Role == Enums.GroupRole.Admin)
                        {
                            var groupProjectDto = new GroupProjectNotificationDto
                            {
                                NotificationID = groupProjectNotification.NotificationID,
                                Message = groupProjectNotification.Message,
                                DateTime = groupProjectNotification.DateTime,
                                isActive = groupProjectNotification.isActive,
                                isRead = groupProjectNotification.isRead,
                                GroupProjectID = groupProjectNotification.GroupProjectID
                            };
                            notificationList.GroupProjectNotifications.Add(groupProjectDto);
                        }
                        break;
                    case ProjectNotification projectNotification:
                        var projectDto = new ProjectNotificationDto
                        {
                            NotificationID = projectNotification.NotificationID,
                            Message = projectNotification.Message,
                            DateTime = projectNotification.DateTime,
                            isActive = projectNotification.isActive,
                            isRead = projectNotification.isRead,
                            ProjectID = projectNotification.ProjectID
                        };
                        notificationList.ProjectNotifications.Add(projectDto);
                        break;
                    case CalendarEventNotification calendarEventNotification:
                        var calendarEventDto = new CalendarEventNotificationDto
                        {
                            NotificationID = calendarEventNotification.NotificationID,
                            Message = calendarEventNotification.Message,
                            DateTime = calendarEventNotification.DateTime,
                            isActive = calendarEventNotification.isActive,
                            isRead = calendarEventNotification.isRead,
                            CalendarEventID = calendarEventNotification.CalendarEventID
                        };
                        notificationList.CalendarEventNotifications.Add(calendarEventDto);
                        break;
                    default:
                        break;
                }
            }


            return notificationList;
        }

        public async Task UpdateNotifications()
        {
            var currentDate = DateTime.Now;

            var users = await _context.Users.Include(u => u.Preferences).ToListAsync();

            foreach (var user in users)
            {
                var preferences = user.Preferences;
                if (preferences != null && preferences.Reminder != 0)
                {
                    var notifications = await _context.Notifications
                                                      .Where(x => x.UserID == user.UserID && !x.isActive)
                                                      .ToListAsync();
                    foreach (var notification in notifications)
                    {
                        if (notification.DateTime <= currentDate.AddDays(preferences.Reminder))
                        {
                            notification.isActive = true;
                            _context.Notifications.Update(notification);
                        }
                    }
                }
                if(preferences != null && preferences.Reminder == 0)
                {
                    var notifications = await _context.Notifications
                                                     .Where(x => x.UserID == user.UserID)
                                                     .ToListAsync();
                    foreach (var notification in notifications)
                    {
                        notification.isActive = false;
                        _context.Notifications.Update(notification);
                    }
                }
            }

            await _context.SaveChangesAsync();
        }


    }
}

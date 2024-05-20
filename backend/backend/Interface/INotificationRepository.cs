using backend.Dto.Notifications;
using backend.Models;

namespace backend.Interface
{
    public interface INotificationRepository
    {
        Task<NotificationDto> GetNotifications();
        Task UpdateNotifications();
        Task MarkAsRead(int id);
    }
}

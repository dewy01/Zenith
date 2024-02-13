using backend.Models;

namespace backend.Interface
{
    public interface INotificationRepository
    {
        Notification GetNotificationById(int notificationId);
        List<Notification> GetAllNotifications();
        void AddNotification(Notification notification);
        void UpdateNotification(Notification notification);
        void DeleteNotification(int notificationId);
    }
}

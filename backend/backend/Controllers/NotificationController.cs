using backend.Dto;
using backend.Interface;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/notifications")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationRepository _notificationService;
        public NotificationController(INotificationRepository notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("get")]
        [Authorize]
        public async Task<ActionResult<NotificationDto>> GetAllNotes()
        {
            var notifications = await _notificationService.GetNotifications();
            return Ok(notifications);
        }

        [HttpPatch("markAsRead/{notificationId}")]
        [Authorize]
        public async Task<ActionResult<NotificationDto>> MarkAsRead([FromRoute] int notificationId)
        {
            await _notificationService.MarkAsRead(notificationId);
            return Ok();
        }

    }
}

using System.Security.Claims;

namespace backend.Interface
{
    public interface IUserContextRepository
    {
        int? GetUserId { get; }
        ClaimsPrincipal User { get; }
    }
}

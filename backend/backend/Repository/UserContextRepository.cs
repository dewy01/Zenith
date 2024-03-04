using backend.Interface;
using System.Security.Claims;

namespace backend.Repository
{

    public class UserContextRepository : IUserContextRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserContextRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public ClaimsPrincipal User =>
            _httpContextAccessor.HttpContext?.User;
        public int? GetUserId =>
            User is null ? null : (int?)int.Parse(User.FindFirst(x => x.Type == ClaimTypes.NameIdentifier).Value);

        }
    
}

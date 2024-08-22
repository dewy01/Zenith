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
            _httpContextAccessor.HttpContext?.User ?? new ClaimsPrincipal();
        public int? GetUserId
        {
            get
            {
                var user = User;
                var claim = user.FindFirst(x => x.Type == ClaimTypes.NameIdentifier);
                if (claim == null || !int.TryParse(claim.Value, out int userId))
                {
                    return null;
                }
                return userId;
            }
        }
    }

}

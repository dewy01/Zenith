using backend.Data;
using backend.Dto.Token;
using backend.Models;
using backend.Store;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace backend.Repository
{
    public interface ITokenRepository
    {
        Task<AccessTokenDto> GenerateJwt(User user);
        Task<AccessTokenDto> Refresh(AccessTokenDto model);
        JwtSecurityToken CreateJwt(User user);
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
        string CreateRefreshToken();
    }
    public class TokenRepository : ITokenRepository
    {
        private readonly AuthSettings _authSettings;
        private readonly DataContext _context;

        public TokenRepository(AuthSettings authSettings, DataContext context)
        {
            _authSettings = authSettings;
            _context = context;
        }

        public async Task<AccessTokenDto> GenerateJwt(User user)
        {
            var claims = new List<Claim>()
        {
                new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
                new Claim(ClaimTypes.Name, $"{user.Email}"),
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.JwtKey ?? StringGenerator.RandomString(10)));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(_authSettings.JwtExpireMinutes);

            var token = new JwtSecurityToken(_authSettings.JwtIssuer,
                _authSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: cred);

            var refreshToken = CreateRefreshToken();

            user.RefreshToken = HashToken(refreshToken);
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            var tokenHandler = new JwtSecurityTokenHandler();

            return new AccessTokenDto()
            {
                AccessToken = tokenHandler.WriteToken(token),
                RefreshToken = refreshToken,
            };
        }

        public async Task<AccessTokenDto> Refresh(AccessTokenDto model)
        {
            var principal = GetPrincipalFromExpiredToken(model.AccessToken);

            if (principal?.Identity?.Name is null)
            {
                throw new Exception("Unauthorized");
            }

            var claimId = principal.FindFirst(ClaimTypes.NameIdentifier);
            if (claimId == null)
            {
                throw new Exception("Unauthorized");
            }

            var userId = int.Parse(claimId.Value);
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserID == userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var hashedRefreshToken = HashToken(model.RefreshToken);

            if (user.RefreshToken != hashedRefreshToken || user.RefreshTokenExpiry < DateTime.UtcNow)
            {
                throw new Exception("Invalid refresh token");
            }

            var token = CreateJwt(user);

            var newRefreshToken = CreateRefreshToken();

            user.RefreshToken = HashToken(newRefreshToken);
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            var tokenHandler = new JwtSecurityTokenHandler();

            return new AccessTokenDto()
            {
                AccessToken = tokenHandler.WriteToken(token),
                RefreshToken = newRefreshToken,
            };
        }

        public JwtSecurityToken CreateJwt(User user)
        {
            var authClaims = new List<Claim>
        {
                new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
                new Claim(ClaimTypes.Name, $"{user.Email}"),
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.JwtKey ?? StringGenerator.RandomString(10)));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(_authSettings.JwtExpireMinutes);

            return new JwtSecurityToken(
                _authSettings.JwtIssuer,
                _authSettings.JwtIssuer,
                authClaims,
                expires: expires,
                signingCredentials: cred
            );
        }

        public ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            var validation = new TokenValidationParameters
            {
                ValidIssuer = _authSettings.JwtIssuer,
                ValidAudience = _authSettings.JwtIssuer,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.JwtKey ?? "FALLBACK")),
                ValidateLifetime = false
            };

            return new JwtSecurityTokenHandler().ValidateToken(token, validation, out _);
        }

        public string CreateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var generator = RandomNumberGenerator.Create();
            generator.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private string HashToken(string token)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(token));
            return Convert.ToBase64String(hashedBytes);
        }
    }
}

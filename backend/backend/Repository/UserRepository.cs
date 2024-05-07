using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using System.Collections.Generic;
using System.Linq;
using Task = System.Threading.Tasks.Task;
using Microsoft.Extensions.Hosting;
using backend.Dto;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Migrations;

namespace backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthSettings _authSettings;
        private readonly IEmailRepository _emailSettings;
        private readonly IUserContextRepository _userContextRepository;

        public UserRepository(DataContext context, IPasswordHasher<User> passwordHasher, AuthSettings authSettings, IEmailRepository emailSettings, IUserContextRepository userContextRepository)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _authSettings = authSettings;
            _emailSettings = emailSettings;
            _userContextRepository = userContextRepository;
        }

        public async Task<UserDto> GetUserById()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var user = await _context.Users.SingleOrDefaultAsync(user => user.UserID == userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            var group = await _context.Groups
            .Where(g => g.Users.Any(u => u.UserID == userId))
            .SingleOrDefaultAsync();

            if (group == null)
            {
                return new UserDto()
                {
                    Username = user.Username,
                    Email = user.Email,
                    GroupName = null,
                };
            }

            var userDto = new UserDto()
            {
                Username = user.Username,
                Email = user.Email,
                GroupName = group.GroupName,
            };

            return userDto;
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public async Task AddUser(RegisterUserDto dto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(user => user.Email == dto.Email || user.Username == dto.Username);

            if (user != null) 
            {
                throw new Exception("This user already exists");
            }

            var newUser = new User()
            {
                Email = dto.Email,
                Username = dto.Username,
                RoleId = 1,
                VerificationToken = CreateRandomToken()
            };
            var hashedPassword = _passwordHasher.HashPassword(newUser, dto.Password);
            newUser.Password = hashedPassword;


            await _context.Users.AddAsync(newUser);
            await _emailSettings.SendEmailAsync(dto.Email, "Email Confirmation - " + $"{newUser.Username}", "https://localhost:7086/api/account/verifyemail/" + $"{newUser.VerificationToken}");
            await _context.SaveChangesAsync();

            var preferences = new UserPreferences
            {
                UserID = newUser.UserID,
                Theme = "dark",
                Color = "blue",
                Language = "en",
                Reminder = 3,
                Routes = "{\"Notes\":true,\"Calendar\":true,\"Todo\":true,\"Projects\":true,\"Group Projects\":true}"
            };

            await _context.UserPreferences.AddAsync(preferences);
            await _context.SaveChangesAsync();


        }

        public void UpdateUser(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public async Task DeleteUser()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var user = await _context.Users.SingleOrDefaultAsync(user => user.UserID == userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(8));
        }

        public async Task<string> GenerateJwt(LoginUserDto dto)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.Email == dto.Email && x.Role.RoleName != "Unverified");
            if (user is null)
            {
                throw new Exception("This email is not verified");
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, dto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new Exception("Invalid credentials");
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
                new Claim(ClaimTypes.Name, $"{user.Email}"),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authSettings.JwtExpireDays);

            var token = new JwtSecurityToken(_authSettings.JwtIssuer,
                _authSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            return await Task.FromResult(tokenHandler.WriteToken(token));
        }

        public async Task<bool> VerifyEmail(string token)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => token == x.VerificationToken && x.Role.RoleName == "Unverified");
            if (user is null)
            {
                throw new Exception("User not found");
            }
            Role role = await _context.Roles.SingleOrDefaultAsync(x => x.RoleName == "User");
            user.RoleId = role.RoleID;
            _context.Update(user);
            await _context.SaveChangesAsync();
            return await Task.FromResult(true);
        }
        public async Task ForgotPassword(ForgotPasswordDto dto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email.ToLower() == dto.Email.ToLower() && x.PasswordResetTime == null || DateTime.Now > x.PasswordResetTime);
            if (user is null)
            {
                throw new Exception("User not found");
            }
            var token = CreateRandomToken();
            user.PasswordResetTime = DateTime.Now.AddHours(1);
            user.PasswordResetToken = token;
            _context.Update(user);
            await _emailSettings.SendEmailAsync(user.Email, "Password reset Token", token);
            await _context.SaveChangesAsync();
        }

        public async Task ResetPassword(ResetPasswordDto dto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.PasswordResetToken == dto.ResetToken && DateTime.Now < x.PasswordResetTime );
            if (user is null)
            {
                throw new Exception("User not found");
            }
            var newPassword = _passwordHasher.HashPassword(user, dto.Password);
            user.Password = newPassword;
            user.PasswordResetToken = null;
            user.PasswordResetTime = null;
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}

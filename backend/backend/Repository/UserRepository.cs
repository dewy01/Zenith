using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using Task = System.Threading.Tasks.Task;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Dto.Users;
using backend.Dto.Token;

namespace backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthSettings _authSettings;
        private readonly IEmailRepository _emailSettings;
        private readonly IUserContextRepository _userContextRepository;
        private readonly ITokenRepository _tokenRepository;

        public UserRepository(DataContext context, IPasswordHasher<User> passwordHasher, AuthSettings authSettings, IEmailRepository emailSettings, IUserContextRepository userContextRepository, ITokenRepository tokenRepository)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _authSettings = authSettings;
            _emailSettings = emailSettings;
            _userContextRepository = userContextRepository;
            _tokenRepository = tokenRepository;
        }

        public async Task<UserDto> GetUserById()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var user = await _context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(user => user.UserID == userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            var group = await _context.Groups
                .AsNoTracking()
                .Where(g => g.Users.Any(u => u.UserID == userId))
                .SingleOrDefaultAsync();

            if (group == null)
            {
                return new UserDto()
                {
                    Username = user.Username,
                    Email = user.Email,
                };
            }

            var userDto = new UserDto()
            {
                Username = user.Username,
                Email = user.Email,
                GroupName = group.GroupName,
                Image = user.Image,
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
                Role = Enums.Roles.Unverified,
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

        public async Task UpdateUser(UpdateUserDto userDto)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var user = await _context.Users
                .SingleOrDefaultAsync(user => user.UserID == userId);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            if (!string.IsNullOrEmpty(userDto.Password) && !string.IsNullOrEmpty(userDto.OldPassword))
            {
                var result = _passwordHasher.VerifyHashedPassword(user, user.Password, userDto.OldPassword);
                if (result == PasswordVerificationResult.Failed)
                {
                    throw new Exception("Passwords don't match");
                }
                var hashedPassword = _passwordHasher.HashPassword(user, userDto.Password);
                user.Password = hashedPassword;
            }
            if (!string.IsNullOrEmpty(userDto.Username) && userDto.Username != user.Username)
            {
                user.Username = userDto.Username;
            }
            if (!string.IsNullOrEmpty(userDto.Email) && userDto.Email != user.Email)
            {
                user.Email = userDto.Email;
                user.Role = Enums.Roles.Unverified;
                user.VerificationToken = CreateRandomToken();
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                await _emailSettings.SendEmailAsync(user.Email, "Email Confirmation - " + $"{user.Username}", "https://localhost:7086/api/account/verifyemail/" + $"{user.VerificationToken}");
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUser()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var user = await _context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(user => user.UserID == userId);

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

        public async Task<AccessTokenDto> LoginUser(LoginUserDto dto)
        {
            var user = await _context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Email == dto.Email && x.Role != Enums.Roles.Unverified);
            if (user is null)
            {
                throw new Exception("This email is not verified");
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, dto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new Exception("Invalid credentials");
            }

            return await _tokenRepository.GenerateJwt(user);
        }

        public async Task<AccessTokenDto> Refresh(AccessTokenDto model)
        {
            return await _tokenRepository.Refresh(model);
        }

        public async Task<bool> VerifyEmail(string token)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => token == x.VerificationToken && x.Role == Enums.Roles.Unverified);
            if (user is null)
            {
                throw new Exception("User not found");
            }
            user.Role = Enums.Roles.User;
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
            var user = await _context.Users.SingleOrDefaultAsync(x => x.PasswordResetToken == dto.ResetToken && DateTime.Now < x.PasswordResetTime);
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

        public async Task LogoutUser()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var user = await _context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(user => user.UserID == userId);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            user.RefreshToken = null;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}

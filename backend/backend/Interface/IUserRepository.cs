using backend.Dto.Token;
using backend.Dto.Users;
using backend.Models;
using Task = System.Threading.Tasks.Task;

namespace backend.Interface
{
    public interface IUserRepository
    {
        Task<UserDto> GetUserById();
        List<User> GetAllUsers();
        Task AddUser(RegisterUserDto user);
        Task UpdateUser(UpdateUserDto user);
        Task DeleteUser();
        Task<AccessTokenDto> LoginUser(LoginUserDto dto);
        Task<bool> VerifyEmail(string token);
        Task ForgotPassword(ForgotPasswordDto email);
        Task ResetPassword(ResetPasswordDto dto);
        Task LogoutUser();

    }
}

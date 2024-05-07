using backend.Dto;
using backend.Models;
using Task = System.Threading.Tasks.Task;

namespace backend.Interface
{
    public interface IUserRepository
    {
        Task<UserDto> GetUserById();
        List<User> GetAllUsers();
        Task AddUser(RegisterUserDto user);
        void UpdateUser(User user);
        Task DeleteUser();
        Task<string> GenerateJwt(LoginUserDto dto);
        Task<bool> VerifyEmail(string token);
        Task ForgotPassword(ForgotPasswordDto email);
        Task ResetPassword(ResetPasswordDto dto);
    }
}

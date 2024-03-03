using backend.Dto;
using backend.Models;
using Task = System.Threading.Tasks.Task;

namespace backend.Interface
{
    public interface IUserRepository
    {
        User GetUserById(int userId);
        List<User> GetAllUsers();
        Task AddUser(RegisterUserDto user);
        void UpdateUser(User user);
        void DeleteUser(int userId);
        Task<string> GenerateJwt(LoginUserDto dto);
        Task<bool> VerifyEmail(string token);
    }
}

using backend.Models;

namespace backend.Interface
{
    public interface IUserRepository
    {
        User GetUserById(int userId);
        List<User> GetAllUsers();
        void AddUser(User user);
        void UpdateUser(User user);
        void DeleteUser(int userId);
    }
}

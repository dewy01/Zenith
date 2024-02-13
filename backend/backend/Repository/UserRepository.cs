using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using System.Collections.Generic;
using System.Linq;

namespace backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public User GetUserById(int userId)
        {
            var result = _context.Users.FirstOrDefault(u => u.UserID == userId);

            if (result == null)
            {
                throw new NotFoundException("User not found");
            }

            return result;
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void UpdateUser(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void DeleteUser(int userId)
        {
            var user = _context.Users.Find(userId);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }
    }
}

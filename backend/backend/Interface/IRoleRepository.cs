using backend.Models;

namespace backend.Interface
{
    public interface IRoleRepository
    {
        Role GetRoleById(int roleId);
        List<Role> GetAllRoles();
        void AddRole(Role role);
        void UpdateRole(Role role);
        void DeleteRole(int roleId);
    }
}

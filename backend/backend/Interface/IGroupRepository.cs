using backend.Models;

namespace backend.Interface
{
    public interface IGroupRepository
    {
        Group GetGroupById(int groupId);
        List<Group> GetAllGroups();
        void AddGroup(Group group);
        void UpdateGroup(Group group);
        void DeleteGroup(int groupId);
    }
}

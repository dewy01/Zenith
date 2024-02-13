using backend.Models;

namespace backend.Interface
{
    public interface IGroupMemberRepository
    {
        GroupMember GetGroupMemberById(int groupMemberId);
        List<GroupMember> GetAllGroupMembers();
        void AddGroupMember(GroupMember groupMember);
        void UpdateGroupMember(GroupMember groupMember);
        void DeleteGroupMember(int groupMemberId);
    }
}

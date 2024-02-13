using backend.Models;

namespace backend.Interface
{
    public interface IGroupProjectTaskAsigneeRepository
    {
        GroupProjectTaskAsignee GetGroupProjectTaskAssigneeById(int assignmentId);
        List<GroupProjectTaskAsignee> GetAllGroupProjectTaskAssignees();
        void AddGroupProjectTaskAssignee(GroupProjectTaskAsignee groupProjectTaskAssignee);
        void UpdateGroupProjectTaskAssignee(GroupProjectTaskAsignee groupProjectTaskAssignee);
        void DeleteGroupProjectTaskAssignee(int assignmentId);
    }
}

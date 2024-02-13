using backend.Models;

namespace backend.Interface
{
    public interface IGroupProjectTaskRepository
    {
        GroupProjectTask GetGroupProjectTaskById(int groupProjectTaskId);
        List<GroupProjectTask> GetAllGroupProjectTasks();
        void AddGroupProjectTask(GroupProjectTask groupProjectTask);
        void UpdateGroupProjectTask(GroupProjectTask groupProjectTask);
        void DeleteGroupProjectTask(int groupProjectTaskId);
    }
}

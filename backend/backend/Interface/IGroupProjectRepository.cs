using backend.Models;

namespace backend.Interface
{
    public interface IGroupProjectRepository
    {
        GroupProject GetGroupProjectById(int groupProjectId);
        List<GroupProject> GetAllGroupProjects();
        void AddGroupProject(GroupProject groupProject);
        void UpdateGroupProject(GroupProject groupProject);
        void DeleteGroupProject(int groupProjectId);
    }
}

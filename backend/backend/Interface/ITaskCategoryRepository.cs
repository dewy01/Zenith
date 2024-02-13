using backend.Models;

namespace backend.Interface
{
    public interface ITaskCategoryRepository
    {
        TaskCategory GetTaskCategoryById(int taskCategoryId);
        List<TaskCategory> GetAllTaskCategories();
        void AddTaskCategory(TaskCategory taskCategory);
        void UpdateTaskCategory(TaskCategory taskCategory);
        void DeleteTaskCategory(int taskCategoryId);
    }
}

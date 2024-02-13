namespace backend.Interface
{
    public interface ITaskRepository
    {
        Models.Task GetTaskById(int taskId);
        List<Models.Task> GetAllTasks();
        void AddTask(Models.Task task);
        void UpdateTask(Models.Task task);
        void DeleteTask(int taskId);
    }
}

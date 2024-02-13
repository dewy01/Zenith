using backend.Models;

namespace backend.Interface
{
    public interface IKanbanTaskRepository
    {
        KanbanTask GetKanbanTaskById(int kanbanTaskId);
        List<KanbanTask> GetAllKanbanTasks();
        void AddKanbanTask(KanbanTask kanbanTask);
        void UpdateKanbanTask(KanbanTask kanbanTask);
        void DeleteKanbanTask(int kanbanTaskId);
    }
}

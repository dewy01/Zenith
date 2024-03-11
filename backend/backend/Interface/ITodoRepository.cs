using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interface
{
    public interface ITodoRepository
    {
        Task<IEnumerable<TodoDto>> GetAllTodos(int projectId);
        Task AddTodo(AddTodoDto todo);
        Task UpdateTodo(AddTodoDto todo, int todoId);
        Task DeleteTodo(int todoId);
    }
}

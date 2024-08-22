using backend.Dto.Todos;

namespace backend.Dto.ProjectTodo
{
    public class ProjectTodoDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Color { get; set; }
        public ICollection<TodoDto>? Todos { get; set; }
    }
}

namespace backend.Dto.ProjectTodo
{
    public class AddProjectTodoDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Color { get; set; }
    }
}

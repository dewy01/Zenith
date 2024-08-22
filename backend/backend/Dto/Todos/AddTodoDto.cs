namespace backend.Dto.Todos
{
    public class AddTodoDto
    {
        public int ProjectTodoID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}

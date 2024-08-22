namespace backend.Models
{
    public class ProjectTodo
    {
        public int ProjectTodoID { get; set; }
        public int UserID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Color { get; set; }
        public bool IsDone { get; set; } = false;

        public virtual User? User { get; set; }
        public virtual ICollection<Todo>? Todos { get; set; }
    }
}

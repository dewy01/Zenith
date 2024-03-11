namespace backend.Models
{
    public class ProjectTodo
    {
        public int ProjectTodoID { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Todo> Todos { get; set; }
    }
}

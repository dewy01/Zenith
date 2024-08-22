namespace backend.Models
{
    public class Todo
    {
        public int TodoID { get; set; }
        public int ProjectTodoID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }

        public bool IsDone { get; set; }


        public virtual ProjectTodo? ProjectTodo { get; set; }
    }
}

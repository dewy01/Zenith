namespace backend.Models
{
    public class Todo
    {
        public int TodoID { get; set; }
        public int ProjectTodoID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public bool IsDone { get; set; }


        public virtual ProjectTodo ProjectTodo { get; set; }
    }
}

namespace backend.Dto.Todos
{
    public class TodoDto
    {
        public int TodoID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public bool IsDone { get; set; }

    }
}

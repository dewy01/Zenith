namespace backend.Dto.ProjectTodo
{
    public class ProjectsTodoDto
    {
        public List<AllProjectsTodoDto> Projects { get; set; } = new List<AllProjectsTodoDto>();
    }
    public class AllProjectsTodoDto
    {
        public int ProjectTodoID { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Color { get; set; }
        public bool IsDone { get; set; }

    }
}

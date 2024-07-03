﻿namespace backend.Dto.ProjectTodo
{
    public class ProjectsTodoDto
    {
        public List<AllProjectsTodoDto> Projects { get; set; } = new List<AllProjectsTodoDto>();
    }
    public class AllProjectsTodoDto
    {
        public int ProjectTodoID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public bool IsDone { get; set; }

    }
}

﻿namespace backend.Dto
{
    public class ProjectTodoDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public ICollection<TodoDto> Todos { get; set; }
    }
}

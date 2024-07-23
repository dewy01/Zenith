﻿using backend.Enums;

namespace backend.Dto.GroupProjectTasks
{
    public class GroupProjectTaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public string User { get; set; }
        public string? UserImage { get; set; }
    }
}

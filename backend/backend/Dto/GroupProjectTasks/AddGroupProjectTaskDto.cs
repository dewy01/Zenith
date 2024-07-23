﻿using backend.Enums;

namespace backend.Dto.GroupProjectTasks
{
    public class AddGroupProjectTaskDto
    {
        public int ProjectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public int UserId { get; set; }
    }
}

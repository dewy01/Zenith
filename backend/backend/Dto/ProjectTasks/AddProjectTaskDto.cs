using backend.Enums;

namespace backend.Dto.ProjectTasks
{
    public class AddProjectTaskDto
    {
        public int ProjectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public ProjectTaskStatus Status { get; set; }
    }
}

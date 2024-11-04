using backend.Enums;

namespace backend.Dto.Dashboard
{
    public class DashboardGroupProjectDto
    {
        public int GroupProjectID { get; set; }
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
        public string Description { get; set; }
        public ProjectStatus Status { get; set; }
        public float CompletionPercentage { get; set; }
    }

    public class DashboardGroupProjectSummaryDto
    {
        public List<DashboardGroupProjectDto> Projects { get; set; }
        public Dictionary<ProjectStatus, int> ProjectsCountByStatus { get; set; }
    }
}

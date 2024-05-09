namespace backend.Dto
{
    public class GroupProjectByStatusDto
    {
        public int ProjectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public string Status { get; set; }
        public string User {  get; set; }
        public ICollection<GroupProjectTaskShortDto> Backlog { get; set; }
        public ICollection<GroupProjectTaskShortDto> inProgress { get; set; }
        public ICollection<GroupProjectTaskShortDto> Review { get; set; }
        public ICollection<GroupProjectTaskShortDto> Closed { get; set; }
    }
}

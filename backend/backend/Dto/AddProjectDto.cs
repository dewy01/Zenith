namespace backend.Dto
{
    public class AddProjectDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public string Status { get; set; }
    }
}

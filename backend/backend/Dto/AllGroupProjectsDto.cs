namespace backend.Dto
{
    public class AllGroupProjectsDto
    {
        public int GroupProjectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public string Status { get; set; }
        public float Completion { get; set; }
    }
}

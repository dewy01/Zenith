namespace backend.Dto
{
    public class AllProjectsDto
    {
        public int ProjectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public string Status { get; set; }
        public float Completion {  get; set; }
        public bool isOutdated { get; set; }

    }
}

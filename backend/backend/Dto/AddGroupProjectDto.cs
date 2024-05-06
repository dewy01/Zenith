namespace backend.Dto
{
    public class AddGroupProjectDto
    {
        public string Title { get; set; }
        public int GroupID { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public string Status { get; set; }
    }
}

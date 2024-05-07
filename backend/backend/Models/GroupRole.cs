namespace backend.Models
{
    public class GroupRole
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        public Enums.GroupRole Role { get; set; }
    }
}

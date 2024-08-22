namespace backend.Models
{
    public class Group
    {
        public int GroupID { get; set; }
        public required string GroupName { get; set; }
        public string? InviteToken { get; set; }
        public DateTime? TokenResetTime { get; set; }

        public required virtual ICollection<User> Users { get; set; }
        public virtual ICollection<GroupProject>? GroupProjects { get; set; }
    }
}

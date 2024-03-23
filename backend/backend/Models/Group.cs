namespace backend.Models
{
    public class Group
    {
        public int GroupID { get; set; }
        public string GroupName { get; set; }
        public string? InviteToken { get; set; }
        public DateTime? TokenResetTime { get; set; }

        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<GroupProject> GroupProjects { get; set; }
    }
}

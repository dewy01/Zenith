namespace backend.Models
{
    public class Group
    {
        public int GroupID { get; set; }
        public string GroupName { get; set; }

        public virtual ICollection<GroupMember> GroupMembers { get; set; }
        public virtual ICollection<GroupProject> GroupProjects { get; set; }
    }
}

namespace backend.Models
{
    public class Group
    {
        public int GroupID { get; set; }
        public string GroupName { get; set; }


        public virtual List<GroupMember> GroupMembers { get; set; }
        public virtual List<GroupProject> GroupProjects { get; set; }
    }
}

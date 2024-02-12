namespace backend.Models
{
    public class GroupMember
    {
        public int GroupMemberID { get; set; }
        public int UserID { get; set; }
        public int GroupID { get; set; }

        public virtual User User { get; set; }
        public virtual Group Group { get; set; }

    }
}

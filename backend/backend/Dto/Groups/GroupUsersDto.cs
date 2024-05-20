namespace backend.Dto.Groups
{
    public class GroupUsersDto
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public Enums.GroupRole UserRole { get; set; }
        public bool IsMe { get; set; }
    }
}

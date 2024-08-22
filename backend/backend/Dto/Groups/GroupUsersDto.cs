namespace backend.Dto.Groups
{
    public class GroupUsersDto
    {
        public int UserID { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public Enums.GroupRole UserRole { get; set; }
        public bool IsMe { get; set; }
        public string? Image { get; set; }
    }
}

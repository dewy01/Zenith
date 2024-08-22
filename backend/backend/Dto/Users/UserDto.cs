namespace backend.Dto.Users
{
    public class UserDto
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public string? GroupName { get; set; }
        public string? Image { get; set; }
    }
}

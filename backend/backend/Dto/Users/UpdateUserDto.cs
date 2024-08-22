namespace backend.Dto.Users
{
    public class UpdateUserDto
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public string? OldPassword { get; set; }
        public string? Password { get; set; }
    }
}

namespace backend.Dto.Users
{
    public class UpdateUserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string? OldPassword { get; set; }
        public string? Password { get; set; }
    }
}

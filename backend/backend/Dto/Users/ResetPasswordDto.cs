namespace backend.Dto.Users
{
    public class ResetPasswordDto
    {
        public required string ResetToken { get; set; }
        public required string Password { get; set; }
        public required string PasswordConfirm { get; set; }
    }
}

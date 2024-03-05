namespace backend.Dto
{
    public class ResetPasswordDto
    {
        public string Email { get; set; }
        public string ResetToken { get; set; }
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
    }
}

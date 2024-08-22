namespace backend.Dto.Token
{
    public class AccessTokenDto
    {
        public required string AccessToken { get; set; }
        public required string RefreshToken { get; set; }
    }
}

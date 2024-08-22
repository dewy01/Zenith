namespace backend.Dto.UserPreferences
{
    public class UserPreferencesDto
    {
        public required string Theme { get; set; }
        public required string Color { get; set; }
        public required string Language { get; set; }
        public int Reminder { get; set; }
        public required Dictionary<string, bool> Routes { get; set; }
    }
}

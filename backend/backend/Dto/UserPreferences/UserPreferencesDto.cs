namespace backend.Dto.UserPreferences
{
    public class UserPreferencesDto
    {
        public string Theme { get; set; }
        public string Color { get; set; }
        public string Language { get; set; }
        public int Reminder { get; set; }
        public Dictionary<string, bool> Routes { get; set; }
    }
}

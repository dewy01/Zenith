namespace backend.Models
{
    public class UserPreferences
    {
        public int PreferencesID { get; set; }
        public int UserID { get; set; }
        public required string Theme { get; set; }
        public required string Color { get; set; }
        public required string Language { get; set; }
        public int Reminder { get; set; }
        public required string Routes { get; set; }


        public virtual User? User { get; set; }
    }
}

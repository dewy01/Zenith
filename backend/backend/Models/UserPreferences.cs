namespace backend.Models
{
    public class UserPreferences
    {
        public int PreferencesID { get; set; }
        public int UserID { get; set; }
        public string Theme { get; set; }
        public string Color { get; set; }


        public virtual User User { get; set; }
    }
}

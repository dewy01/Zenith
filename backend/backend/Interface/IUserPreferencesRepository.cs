using backend.Models;

namespace backend.Interface
{
    public interface IUserPreferencesRepository
    {
        UserPreferences GetUserPreferencesById(int preferencesId);
        List<UserPreferences> GetAllUserPreferences();
        void AddUserPreferences(UserPreferences userPreferences);
        void UpdateUserPreferences(UserPreferences userPreferences);
        void DeleteUserPreferences(int preferencesId);
    }
}

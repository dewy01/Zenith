using backend.Models;
using backend.Dto;

namespace backend.Interface
{
    public interface IUserPreferencesRepository
    {
        Task<UserPreferencesDto> GetSettings();
        Task UpdateUserPreferences(UserPreferencesDto userPreferences);
    }
}

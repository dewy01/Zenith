using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;
using System.Drawing;
using Newtonsoft.Json;
using backend.Dto.UserPreferences;

namespace backend.Repository
{
    public class UserPreferencesRepository : IUserPreferencesRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;

        public UserPreferencesRepository(DataContext context, IUserContextRepository userContextRepository)
        {
            _context = context;
            _userContextRepository = userContextRepository;
        }

        public async Task<UserPreferencesDto> GetSettings()
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var settings = await _context.UserPreferences
                .AsNoTracking()
                .SingleOrDefaultAsync(settings => settings.UserID == userId);

            if (settings == null)
            {
                throw new NotFoundException("User settings not found");
            }

            var routes = JsonConvert.DeserializeObject<Dictionary<string, bool>>(settings.Routes) ?? new Dictionary<string, bool>();
            var colors = JsonConvert.DeserializeObject<Dictionary<string, string>>(settings.Colors) ?? new Dictionary<string, string>();

            var dto = new UserPreferencesDto
            {
                Theme = settings.Theme,
                Color = settings.Color,
                Language = settings.Language,
                Reminder = settings.Reminder,
                Routes = routes,
                Colors = colors,
            };

            return dto;
        }


        public async Task UpdateUserPreferences(UserPreferencesDto dto)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var settings = await _context.UserPreferences
                .SingleOrDefaultAsync(settings => settings.UserID == userId);
            if (settings == null)
            {
                throw new NotFoundException("User settings not found");
            }

            settings.Theme = dto.Theme;
            settings.Color = dto.Color;
            settings.Language = dto.Language;
            settings.Reminder = dto.Reminder;
            string routesJson = JsonConvert.SerializeObject(dto.Routes);
            settings.Routes = routesJson;
            string colorsJson = JsonConvert.SerializeObject(dto.Colors);
            settings.Colors = colorsJson;

            _context.UserPreferences.Update(settings);
            await _context.SaveChangesAsync();
        }


    }
}

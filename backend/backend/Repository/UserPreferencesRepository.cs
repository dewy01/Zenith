using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using AutoMapper;
using backend.Dto;
using Microsoft.EntityFrameworkCore;
using backend.Migrations;
using System.Collections.ObjectModel;
using System.Drawing;

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
            var settings = await _context.UserPreferences.SingleOrDefaultAsync(settings => settings.UserID == userId);

            var dto = new UserPreferencesDto
            {
                Theme = settings.Theme,
                Color = settings.Color,
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
            var settings = await _context.UserPreferences.SingleOrDefaultAsync(settings => settings.UserID == userId);

            settings.Theme = dto.Theme;
            settings.Color = dto.Color;

            _context.UserPreferences.Update(settings);
            await _context.SaveChangesAsync();
        }


    }
}

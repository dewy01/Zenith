using backend.Dto.UserPreferences;
using backend.Interface;
using backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/settings")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly IUserPreferencesRepository _projectService;
        public SettingsController(IUserPreferencesRepository projectService)
        {
            _projectService = projectService;
        }


        [HttpGet("getSettings")]
        [Authorize]
        public async Task<ActionResult<UserPreferencesDto>> getSettings()
        {
            var project = await _projectService.GetSettings();
            return Ok(project);
        }

        [HttpPatch("updateSettings")]
        [Authorize]
        public async Task<ActionResult> updateSettings(UserPreferencesDto dto)
        {
            await _projectService.UpdateUserPreferences(dto);
            return Ok();
        }

    }
}

using backend.Dto;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/group-projects")]
    [ApiController]
    public class GroupProjectController : ControllerBase
    {
        private readonly IGroupProjectRepository _groupProjectService;

        public GroupProjectController(IGroupProjectRepository groupProjectService)
        {
            _groupProjectService = groupProjectService;
        }

        [HttpGet("getAllGroupProjects")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AllProjectsDto>>> GetAllGroupProjects()
        {
            var projects = await _groupProjectService.GetAllGroupProjects();
            return Ok(projects);
        }

        [HttpGet("getGroupProjectById/{projectId}")]
        [Authorize]
        public async Task<ActionResult<ProjectByStatusDto>> GetGroupProjectById(int projectId)
        {
            var project = await _groupProjectService.GetGroupProjectById(projectId);
            return Ok(project);
        }

        [HttpPost("addGroupProject")]
        [Authorize]
        public async Task<ActionResult> AddGroupProject(AddGroupProjectDto dto)
        {
            await _groupProjectService.AddGroupProject(dto);
            return Ok();
        }

        [HttpPatch("updateGroupProject/{projectId}")]
        [Authorize]
        public async Task<ActionResult> UpdateGroupProject(int projectId, EditProjectDto dto)
        {
            await _groupProjectService.UpdateGroupProject(dto, projectId);
            return Ok();
        }

        [HttpDelete("deleteGroupProject/{projectId}")]
        [Authorize]
        public async Task<ActionResult> DeleteGroupProject(int projectId)
        {
            await _groupProjectService.DeleteGroupProject(projectId);
            return Ok();
        }
    }
}

using backend.Dto.GroupProjectTasks;
using backend.Dto.ProjectTasks;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/groupProjectTask")]
    [ApiController]
    public class GroupProjectTaskController : ControllerBase
    {
        private readonly IGroupProjectTaskRepository _projectTaskService;
        public GroupProjectTaskController(IGroupProjectTaskRepository projectTaskService)
        {
            _projectTaskService = projectTaskService;
        }

        [HttpGet("getById/{projectTaskId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GroupProjectTaskDto>>> getTaskById([FromRoute] int projectTaskId)
        {
            var projectTask = await _projectTaskService.GetProjectTaskById(projectTaskId);
            return Ok(projectTask);
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<ActionResult> addProjectTask(AddGroupProjectTaskDto dto)
        {
            await _projectTaskService.AddProjectTask(dto);
            return Ok();
        }

        [HttpPatch("update/{projectTaskId}")]
        [Authorize]
        public async Task<ActionResult> updateProject(AddGroupProjectTaskDto dto, [FromRoute] int projectTaskId)
        {
            await _projectTaskService.UpdateProjectTask(dto, projectTaskId);
            return Ok();
        }

        [HttpDelete("delete/{projectTaskId}")]
        [Authorize]
        public async Task<ActionResult> deleteProject([FromRoute] int projectTaskId)
        {
            await _projectTaskService.DeleteProjectTask(projectTaskId);
            return Ok();
        }

        [HttpPatch("changeStatus/{projectTaskId}")]
        [Authorize]
        public async Task<ActionResult> changeStatus(ProjectTaskStatusDto status,[FromRoute] int projectTaskId)
        {
            await _projectTaskService.ChangeProjectTaskStatus(status,projectTaskId);
            return Ok();
        }

    }

}

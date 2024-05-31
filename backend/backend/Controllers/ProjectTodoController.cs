using backend.Dto.ProjectTodo;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/projectTodos")]
    [ApiController]
    public class ProjectTodoController : ControllerBase
    {
        private readonly IProjectTodoRepository _projectService;
        public ProjectTodoController(IProjectTodoRepository projectService)
        {
            _projectService = projectService;
        }

        [HttpGet("getAllProjects")]
        [Authorize]
        public async Task<ActionResult<ProjectsTodoDto>> getAllProjects()
        {
            var project = await _projectService.GetAllProjects();
            return Ok(project);
        }

        [HttpGet("getById/{projectId}")]
        [Authorize]
        public async Task<ActionResult<ProjectTodoDto>> getById([FromRoute] int projectId)
        {
            var project = await _projectService.GetProjectById(projectId);
            return Ok(project);
        }

        [HttpPost("addProject")]
        [Authorize]
        public async Task<ActionResult> addProject(AddProjectTodoDto dto)
        {
            await _projectService.AddProject(dto);
            return Ok();
        }

        [HttpPatch("updateProject/{projectId}")]
        [Authorize]
        public async Task<ActionResult> updateProject(AddProjectTodoDto dto, [FromRoute] int projectId)
        {
            await _projectService.UpdateProject(dto,projectId);
            return Ok();
        }

        [HttpDelete("deleteProject/{projectId}")]
        [Authorize]
        public async Task<ActionResult> deleteProject([FromRoute] int projectId)
        {
            await _projectService.DeleteProject(projectId);
            return Ok();
        }
    }
}

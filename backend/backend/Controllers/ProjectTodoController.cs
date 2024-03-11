using backend.Dto;
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
        public async Task<ActionResult<IEnumerable<AllProjectsTodoDto>>> getAllProjects()
        {
            var project = await _projectService.GetAllProjects();
            return await Task.FromResult(Ok(project));
        }

        [HttpGet("getById/{projectId}")]
        [Authorize]
        public async Task<ActionResult<ProjectTodoDto>> getById([FromRoute] int projectId)
        {
            var project = await _projectService.GetProjectById(projectId);
            return await Task.FromResult(Ok(project));
        }

        [HttpPost("addProject")]
        [Authorize]
        public async Task<ActionResult> addProject(AddProjectTodoDto dto)
        {
            await _projectService.AddProject(dto);
            return await Task.FromResult(Ok());
        }

        [HttpPatch("updateProject/{projectId}")]
        [Authorize]
        public async Task<ActionResult> updateProject(AddProjectTodoDto dto, [FromRoute] int projectId)
        {
            await _projectService.UpdateProject(dto,projectId);
            return await Task.FromResult(Ok());
        }

        [HttpDelete("deleteProject/{projectId}")]
        [Authorize]
        public async Task<ActionResult> deleteProject([FromRoute] int projectId)
        {
            await _projectService.DeleteProject(projectId);
            return await Task.FromResult(Ok());
        }
    }
}

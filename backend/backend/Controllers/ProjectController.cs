using backend.Dto;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectService;
        public ProjectController(IProjectRepository projectService)
        {
            _projectService = projectService;
        }

        [HttpGet("getAllProjects")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AllProjectsDto>>> getAllProjects()
        {
            var project = await _projectService.GetAllProjects();
            return await Task.FromResult(Ok(project));
        }

        [HttpGet("getProjectById")]
        [Authorize]
        public async Task<ActionResult<ProjectDto>> getProjectById(int projectId)
        {
            var project = await _projectService.GetProjectById(projectId);
            return await Task.FromResult(Ok(project));
        }
        [HttpPost("addProject")]
        [Authorize]
        public async Task<ActionResult> addProject(AddProjectDto dto)
        {
            await _projectService.AddProject(dto);
            return await Task.FromResult(Ok());
        }

        [HttpPatch("updateProject")]
        [Authorize]
        public async Task<ActionResult> updateProject(EditProjectDto dto)
        {
            await _projectService.UpdateProject(dto);
            return await Task.FromResult(Ok());
        }

        [HttpDelete("deleteProject")]
        [Authorize]
        public async Task<ActionResult> deleteProject(int projectId)
        {
            await _projectService.DeleteProject(projectId);
            return await Task.FromResult(Ok());
        }
    }
}

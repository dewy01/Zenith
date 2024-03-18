﻿using backend.Dto;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/projectTask")]
    [ApiController]
    public class ProjectTaskController : ControllerBase
    {
        private readonly IProjectTaskRepository _projectTaskService;
        public ProjectTaskController(IProjectTaskRepository projectTaskService)
        {
            _projectTaskService = projectTaskService;
        }

        [HttpGet("getProjectTaskById/{projectTaskId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AllProjectsDto>>> getAllProjectTasks([FromRoute] int projectTaskId)
        {
            var projectTask = await _projectTaskService.GetProjectTaskById(projectTaskId);
            return await Task.FromResult(Ok(projectTask));
        }

        [HttpPost("addProjectTask")]
        [Authorize]
        public async Task<ActionResult> addProjectTask(AddProjectTaskDto dto)
        {
            await _projectTaskService.AddProjectTask(dto);
            return await Task.FromResult(Ok());
        }

        [HttpPatch("updateProjectTask/{projectTaskId}")]
        [Authorize]
        public async Task<ActionResult> updateProject(ProjectTaskDto dto, [FromRoute] int projectTaskId)
        {
            await _projectTaskService.UpdateProjectTask(dto, projectTaskId);
            return await Task.FromResult(Ok());
        }

        [HttpDelete("deleteProjectTask/{projectTaskId}")]
        [Authorize]
        public async Task<ActionResult> deleteProject([FromRoute] int projectTaskId)
        {
            await _projectTaskService.DeleteProjectTask(projectTaskId);
            return await Task.FromResult(Ok());
        }

        [HttpPatch("changeStatus/{projectTaskId}")]
        [Authorize]
        public async Task<ActionResult> changeStatus(ProjectTaskStatusDto status,[FromRoute] int projectTaskId)
        {
            await _projectTaskService.ChangeProjectTaskStatus(status,projectTaskId);
            return await Task.FromResult(Ok());
        }

    }

}

using backend.Dto.Todos;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/todos")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _projectService;
        public TodoController(ITodoRepository projectService)
        {
            _projectService = projectService;
        }

        [HttpGet("getAllTodos/{todoId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TodoDto>>> getAllTodos([FromRoute] int todoId)
        {
            var project = await _projectService.GetAllTodos(todoId);
            return Ok(project);
        }

        [HttpPost("addTodo")]
        [Authorize]
        public async Task<ActionResult> addTodo(AddTodoDto dto)
        {
            await _projectService.AddTodo(dto);
            return Ok();
        }

        [HttpPatch("updateTodo/{todoId}")]
        [Authorize]
        public async Task<ActionResult> updateTodo(AddTodoDto dto, [FromRoute] int todoId)
        {
            await _projectService.UpdateTodo(dto, todoId);
            return Ok();
        }

        [HttpPatch("toggleStatus/{todoId}")]
        [Authorize]
        public async Task<ActionResult> toggleTodo(ToggleTodoDto dto,[FromRoute] int todoId)
        {
            await _projectService.toggleDone(dto,todoId);
            return Ok();
        }

        [HttpDelete("deleteTodo/{todoId}")]
        [Authorize]
        public async Task<ActionResult> deleteTodo([FromRoute] int todoId)
        {
            await _projectService.DeleteTodo(todoId);
            return Ok();
        }
    }
}

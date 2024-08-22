using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using backend.Dto.Todos;

namespace backend.Repository
{
    public class TodoRepository : ITodoRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

        public TodoRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TodoDto>> GetAllTodos(int projectId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var todos = await _context.Todos
                .AsNoTracking()
                .Where(x => x.ProjectTodo != null && x.ProjectTodo.UserID == userId && x.ProjectTodoID == projectId)
                .ToListAsync();

            var todoDtos = _mapper.Map<List<TodoDto>>(todos);
            return todoDtos;
        }

        public async Task AddTodo(AddTodoDto dto)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var newTodo = new Todo
            {
                ProjectTodoID = dto.ProjectTodoID,
                Title = dto.Title,
                Description = dto.Description,
                IsDone = false,
            };

            await _context.Todos.AddAsync(newTodo);
            await _context.SaveChangesAsync();

            // Ensure project status is updated after adding a new todo
            await ToggleProject(dto.ProjectTodoID);
        }

        public async Task UpdateTodo(AddTodoDto dto, int todoId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var todo = await _context.Todos
                .SingleOrDefaultAsync(todo => todo.ProjectTodo != null && todo.ProjectTodo.UserID == userId && todo.TodoID == todoId);

            if (todo == null)
            {
                throw new NotFoundException("Todo not found");
            }

            if (!string.IsNullOrEmpty(dto.Title))
            {
                todo.Title = dto.Title;
            }

            if (!string.IsNullOrEmpty(dto.Description))
            {
                todo.Description = dto.Description;
            }

            todo.ProjectTodoID = dto.ProjectTodoID;

            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();

            // Ensure project status is updated after updating a todo
            await ToggleProject(todo.ProjectTodoID);
        }

        public async Task ToggleDone(ToggleTodoDto dto, int todoId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var todo = await _context.Todos
                .Include(x => x.ProjectTodo)
                .SingleOrDefaultAsync(todo => todo.ProjectTodo != null && todo.ProjectTodo.UserID == userId && todo.TodoID == todoId);

            if (todo == null)
            {
                throw new NotFoundException("Todo not found");
            }

            todo.IsDone = dto.isDone;

            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();

            // Ensure project status is updated after toggling todo completion
            await ToggleProject(todo.ProjectTodoID);
        }

        public async Task DeleteTodo(int todoId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var todo = await _context.Todos
                .SingleOrDefaultAsync(todo => todo.ProjectTodo != null && todo.ProjectTodo.UserID == userId && todo.TodoID == todoId);

            if (todo == null)
            {
                throw new NotFoundException("Todo not found");
            }

            var projectTodoId = todo.ProjectTodoID;

            _context.Remove(todo);
            await _context.SaveChangesAsync();

            // Ensure project status is updated after deleting a todo
            await ToggleProject(projectTodoId);
        }

        public async Task ToggleProject(int projectId)
        {
            var project = await _context.ProjectTodos
                .Include(p => p.Todos)
                .SingleOrDefaultAsync(x => x.ProjectTodoID == projectId);

            if (project != null && project.Todos != null)
            {
                if (project.Todos.Count == 0)
                {
                    project.IsDone = false;
                }
                else
                {
                    var allTasksDone = project.Todos.All(x => x.IsDone);
                    project.IsDone = allTasksDone;
                }

                _context.ProjectTodos.Update(project);
                await _context.SaveChangesAsync();
            }
        }
    }
}

using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;
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
                .Where(x => x.ProjectTodo.UserID == userId && x.ProjectTodoID == projectId)
                .ToListAsync();

            if (todos.Count == 0)
            {
                return new List<TodoDto>();
            }

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
        }

        public async Task UpdateTodo(AddTodoDto dto, int projectId)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var todo = await _context.Todos
                .SingleOrDefaultAsync(todo => todo.ProjectTodo.UserID == userId && todo.TodoID == projectId);

            if (dto.Title != null && dto.Title != "")
            {
                todo.Title = dto.Title;
                todo.Description = dto.Description;
            }
            todo.ProjectTodoID = dto.ProjectTodoID;

            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();
        }

        public async Task toggleDone(ToggleTodoDto dto, int projectId)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var todo = await _context.Todos
                .SingleOrDefaultAsync(todo => todo.ProjectTodo.UserID == userId && todo.TodoID == projectId);

            todo.IsDone = dto.isDone;

            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTodo(int projectId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var todo = await _context.Todos
                .SingleOrDefaultAsync(todo => todo.ProjectTodo.UserID == userId && todo.TodoID == projectId);

            _context.Remove(todo);
            await _context.SaveChangesAsync();
        }
    }
}

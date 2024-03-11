using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using AutoMapper;
using backend.Dto;
using Microsoft.EntityFrameworkCore;
using backend.Migrations;
using System.Collections.ObjectModel;

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
            var projects = await _context.Todos.Where(x => x.ProjectTodo.UserID == userId && x.ProjectTodoID == projectId).ToListAsync();
            if (projects.Count == 0) { return new List<TodoDto>(); }
            var projectDtos = _mapper.Map<List<TodoDto>>(projects);
            return projectDtos;
        }

        public async Task AddTodo(AddTodoDto dto)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var newProject = new Todo
            {
                ProjectTodoID = dto.ProjectTodoID,
                Title = dto.Title,
                Description = dto.Description,
                IsDone = false,

            };

            await _context.Todos.AddAsync(newProject);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTodo(AddTodoDto dto , int projectId)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var project = await _context.Todos.SingleOrDefaultAsync(project => project.ProjectTodo.UserID == userId && project.ProjectTodoID == projectId);

            if(dto.Title != null && dto.Title != "")
            {
                project.Title = dto.Title;
                project.Description = dto.Description;
            }
            project.ProjectTodoID = dto.ProjectTodoID;

            _context.Todos.Update(project);
            await _context.SaveChangesAsync();
        }

        public async Task toggleDone(ToggleTodoDto dto, int projectId)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var project = await _context.Todos.SingleOrDefaultAsync(project => project.ProjectTodo.UserID == userId && project.TodoID == projectId);

            project.IsDone = dto.isDone;

            _context.Todos.Update(project);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTodo(int projectId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var project = await _context.Todos.SingleOrDefaultAsync(project => project.ProjectTodo.UserID == userId && project.ProjectTodoID == projectId);
            _context.Remove(project);
            await _context.SaveChangesAsync();
        }
    }
}

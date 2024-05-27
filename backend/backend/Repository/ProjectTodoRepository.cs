using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;
using backend.Dto.Todos;
using backend.Dto.ProjectTodo;

namespace backend.Repository
{
    public class ProjectTodoRepository : IProjectTodoRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

        public ProjectTodoRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AllProjectsTodoDto>> GetAllProjects()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var projects = await _context.ProjectTodos
                .AsNoTracking()
                .Where(x => x.UserID == userId)
                .OrderBy(x => x.IsDone)
                .ThenBy(x => x.ProjectTodoID)
                .ToListAsync();

            if (projects.Count == 0)
            {
                return new List<AllProjectsTodoDto>();
            }

            var projectDtos = _mapper.Map<List<AllProjectsTodoDto>>(projects);
            return projectDtos;
        }

        public async Task<ProjectTodoDto> GetProjectById(int projectId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var project = await _context.ProjectTodos
                .Include(p => p.Todos)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.UserID == userId && x.ProjectTodoID == projectId);

            var projectDto = new ProjectTodoDto
            {
                Title = project.Title,
                Description = project.Description,
                Color = project.Color,
                Todos = _mapper.Map<Collection<TodoDto>>(project.Todos),
            };

            return projectDto;
        }

        public async Task AddProject(AddProjectTodoDto dto)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var newProject = new ProjectTodo
            {
                UserID = userId.Value,
                Title = dto.Title,
                Description = dto.Description,
                Color = dto.Color,
            };

            await _context.ProjectTodos.AddAsync(newProject);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProject(AddProjectTodoDto dto, int projectId)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var project = await _context.ProjectTodos
                .SingleOrDefaultAsync(project => project.UserID == userId && project.ProjectTodoID == projectId);

            project.Title = dto.Title;
            project.Color = dto.Color;
            project.Description = dto.Description;

            _context.ProjectTodos.Update(project);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProject(int projectId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var project = await _context.ProjectTodos
                .SingleOrDefaultAsync(project => project.UserID == userId && project.ProjectTodoID == projectId);

            _context.Remove(project);
            await _context.SaveChangesAsync();
        }
    }
}

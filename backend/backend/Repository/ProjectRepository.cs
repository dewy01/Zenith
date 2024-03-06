using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using AutoMapper;
using backend.Dto;
using Microsoft.EntityFrameworkCore;
using backend.Migrations;

namespace backend.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

        public ProjectRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task<ProjectDto> GetProjectById(int projectId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            
            var project = await _context.Projects.SingleOrDefaultAsync(x=>x.UserID == userId && x.ProjectID == projectId);
            var projectDto = new ProjectDto
            {
                ProjectID = project.ProjectID,
                Title = project.Title,
                Deadline = project.Deadline,
                Description = project.Description,
                Status = project.Status,
                ProjectTasks = _mapper.Map<List<ProjectTaskShortDto>>(project.ProjectTasks),
            };

            return projectDto;
        }

        public async Task<IEnumerable<AllProjectsDto>> GetAllProjects()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var projects = await _context.Projects.Where(x => x.UserID == userId).ToListAsync();
            if (projects.Count == 0) { return new List<AllProjectsDto>(); }
            var projectDtos = _mapper.Map<List<AllProjectsDto>>(projects);
            return projectDtos;
        }

        public async Task AddProject(AddProjectDto dto)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var newProject = new Project
            {
                UserID = userId.Value,
                Title = dto.Title,
                Status = dto.Status,
                Deadline= dto.Deadline,
                Description= dto.Description,
            };

            await _context.Projects.AddAsync(newProject);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProject(EditProjectDto dto , int projectId)
        {
            var userId = _userContextRepository.GetUserId;

            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var project = await _context.Projects.SingleOrDefaultAsync(project => project.UserID == userId && project.ProjectID == projectId);

            if(dto.Title != null || dto.Title != "")
            {
                project.Title = dto.Title;
            }
            project.Status = dto.Status;
            project.Deadline = dto.Deadline;
            project.Description = dto.Description;

            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProject(int projectId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var project = await _context.Projects.SingleOrDefaultAsync(project => project.UserID == userId && project.ProjectID == projectId);
            _context.Remove(project);
            await _context.SaveChangesAsync();
        }
    }
}

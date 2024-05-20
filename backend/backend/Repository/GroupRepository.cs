using backend.Data;
using backend.Interface;
using backend.Models;
using backend.Exceptions;
using System.Linq;
using backend.Dto;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using AutoMapper;

namespace backend.Repository
{
    public class GroupRepository : IGroupRepository
    {
        private readonly DataContext _context;
        private readonly IUserContextRepository _userContextRepository;
        private readonly IMapper _mapper;

        public GroupRepository(DataContext context, IUserContextRepository userContextRepository, IMapper mapper)
        {
            _context = context;
            _userContextRepository = userContextRepository;
            _mapper = mapper;
        }

        public async Task<GroupByIdDto> GetGroup()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var group = await _context.Groups
                .Include(g => g.Users)
                .SingleOrDefaultAsync(g => g.Users.Any(u => u.UserID == userId));

            if (group == null)
            {
                throw new NotFoundException("Group not found");
            }

            var groupRoles = await _context.GroupRoles
                .Where(g => g.GroupId == group.GroupID)
                .ToListAsync();

            var userDto = _mapper.Map<List<GroupUsersDto>>(group.Users);
            userDto.ForEach(u =>
            {
                u.IsMe = u.UserID == userId;
                u.UserRole = groupRoles.FirstOrDefault(x => x.UserId == u.UserID).Role;
            });

            var groupDto = new GroupByIdDto
            {
                GroupID = group.GroupID,
                GroupName = group.GroupName,
                Users = userDto,
            };

            return groupDto;
        }



        public async Task<bool> isInGroup()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var group = await _context.Groups.SingleOrDefaultAsync(g => g.Users.SingleOrDefault(x => x.UserID == userId).UserID == userId);

            if (group == null)
            {
                return false;
            }
           
            return true;
        }

        public async Task AddGroup(GroupEditDto dto)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserID == userId);
            if (user == null || user.GroupID != null)
            {
                throw new NotFoundException("Invalid operation");
            }

            var newGroup = new Group
            {
                GroupName = dto.GroupName,
                Users = new List<User> { user },
                GroupProjects = new List<GroupProject>(),
            };

            await _context.Groups.AddAsync(newGroup);
            await _context.SaveChangesAsync();

            var group = await _context.Groups.SingleOrDefaultAsync(g => g.GroupID == newGroup.GroupID);
            if (group == null)
            {
                throw new NotFoundException("Failed to retrieve the newly created group");
            }

            user.GroupID = newGroup.GroupID;
            user.Group = newGroup;
            _context.Users.Update(user);

            await _context.SaveChangesAsync();

            var groupRole = new GroupRole
            {
                UserId = user.UserID,
                GroupId = newGroup.GroupID,
                Role = Enums.GroupRole.Admin
            };

            await _context.GroupRoles.AddAsync(groupRole);
            await _context.SaveChangesAsync();
        }



        public async Task UpdateGroup(GroupEditDto dto, int groupId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }
            var group = await _context.Groups.SingleOrDefaultAsync(group => group.Users.SingleOrDefault(x=>x.UserID==userId).UserID == userId && group.GroupID == groupId);

            if (dto.GroupName != null && dto.GroupName != "")
            {
                group.GroupName = dto.GroupName;
            }

            _context.Groups.Update(group);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteGroup(int groupId)
        {
            var group = await _context.Groups.SingleOrDefaultAsync(group => group.GroupID == groupId);
            if (group != null)
            {
                _context.Groups.Remove(group);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<string> GetInviteToken(int groupId)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var group = await _context.Groups.SingleOrDefaultAsync(group => group.GroupID == groupId && group.Users.FirstOrDefault(u=>u.UserID == userId).UserID == userId);
            var token = "GP-";
            if (group.TokenResetTime > DateTime.Now)
            {
                token = group.InviteToken;
            }
            else
            {
                token += Convert.ToHexString(RandomNumberGenerator.GetBytes(4));
                group.InviteToken = token;
                group.TokenResetTime = DateTime.Now.AddMinutes(10);
                _context.Groups.Update(group);
                await _context.SaveChangesAsync();
            }

            return token;
        }

        public async Task JoinGroup(TokenDto dto)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var group = await _context.Groups.SingleOrDefaultAsync(group => group.InviteToken == dto.Token && group.TokenResetTime > DateTime.Now);

            if (group == null)
            {
                throw new NotFoundException("Group not found");
            }
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserID == userId);

            user.GroupID = group.GroupID;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();


            var groupRole = new GroupRole
            {
                UserId = user.UserID,
                GroupId = group.GroupID,
                Role = Enums.GroupRole.User
            };

            await _context.GroupRoles.AddAsync(groupRole);
            await _context.SaveChangesAsync();
        }

        public async Task LeaveGroup(LeaveGroupDto dto)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var groupUser = await _context.GroupRoles.SingleOrDefaultAsync(u => u.UserId == userId);
            if (groupUser == null)
            {
                throw new NotFoundException("User not found in the group");
            }

            if (groupUser.Role == Enums.GroupRole.Admin)
            {
                throw new InvalidOperationException("Admin cannot leave the group");
            }

            var group = await _context.Groups.Include(g => g.Users).SingleOrDefaultAsync(g => g.GroupID == dto.GroupID);
            if (group == null)
            {
                throw new NotFoundException("Group not found");
            }

            var user = group.Users.FirstOrDefault(u => u.UserID == userId);
            if (user == null)
            {
                throw new NotFoundException("User not found in the group");
            }

            group.Users.Remove(user);

            var groupRole = await _context.GroupRoles.FirstOrDefaultAsync(gr => gr.GroupId == group.GroupID && gr.UserId == userId);
            if (groupRole != null)
            {
                _context.GroupRoles.Remove(groupRole);
            }

            if (group.Users.Count == 0)
            {
                _context.Groups.Remove(group);
            }

            await _context.SaveChangesAsync();
        }

        public async Task ChangeRole(ChangeRoleDto dto)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var groupUser = await  _context.GroupRoles.SingleOrDefaultAsync(u=>u.UserId == userId);

            if (groupUser == null) { throw new NotFoundException("User not found"); }

            if(groupUser.Role == Enums.GroupRole.Admin)
            {
                var changedUser = await _context.GroupRoles.SingleOrDefaultAsync(u => u.UserId == dto.UserId);
                if (changedUser == null) throw new NotFoundException("User not found");
                var newRole = (changedUser.Role == Enums.GroupRole.User) ? Enums.GroupRole.Moderator : Enums.GroupRole.User;
                changedUser.Role = newRole;
                _context.GroupRoles.Update(changedUser);
            }

            await _context.SaveChangesAsync();
        }

        public async Task SetAdmin(ChangeRoleDto dto)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var groupUser = await _context.GroupRoles.SingleOrDefaultAsync(u => u.UserId == userId);

            if (groupUser == null) { throw new NotFoundException("User not found"); }

            if (groupUser.Role == Enums.GroupRole.Admin)
            {
                groupUser.Role = Enums.GroupRole.User;
                _context.GroupRoles.Update(groupUser);

                var changedUser = await _context.GroupRoles.SingleOrDefaultAsync(u => u.UserId == dto.UserId);
                if (changedUser == null) throw new NotFoundException("User not found");
                changedUser.Role = Enums.GroupRole.Admin;
                _context.GroupRoles.Update(changedUser);
            }

            await _context.SaveChangesAsync();

        }

        public async Task<Enums.GroupRole> GetOwnRole()
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var groupRole = await _context.GroupRoles.SingleOrDefaultAsync(x => x.UserId == userId);
            if(groupRole == null)
            {
                throw new NotFoundException("User not found in the group");
            }

            return groupRole.Role;
        }


    }
}

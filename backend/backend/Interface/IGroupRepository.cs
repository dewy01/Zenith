﻿using backend.Dto.Groups;
using backend.Dto.Users;
using backend.Models;

namespace backend.Interface
{
    public interface IGroupRepository
    {
        Task<GroupByIdDto> GetGroup();
        Task AddGroup(GroupEditDto group);
        Task UpdateGroup(GroupEditDto dto, int groupId);
        Task DeleteGroup(int groupId);
        Task<string> GetInviteToken(int groupId);
        Task<bool> isInGroup();
        Task JoinGroup(TokenDto tokenId);
        Task LeaveGroup(LeaveGroupDto dto);
        Task ChangeRole(ChangeRoleDto dto);
        Task SetAdmin(ChangeRoleDto dto);
        Task<Enums.GroupRole> GetOwnRole();
    }
}

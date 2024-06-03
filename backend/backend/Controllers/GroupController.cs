using backend.Dto.Groups;
using backend.Dto.Users;
using backend.Interface;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/groups")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _groupService;
        public GroupController(IGroupRepository groupService)
        {
            _groupService = groupService;
        }

        [HttpGet("getGroup")]
        [Authorize]
        public async Task<ActionResult<GroupByIdDto>> getGroup()
        {
            var group = await _groupService.GetGroup();
            return Ok(group);
        }

        [HttpGet("isInGroup")]
        [Authorize]
        public async Task<ActionResult<GroupByIdDto>> isInGroup()
        {
            var group = await _groupService.isInGroup();
            return Ok(group);
        }

        [HttpPost("addGroup")]
        [Authorize]
        public async Task<ActionResult> addGroup(GroupEditDto dto)
        {
            await _groupService.AddGroup(dto);
            return Ok();
        }

        [HttpDelete("deleteGroup/{groupId}")]
        [Authorize]
        public async Task<ActionResult> deleteGroup([FromRoute] int groupId)
        {
            await _groupService.DeleteGroup(groupId);
            return Ok();
        }

        [HttpPatch("updateGroup/{groupId}")]
        [Authorize]
        public async Task<ActionResult> updateGroup(GroupEditDto dto, [FromRoute] int groupId)
        {
            await _groupService.UpdateGroup(dto, groupId);
            return Ok();
        }

        [HttpPost("leaveGroup")]
        [Authorize]
        public async Task<ActionResult> leaveGroup([FromBody] LeaveGroupDto groupId)
        {
            await _groupService.LeaveGroup(groupId);
            return Ok();
        }

        [HttpGet("getInviteToken/{groupId}")]
        [Authorize]
        public async Task<ActionResult<string>> getShareToken([FromRoute] int groupId)
        {
            string token = await _groupService.GetInviteToken(groupId);
            return Ok(token);
        }

        [HttpPost("joinGroup")]
        [Authorize]
        public async Task<ActionResult> joinGroup([FromBody] TokenDto token)
        {
            await _groupService.JoinGroup(token);
            return Ok();
        }

        [HttpPatch("changeRole")]
        [Authorize]
        public async Task<ActionResult> changeRole(ChangeRoleDto dto)
        {
            await _groupService.ChangeRole(dto);
            return Ok();
        }

        [HttpPatch("setAdmin")]
        [Authorize]
        public async Task<ActionResult> setAdmin(ChangeRoleDto dto)
        {
            await _groupService.SetAdmin(dto);
            return Ok();
        }


        [HttpGet("getOwnRole")]
        [Authorize]
        public async Task<ActionResult<Enums.GroupRole>> getOwnRole()
        {
            var role = await _groupService.GetOwnRole();
            return Ok(role);
        }

    }
}

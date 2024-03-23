using backend.Dto;
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
            return await Task.FromResult(Ok(group));
        }

        [HttpGet("isInGroup")]
        [Authorize]
        public async Task<ActionResult<GroupByIdDto>> isInGroup()
        {
            var group = await _groupService.isInGroup();
            return await Task.FromResult(Ok(group));
        }

        [HttpPost("addGroup")]
        [Authorize]
        public async Task<ActionResult> addGroup(GroupEditDto dto)
        {
            await _groupService.AddGroup(dto);
            return await Task.FromResult(Ok());
        }

        [HttpPatch("updateGroup/{groupId}")]
        [Authorize]
        public async Task<ActionResult> updateGroup(GroupEditDto dto, [FromRoute] int groupId)
        {
            await _groupService.UpdateGroup(dto, groupId);
            return await Task.FromResult(Ok());
        }

        [HttpPost("leaveGroup")]
        [Authorize]
        public async Task<ActionResult> leaveGroup([FromBody] int groupId)
        {
            await _groupService.LeaveGroup(groupId);
            return await Task.FromResult(Ok());
        }

        [HttpGet("getInviteToken/{groupId}")]
        [Authorize]
        public async Task<ActionResult<string>> getShareToken([FromRoute] int groupId)
        {
            string token = await _groupService.GetInviteToken(groupId);
            return await Task.FromResult(Ok(token));
        }

        [HttpPost("joinGroup")]
        [Authorize]
        public async Task<ActionResult> joinGroup([FromBody] string token)
        {
            await _groupService.JoinGroup(token);
            return await Task.FromResult(Ok());
        }

    }
}

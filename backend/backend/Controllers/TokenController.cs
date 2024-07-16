using backend.Dto.Token;
using backend.Dto.Users;
using backend.Interface;
using backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace backend.Controllers
{
    [Route("api/token")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenRepository _tokenService;
        public TokenController(ITokenRepository tokenService)
        {
            _tokenService = tokenService;
        }
        [HttpPost("refresh")]
        public async Task<ActionResult<AccessTokenDto>> RefreshToken([FromBody] AccessTokenDto dto)
        {
            var response = await _tokenService.Refresh(dto);
            return Ok(response);
        }
    }
}

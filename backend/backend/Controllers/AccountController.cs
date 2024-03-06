using backend.Dto;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace backend.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository _accountService;
        public AccountController(IUserRepository accountService)
        {
            _accountService = accountService;
        }
        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser([FromBody] RegisterUserDto dto)
        {
            await _accountService.AddUser(dto);
            return await Task.FromResult(Ok());
        }
        [HttpGet("verifyemail/{token}")]
        public async Task<IActionResult> VerifyEmail([FromRoute] string token)
        {
            var result = await _accountService.VerifyEmail(token);
            if (result)
            {
                return await Task.FromResult(Ok("Verification completed"));
            }
            return await Task.FromResult(NotFound("Error while trying to verify email, please try again"));
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginUserDto dto)
        {
            string token = await _accountService.GenerateJwt(dto);
            return await Task.FromResult(Ok(token));
        }
        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            await _accountService.ForgotPassword(dto);
            return await Task.FromResult(Ok());
        }
        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            await _accountService.ResetPassword(dto);
            return await Task.FromResult(Ok());
        }

    }
}

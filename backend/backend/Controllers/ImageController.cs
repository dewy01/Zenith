using backend.Dto.Images;
using backend.Dto.Todos;
using backend.Interface;
using backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageRepository _imageService;
        public ImageController(IImageRepository imageService)
        {
            _imageService = imageService;
        }

        [HttpGet("{id}")]
        public IActionResult GetImage(string id)
        {
            var image = _imageService.Get(id);
            return File(image, "application/octet-stream", id);
        }

        [HttpPost]
        public async Task<IActionResult> PostImage([FromForm] AddImageDto dto)
        {
            if (dto.Image == null)
            {
                return BadRequest("Invalid iamge");
            }

            await _imageService.SaveAsync(dto.Image);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(string id)
        {
            await _imageService.DeleteAvatar(id);
            return Ok();
        }
    }
}

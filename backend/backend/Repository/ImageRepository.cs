using backend.Data;
using backend.Exceptions;
using backend.Interface;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;

namespace backend.Repository
{

    public interface IImageRepository
    {
        Task SaveAsync(IFormFile image);
        void Delete(string imageName);
        Stream Get(string imageName);
    }

    public class ImageRepository : IImageRepository
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IUserContextRepository _userContextRepository;

        public ImageRepository(DataContext context, IWebHostEnvironment webHostEnvironment, IUserContextRepository userContextRepository)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            _userContextRepository = userContextRepository;
        }

        public async Task SaveAsync(IFormFile image)
        {
            var userId = _userContextRepository.GetUserId;
            if (userId == null)
            {
                throw new NotFoundException("User not found");
            }

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserID == userId);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            if (image.Length == 0)
            {
                throw new NotFoundException("Invalid image");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.ContentRootPath, "Images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
                Console.WriteLine("Directory created");
            }

            var uniqueFileName = Guid.NewGuid() + "_" + image.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var imageStream = image.OpenReadStream())
            {
                using (var imageSharp = await Image.LoadAsync(imageStream))
                {
                    imageSharp.Mutate(x => x.Resize(new ResizeOptions
                    {
                        Size = new Size(200, 200), 
                        Mode = ResizeMode.Max
                    }));

                    var encoder = new JpegEncoder { Quality = 75 }; 
                    await using var fileStream = new FileStream(filePath, FileMode.Create);
                    await imageSharp.SaveAsync(fileStream, encoder);
                }
            }

            if (user.Image != null)
            {
                Delete(user.Image);
                user.Image = null;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }

            user.Image = uniqueFileName;
            Console.WriteLine("Image saved");

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public void Delete(string imageName)
        {
            if (string.IsNullOrEmpty(imageName))
            {
                return;
            }

            var filePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", imageName);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }

        public Stream Get(string imageName)
        {
            if (string.IsNullOrEmpty(imageName))
            {
                throw new ArgumentNullException(nameof(imageName));
            }

            var filePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", imageName);
            if (File.Exists(filePath))
            {
                return File.OpenRead(filePath);
            }
            throw new FileNotFoundException();
        }
    }

}

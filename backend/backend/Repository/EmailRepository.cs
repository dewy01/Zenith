using System.Net.Mail;
using System.Net;
using backend.Interface;

namespace backend.Repository
{
    public class EmailRepository : IEmailRepository
    {
        private readonly EmailSettings _settings;
        public EmailRepository(EmailSettings settings)
        {
            _settings = settings;
        }
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var client = new SmtpClient("smtp-mail.outlook.com", 587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(_settings.Email, _settings.Password)
            };

            if (_settings.Email == null)
            {
                throw new ArgumentException("Service email not found");
            }

            await client.SendMailAsync(
                new MailMessage(from: _settings.Email,
                to: email,
                subject,
                message));
        }
    }
}

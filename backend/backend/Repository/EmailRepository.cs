using backend.Interface;
using backend;
using System.Net.Mail;
using System.Net;

public class EmailRepository : IEmailRepository
{
    private readonly EmailSettings _settings;

    public EmailRepository(EmailSettings settings)
    {
        _settings = settings;
    }

    public async Task SendEmailAsync(string email, string subject, string message)
    {
        if (string.IsNullOrEmpty(_settings.Email))
        {
            throw new ArgumentException("Service email not found");
        }

        var mailMessage = new MailMessage();
        mailMessage.From = new MailAddress(_settings.Email);
        mailMessage.Subject = subject;
        mailMessage.To.Add(new MailAddress(email));
        mailMessage.Body = message;
        mailMessage.IsBodyHtml = true;

        var client = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            EnableSsl = true,
            Credentials = new NetworkCredential(_settings.Email, _settings.Password)
        };

      

        await client.SendMailAsync(mailMessage);
    }
}

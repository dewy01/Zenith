using backend;
using backend.Data;
using backend.Dto.Users;
using backend.Dto.Validators;
using backend.Interface;
using backend.Models;
using backend.Repository;
using FluentValidation;
using Hangfire;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<Seed>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var authSetting = new AuthSettings();
builder.Configuration.GetSection("Authentication").Bind(authSetting);
builder.Services.AddSingleton(authSetting);

var emailSetting = new EmailSettings();
builder.Configuration.GetSection("EmailSender").Bind(emailSetting);
builder.Services.AddSingleton(emailSetting);
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<INoteRepository, NoteRepository>();
builder.Services.AddScoped<IUserContextRepository, UserContextRepository>();
builder.Services.AddTransient<IProjectRepository, ProjectRepository>();
builder.Services.AddTransient<IProjectTaskRepository, ProjectTaskRepository>();
builder.Services.AddScoped<IProjectTodoRepository, ProjectTodoRepository>();
builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddScoped<IUserPreferencesRepository, UserPreferencesRepository>();
builder.Services.AddScoped<ICalendarEventRepository, CalendarEventRepository>();
builder.Services.AddScoped<IGroupRepository, GroupRepository>();
builder.Services.AddScoped<IGroupProjectRepository, GroupProjectRepository>();
builder.Services.AddScoped<IGroupProjectTaskRepository, GroupProjectTaskRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();


builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();
builder.Services.AddTransient<IEmailRepository, EmailRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = "Bearer";
    option.DefaultScheme = "Bearer";
    option.DefaultChallengeScheme = "Bearer";
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = authSetting.JwtIssuer,
        ValidAudience = authSetting.JwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authSetting.JwtKey)),
    };
});

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Hangfire implementation
builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection"), new SqlServerStorageOptions
    {
        CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
        SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
        QueuePollInterval = TimeSpan.Zero,
        UseRecommendedIsolationLevel = true,
        DisableGlobalLocks = true
    }));

builder.Services.AddHangfireServer();

var app = builder.Build();

if (args.Length == 1 && args[0].ToLower() == "seeddata")
    SeedData(app);

void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

    using (var scope = scopedFactory.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<Seed>();
        service.SeedData();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Hangfire execution
app.UseHangfireDashboard("/hangfire", new DashboardOptions
{
    DashboardTitle = "Hangfire Dashboard"
});
RecurringJob.AddOrUpdate<NotificationRepository>("update-notifications", service => service.UpdateNotifications(), Cron.Daily);

app.Run();
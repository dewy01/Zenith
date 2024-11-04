using backend;
using backend.Data;
using backend.Dto.Users;
using backend.Dto.Validators;
using backend.Interface;
using backend.Models;
using backend.Repository;
using backend.Store;
using DotNetEnv;
using FluentValidation;
using Hangfire;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables
Env.Load();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddTransient<Seed>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure authentication settings
var authSetting = new AuthSettings
{
    JwtKey = Environment.GetEnvironmentVariable("JWT_KEY"),
    JwtExpireMinutes = int.Parse(Environment.GetEnvironmentVariable("JWT_EXPIRE_MINUTES") ?? "30"),
    JwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER"),
};
builder.Services.AddSingleton(authSetting);

// Configure email settings
var emailSetting = new EmailSettings
{
    Email = Environment.GetEnvironmentVariable("EMAIL_SENDER"),
    Password = Environment.GetEnvironmentVariable("EMAIL_PASSWORD"),
};
builder.Services.AddSingleton(emailSetting);

// Register other services
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ITokenRepository, TokenRepository>();
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
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();
builder.Services.AddTransient<IEmailRepository, EmailRepository>();

// CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader().SetIsOriginAllowed(origin => true);
        });
});

// Configure JWT Authentication
builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = authSetting.JwtIssuer,
        ValidAudience = authSetting.JwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authSetting.JwtKey ?? StringGenerator.RandomString(10))),
        ClockSkew = TimeSpan.Zero
    };
});

// Configure Entity Framework and SQL Server
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(Environment.GetEnvironmentVariable("CONNECTION_STRING"));
});

// Hangfire configuration
builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSqlServerStorage(Environment.GetEnvironmentVariable("CONNECTION_STRING"), new SqlServerStorageOptions
    {
        CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
        SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
        QueuePollInterval = TimeSpan.Zero,
        UseRecommendedIsolationLevel = true,
        DisableGlobalLocks = true
    }));
builder.Services.AddHangfireServer();

var app = builder.Build();

// Database migration
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DataContext>();
    db.Database.Migrate();
}

// Data seeding
if (args.Length == 1 && args[0].ToLower() == "seeddata")
    SeedData(app);

// Method to seed data
void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
    if (scopedFactory == null)
    {
        throw new InvalidOperationException("Scoped factory is null");
    }

    using (var scope = scopedFactory.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<Seed>();
        if (service == null)
        {
            throw new InvalidOperationException("Seed service is null");
        }
        service.SeedData();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");
//app.UseHttpsRedirection();
app.UseAuthentication(); // Ensure Authentication middleware is added
app.UseAuthorization();
app.MapControllers();

// Hangfire dashboard and recurring jobs
app.UseHangfireDashboard("/hangfire", new DashboardOptions
{
    DashboardTitle = "Hangfire Dashboard"
});
RecurringJob.AddOrUpdate<INotificationRepository>("update-notifications", service => service.UpdateNotifications(), Cron.Daily);

app.Run();

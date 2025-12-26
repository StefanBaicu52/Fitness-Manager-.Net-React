using Microsoft.EntityFrameworkCore;
using cNet.Data;

var builder = WebApplication.CreateBuilder(args);

// Adaugă DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Adaugă CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- SEEDING START ---
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<cNet.Data.AppDbContext>();

    // Seeding Abonamente
    if (!context.SubscriptionPlans.Any())
    {
        context.SubscriptionPlans.AddRange(
            new cNet.Models.SubscriptionPlan { Name = "Basic", Price = 100, DurationMonths = 1 },
            new cNet.Models.SubscriptionPlan { Name = "Standard", Price = 250, DurationMonths = 3 },
            new cNet.Models.SubscriptionPlan { Name = "VIP", Price = 800, DurationMonths = 12 }
        );
        context.SaveChanges();
    }

    // Seeding Utilizator Admin
    if (!context.Users.Any())
    {
        context.Users.Add(new cNet.Models.User
        {
            Username = "admin",
            PasswordHash = "admin123",
            Role = "Admin"
        });
        context.SaveChanges();
    }
}
// --- SEEDING END ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
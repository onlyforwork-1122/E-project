using eProject3.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Services

builder.Services.AddControllersWithViews();

var provider = builder.Services.BuildServiceProvider();
var config = provider.GetService<IConfiguration>();

builder.Services.AddDbContext<MedicalDbContext>(item =>
{
    item.UseSqlServer(config.GetConnectionString("DefaultConnection"));
});

builder.Services.AddSession();
builder.Services.AddDistributedMemoryCache();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Website/Career"; // redirect here if not logged in
        options.AccessDeniedPath = "/Account/AccessDenied"; // optional
    });

builder.Services.AddAuthorization();

var app = builder.Build();



// MiddleWares
app.UseStaticFiles(); 
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Website}/{action=Index}/{id?}"
    );

//app.MapGet("/", () => "Hello World!");
app.UseSession();

app.Run();

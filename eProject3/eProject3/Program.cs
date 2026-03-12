using eProject3.Models;
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


var app = builder.Build();



// MiddleWares

app.UseStaticFiles(); 
app.UseRouting();
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Website}/{action=Index}/{id?}"
    );

//app.MapGet("/", () => "Hello World!");

app.Run();

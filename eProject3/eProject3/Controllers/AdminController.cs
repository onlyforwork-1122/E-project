using eProject3.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eProject3.Controllers
{
    public class AdminController : Controller
    {
        private readonly MedicalDbContext medicalDb;

        public AdminController(MedicalDbContext medicalDb)
        {
            this.medicalDb = medicalDb;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Careers()
        {
            return View();
        }
        public IActionResult Messages()
        {
            return View();
        }
        public IActionResult Products()
        {
            return View();
        }
        public async Task<IActionResult> QuoteUs()
        {
            var quotedata = await medicalDb.tbl_QuoteUS.ToListAsync();
            return View(quotedata);
        }
    }
}

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
            if (HttpContext.Session.GetString("AdminEmail") == null)
            {
                return RedirectToAction("Admin", "Website");
            }
            return View();
        }

        public IActionResult Careers()
        {
            if (HttpContext.Session.GetString("AdminEmail") == null)
            {
                return RedirectToAction("Admin", "Website");
            }
            return View();
        }
        public async Task<IActionResult> Messages()
        {
            if (HttpContext.Session.GetString("AdminEmail") == null)
            {
                return RedirectToAction("Admin", "Website");
            }
            var msgdata = await medicalDb.tbl_Contacts.ToListAsync();
            return View(msgdata);
        }
        [HttpPost]
        public IActionResult MDelete(int id)
        {
            var msg = medicalDb.tbl_Contacts.Find(id);

            if (msg != null)
            {
                medicalDb.tbl_Contacts.Remove(msg);
                medicalDb.SaveChanges();
            }

            return Ok();
        }
        public async Task<IActionResult> Msgview(int? id)
        {
            if (HttpContext.Session.GetString("AdminEmail") == null)
            {
                return RedirectToAction("Admin", "Website");
            }
            var msg = await medicalDb.tbl_Contacts.FirstOrDefaultAsync(i => i.Id == id);
            return View(msg);
        }
        public IActionResult Products()
        {
            if (HttpContext.Session.GetString("AdminEmail") == null)
            {
                return RedirectToAction("Admin", "Website");
            }
            return View();
        }
        public async Task<IActionResult> QuoteUs()
        {
            if (HttpContext.Session.GetString("AdminEmail") == null)
            {
                return RedirectToAction("Admin", "Website");
            }
            var quotedata = await medicalDb.tbl_QuoteUS.ToListAsync();
            return View(quotedata);
        }
        [HttpPost]
        public IActionResult QDelete(int id)
        {
            var quote = medicalDb.tbl_QuoteUS.Find(id);

            if (quote != null)
            {
                medicalDb.tbl_QuoteUS.Remove(quote);
                medicalDb.SaveChanges();
            }

            return Ok();
        }
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Admin", "Website");
        }
    }
}

using eProject3.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eProject3.Controllers
{
    public class CandidateController : Controller
    {
        private readonly MedicalDbContext medicalDb;
          public CandidateController(MedicalDbContext medicalDb)
        {
            this.medicalDb = medicalDb;
        }
        public IActionResult Index()
        {
            if (HttpContext.Session.GetString("CandidateEmail") == null)
            {
                return RedirectToAction("Career","Website");
            }
            return View();
        }
        public async Task<IActionResult> Personal()
        {
            if (HttpContext.Session.GetString("CandidateEmail") == null)
            {
                return RedirectToAction("Career", "Website");
            }
            var personal_data = await medicalDb.tbl_Contacts.ToListAsync();
            return View(personal_data);
        }
        public IActionResult Education()
        {
            if (HttpContext.Session.GetString("CandidateEmail") == null)
            {
                return RedirectToAction("Career", "Website");
            }
            return View();
        }
        public IActionResult Resume()
        {
            if (HttpContext.Session.GetString("CandidateEmail") == null)
            {
                return RedirectToAction("Career", "Website");
            }
            return View();
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Career","Website");
        }

    }
}

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
            var email = HttpContext.Session.GetString("CandidateEmail");

            if (email == null)
                return RedirectToAction("Career", "Website");

            var candidate = await medicalDb.tbl_Candidates
                                .FirstOrDefaultAsync(c => c.Email == email);

            if (candidate == null)
                return RedirectToAction("Career", "Website"); // optional safety check

            return View(candidate);
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

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
            int? candidateId = HttpContext.Session.GetInt32("CandidateId");

            var edu = medicalDb.tbl_CandidateEducations
                .Where(x => x.CandidateId == candidateId)
                .ToList();


            ViewBag.Education = edu;

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
        [HttpPost]
        [HttpPost]
        public IActionResult AddEducation(CandidateEducation edu)
        {
            // Get CandidateId from session
            int? candidateId = HttpContext.Session.GetInt32("CandidateId");
            if (candidateId == null)
                return RedirectToAction("Login", "Candidate");

            if (string.IsNullOrWhiteSpace(edu.Degree) || string.IsNullOrWhiteSpace(edu.Institution))
            {
                TempData["Error"] = "Degree and Institution are required";
                return RedirectToAction("Education");
            }

            edu.CandidateId = candidateId.Value;

            try
            {
                medicalDb.tbl_CandidateEducations.Add(edu);
                medicalDb.SaveChanges();
                TempData["Success"] = "Education added successfully";
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Error saving education: " + ex.Message;
            }

            return RedirectToAction("Education");
        }

        [HttpPost]
        public IActionResult UpdatePersonal(Candidate model)
        {
            int? candidateId = HttpContext.Session.GetInt32("CandidateId");
            if (candidateId == null)
                return RedirectToAction("Login");

            var candidate = medicalDb.tbl_Candidates.FirstOrDefault(c => c.Id == candidateId);
            if (candidate == null)
                return RedirectToAction("Login");

            // Update fields
            candidate.FirstName = model.FirstName;
            candidate.LastName = model.LastName;
            candidate.DateOfBirth = model.DateOfBirth;
            candidate.Gender = model.Gender;
            candidate.Email = model.Email;
            candidate.Phone = model.Phone;
            candidate.StreetAddress = model.StreetAddress;
            candidate.City = model.City;
            candidate.Province = model.Province;
            candidate.PostalCode = model.PostalCode;
            candidate.Country = model.Country;

            medicalDb.SaveChanges();

            TempData["Success"] = "Personal details updated successfully";
            return RedirectToAction("Personal");
        }
    }
}

using eProject3.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eProject3.Controllers
{
    [Authorize]
    public class CandidateController : Controller
    {
        private readonly MedicalDbContext medicalDb;
          public CandidateController(MedicalDbContext medicalDb)
        {
            this.medicalDb = medicalDb;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> Personal()
        {
            var personal_data = await medicalDb.tbl_Contacts.ToListAsync();
            return View(personal_data);
        }
        public IActionResult Education()
        {
            return View();
        }
        public IActionResult Resume()
        {
            return View();
        }



    }
}

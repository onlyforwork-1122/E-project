using eProject3.Models;
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
            return View();
        }
        public IActionResult Personal()
        {
            return View();
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

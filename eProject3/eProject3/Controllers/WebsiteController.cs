using eProject3.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace eProject3.Controllers
{
    public class WebsiteController : Controller
    {
        private readonly MedicalDbContext medicalDb;

        public WebsiteController(MedicalDbContext medicalDb)
        {
            this.medicalDb = medicalDb;
        }


        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }
        public IActionResult Contact()
        {
            return View();
        }

        

        [HttpPost]
        public async Task<IActionResult> Contact(Contact contact)
        {
            if (ModelState.IsValid)
            {
                await medicalDb.tbl_Contacts.AddAsync(contact);
                await medicalDb.SaveChangesAsync();
                ViewBag.Success = "Message sent successfully!";
                return View();
            }
            return View(contact);
        }

        public IActionResult Products()
        {
            var products = new AllProducts
            {
                Capsules = medicalDb.tbl_CapsuleMachines.ToList(),
                Tablets = medicalDb.tbl_TabletMachine.ToList(),
                Liquids = medicalDb.tbl_LiquidFillingMachine.ToList()
            };

            return View(products);
        }

        public IActionResult QuoteUs()
        {
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> QuoteUs(QuoteUs q)
        {
            if (ModelState.IsValid)
            {
                await medicalDb.tbl_QuoteUS.AddAsync(q);
                await medicalDb.SaveChangesAsync();
                ViewBag.Success = "Quote sent successfully!";
                return View();
            }
            return View(q);
        }


        public IActionResult Career()
        {
            return View();
        }



        //Career Register and Login

        [HttpPost]
        public async Task<IActionResult> Register(Candidate c)
        {
            if (!ModelState.IsValid)
            {
                return View("Career", c);
            }

            try
            {
                await medicalDb.tbl_Candidates.AddAsync(c);
                await medicalDb.SaveChangesAsync();

                // Save candidate in session
                HttpContext.Session.SetString("CandidateEmail", c.Email);
                HttpContext.Session.SetInt32("CandidateId", c.Id);

                return RedirectToAction("Index", "Candidate");
            }
            catch
            {
                ViewBag.msg = "Registration failed.";
                return View("Career", c);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            var candidate = medicalDb.tbl_Candidates
                .FirstOrDefault(x => x.Email == email && x.Password == password);

            if (candidate != null)
            {
                // Store admin info in session
                HttpContext.Session.SetString("CandidateEmail", candidate.Email);
                HttpContext.Session.SetInt32("CandidateId", candidate.Id);

                return RedirectToAction("Index", "Candidate");
            }

            ViewBag.msg = "Invalid Email or Password";
            return View("AdminLogin");
        }
        
        public IActionResult Admin()
        {
            return View();
        }
        [HttpPost]
        public IActionResult A_login(string email, string password)
        {
            var candidate = medicalDb.tbl_Candidates
                .FirstOrDefault(x => x.Email == email && x.Password == password);

            if (candidate != null)
            {
                // Store admin info in session
                HttpContext.Session.SetString("CandidateEmail", candidate.Email);
                HttpContext.Session.SetInt32("CandidateId", candidate.Id);

                return RedirectToAction("Index", "Candidate");
            }

            ViewBag.msg = "Invalid Email or Password";
            return View("AdminLogin");
        }

    }
}

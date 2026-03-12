using eProject3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            await medicalDb.tbl_Candidates.AddAsync(c);
            await medicalDb.SaveChangesAsync();
            return RedirectToAction("Index", "Candidate");
        }

        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            var user = medicalDb.tbl_Candidates
                .FirstOrDefault(x => x.Email == email && x.Password == password);

            if (user != null)
            {
                HttpContext.Session.SetInt32("CandidateId", user.Id);
                return RedirectToAction("Index","Candidate");
            }

            ViewBag.msg = "Invalid Email or Password";
            return View();
        }
    }
}

using eProject3.Models;
using Microsoft.AspNetCore.Mvc;

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
            return View();
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


    }
}

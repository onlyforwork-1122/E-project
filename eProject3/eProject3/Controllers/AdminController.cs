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
            var TotalProducts =
                medicalDb.tbl_CapsuleMachines.Count() +
                medicalDb.tbl_TabletMachine.Count() +
                medicalDb.tbl_LiquidFillingMachine.Count(); // add all product tables here
                var CareerApplicants = medicalDb.tbl_Candidates.Count();
                var QuotesFeedback = medicalDb.tbl_QuoteUS.Count();
                var ContactMessages = medicalDb.tbl_Contacts.Count();

            ViewBag.Products = TotalProducts;
            ViewBag.Career = CareerApplicants;
            ViewBag.Quotes = QuotesFeedback;
            ViewBag.Contact = ContactMessages;
            return View();
        }

        public async Task<IActionResult> Careers()
        {
            var applicants = medicalDb.tbl_Candidates
        .Include(c => c.Educations)     
        .ToList();
            return View(applicants);
        }
        public async Task<IActionResult> Messages()
        {
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
            var msg = await medicalDb.tbl_Contacts.FirstOrDefaultAsync(i => i.Id == id);
            return View(msg);
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
    }
}

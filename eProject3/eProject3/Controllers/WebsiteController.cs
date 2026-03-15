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
            // Step 1: Inspect incoming data
            Console.WriteLine("==== Candidate Data ====");
            Console.WriteLine($"FirstName: {c.FirstName}");
            Console.WriteLine($"LastName: {c.LastName}");
            Console.WriteLine($"Email: {c.Email}");
            Console.WriteLine($"Password: {c.Password}");
            Console.WriteLine($"Phone: {c.Phone}");

            if (!ModelState.IsValid)
            {
                foreach (var state in ModelState)
                {
                    foreach (var error in state.Value.Errors)
                    {
                        Console.WriteLine($"Field: {state.Key}, Error: {error.ErrorMessage}");
                    }
                }
            }
            
            // Step 2: Save to DB
            try
            {
                await medicalDb.tbl_Candidates.AddAsync(c);
                await medicalDb.SaveChangesAsync();

                Console.WriteLine($"Candidate saved! ID: {c.Id}");

                HttpContext.Session.SetInt32("CandidateId", c.Id);

                return RedirectToAction("Index", "Candidate");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error saving candidate: " + ex.Message);
                return View("Career", c);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string email, string password)
        {
            var user = medicalDb.tbl_Candidates
                .FirstOrDefault(x => x.Email == email && x.Password == password);

            if (user != null)
            {
                // Create claims
                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim("CandidateId", user.Id.ToString()) // optional
        };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                // Sign in user
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    new AuthenticationProperties
                    {
                        IsPersistent = true, // optional "remember me"
                        ExpiresUtc = DateTime.UtcNow.AddHours(2)
                    });

                return RedirectToAction("Index", "Candidate");
            }

            ViewBag.msg = "Invalid Email or Password";
            return View("Career");
        }
    }
}

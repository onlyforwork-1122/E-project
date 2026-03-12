using Microsoft.AspNetCore.Mvc;

namespace eProject3.Controllers
{
    public class CandidateController : Controller
    {
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

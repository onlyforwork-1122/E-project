using eProject3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace eProject3.Controllers
{
    public class CapsuleMachineController : Controller
    {
        private readonly MedicalDbContext medicalDb;

        public CapsuleMachineController(MedicalDbContext medicalDb)
        {
            this.medicalDb = medicalDb;
        }
        public async Task<IActionResult> Index()
        {
            var cmdata = await medicalDb.tbl_CapsuleMachines.ToListAsync();
            return View(cmdata);
        }



        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CapsuleMachine cm)
        {
            if (ModelState.IsValid)
            {
                await medicalDb.tbl_CapsuleMachines.AddAsync(cm);
                await medicalDb.SaveChangesAsync();
                return RedirectToAction("Index", "CapsuleMachine");
            }
            return View(cm);
        }



        public async Task<IActionResult> Edit(int? id)
        {
            var cmdata = await medicalDb.tbl_CapsuleMachines.FindAsync(id);
            return View(cmdata);

        }

        [HttpPost]
        public async Task<IActionResult> Edit(CapsuleMachine cm)
        {
            if (ModelState.IsValid)
            {
                medicalDb.tbl_CapsuleMachines.Update(cm);
                await medicalDb.SaveChangesAsync();
                return RedirectToAction("Index", "CapsuleMachine");
            }
            return View(cm);
        }




        public async Task<IActionResult> Details(int? id)
        {
            var cmdata = await medicalDb.tbl_CapsuleMachines.FirstOrDefaultAsync(x => x.Id == id);
            return View(cmdata);

        }




        public async Task<IActionResult> Delete(int? id)
        {
            var cmdata = await medicalDb.tbl_CapsuleMachines.FirstOrDefaultAsync(x => x.Id == id);
            return View(cmdata);

        }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int? id)
        {
            var cmdata = await medicalDb.tbl_CapsuleMachines.FindAsync(id);
            if (cmdata != null)
            {
                medicalDb.tbl_CapsuleMachines.Remove(cmdata);
                await medicalDb.SaveChangesAsync();
                return RedirectToAction("Index", "CapsuleMachine");
            }
            return View(cmdata);
        }
    }
}

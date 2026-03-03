using eProject3.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eProject3.Controllers
{
    public class LiquidFillingMachineController : Controller
    {
        private readonly MedicalDbContext medicalDb;

        public LiquidFillingMachineController(MedicalDbContext medicalDb)
        {
            this.medicalDb = medicalDb;
        }
        public async Task<IActionResult> Index()
        {
            var lfmdata = await medicalDb.tbl_LiquidFillingMachine.ToListAsync();
            return View(lfmdata);
        }

        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(LiquidFillingMachine lfm)
        {
            if (ModelState.IsValid)
            {
                await medicalDb.tbl_LiquidFillingMachine.AddAsync(lfm);
                await medicalDb.SaveChangesAsync();
                return RedirectToAction("Index", "LiquidFillingMachine");
            }
            return View(lfm);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            var lfmdata = await medicalDb.tbl_LiquidFillingMachine.FindAsync(id);
            return View(lfmdata);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(LiquidFillingMachine lfm)
        {
            if (ModelState.IsValid)
            {
                medicalDb.tbl_LiquidFillingMachine.Update(lfm);
                await medicalDb.SaveChangesAsync();
                return RedirectToAction("Index", "LiquidFillingMachine");
            }
            return View(lfm);
        }

        public async Task<IActionResult> Details(int? id)
        {
            var lfmdata = await medicalDb.tbl_LiquidFillingMachine.FirstOrDefaultAsync(x => x.Id == id);
            return View(lfmdata);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            var lfmdata = await medicalDb.tbl_LiquidFillingMachine.FirstOrDefaultAsync(x => x.Id == id);
            return View(lfmdata);
        }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int? id)
        {
            var lfm = await medicalDb.tbl_LiquidFillingMachine.FindAsync(id);
            if (lfm != null)
            {
                medicalDb.tbl_LiquidFillingMachine.Remove(lfm);
                await medicalDb.SaveChangesAsync();
                return RedirectToAction("Index", "LiquidFillingMachine");
            }
            return View(lfm);
        }
    }
}
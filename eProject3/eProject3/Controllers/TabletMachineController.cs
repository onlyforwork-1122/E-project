using eProject3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;


namespace eProject3.Controllers
{
    public class TabletMachineController : Controller
    {
        private readonly MedicalDbContext medicalDb;

        public TabletMachineController(MedicalDbContext medicalDb)
        {
            this.medicalDb = medicalDb;
        }

        public async Task<IActionResult> Index()
        {
            var tmdata = await medicalDb.tbl_TabletMachine.ToListAsync();
            return View(tmdata);
        }




        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(TabletMachine tm)
        {
            if (ModelState.IsValid)
            {
                await medicalDb.tbl_TabletMachine.AddAsync(tm);
                await medicalDb.SaveChangesAsync();
                return RedirectToAction("Index", "TabletMachine");
            }
            return View(tm);
        }



        public async Task<IActionResult> Edit(int? id)
        {
            var tmdata = await medicalDb.tbl_TabletMachine.FindAsync(id);
            return View(tmdata);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(TabletMachine tm)
        {
            if (ModelState.IsValid)
            {
                medicalDb.tbl_TabletMachine.Update(tm);
                await medicalDb.SaveChangesAsync();
                return RedirectToAction("Index", "TabletMachine");
            }
            return View(tm);
        }



        public async Task<IActionResult> Details(int? id)
        {
            var tmdata = await medicalDb.tbl_TabletMachine.FirstOrDefaultAsync(x => x.Id == id);
            return View(tmdata);
        }



        public async Task<IActionResult> Delete(int? id)
        {
            var tmdata = await medicalDb.tbl_TabletMachine.FirstOrDefaultAsync(x => x.Id == id);
            return View(tmdata);
        }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int? id)
        {
            var tmdata = await medicalDb.tbl_TabletMachine.FindAsync(id);

            if (tmdata !=null)
            {
                medicalDb.tbl_TabletMachine.Remove(tmdata);
                await medicalDb.SaveChangesAsync();
                return RedirectToAction("Index", "TabletMachine");
            }
            return View(tmdata);

        }
    }
}
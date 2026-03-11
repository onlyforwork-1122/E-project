using Microsoft.EntityFrameworkCore;

namespace eProject3.Models
{
    public class MedicalDbContext : DbContext
    {
        public MedicalDbContext(DbContextOptions options) : base(options)
        {

        }

       
         public DbSet<CapsuleMachine> tbl_CapsuleMachines { get; set; }
         public DbSet<TabletMachine> tbl_TabletMachine{ get; set; }
         public DbSet<LiquidFillingMachine> tbl_LiquidFillingMachine { get; set; }
         public DbSet<Contact> tbl_Contacts { get; set; }   
         public DbSet<QuoteUs> tbl_QuoteUS { get; set; }
    }
}

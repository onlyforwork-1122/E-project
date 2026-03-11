using System.ComponentModel.DataAnnotations;

namespace eProject3.Models
{
    public class QuoteUs
    {
        [Key]
        public int Id { get; set; }


        [Required]
        [StringLength(50)]
        public string  Name { get; set; }


        [Required]
        [EmailAddress]
        [StringLength(50)]
        public string Email { get; set; }


        [Required]
        [StringLength(15)]
            
        public string Phone { get; set; }


        [Required]
        [StringLength(50)]
        public string  CompanyName { get; set; }


        [Required]
        [StringLength(100)]
        public string Address { get; set; }


        [Required]
        [StringLength(50)]
        public string City { get; set; }


        [Required]
        [StringLength(50)]
        [Display(Name = "State/Province")]
        public string State { get; set; }


        
        [StringLength(50)]
        public string PostalCode { get; set; }


        [Required]
        
        public country Country { get; set; }


        [Required]
        [StringLength(200)]
        public string Comments { get; set; }
    }


    public enum country
        {
                Pakistan,
                India,
                Bangladesh,
                UnitedStates,
                UnitedKingdom,
                Canada,
                Australia,
                Nepal
         }
   
}

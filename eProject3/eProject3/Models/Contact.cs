using System.ComponentModel.DataAnnotations;

namespace eProject3.Models
{
    public class Contact
    {

        [Key]
        public int Id { get; set; }



        [Required]
        [StringLength(50)]
        public string Name { get; set; }



        [Required]
        [StringLength(50)]
        [EmailAddress]
        public string Email { get; set; }



        [Required]
        [StringLength(15)]
        public string Phone { get; set; }



        [Required]
        [StringLength(100)]
        public string Subject { get; set; }



        [Required]
        [StringLength(100)]
        public string Message { get; set; }


    }
}

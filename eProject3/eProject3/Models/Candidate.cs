using System.ComponentModel.DataAnnotations;

namespace eProject3.Models
{
    public class Candidate
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }


        [Required]
        public string Phone { get; set; }

        [Required]
        public string DateOfBirth { get; set; }

        [Required]
        public gender Gender { get; set; }

        [Required]
        public string StreetAddress{ get; set; }

        [Required]
        public string City{ get; set; }


        [Required]

        public string PostalCode{ get; set; }

        [Required]
        public string Country{ get; set; }

        [Required]

        public string Province{ get; set; }

        public ICollection<CandidateDetails> CandidateDetails { get; set; } = new List<CandidateDetails>();
    }

    public enum gender
    {
        Male,
        Female,
        Other

    } 

}

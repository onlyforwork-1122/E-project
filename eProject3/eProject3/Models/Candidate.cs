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

        public string Phone { get; set; }

        public ICollection<CandidateDetails> CandidateDetails { get; set; } = new List<CandidateDetails>();
    }
}

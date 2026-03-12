using System.ComponentModel.DataAnnotations;

namespace eProject3.Models
{
    public class Candidate
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public ICollection<CandidateDetails> CandidateDetails { get; set; }
    }
}

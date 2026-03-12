using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eProject3.Models
{
    public class CandidateDetails
    {
        [Key]
        public int Id { get; set; }

        public int CandidateId { get; set; }

        [ForeignKey("CandidateId")]
        public Candidate Candidate { get; set; }


        [Required]
        [StringLength(15)]
        public string Phone { get; set; }


        [Required]
        [StringLength(100)]
        public string Address { get; set; }


        [Required]
        [StringLength(50)]
        public string City { get; set; }


        [Required]
        [StringLength(50)]
        public string Country { get; set; }
    }
}

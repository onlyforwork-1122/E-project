using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eProject3.Models
{
    public class CandidateEducation
    {

        [Key]
        public int Id { get; set; }

        public int CandidateId { get; set; }

        [ForeignKey("CandidateId")]
        public Candidate Candidate { get; set; }


        [Required]
        [StringLength(200)]
        public string Degree { get; set; }


        [Required]
        [StringLength(200)]
        public string Institute { get; set; }

        public string Year { get; set; }
    }
}

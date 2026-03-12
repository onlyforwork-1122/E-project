using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eProject3.Models
{
    public class CandidateResume
    {
        [Key]
        public int Id { get; set; }


        public int CandidateId { get; set; }

        [ForeignKey("CandidateId")]
        public Candidate Candidate { get; set; }


        [Required]
        public string ResumeFile { get; set; }
    }
}

using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eProject3.Models
{
    public class CandidateEducation
    {
        public int Id { get; set; }
        [ForeignKey("Candidate")]
        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }
        public string Degree { get; set; }
        public string Institution { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public string Grade { get; set; }
    }
}

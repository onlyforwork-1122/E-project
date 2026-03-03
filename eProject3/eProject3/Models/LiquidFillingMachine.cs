using System.ComponentModel.DataAnnotations;

namespace eProject3.Models
{
    public class LiquidFillingMachine
    {
         
        [Key]
        public int Id { get; set; }

        // Model Name (e.g., DHF - Double Headed Filler)
        [Required]
        [StringLength(100)]
        [Display(Name = "Model Name")]
        public string ModelName { get; set; }

        // Air Pressure (e.g., 0.4 - 0.6 MPa)
        [Required]
        [Display(Name = "Air Pressure")]
        public double AirPressure { get; set; }

        // Air Volume (e.g., 0.1 m³/min)
        [Required]
        [Display(Name = "Air Volume")]
        public double AirVolume { get; set; }

        // Filling Speed (Bottles per Minute)
        [Required]
        [Display(Name = "Filling Speed (Bottles / Minute)")]
        public int FillingSpeedPerMinute { get; set; }

        // Filling Range (in ml)
        [Required]
        [Display(Name = "Filling Range (ml)")]
        public string FillingRangeML { get; set; }

        // Optional Description
        [StringLength(500)]
        public string Description { get; set; }
    }
}


using System.ComponentModel.DataAnnotations;

namespace eProject3.Models
{
    public class TabletMachine
    {
        [Key]
        public int Id { get; set; }

        // Model Number (e.g., TDP, VSP, CP 501)
        [Required]
        [StringLength(100)]
        [Display(Name = "Model Number")]
        public string ModelNumber { get; set; }

        // Number of Dies (e.g., 1 Set, 2 Set)
        [Required]
        [Display(Name = "Number of Dies")]
        public int Dies { get; set; }

        // Maximum Pressure
        [Required]
        [Display(Name = "Max Pressure")]
        public double MaxPressure { get; set; }

        // Maximum Diameter of Tablet in mm
        [Required]
        [Display(Name = "Max Diameter (mm)")]
        public double MaxDiameterMM { get; set; }

        // Maximum Depth of Fill in mm
        [Required]
        [Display(Name = "Max Depth of Fill (mm)")]
        public double MaxDepthFillMM { get; set; }

        // Production Capacity (e.g., tablets per hour)
        [Required]
        [Display(Name = "Production Capacity")]
        public int ProductionCapacity { get; set; }

        // Machine Size (e.g., 120x80x150 cm)
        [Required]
        [StringLength(150)]
        [Display(Name = "Machine Size")]
        public string MachineSize { get; set; }

        // Net Weight in KG
        [Required]
        [Display(Name = "Net Weight (kg)")]
        public double NetWeightKG { get; set; }

        // Optional Description
        [StringLength(500)]
        public string Description { get; set; }
    }
}

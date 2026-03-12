using System.ComponentModel.DataAnnotations;

namespace eProject3.Models
{
    public class CapsuleMachine
    {
        [Key]
        public int Id { get; set; }

        // Product Name (e.g., Profill 100)
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        // Output (e.g., 2000 capsules/hour)
        [Required]
        [Display(Name = "Output (per/hr)")]
        public int OutputPerHour { get; set; }

        // Capsule Size in mm
        [Required]
        [Display(Name = "Capsule Size (mm)")]
        public double CapsuleSizeMM { get; set; }

        // Machine Dimension (L x W x H)
        [Required]
        [StringLength(150)]
        public string MachineDimension { get; set; }

        // Shipping Weight in KG
        [Required]
        [Display(Name = "Shipping Weight (kg)")]
        public double ShippingWeightKG { get; set; }

        // Optional Description
        [StringLength(500)]
        public string Description { get; set; }
    }
}

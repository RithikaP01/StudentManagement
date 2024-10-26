using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentManagement.Models
{
    public class Student
    {
        [Key]
        public int StudentId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int SubjectId { get; set; }  // Foreign key to Subject

        [Required]
        public int Grade { get; set; }

        [NotMapped]  // Mark this as computed in the database, so we handle it ourselves
        public string Remarks { get; set; }

        // Navigation property to represent the relationship between Student and Subject
        public virtual Subject Subject { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace StudentManagement.Models
{
    public class Subject
    {
        [Key]
        public int SubjectId { get; set; }

        [Required]
        public string Name { get; set; }
    }
}

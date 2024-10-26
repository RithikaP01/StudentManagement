using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagement.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentGradesBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly SchoolContext _context;

        public StudentsController(SchoolContext context)
        {
            _context = context;
        }

        // GET: api/students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents(string search = "", string filter = "")
        {
            var students = await _context.Students.Include(s => s.Subject).ToListAsync();

            if (!string.IsNullOrEmpty(search))
            {
                students = students.Where(s => s.Name.Contains(search, StringComparison.OrdinalIgnoreCase)).ToList();
            }

            if (filter == "PASS")
            {
                students = students.Where(s => s.Grade >= 75).ToList();
            }
            else if (filter == "FAIL")
            {
                students = students.Where(s => s.Grade < 75).ToList();
            }

            return Ok(students);
        }

    }
}

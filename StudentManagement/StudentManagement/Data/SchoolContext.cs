// Data/SchoolContext.cs
using Microsoft.EntityFrameworkCore;
using StudentManagement.Models;

public class SchoolContext : DbContext
{
    public SchoolContext(DbContextOptions<SchoolContext> options) : base(options) { }

    public DbSet<Student> Students { get; set; }
    public DbSet<Subject> Subjects { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>()
            .HasOne(s => s.Subject)
            .WithMany()
            .HasForeignKey(s => s.SubjectId);

        modelBuilder.Entity<Student>()
            .Property(s => s.Remarks)
            .HasComputedColumnSql("CASE WHEN Grade >= 75 THEN 'PASS' ELSE 'FAIL' END");
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using P01_StudentSystem.Data.Models;

namespace P01_StudentSystem.Data
{
    public class StudentConfig : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.HasKey(e => e.StudentId);

            builder.Property(e => e.Name)
            .IsRequired()
            .IsUnicode()
            .HasMaxLength(100);

            builder.Property(e => e.PhoneNumber)
            .IsRequired(false)
            .IsUnicode(false)
            .HasColumnType("CHAR(10)");

            builder.Property(e => e.RegisteredOn)
            .HasColumnType("DATETIME2");

            builder.Property(e => e.Birthday)
            .IsRequired(false);
        }
    }
}

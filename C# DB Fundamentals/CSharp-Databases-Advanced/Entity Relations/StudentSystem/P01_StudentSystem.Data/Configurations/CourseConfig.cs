using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using P01_StudentSystem.Data.Models;

namespace P01_StudentSystem.Data
{
    public class CourseConfig : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasKey(e => e.CourseId);

            builder.Property(e => e.Name)
                .IsRequired()
                .IsUnicode()
                .HasMaxLength(80);

            builder.Property(e => e.Description)
                .IsRequired(false)
                .IsUnicode();

            builder.Property(p => p.StartDate)
               .HasColumnType("DATETIME2");

            builder.Property(p => p.EndDate)
                .HasColumnType("DATETIME2");
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using P01_StudentSystem.Data.Models;

namespace P01_StudentSystem.Data
{
    public class ResourceConfig : IEntityTypeConfiguration<Resource>        
    {
        public void Configure(EntityTypeBuilder<Resource> builder)
        {
            builder.HasKey(e => e.ResourceId);

            builder.Property(e => e.Name)
                .IsRequired()
                .IsUnicode()
                .HasMaxLength(50);

            builder.Property(e => e.Url)
                .IsUnicode(false);

            builder.HasOne(e => e.Course)
                .WithMany(c => c.Resources)
                .HasForeignKey(e => e.CourseId);
        }
    }
}

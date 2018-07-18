using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using P01_BillsPaymentSystem.Data.Models;

namespace P01_BillsPaymentSystem.Data.EntityConfig
{
    class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(e => e.UserId);

            builder.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(true)
                .IsRequired(true);

            builder.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(true)
                .IsRequired(true);

            builder.Property(e => e.Email)
                .HasMaxLength(80)
                .IsUnicode(false)
                .IsRequired(true);

            builder.Property(e => e.Password)
                .HasMaxLength(25)
                .IsUnicode(false)
                .IsRequired(true);
        }
    }
}

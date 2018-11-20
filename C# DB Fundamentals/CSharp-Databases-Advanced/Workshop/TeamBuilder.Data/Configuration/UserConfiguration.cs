using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using TeamBuilder.Models;

namespace TeamBuilder.Data.Configuration
{
    class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(e => e.Username)
                .IsUnique();

            builder.HasMany(e => e.CreatedEvents)
                .WithOne(e => e.Creator)
                .HasForeignKey(e => e.CreatorId);
        }
    }
}

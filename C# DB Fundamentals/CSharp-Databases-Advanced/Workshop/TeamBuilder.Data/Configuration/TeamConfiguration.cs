using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using TeamBuilder.Models;

namespace TeamBuilder.Data.Configuration
{
    class TeamConfiguration : IEntityTypeConfiguration<Team>
    {
        public void Configure(EntityTypeBuilder<Team> builder)
        {
            builder.HasIndex(e => e.Name)
                            .IsUnique();

            //builder.HasMany(e => e.Invitations)
            //    .WithOne(e => e.Team)
            //    .HasForeignKey(e => e.TeamId)
            //    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

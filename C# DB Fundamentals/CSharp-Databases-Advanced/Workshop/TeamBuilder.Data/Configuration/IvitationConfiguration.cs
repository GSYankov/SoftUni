using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using TeamBuilder.Models;

namespace TeamBuilder.Data.Configuration
{
    class IvitationConfiguration : IEntityTypeConfiguration<Invitation>
    {
        public void Configure(EntityTypeBuilder<Invitation> builder)
        {
            builder.HasOne(e => e.Team)
                .WithMany(t => t.Invitations)
                .HasForeignKey(e => e.TeamId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using TeamBuilder.Models;

namespace TeamBuilder.Data.Configuration
{
    class TeamEventConfiguration : IEntityTypeConfiguration<TeamEvent>
    {
        public void Configure(EntityTypeBuilder<TeamEvent> builder)
        {
            builder.HasKey(e => new { e.TeamId, e.EventId });

            builder.HasOne(e => e.Team)
                .WithMany(t => t.Events)
                .HasForeignKey(e => e.EventId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Event)
                .WithMany(e => e.ParticipatingEventTeams)
                .HasForeignKey(e => e.EventId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

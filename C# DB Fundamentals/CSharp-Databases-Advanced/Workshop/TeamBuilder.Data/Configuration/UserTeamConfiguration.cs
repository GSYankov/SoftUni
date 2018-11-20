using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using TeamBuilder.Models;

namespace TeamBuilder.Data.Configuration
{
    class UserTeamConfiguration : IEntityTypeConfiguration<UserTeam>
    {
        public void Configure(EntityTypeBuilder<UserTeam> builder)
        {
            builder.HasKey(e => new { e.UserId, e.TeamId });

            builder.HasOne(e => e.Team)
                .WithMany(t => t.Members)
                .HasForeignKey(e => e.TeamId);

            builder.HasOne(e => e.User)
                .WithMany(t => t.MemberOf)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            //builder.HasOne(e => e.User)
            //    .WithMany(u => u.CreatedUserTeams)
            //    .HasForeignKey(e => e.UserId);
        }
    }
}

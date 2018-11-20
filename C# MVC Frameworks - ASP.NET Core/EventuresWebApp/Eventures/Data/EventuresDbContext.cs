using System;
using System.Collections.Generic;
using System.Text;
using Eventures.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Eventures.Data
{
    public class EventuresDbContext : IdentityDbContext<EventuresUser, IdentityRole, string>
    {
        public DbSet<Event> Events { get; set; }

        public DbSet<UserEvents> UserEvents { get; set; }

        public virtual DbSet<EventLog> EventLog { get; set; }

        public EventuresDbContext(DbContextOptions<EventuresDbContext> options)
            : base(options)
        {
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<EventLog>(entity =>
        //    {
        //        entity.Property(e => e.Id).HasColumnName("ID");

        //        entity.Property(e => e.EventId).HasColumnName("EventID");

        //        entity.Property(e => e.LogLevel).HasMaxLength(50);

        //        entity.Property(e => e.Message).HasMaxLength(4000);
        //    });
        //}
    }
}

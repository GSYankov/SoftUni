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

        public EventuresDbContext(DbContextOptions<EventuresDbContext> options)
            : base(options)
        {
        }
    }
}

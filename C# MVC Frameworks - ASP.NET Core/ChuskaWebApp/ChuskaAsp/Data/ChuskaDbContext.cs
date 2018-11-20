using System;
using System.Collections.Generic;
using System.Text;
using ChuskaAsp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChuskaAsp.Data
{
    public class ChuskaDbContext : IdentityDbContext<ChushkaUser, IdentityRole, string>
    {

        public DbSet<Order> Orders { get; set; }

        public DbSet<Product> Products { get; set; }

        public ChuskaDbContext(DbContextOptions<ChuskaDbContext> options)
            : base(options)
        {
        }

    }
}

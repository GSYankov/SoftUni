﻿using System;
using Microsoft.EntityFrameworkCore;
using P01_BillsPaymentSystem.Data.Models;
using P01_BillsPaymentSystem.Data.EntityConfig;

namespace P01_BillsPaymentSystem.Data
{
    public class BillsPaymentSystemContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<BankAccount> BankAccounts { get; set; }

        public DbSet<CreditCard> CreditCards { get; set; }

        public DbSet<PaymentMethod> PaymentMethods { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Configuration.ConnectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());

            modelBuilder.ApplyConfiguration(new CreditCardConfiguration());

            modelBuilder.ApplyConfiguration(new PaymentMethodConfiguration());

            modelBuilder.ApplyConfiguration(new BankAccountConfiguration());
        }
    }
}

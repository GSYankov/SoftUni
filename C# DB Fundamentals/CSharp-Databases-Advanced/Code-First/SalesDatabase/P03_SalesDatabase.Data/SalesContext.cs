using System;
using Microsoft.EntityFrameworkCore;
using P03_SalesDatabase.Data.Models;

namespace P03_SalesDatabase.Data
{
    public class SalesContext : DbContext
    {
        public SalesContext()
        {
        }

        public SalesContext(DbContextOptions options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Store> Stores { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Configuration.ConnectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.ProductId);

                entity.Property(e => e.Name).
                IsRequired().
                HasMaxLength(50);

                entity.Property(e => e.Quantity).
                IsRequired();

                entity.Property(e => e.Price).
                IsRequired();

                //Added in ProductsAddColumnDescription migration
                entity.Property(e => e.Description).
                HasMaxLength(250).
                HasDefaultValue("No description");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.CustomerId);

                entity.Property(e => e.Name).
                IsRequired().
                IsUnicode().
                HasMaxLength(80);

                entity.Property(e => e.Email).
                IsUnicode(false).
                HasMaxLength(80);
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.HasKey(e => e.StoreId);

                entity.Property(e => e.Name).
                IsRequired().
                IsUnicode().
                HasMaxLength(80);
            });

            modelBuilder.Entity<Sale>(entity =>
            {
                entity.HasKey(e => e.SaleId);

                entity.Property(e => e.Date).
                HasColumnType("DATETIME2").
                //Added in SalesAddDateDefault migration
                HasDefaultValueSql("GETDATE()").
                //===============================================
                IsRequired();

                entity.HasOne(e => e.Product).
                WithMany(p => p.Sales).
                HasForeignKey(e => e.ProductId);

                entity.HasOne(e => e.Customer).
                WithMany(c => c.Sales).
                HasForeignKey(e => e.CustomerId);

                entity.HasOne(e => e.Store).
                WithMany(s => s.Sales).
                HasForeignKey(e => e.StoreId);
            });
        }
    }
}

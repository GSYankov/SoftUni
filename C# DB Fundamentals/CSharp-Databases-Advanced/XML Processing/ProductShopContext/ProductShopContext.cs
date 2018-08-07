using Microsoft.EntityFrameworkCore;
using ProductShop.Models;
using System;

namespace ProductShop.Data
{
    public class ProductShopContext : DbContext
    {
        public ProductShopContext()
        {
        }

        public ProductShopContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<CategoryProduct> CategoryProducts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Configuration.String);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CategoryProduct>().HasKey(e => new { e.CategoryId, e.ProductId });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasMany(e => e.ProductsSold)
                .WithOne(p => p.Seller)
                .HasForeignKey(e => e.SellerId);

                entity.HasMany(e => e.ProductsBought)
                .WithOne(p => p.Buyer)
                .HasForeignKey(e => e.BuyerId);
            });
        }
    }
}

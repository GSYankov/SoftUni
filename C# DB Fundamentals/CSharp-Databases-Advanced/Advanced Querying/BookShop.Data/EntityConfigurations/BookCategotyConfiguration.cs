using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using BookShop.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookShop.Data.EntityConfigurations
{
    class BookCategotyConfiguration : IEntityTypeConfiguration<BookCategory>
    {
        public void Configure(EntityTypeBuilder<BookCategory> builder)
        {
            builder.HasKey(e => new { e.BookId, e.CategoryId });

            builder.HasOne(e => e.Category)
                .WithMany(c => c.CategoryBooks)
                .HasForeignKey(e => e.CategoryId);

            builder.HasOne(e => e.Book)
               .WithMany(b => b.BookCategories)
               .HasForeignKey(e => e.BookId);
        }
    }
}


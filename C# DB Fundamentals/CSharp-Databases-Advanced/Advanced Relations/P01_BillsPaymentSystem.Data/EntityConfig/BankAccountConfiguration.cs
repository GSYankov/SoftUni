using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using P01_BillsPaymentSystem.Data.Models;

namespace P01_BillsPaymentSystem.Data.EntityConfig
{
    class BankAccountConfiguration : IEntityTypeConfiguration<BankAccount>
    {
        public void Configure(EntityTypeBuilder<BankAccount> builder)
        {
            builder.HasKey(e => e.BankAccountId);

            builder.Property(e => e.BankName)
                .HasMaxLength(50)
                .IsUnicode(true)
                .IsRequired(true);

            builder.Property(e => e.SwiftCode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .IsRequired(true);

            builder.HasOne(e => e.PaymentMethod)
                .WithOne(p => p.BankAccount)
                .HasForeignKey<PaymentMethod>(e => e.BankAccountId);
        }
    }
}

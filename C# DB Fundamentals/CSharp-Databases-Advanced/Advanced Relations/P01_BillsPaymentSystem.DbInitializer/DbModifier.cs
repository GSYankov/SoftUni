using System;
using System.Collections.Generic;
using System.IO;
using P01_BillsPaymentSystem.Data;
using P01_BillsPaymentSystem.Data.Models;

namespace P01_BillsPaymentSystem.DbInitializer
{
    public class DbModifier
    {
        public void DbReset(BillsPaymentSystemContext db)
        {
            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();
        }

        public void Seed(BillsPaymentSystemContext db)
        {

            db.Users.AddRange(Users.GetUsers());
            db.SaveChanges();
            db.CreditCards.AddRange(CreditCards.GetCreditCards());
            db.SaveChanges();
            db.BankAccounts.AddRange(BankAccounts.GetBankAccounts());
            db.SaveChanges();
            db.PaymentMethods.AddRange(PaymentMethods.GetPaymentMethods());
            db.SaveChanges();
        }

       
    }
}

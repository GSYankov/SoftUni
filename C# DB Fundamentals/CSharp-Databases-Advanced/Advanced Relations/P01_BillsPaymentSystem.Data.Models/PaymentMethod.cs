using P01_BillsPaymentSystem.Data.Models.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace P01_BillsPaymentSystem.Data.Models
{
    public class PaymentMethod
    {
        //        •	PaymentMethod:
        //o Id - PK
        //o   Type – enum (BankAccount, CreditCard)
        //o   UserId
        //o   BankAccountId
        //o   CreditCardId

        public int Id { get; set; }

        public Type Type { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        [Xor(nameof(CreditCard))]
        public int? BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }

        public int? CreditCardId { get; set; }
        public CreditCard CreditCard { get; set; }
    }
}

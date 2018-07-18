using System;
using System.Collections.Generic;
using System.Text;

namespace P01_BillsPaymentSystem.Data.Models
{
    public class CreditCard
    {
        //        •	CreditCard:
        //o CreditCardId
        //o Limit
        //o MoneyOwed
        //o LimitLeft(calculated property, not included in the database)
        //o ExpirationDate

        public int CreditCardId { get; set; }

        public decimal Limit { get; set; }

        public decimal MoneyOwed { get; set; }

        public decimal LimitLeft => this.Limit - this.MoneyOwed;

        public DateTime ExpirationDate { get; set; }

        public PaymentMethod PaymentMethod { get; set; }
    }
}

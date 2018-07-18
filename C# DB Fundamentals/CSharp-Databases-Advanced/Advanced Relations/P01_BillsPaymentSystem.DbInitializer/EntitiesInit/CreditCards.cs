using System;
using System.Collections.Generic;
using System.Text;
using P01_BillsPaymentSystem.Data.Models;

namespace P01_BillsPaymentSystem.DbInitializer
{
    class CreditCards
    {
        public static HashSet<CreditCard> GetCreditCards()
        {
            HashSet<CreditCard> creditCards = new HashSet<CreditCard>();
            Random r = new Random();

            for (int i = 0; i < 70; i++)
            {
                CreditCard card = new CreditCard()
                {
                    Limit = r.Next(4, 10) * 1000,
                    ExpirationDate = DateTime.Now.AddDays(r.Next(120, 1200)),
                    MoneyOwed = r.Next(1000, 1000000) / 100
                };
                creditCards.Add(card);
            }

            return creditCards;
        }
    }
}

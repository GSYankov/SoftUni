using System;
using System.Collections.Generic;
using System.Text;
using P01_BillsPaymentSystem.Data.Models;

namespace P01_BillsPaymentSystem.DbInitializer
{
    class PaymentMethods
    {
        public static HashSet<PaymentMethod> GetPaymentMethods()
        {
            HashSet<PaymentMethod> paymentMethods = new HashSet<PaymentMethod>();
            Random r = new Random();

            for (int i = 1; i < 30; i++)
            {
                PaymentMethod pm = new PaymentMethod()
                {
                    UserId = r.Next(1, 100),
                    Type = Data.Models.Type.BankAccount,
                    BankAccountId = i
                };

                paymentMethods.Add(pm);
            }

            for (int i = 1; i < 70; i++)
            {
                PaymentMethod pm = new PaymentMethod()
                {
                    UserId = r.Next(1, 100),
                    Type = Data.Models.Type.CreditCard,
                    CreditCardId = i,
                };

                paymentMethods.Add(pm);
            }

            return paymentMethods;
        }

    }
}

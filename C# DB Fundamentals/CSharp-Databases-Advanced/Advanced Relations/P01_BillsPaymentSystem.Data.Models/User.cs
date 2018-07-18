using System;
using System.Collections;
using System.Collections.Generic;

namespace P01_BillsPaymentSystem.Data.Models
{
    public class User
    {
        //        •	User:
        //o UserId
        //o FirstName(up to 50 characters, unicode)
        //o LastName(up to 50 characters, unicode)
        //o Email(up to 80 characters, non-unicode)
        //o Password(up to 25 characters, non-unicode)

        public User()
        {
            this.PaymentMethods = new HashSet<PaymentMethod>();
        }

        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public ICollection<PaymentMethod> PaymentMethods { get; set; }
    }
}

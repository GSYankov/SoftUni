using System;
using System.Collections.Generic;

namespace ProductShop.Models
{
    public class User
    {
        //Users have an id, first name (optional) and last name (at least 3 characters) and age (optional).

        public User()
        {
            this.ProductsSold = new HashSet<Product>();
            this.ProductsBought = new HashSet<Product>();
        }

        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int? Age { get; set; }

        public ICollection<Product> ProductsSold { get; set; }

        public ICollection<Product> ProductsBought { get; set; }
    }
}

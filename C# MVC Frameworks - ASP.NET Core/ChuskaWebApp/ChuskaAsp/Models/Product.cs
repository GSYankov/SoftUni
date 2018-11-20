using ChuskaAsp.Models.Enums;
using System.Collections.Generic;

namespace ChuskaAsp.Models
{
   public class Product
    {
        public Product()
        {
            this.Orders = new HashSet<Order>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }

        public ProdType Type { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}

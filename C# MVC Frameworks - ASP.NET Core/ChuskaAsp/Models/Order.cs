using System;
using System.Collections.Generic;

namespace ChuskaAsp.Models
{
    public class Order
    {
        public int Id { get; set; }

        public virtual ChushkaUser User { get; set; }

        public virtual Product Product { get; set; }

        public DateTime OrderedOn { get; set; } = DateTime.UtcNow;
    }
}


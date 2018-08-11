﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FastFood.Models
{
    public class OrderItem
    {
        //•	OrderId – integer, Primary Key
        //•	Order – the item’s order(required)
        //•	ItemId – integer, Primary Key
        //•	Item – the order’s item(required)
        //•	Quantity – the quantity of the item in the order(required, non-negative and non-zero)

        [Required]
        [ForeignKey("Order")]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        [Required]
        [ForeignKey("Item")]
        public int ItemId { get; set; }
        public Item Item { get; set; }

        [Range(1,int.MaxValue)]
        public int Quantity { get; set; }
    }
}

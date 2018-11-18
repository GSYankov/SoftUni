using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChuskaAsp.Models
{
    public class ChushkaUser : IdentityUser
    {
        public ChushkaUser()
        {
            this.Orders = new HashSet<Order>();
        }

        public string FullName { get; set; }

        public DateTime DateOfRegistration { get; set; } = DateTime.UtcNow;

        public virtual ICollection<Order> Orders { get; set; }
    }
}

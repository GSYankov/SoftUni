using ChuskaAsp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChuskaAsp.ViewModels
{
    public class AllOrdersViewModel
    {
        public ICollection<OrderViewModel> Orders { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChuskaAsp.ViewModels
{
    public class OrderViewModel
    {
        public int Id { get; set; }

        public string Product { get; set; }

        public string User { get; set; }

        public string OrderedOn { get; set; }
    }
}

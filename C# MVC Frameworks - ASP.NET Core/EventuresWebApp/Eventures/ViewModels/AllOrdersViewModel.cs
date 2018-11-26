using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.ViewModels
{
    public class AllOrdersViewModel
    {
        public ICollection<AllOrderViewModel> Orders { get; set; }
    }
}

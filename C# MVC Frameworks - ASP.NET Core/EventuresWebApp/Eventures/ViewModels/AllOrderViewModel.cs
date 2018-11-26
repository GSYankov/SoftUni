using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.ViewModels
{
    public class AllOrderViewModel
    {
        public string Event { get; set; }

        public string Customer { get; set; }

        public DateTime CreatedOn { get; set; }

        public int Tickets { get; set; }
    }
}

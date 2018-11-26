using Eventures.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.ViewModels
{
    public class OrderViewModel
    {
        public string EventId { get; set; }
    
        public string Name { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public EventuresUser Customer { get; set; }

        public int Tickets { get; set; }
    }
}

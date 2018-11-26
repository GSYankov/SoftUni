using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.ViewModels
{
    public class EventsViewModel
    {
        public IEnumerable<EventViewModel> AllEvents { get; set; }
    }
}

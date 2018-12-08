using Eventures.Models;
using System.Collections.Generic;

namespace Eventures.ViewModels
{
    public class AllEventsViewModel
    {
        public IEnumerable<Event> AllEvents { get; set; }
    }
}

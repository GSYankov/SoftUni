﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.ViewModels
{
    public class EventViewModel : Models.Event
    {
        public EventViewModel(int totalTickets) : base(totalTickets)
        {
        }

        public int Tickets { get; set; }

        public decimal Price { get; set; }
    }
}

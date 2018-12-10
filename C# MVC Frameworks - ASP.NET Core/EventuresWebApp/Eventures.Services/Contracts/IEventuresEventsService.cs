using Eventures.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eventures.Services.Contracts
{
    public interface IEventuresEventsService
    {
        Event FindById(string id);

        DbSet<Event> GetAllEvents();

        void AddEvent(Event evt);
    }
}

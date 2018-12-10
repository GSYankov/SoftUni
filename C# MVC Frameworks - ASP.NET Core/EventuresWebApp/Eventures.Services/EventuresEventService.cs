using Eventures.Data;
using Eventures.Models;
using Eventures.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eventures.Services
{
    public class EventuresEventService : EventuresBaseService, IEventuresEventsService
    {
        public EventuresEventService(EventuresDbContext db) : base(db) { }

        public void AddEvent(Event evt)
        {
            this.db.Events.Add(evt);
            this.db.SaveChanges();
        }

        public Event FindById(string id) => this.db.Events.FirstOrDefault(e => e.Id.ToString() == id);

        public DbSet<Event> GetAllEvents() => this.db.Events;
    }
}

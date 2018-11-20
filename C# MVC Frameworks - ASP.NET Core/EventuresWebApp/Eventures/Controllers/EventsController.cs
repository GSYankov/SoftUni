using Eventures.Data;
using Eventures.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.Controllers
{
    [Authorize]
    public class EventsController : Controller
    {
        private readonly EventuresDbContext db;

        public EventsController(EventuresDbContext context)
        {
            this.db = context;
        }

        public IActionResult AllEvents()
        {
            var events = this.db.Events.ToList();
            var model = new AllEventsViewModel
            {
                AllEvents = events
            };

            return View(model);
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Create()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        [AutoValidateAntiforgeryToken]
        [HttpPost]
        public IActionResult Create(CreateEventViewModel model)
        {
            if (ModelState.IsValid)
            {
                var newEvent = new Eventures.Models.Event
                {
                    Name = model.Name,
                    Place = model.Place,
                    Start = model.Start,
                    End = model.End,
                    TotalTickets = model.TotalTickets,
                    PricePerTicket = model.PricePerTicket
                };

                this.db.Events.Add(newEvent);
                this.db.SaveChanges();
            }

            return RedirectToAction("AllEvents", "Events");
        }

    }
}

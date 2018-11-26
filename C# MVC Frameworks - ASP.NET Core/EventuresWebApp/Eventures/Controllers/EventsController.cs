using CSCoreLogging.LogProvider;
using Eventures.Data;
using Eventures.Models;
using Eventures.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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

        private readonly ILogger<EventsController> _logger;

        private readonly UserManager<EventuresUser> userManager;

        public EventsController(EventuresDbContext context,
            ILogger<EventsController> logger,
            UserManager<EventuresUser> userManager)
        {
            this.db = context;
            this._logger = logger;
            this.userManager = userManager;
        }

        public async Task<IActionResult> AllEvents()
        {
            if (this.User.IsInRole("Admin"))
            {
                var allEvents = this.db.Events.ToList();

                var adminModel = new AllEventsViewModel
                {
                    AllEvents = allEvents
                };

                _logger.LogDebug((int)LoggingEvents.CONTROLLER_ACCESSED, "Show all events.");

                return View("AllEventsAdmin", adminModel);
            }

            var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);
            var events = this.db.Events.Select(o => new OrderViewModel
            {
                Customer = user,
                EventId = o.Id.ToString(),
                Name = o.Name,
                Start = o.Start,
                End = o.End,
                Tickets = 0
            }).ToList();

            var model = new OrdersViewModel
            {
                Orders = events
            };

            _logger.LogDebug((int)LoggingEvents.CONTROLLER_ACCESSED, "Show all events.");
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> AllEvents(OrderViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);
                var evt = this.db.Events.FirstOrDefault(e => e.Id.ToString() == model.EventId);
                var order = new Order
                {
                    Event = evt,
                    Customer = user,
                    TicketCount = model.Tickets
                };

                this.db.Orders.Add(order);
                this.db.SaveChanges();
                return RedirectToAction("MyEvents");
            }

            return this.View();
        }

        public async Task<IActionResult> MyEvents()
        {
            var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);
            var events = this.db.Orders.Where(o => o.Customer == user).Select(o => new EventViewModel
            {
                Name = o.Event.Name,
                Start = o.Event.Start,
                End = o.Event.End,
                Place = o.Event.Place,
                Tickets = o.TicketCount,
                Price = o.Event.PricePerTicket*o.TicketCount
            }).ToList();
            var model = new EventsViewModel
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

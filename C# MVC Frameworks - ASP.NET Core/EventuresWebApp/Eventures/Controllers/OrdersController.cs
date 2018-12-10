using Eventures.Data;
using Eventures.Models;
using Eventures.Services.Contracts;
using Eventures.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.Controllers
{
    [Authorize]
    public class OrdersController : Controller
    {
        private readonly UserManager<EventuresUser> userManager;

        private readonly IEventuresOrdersService ordersService;
        private readonly IEventuresEventsService eventService;

        public OrdersController(UserManager<EventuresUser> userManager,
            IEventuresOrdersService ordersService,
            IEventuresEventsService eventService)
        {
            this.userManager = userManager;
            this.ordersService = ordersService;
            this.eventService = eventService;
        }


        [Authorize(Roles = ("Admin"))]
        public IActionResult AllOrders()
        {
            var orders = this.ordersService.GetAllOrders().Select(o => new AllOrderViewModel
            {
                Customer = o.Customer.Email,
                Event = o.Event.Name,
                CreatedOn = o.CreatedOn,
                Tickets = o.TicketCount
            }).ToList();

            var model = new AllOrdersViewModel
            {
                Orders = orders
            };

            return this.View(model);
        }

        [HttpPost]
        [Authorize(Roles = ("User"))]
        public async Task<IActionResult> Create(OrdersViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);
                var evt = this.eventService.FindById(model.EventId);
                var order = new Order
                {
                    Event = evt,
                    Customer = user,
                    TicketCount = model.Tickets
                };

                if (evt.TicketsLeft - model.Tickets < 0)
                {
                    var myError = new MyErrorViewModel
                    {
                        ErrorMessage = $"Only {evt.TicketsLeft} tickets left for {evt.Name}"
                    };
                    return RedirectToAction("AllEvents", "Events", myError);
                }

                evt.TicketsLeft -= model.Tickets;
                this.ordersService.AddOrder(order);
                return RedirectToAction("MyEvents", "Events");
            }

            return RedirectToAction("AllEvents", "Events");
        }
    }
}

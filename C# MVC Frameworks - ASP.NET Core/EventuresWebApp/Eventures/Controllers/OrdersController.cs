using Eventures.Data;
using Eventures.Models;
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
    [Authorize(Roles = ("Admin"))]
    public class OrdersController : Controller
    {
        private readonly UserManager<EventuresUser> userManager;
        private readonly EventuresDbContext db;

        public OrdersController(UserManager<EventuresUser> userManager, EventuresDbContext db)
        {
            this.userManager = userManager;
            this.db = db;
        }
        public IActionResult AllOrders()
        {
            var orders = this.db.Orders.Select(o => new AllOrderViewModel
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
    }
}

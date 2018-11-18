using AutoMapper;
using ChuskaAsp.Data;
using ChuskaAsp.Models;
using ChuskaAsp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChuskaAsp.Controllers
{
    public class OrdersController : Controller
    {
        private readonly ChuskaDbContext db;
        private readonly IMapper mapper;
        private readonly UserManager<ChushkaUser> userManager;

        public OrdersController(ChuskaDbContext chuskaDbContext, IMapper mapper, UserManager<ChushkaUser> userManager)
        {
            this.db = chuskaDbContext;
            this.mapper = mapper;
            this.userManager = userManager;
        }

        [Authorize(Roles = "Admin")]
        public IActionResult AllOrders()
        {
            var orders = this.db.Orders
                .Include(o => o.User).Include(o => o.Product)
                .Select(o => mapper.Map<Order, OrderViewModel>(o))
                .ToList();

            var model = new AllOrdersViewModel
            {
                Orders = orders
            };

            return View("~/Views/Products/AllOrders.cshtml", model);
        }

        [Authorize]
        public async Task< IActionResult> Order(int prodId)
        {
            var product = this.db.Products.FirstOrDefault(p => p.Id == prodId);
            var user = await this.userManager.GetUserAsync(this.User);

            var order = new Order
            {
                Product = product,
                User = user
            };

            this.db.Orders.Add(order);
            db.SaveChanges();

            return Redirect("/");
        }
    }
}

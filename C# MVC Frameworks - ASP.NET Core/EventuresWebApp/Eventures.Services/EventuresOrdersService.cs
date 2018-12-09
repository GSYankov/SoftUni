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
    public class EventuresOrdersService : EventuresBaseService, IEventuresOrdersService
    {
        public EventuresOrdersService(EventuresDbContext db) : base(db){}

        DbSet<Order> IEventuresOrdersService.GetAllOrders() => this.db.Orders;

        public void AddOrder(Order order)
        {
            this.db.Orders.Add(order);
            this.db.SaveChanges();
        }

        public IQueryable<Order> GetOrdersByUser(EventuresUser user)
            => this.db.Orders.Where(o => o.Customer == user);
    }
}

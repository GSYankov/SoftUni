using Eventures.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eventures.Services.Contracts
{
    public interface IEventuresOrdersService
    {
        DbSet<Order> GetAllOrders();

        void AddOrder(Order order);

        IQueryable<Order> GetOrdersByUser(EventuresUser user);
    }
}

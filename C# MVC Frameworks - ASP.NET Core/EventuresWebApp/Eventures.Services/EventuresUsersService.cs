using Eventures.Data;
using Eventures.Models;
using Eventures.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Eventures.Services
{
    public class EventuresUsersService :EventuresBaseService, IEventuresUsersService 
    {
        public EventuresUsersService(EventuresDbContext db) : base(db){}

        public DbSet<EventuresUser> GetAllUsers() => this.db.Users;
    }
}

using Eventures.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Eventures.Services.Contracts
{
    public interface IEventuresUsersService
    {
        DbSet<EventuresUser> GetAllUsers();
    }
}

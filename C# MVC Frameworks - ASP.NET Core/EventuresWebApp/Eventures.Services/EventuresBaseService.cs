using Eventures.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Eventures.Services
{
   public class EventuresBaseService
    {
        protected readonly EventuresDbContext db;

        public EventuresBaseService(EventuresDbContext db)
        {
            this.db = db;
        }
    }
}

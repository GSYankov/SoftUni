using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.Models
{
    public class UserEvents
    {
        public int Id { get; set; }

        public virtual EventuresUser EventuresUser { get; set; }

        public virtual Event Event { get; set; }
    }
}

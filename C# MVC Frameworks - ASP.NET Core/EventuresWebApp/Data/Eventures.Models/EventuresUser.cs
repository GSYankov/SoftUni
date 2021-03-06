﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.Models
{
    public class EventuresUser: IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Ucn { get; set; }

        public virtual ICollection<UserEvents> Events { get; set; }
    }
}

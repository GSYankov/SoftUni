using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.ViewModels
{
    public class DoLoginViewModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}

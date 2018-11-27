using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Eventures.ViewModels;
using Eventures.Filters;

namespace Eventures.Controllers
{
    public class HomeController : Controller
    {
        [TypeFilter(typeof(LoggerResourceFilter))]
        public IActionResult Index()
        {
            if (this.User.Identity.Name != null)
            {
                return View("IndexRegistred");
            }

            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

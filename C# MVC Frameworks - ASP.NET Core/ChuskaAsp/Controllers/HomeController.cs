using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ChuskaAsp.Models;
using AutoMapper;
using ChuskaAsp.Data;
using ChuskaAsp.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace ChuskaAsp.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ChuskaDbContext db;
        private readonly IMapper mapper;

        public HomeController(ChuskaDbContext chuskaDbContext, IMapper mapper)
        {
            this.db = chuskaDbContext;
            this.mapper = mapper;
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            if (this.User.Identity.Name != null)
            {
                var models = this.db.Products.Select(p => mapper.Map<Product, ProductViewModel>(p)).ToList();

                return View("IndexUser", models);
            }

            return View();
        }

       

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

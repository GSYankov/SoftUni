using AutoMapper;
using ChuskaAsp.Data;
using ChuskaAsp.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using ChuskaAsp.Models;
using System.Linq;

namespace ChuskaAsp.ViewModels.UserIndex
{
    [Authorize]
    public class ProductsController : Controller
    {
        private ChuskaDbContext db { get; }

        private IMapper mapper { get; }


        public ProductsController(ChuskaDbContext context, IMapper mapper)
        {
            this.db = context;
            this.mapper = mapper;
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Create()
        {

            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Create(CrudProductViewModel model)
        {
            if (!Enum.TryParse(model.Type, out ProdType type))
            {
                return Redirect("/");
            }

            var product = mapper.Map<CrudProductViewModel, Product>(model);
            this.db.Products.Add(product);
            this.db.SaveChanges();

            return RedirectToAction("Home", "Index");
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Edit(int id)
        {
            var product = this.db.Products.FirstOrDefault(p => p.Id == id);
            var model = mapper.Map<Product, CrudProductViewModel>(product);

            return View(model);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Edit(int id, CrudProductViewModel model)
        {
            var product = this.db.Products.FirstOrDefault(p => p.Id == id);

            product.Name = model.Name;
            product.Price = decimal.Parse(model.Price);
            product.Description = model.Description;
            product.Type = Enum.Parse<ProdType>(model.Type);

            db.SaveChanges();

            return Redirect($"/Products/Details/{id}");
        }

        [Authorize(Roles = "Admin, User")]
        public IActionResult Details(int id)
        {
            var product = this.db.Products.FirstOrDefault(p => p.Id == id);
            var model = mapper.Map<Product, DetailsViewModel>(product);

            return this.View(model);
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            var product = this.db.Products.FirstOrDefault(p => p.Id == id);
            var model = mapper.Map<Product, DetailsViewModel>(product);

            return View(model);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id, string na)
        {
            var product = this.db.Products.FirstOrDefault(p => p.Id == id);
            db.Products.Remove(product);

            db.SaveChanges();
            return Redirect("/");
        }
    }
}

using Newtonsoft.Json;
using ProductShop.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace ProductShop.App
{
    public static class QueryAndExportData
    {
        public static void Q1ProductsInRange()
        {
            var context = new ProductShopContext();

            var products = context.Products
                .Where(p => p.Price >= 500 && p.Price <= 1000)
                .OrderBy(p => p.Price).
                Select(p => new
                {
                    name = p.Name,
                    price = p.Price,
                    seller = p.Seller.FirstName + " " + p.Seller.LastName ?? p.Seller.LastName
                }).ToArray();

            var jsonProducts = JsonConvert.SerializeObject(products, Formatting.Indented);

            File.WriteAllText("../../../Json/products-in-range.json", jsonProducts);
        }

        public static void Q2SuccessfullySoldProducts()
        {
            var context = new ProductShopContext();

            var users = context.Users
                              .Where(x => x.ProductsSold.Count >= 1 && x.ProductsSold != null)
                              .OrderBy(l => l.LastName)
                              .ThenBy(x => x.FirstName)
                              .Select(s => new
                              {
                                  firstName = s.FirstName,
                                  lastName = s.LastName,
                                  soldProducts = s.ProductsSold.Where(x => x.Buyer != null)
                                                               .Select(v => new
                                                               {
                                                                   name = v.Name,
                                                                   price = v.Price,
                                                                   buyerFirstName = v.Buyer.FirstName,
                                                                   buyerLastName = v.Buyer.LastName
                                                               }).ToArray()
                              }).ToArray();

            var jsonProducts = JsonConvert.SerializeObject(users, new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore
            });

            File.WriteAllText("../../../Json/users-sold-products.json", jsonProducts);
        }

        public static void Q3CategoriesByProductsCount()
        {
            var context = new ProductShopContext();

            var categories = context.Categories
                                  .OrderByDescending(x => x.CategoryProducts.Count())
                                  .Select(x => new
                                  {
                                      categoty = x.Name,
                                      productsCount = x.CategoryProducts.Count,
                                      averagePrice = x.CategoryProducts.Sum(s => s.Product.Price) / x.CategoryProducts.Count,
                                      totalRevenue = x.CategoryProducts.Sum(s => s.Product.Price)
                                  }).ToArray();

            var jsonProducts = JsonConvert.SerializeObject(categories, new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore
            });

            File.WriteAllText("../../../Json/categories-by-product.json", jsonProducts);
        }

        public static void Q4UsersAndProducts()
        {
            var context = new ProductShopContext();

            var users = new
            {
                userCount = context.Users.Count(),
                users = context.Users
                               .OrderByDescending(x => x.ProductsSold.Count)
                               .ThenBy(l => l.LastName)
                               .Where(x => x.ProductsSold.Count >= 1 && x.ProductsSold.Any(s => s.Buyer != null))
                               .Select(u => new
                               {
                                   firstName = u.FirstName,
                                   lastName = u.LastName,
                                   age = u.Age,
                                   soldProducts = new
                                   {
                                       count = u.ProductsSold.Count,
                                       products = u.ProductsSold.Select(s => new
                                       {
                                           name = s.Name,
                                           price = s.Price
                                       }).ToArray()
                                   }
                               }).ToArray()
            };

            var jsonProducts = JsonConvert.SerializeObject(users, new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore
            });

            File.WriteAllText("../../../Json/users-and-products.json", jsonProducts);
        }
    }
}


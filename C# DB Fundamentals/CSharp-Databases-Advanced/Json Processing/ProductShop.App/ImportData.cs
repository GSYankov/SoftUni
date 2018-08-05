using AutoMapper;

using ProductShop.Data;
using ProductShop.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System;

namespace ProductShop.App
{
    public static class ImportData
    {
        public static void ImportUsers()
        {
            //var config = new MapperConfiguration(cfg =>
            //{
            //    cfg.AddProfile<ProductShopProfile>();
            //});
            //var mapper = config.CreateMapper();

            var context = new ProductShopContext();

            var jsonString = File.ReadAllText("../../../Json/users.json");

            var deserializedUsers = JsonConvert.DeserializeObject<User[]>(jsonString);

            List<User> users = new List<User>();

            foreach (var user in deserializedUsers)
            {
                if (IsValid(user))
                {
                    users.Add(user);
                }
            }

            context.Users.AddRange(users);
            context.SaveChanges();
        }

        public static void ImportProducts()
        {
            var context = new ProductShopContext();

            var jsonString = File.ReadAllText("../../../Json/products.json");

            var deserializedProducts = JsonConvert.DeserializeObject<Product[]>(jsonString);

            List<Product> products = new List<Product>();

            foreach (var product in deserializedProducts)
            {
                if (!IsValid(product))
                {
                    continue;
                }

                var sellerId = new Random().Next(1, 35);
                var bayerId = new Random().Next(35, 57);

                var random = new Random().Next(1, 4);

                product.SellerId = sellerId;
                product.BuyerId = bayerId;

                if (random == 3)
                {
                    product.BuyerId = null;
                }

                products.Add(product);
            }

            context.Products.AddRange(products);
            context.SaveChanges();
        }

        public static void ImportCategories()
        {
            var context = new ProductShopContext();

            var jsonString = File.ReadAllText("../../../Json/categories.json");

            var deserializedProduct = JsonConvert.DeserializeObject<Category[]>(jsonString);

            List<Category> categories = new List<Category>();

            foreach (var categoty in deserializedProduct)
            {
                if (!IsValid(categoty))
                {
                    continue;
                }

                categories.Add(categoty);
            }

            context.Categories.AddRange(categories);
            context.SaveChanges();
        }

        public static void ImportCategoryProducts()
        {
            var context = new ProductShopContext();

            List<CategoryProduct> categoryProducts = new List<CategoryProduct>();

            for (int productId = 1; productId <= 200; productId++)
            {
                var categoryId = new Random().Next(1, 12);

                var categoryProduct = new CategoryProduct
                {
                    CategoryId = categoryId,
                    ProductId = productId
                };

                categoryProducts.Add(categoryProduct);
            }

            context.CategoryProducts.AddRange(categoryProducts);
            context.SaveChanges();
        }


        public static bool IsValid(object obj)
        {
            var validationContext = new System.ComponentModel.DataAnnotations.ValidationContext(obj);
            var result = new List<ValidationResult>();

            return Validator.TryValidateObject(obj, validationContext, result, true);
        }
    }
}

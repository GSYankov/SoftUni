using AutoMapper;
using ProductShop.App.Dtos;
using ProductShop.Models;
using System;
using System.IO;
using System.Xml.Serialization;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using ProductShop.Data;

namespace ProductShop.App
{
    public class ImportData
    {
        public static void Users()
        {
            var config = new MapperConfiguration(cfg => { cfg.AddProfile<ProductShopProfile>(); });
            var mapper = config.CreateMapper();

            var xmlString = File.ReadAllText("../../../Xml/users.xml");

            var serializer = new XmlSerializer(typeof(UserDto[]), new XmlRootAttribute("users"));

            var deserializedUsers = (UserDto[])serializer.Deserialize(new StringReader(xmlString));

            var users = new List<User>();

            foreach (var userDto in deserializedUsers)
            {
                if (!isValid(userDto))
                {
                    continue;
                }
                var user = mapper.Map<User>(userDto);

                users.Add(user);
            }

            var context = new ProductShopContext();
            context.Users.AddRange(users);
            context.SaveChanges();
        }

        public static void Products()
        {
            var config = new MapperConfiguration(cfg => { cfg.AddProfile<ProductShopProfile>(); });
            var mapper = config.CreateMapper();

            var xmlString = File.ReadAllText("../../../Xml/products.xml");

            var serializer = new XmlSerializer(typeof(ProductDto[]), new XmlRootAttribute("products"));

            var deserializedProducts = (ProductDto[])serializer.Deserialize(new StringReader(xmlString));

            var products = new List<Product>();

            int counter = 1;
            foreach (var productDto in deserializedProducts)
            {
                if (!isValid(productDto))
                {
                    continue;
                }
                var product = mapper.Map<Product>(productDto);

                var bayerId = new Random().Next(1, 30);
                var sellerId = new Random().Next(31, 56);
                product.BuyerId = bayerId;
                product.SellerId = sellerId;

                if (counter == 4)
                {
                    product.BuyerId = null;
                    counter = 0;
                }

                counter++;

                products.Add(product);
            }

            var context = new ProductShopContext();
            context.Products.AddRange(products);
            context.SaveChanges();
        }

        public static void Categories()
        {
            var config = new MapperConfiguration(cfg => { cfg.AddProfile<ProductShopProfile>(); });
            var mapper = config.CreateMapper();

            var xmlString = File.ReadAllText("../../../Xml/categories.xml");

            var serializer = new XmlSerializer(typeof(CategoryDto[]), new XmlRootAttribute("categories"));
            var deserializedCategories = (CategoryDto[])serializer.Deserialize(new StringReader(xmlString));

            var categories = new List<Category>();

            foreach (var categoryDto in deserializedCategories)
            {
                if (!isValid(categoryDto))
                {
                    continue;
                }

                var category = mapper.Map<Category>(categoryDto);
                categories.Add(category);
            }

            var context = new ProductShopContext();
            context.Categories.AddRange(categories);
            context.SaveChanges();
        }

        public static void GenerateCategories()
        {
            var config = new MapperConfiguration(cfg => { cfg.AddProfile<ProductShopProfile>(); });
            var mapper = config.CreateMapper();

            var categoryProducts = new List<CategoryProduct>();

            for (int productId = 201; productId <= 400; productId++)
            {
                var categotyId = new Random().Next(1, 12);

                var categoryProduct = new CategoryProduct()
                {
                     CategoryId=categotyId,
                     ProductId=productId
                };

                categoryProducts.Add(categoryProduct);
            }
            var context = new ProductShopContext();
            context.CategoryProducts.AddRange(categoryProducts);
            context.SaveChanges();
        }

        private static bool isValid(object dto)
        {
            var validationContext = new System.ComponentModel.DataAnnotations.ValidationContext(dto);
            var validationResults = new List<ValidationResult>();

            return Validator.TryValidateObject(dto, validationContext, validationResults, true);
        }
    }
}

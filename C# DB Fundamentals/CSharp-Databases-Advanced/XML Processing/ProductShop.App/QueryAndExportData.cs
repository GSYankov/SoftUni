using ProductShop.App.Dtos;
using ProductShop.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using System.Xml;
namespace ProductShop.App
{
    public static class QueryAndExportData
    {
        public static void Q1ProductsInRange()
        {
            var context = new ProductShopContext();

            var products = context.Products
                .Where(p => p.Price >= 1000 && p.Price <= 2000 && p.Buyer != null)
                .OrderBy(p => p.Price)
                .Select(p => new ExpProductDto
                {
                    Name = p.Name,
                    Price = p.Price,
                    Bayar = p.Buyer.FirstName + " " + p.Buyer.LastName ?? p.Buyer.LastName
                }).ToArray();

            var sb = new StringBuilder();
            var xmlNameSpaces = new XmlSerializerNamespaces(new[] { XmlQualifiedName.Empty });
            var serializer = new XmlSerializer(typeof(ExpProductDto[]), new XmlRootAttribute("products"));
            serializer.Serialize(new StringWriter(sb), products, xmlNameSpaces);

            File.WriteAllText("../../../Xml/products-in-range.xml", sb.ToString());
        }

        public static void Q2SoldProducts()
        {
            var context = new ProductShopContext();

            var users = context.Users
                .Where(u => u.ProductsSold.Count > 0)
                .OrderBy(u => u.LastName)
                .ThenBy(u => u.FirstName)
                .Select(u => new ExpUserDto
                {
                    Firstname = u.FirstName,
                    LastName = u.LastName,
                    SoldProducts = u.ProductsSold.Select(s => new ExpSoldProduct
                    {
                        Name = s.Name,
                        Price = s.Price
                    }).ToArray()
                }).ToArray();

            var sb = new StringBuilder();
            var xmlNameSpaces = new XmlSerializerNamespaces(new[] { XmlQualifiedName.Empty });
            var serializer = new XmlSerializer(typeof(ExpUserDto[]), new XmlRootAttribute("users"));
            serializer.Serialize(new StringWriter(sb), users, xmlNameSpaces);

            File.WriteAllText("../../../Xml/users-sold-products.xml", sb.ToString());
        }

        public static void Q3CategoriesByProductsCount()
        {
            var context = new ProductShopContext();

            var categories = context.Categories
                .OrderBy(c => c.CategoryProducts.Count)
                .Select(c => new ExpCategoryDto
                {
                    Name = c.Name,
                    NumberOfProducts = c.CategoryProducts.Count,
                    AvgPrice = c.CategoryProducts.Sum(p => p.Product.Price) / c.CategoryProducts.Count,
                    TotalRevenue = c.CategoryProducts.Sum(p => p.Product.Price)
                }).ToArray();

            var sb = new StringBuilder();
            var xmlNameSpaces = new XmlSerializerNamespaces(new[] { XmlQualifiedName.Empty });
            var serializer = new XmlSerializer(typeof(ExpCategoryDto[]), new XmlRootAttribute("categories"));
            serializer.Serialize(new StringWriter(sb), categories, xmlNameSpaces);

            File.WriteAllText("../../../Xml/categories-by-products.xml", sb.ToString());
        }

        public static void Q4UsersAndProducts()
        {
            var context = new ProductShopContext();

            var users = new ExpUsersDtoQ4
            {
                Count = context.Users.Count(),
                User = context.Users
                .Where(u => u.ProductsSold.Count > 0)
                .Select(x => new ExpUserDtoQ4
                {
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Age = x.Age.ToString(),
                    SoldProduct = new ExpSoldProductQ4
                    {
                        Count = x.ProductsSold.Count(),
                        ProductDto = x.ProductsSold.Select(k => new ExpProductDtoQ4
                        {
                            Name = k.Name,
                            Price = k.Price
                        }).ToArray()
                    }
                }).ToArray()
            };

            var sb = new StringBuilder();
            var xmlNameSpaces = new XmlSerializerNamespaces(new[] { XmlQualifiedName.Empty });
            var serializer = new XmlSerializer(typeof(ExpUsersDtoQ4), new XmlRootAttribute("users"));
            serializer.Serialize(new StringWriter(sb), users, xmlNameSpaces);

            File.WriteAllText("../../../Xml/users-and-products.xml", sb.ToString());
        }
    }
}

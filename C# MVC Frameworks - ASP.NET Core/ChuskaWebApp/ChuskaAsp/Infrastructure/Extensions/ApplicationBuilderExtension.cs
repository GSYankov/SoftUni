using ChuskaAsp.Data;
using ChuskaAsp.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChuskaAsp.Infrastructure.Extensions
{
    public static class ApplicationBuilderExtension
    {
        public static IApplicationBuilder UseDatabaseMigration(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetRequiredService<ChuskaDbContext>().Database.Migrate();
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<ChushkaUser>>();
                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>>();
                var db = serviceScope.ServiceProvider.GetService<ChuskaDbContext>();

                CreateAdminAndUser(userManager, roleManager);
                SeedProducts(db);
                SeedOrders(db);
            }

            return app;
        }

        private static void SeedOrders(ChuskaDbContext db)
        {
            if (db.Orders.Count() != 0)
            {
                return;
            }

            var order = new Order
            {
                Product = db.Products.FirstOrDefault(p => p.Name == "Darmush"),
                User = db.Users.FirstOrDefault(u => u.UserName == "User")
            };

            db.Orders.Add(order);
            db.SaveChanges();

            order = new Order
            {
                Product = db.Products.FirstOrDefault(p => p.Name == "Double Darmush"),
                User = db.Users.FirstOrDefault(u => u.UserName == "User")
            };

            db.Orders.Add(order);
            db.SaveChanges();
        }

        private static void SeedProducts(ChuskaDbContext db)
        {
            if (db.Products.Count() != 0)
            {
                return;
            }

            var prodRange = new List<Product>();
            var product = new Product
            {
                Name = "Darmush",
                Price = 1.5m,
                Type = Models.Enums.ProdType.Health,
                Description = "Голям дармуш"
            };
            prodRange.Add(product);

            product = new Product
            {
                Name = "Double Darmush",
                Price = 1.9m,
                Type = Models.Enums.ProdType.Health,
                Description = "Двоен дармуш"
            };
            prodRange.Add(product);

            product = new Product
            {
                Name = "Small Darmush",
                Price = 1.01m,
                Type = Models.Enums.ProdType.Health,
                Description = "Малкият дармуш"
            };
            prodRange.Add(product);

            db.Products.AddRange(prodRange);
            db.SaveChanges();
        }

        private static void CreateAdminAndUser(UserManager<ChushkaUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            Task.Run(async () =>
            {
                var adminName = "Admin";
                var userName = "User";

                var adminRoleExists = await roleManager.RoleExistsAsync(adminName);
                var userRoleExists = await roleManager.RoleExistsAsync(userName);

                if (!adminRoleExists)
                {
                    await roleManager.CreateAsync(new IdentityRole
                    {
                        Name = adminName
                    });

                    var adminUser = await userManager.FindByNameAsync(adminName);

                    if (adminUser == null)
                    {
                        adminUser = new ChushkaUser
                        {
                            UserName = adminName,
                            Email = "admin@adminworld.som"
                        };

                        await userManager.CreateAsync(adminUser, "123456");
                        await userManager.AddToRoleAsync(adminUser, adminName);
                    }
                }

                if (!userRoleExists)
                {
                    await roleManager.CreateAsync(new IdentityRole
                    {
                        Name = userName
                    });

                    var userUser = await userManager.FindByNameAsync(userName);

                    if (userUser == null)
                    {
                        userUser = new ChushkaUser
                        {
                            UserName = userName,
                            Email = "user@user.som"
                        };

                        await userManager.CreateAsync(userUser, "123456");
                        await userManager.AddToRoleAsync(userUser, userName);
                    }
                }
            }).Wait();
        }
    }
}


using Eventures.Data;
using Eventures.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.Infrastructure.Extensions
{
    public static class ApplicationBuilderExtension
    {
        public static IApplicationBuilder UseDatabaseMigration(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                //serviceScope.ServiceProvider.GetRequiredService<EventuresDbContext>().Database.Migrate();
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<EventuresUser>>();
                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>>();
                var db = serviceScope.ServiceProvider.GetService<EventuresDbContext>();

                CreateAdminAndUser(userManager, roleManager);
                SeedEvents(db);

            }

            return app;
        }

        private static void SeedEvents(EventuresDbContext db)
        {
            if (db.Events.Count() > 0)
            {
                return;
            }
            var newEvent = new Eventures.Models.Event(999)
            {
                Name = "Mile Kitich",
                Place = "Враца",
                PricePerTicket = 19,
                Start = DateTime.UtcNow.AddDays(14),
                End = DateTime.UtcNow.AddDays(14).AddHours(6)
            };
            db.Events.Add(newEvent);
            db.SaveChanges();

            newEvent = new Eventures.Models.Event(45999)
            {
                Name = "Jon Bon Jovi",
                Place = "София",
                PricePerTicket = 99,
                Start = DateTime.UtcNow.AddDays(21),
                End = DateTime.UtcNow.AddDays(21).AddHours(6)
            };
            db.Events.Add(newEvent);
            db.SaveChanges();
        }

        private static void CreateAdminAndUser(UserManager<EventuresUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            Task.Run(async () =>
            {
                var adminName = "Admin";
                var adminRoleName = "Admin";


                var adminRoleExists = await roleManager.RoleExistsAsync(adminName);
                if (!adminRoleExists)
                {
                    await roleManager.CreateAsync(new IdentityRole
                    {
                        Name = adminRoleName
                    });
                }


                var admin = await userManager.FindByNameAsync(adminName);
                if (admin == null)
                {
                    admin = new EventuresUser
                    {
                        UserName = adminName,
                        Email = "admin@adminworld.som"
                    };
                    await userManager.CreateAsync(admin, "123456");
                    admin = await userManager.FindByNameAsync(adminName);
                    await userManager.AddToRoleAsync(admin, adminRoleName);
                }


                var userName = "User";
                var userRole = "User";

                var userRoleExists = await roleManager.RoleExistsAsync(userRole);
                if (!userRoleExists)
                {
                    await roleManager.CreateAsync(new IdentityRole
                    {
                        Name = userRole
                    });
                }

                var userUser = await userManager.FindByNameAsync(userName);
                if (userUser == null)
                {
                    userUser = new EventuresUser
                    {
                        UserName = userName,
                        Email = "user@user.som"
                    };

                    await userManager.CreateAsync(userUser, "123456");
                    userUser = await userManager.FindByNameAsync(userName);
                    await userManager.AddToRoleAsync(userUser, userRole);
                }

            }).Wait();
        }
    }
}

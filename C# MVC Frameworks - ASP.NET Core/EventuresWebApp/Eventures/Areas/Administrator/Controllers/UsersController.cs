using AutoMapper;
using Eventures.Areas.Administrator.ViewModels;
using Eventures.Data;
using Eventures.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.Areas.Administrator.Controllers
{
    [Area("Administrator")]
    [Authorize(Roles = "Admin")]
    public class UsersController : Controller
    {
        private readonly EventuresDbContext db;
        private readonly IMapper mapper;
        private readonly UserManager<EventuresUser> userManager;

        public UsersController(EventuresDbContext db, IMapper mapper, UserManager<EventuresUser> userManager)
        {
            this.db = db;
            this.mapper = mapper;
            this.userManager = userManager;
        }

        public async Task<IActionResult> UsersList()
        {
            var model = this.db.Users.Select(u => new UsersListViewModel
            {
                Id = u.Id,
                Email = u.Email,
                UserName = u.UserName
            }).ToList();
            foreach (var user in model)
            {
                var realUser = await this.userManager.FindByIdAsync(user.Id);
                if (await this.userManager.IsInRoleAsync(realUser, "Admin"))
                {
                    user.IsAdmin = true;
                }
            }

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Promote(string userId)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            await this.userManager.RemoveFromRoleAsync(user, "User");
            await this.userManager.AddToRoleAsync(user, "Admin");
            return RedirectToAction("UsersList");
        }

        [HttpPost]
        public async Task<IActionResult> Demote(string userId)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            await this.userManager.RemoveFromRoleAsync(user, "Admin");
            await this.userManager.AddToRoleAsync(user, "User");
            return RedirectToAction("UsersList");
        }
    }
}

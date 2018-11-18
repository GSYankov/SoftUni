using ChuskaAsp.Models;
using ChuskaAsp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChuskaAsp.Controllers
{
    [Authorize]
    public class UsersController : Controller
    {
        private UserManager<ChushkaUser> userManager;
        private SignInManager<ChushkaUser> signInManager;

        public UsersController(UserManager<ChushkaUser> userMgr,
                SignInManager<ChushkaUser> signinMgr)
        {
            this.userManager = userMgr;
            this.signInManager = signinMgr;
        }

        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                ChushkaUser user = await userManager.FindByNameAsync(model.Username);
                if (user != null)
                {
                    await signInManager.SignOutAsync();
                    Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(user, model.Password, true, false);
                    if (result.Succeeded)
                    {
                        return Redirect("/");
                    }
                }
            }

            return RedirectToAction("Login", "Users");
        }

        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        [AllowAnonymous]
        public async Task<IActionResult> Register()
        {

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (this.User.Identity.Name != null)
            {
                await signInManager.SignOutAsync();
            }

            var isUsernameExists = userManager.Users.FirstOrDefault(u => u.UserName == model.Username);
            if (isUsernameExists != null && model.Password == model.ConfirmPassword)
            {
                return RedirectToAction("Register", "Users", model);
            }

            var user = new ChushkaUser()
            {
                FullName = model.FullName,
                Email = model.Email,
                UserName = model.Username

            };

            await userManager.CreateAsync(user, model.Password);
            await userManager.AddToRoleAsync(user, "User");

            return RedirectToAction("Login", "Index");
        }
    }
}

using Eventures.Models;
using Eventures.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventures.Controllers
{
    public class UsersController : Controller
    {
        private UserManager<EventuresUser> userManager;
        private SignInManager<EventuresUser> signInManager;

        public UsersController(UserManager<EventuresUser> userMgr,
                SignInManager<EventuresUser> signinMgr)
        {
            userManager = userMgr;
            signInManager = signinMgr;
        }

        public IActionResult Login()
        {

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(DoLoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                EventuresUser user = await userManager.FindByNameAsync(model.Username);
                if (user != null)
                {
                    await signInManager.SignOutAsync();
                    Microsoft.AspNetCore.Identity.SignInResult result = await signInManager
                        .PasswordSignInAsync(user, model.Password, model.RememberMe, false);
                    if (result.Succeeded)
                    {
                        return Redirect(returnUrl ?? "/");
                    }
                }

                ModelState.AddModelError(nameof(DoLoginViewModel.Username), "Invalid user or password");
            }
            return View(model);
        }

        public IActionResult Register()
        {

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Register(DoRegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new EventuresUser
                {
                    UserName = model.Username,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Ucn = model.Ucn
                };

                await this.userManager.CreateAsync(user, model.Password);
                await this.userManager.AddToRoleAsync(user, "User");
                return RedirectToAction("Login", "Users");
            };


            return View(model);
        }

        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }


    }


}

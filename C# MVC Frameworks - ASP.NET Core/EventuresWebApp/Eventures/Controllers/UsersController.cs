﻿using Eventures.Models;
using Eventures.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Security.Claims;
using AutoMapper;

namespace Eventures.Controllers
{
    public class UsersController : Controller
    {
        private UserManager<EventuresUser> userManager;
        private SignInManager<EventuresUser> signInManager;
        private readonly IMapper mapper;

        public UsersController(UserManager<EventuresUser> userMgr,
                SignInManager<EventuresUser> signinMgr, IMapper mapper)
        {
            userManager = userMgr;
            signInManager = signinMgr;
            this.mapper = mapper;
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
                var user = mapper.Map<EventuresUser>(model);
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

        [AllowAnonymous]
        public IActionResult FacebookLogin(string returnUrl)
        {
            string redirectUrl = Url.Action("FacebookResponse", "Users", new { ReturnUrl = returnUrl });
            var properties = signInManager
                .ConfigureExternalAuthenticationProperties("Facebook", redirectUrl);
            return new ChallengeResult("Facebook", properties);
        }

        [AllowAnonymous]
        public async Task<IActionResult> FacebookResponse(string returnUrl = "/")
        {
            ExternalLoginInfo info = await signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return RedirectToAction(nameof(Login));
            }
            var result = await signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, false);
            if (result.Succeeded)
            {
                return Redirect(returnUrl);
            }
            else
            {
                EventuresUser user = new EventuresUser
                {
                    Email = info.Principal.FindFirst(ClaimTypes.Email).Value,
                    UserName =
                        info.Principal.FindFirst(ClaimTypes.Email).Value
                };
                IdentityResult identResult = await userManager.CreateAsync(user);
                if (identResult.Succeeded)
                {
                    identResult = await userManager.AddLoginAsync(user, info);
                    if (identResult.Succeeded)
                    {
                        await signInManager.SignInAsync(user, false);
                        return Redirect(returnUrl);
                    }
                }
                return RedirectToAction(nameof(Login));
            }
        }

    }
}

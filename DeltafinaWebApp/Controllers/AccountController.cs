using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

//using DeltafinaWebApp.Data.Archives;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Models;
using Models.Account;
using Services;
using DeltafinaWebApp.Data.Archives;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public AccountController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        private Task<ApplicationUser> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(HttpContext.User);
        }

        //
        // POST: /api/Account/Login
        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<GenericResponse> Login([FromBody]LoginModel model)//, string returnUrl = null)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    // This doesn't count login failures towards account lockout
                    // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                    var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
                    if (result.Succeeded)
                    {
                        model.Error = "Succeded";

                        return new GenericResponse
                        {
                            Status = "Succeded",
                            Value = ""
                        };
                    }
                    if (result.RequiresTwoFactor)
                    {
                        model.Error = "requirestwofactor";
                        return new GenericResponse
                        {
                            Status = "Error",
                            Value = "Requires two factor"
                        };
                    }

                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    model.Error = "Invalid login attempt";
                    return new GenericResponse
                    {
                        Status = "Error",
                        Value = "Invalid login attempt"
                    };
                }

                // If we got this far, something failed, redisplay form
                model.Error = "Invalid Model";

                return new GenericResponse
                {
                    Status = "Error",
                    Value = "Invalid Model"
                };
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        // POST: /api/Account/Register
        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<ActionResult> Register([FromBody]RegisterModel model)//, string returnUrl = null)
        {
            try
            {
                //ViewData["ReturnUrl"] = returnUrl;
                if (ModelState.IsValid)
                {
                    var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                    var result = await _userManager.CreateAsync(user, model.PasswordGroup.Password);
                    if (result.Succeeded)
                    {
                        // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
                        // Send an email with this link
                        //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                        //var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
                        //await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
                        //    $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>");
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        //_logger.LogInformation(3, "User created a new account with password.");
                        return Content("Success");
                        //return RedirectToLocal(returnUrl);
                    }
                    AddErrors(result);
                }

                // If we got this far, something failed, redisplay form
                return Content("Error");
                //return View(model);

            }
            catch (Exception ex)
            {


                throw;
            }
        }

        // POST: /api/Account/Register
        [HttpPost("[action]")]
        [AllowAnonymous]
        public ActionResult ChangePassword([FromBody]ChangePasswordModel model)//, string returnUrl = null)
        {
            try
            {
                string userId = _userManager.GetUserId(HttpContext.User);
                string userName = _userManager.GetUserName(HttpContext.User);

                UserServices userServ = new UserServices(_anaContext, _userManager, _signInManager);
                userServ.ChangePassword(model);

                return Content("Success");


            }
            catch (Exception ex)
            {

                return Content(ex.Message);
            }
        }


        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        #endregion

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using DeltafinaWebApp.Data.Archives;
using Models;
using Models.Archives;
using Models.Archives.Users;
using Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly IdentityUser _identityUser;


        public UsersController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        //public UsersController(IdentityUser identityUser)
        //{
        //    _identityUser = identityUser;
        //}

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<UserModel> GetList()
        {
            UserServices userServices = new UserServices(_anaContext, _userManager, _signInManager);
            return userServices.GetAspNetUserList();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<UserModel> GetListByPortalFarmId()
        {
            string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";
            string userId = HttpContext.Request.Query["userId"].Count > 0 ? HttpContext.Request.Query["userId"].ToString() : "";

            UserServices userServices = new UserServices(_anaContext, _userManager, _signInManager);
            return userServices.GetAspNetUserListByPortalFarmId(new Guid(portalFarmId), new Guid(userId));
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetStaffsListByPortalFarmId()
        {
            string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";

            UserServices userServices = new UserServices(_anaContext, _userManager, _signInManager);
            return userServices.GetStaffsListByPortalFarmId(new Guid(portalFarmId));
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetUsersListByPortalFarmId()
        {
            string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";

            UserServices userServices = new UserServices(_anaContext, _userManager, _signInManager);
            return userServices.GetUsersListByPortalFarmId(new Guid(portalFarmId));
        }

        // GET: Customer
        [HttpGet("[action]")]
        public UserDetailModel GetById()
        {
            string userid = HttpContext.Request.Query["userid"].Count > 0 ? HttpContext.Request.Query["userid"].ToString() : "";

            //UserServices userServices = new UserServices(ConStr.ConnectionString, _userManager, _signInManager);
            //return userServices.GetById(new Guid(userid));
            if (userid?.Length > 0)
            {
                UserServices userServices = new UserServices(_anaContext, _userManager, _signInManager);
                return userServices.GetById(new Guid(userid));
            }
            else
            {
                return null;
            }
        }

        // POST: /api/Account/Login
        [HttpGet("[action]")]
        [AllowAnonymous]
        public UserDetailModel GetUser()//, string returnUrl = null)
        {
            UserDetailModel rValue = new UserDetailModel();

            try
            {
                string userId = _userManager.GetUserId(HttpContext.User);
                string userName = _userManager.GetUserName(HttpContext.User);

                UserServices userServices = new UserServices(_anaContext, _userManager, _signInManager);
                rValue = userServices.GetById(new Guid(userId));
                rValue.Error = "Succeded";

            }
            catch (Exception ex)
            {
                rValue.Error = ex.Message;
            }

            if (rValue.UserId == null)
                rValue.Error = "Failed";

            return rValue;// View(model);
        }

        //
        // POST: /api/Account/UpdateUserSettigs
        [HttpPost("[action]")]
        [AllowAnonymous]
        public GenericResponse UpdateUser([FromBody]UserDetailModel model)//, string returnUrl = null)
        {
            try
            {
                UserServices userServices = new UserServices(_anaContext, _userManager, _signInManager);
                Guid newId = userServices.UpdateUser(model);

                return new GenericResponse
                {
                    Status = "Success",
                    Value = newId.ToString()
                };

            }
            catch (Exception ex)
            {
                return new GenericResponse
                {
                    Status = "Failed",
                    Value = ex.Message
                };
            }
        }

        //
        // POST: /api/Account/UpdateUserSettigs
        [HttpPost("[action]")]
        [AllowAnonymous]
        public GenericResponse LogParameter([FromBody]LogParameter model)//, string returnUrl = null)
        {
            try
            {
                UserServices userServices = new UserServices(_anaContext, _userManager, _signInManager);
                Guid newId = userServices.LogParameter(model);

                return new GenericResponse
                {
                    Status = "Success",
                    Value = newId.ToString()
                };

            }
            catch (Exception ex)
            {
                return new GenericResponse
                {
                    Status = "Failed",
                    Value = ex.Message
                };
            }
        }

        //
        // POST: /api/Account/UpdateUserSettigs
        [HttpPost("[action]")]
        [AllowAnonymous]
        public GenericResponse UpdateUserWithLogin([FromBody]UserDetailModel model)//, string returnUrl = null)
        {
            try
            {
                UserServices userServices = new UserServices(_anaContext, _userManager, _signInManager);
                Guid newId = userServices.UpdateUserWithLogin(model);

                return new GenericResponse
                {
                    Status = "Success",
                    Value = newId.ToString()
                };

            }
            catch (Exception ex)
            {
                return new GenericResponse
                {
                    Status = "Failed",
                    Value = ex.Message
                };
            }
        }

        [HttpPost("[action]")]
        public GenericResponse AddLoginInfo([FromBody]UserDetailModel model)//[FromBody] QuotationArchiveModel model)
        {
            try
            {
                UserServices userServices = new UserServices(_anaContext, _userManager, _signInManager);
                userServices.AddLoginInfo(model);

            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException dbEx)
            {
                return new GenericResponse
                {
                    Status = "Failed",
                    Value = dbEx.InnerException.Message
                };
            }
            catch (Exception ex)
            {
                return new GenericResponse
                {
                    Status = "Failed",
                    Value = ex.Message
                };
            }

            return new GenericResponse
            {
                Status = "Success",
                Value = ""
            };
        }

    }
}
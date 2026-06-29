using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using DeltafinaWebApp.Data.Archives;
using Microsoft.AspNetCore.Identity;
using Models;
using Models.Archives;
using Services;
using Models.Archives.Trend;
using Microsoft.AspNetCore.Authorization;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrendController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly IdentityUser _identityUser;


        public TrendController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetEnabledTrendList()
        {
            TrendServices serv = new TrendServices(_anaContext, _userManager, _signInManager);
            return serv.GetEnabledTrendList();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<TrendModel> GetTrends()
        {
            TrendServices serv = new TrendServices(_anaContext, _userManager, _signInManager);
            return serv.GetTrends();
        }

        // GET: Customer
        [HttpPost("[action]")]
        [AllowAnonymous]
        public IEnumerable<TrendLogModel> GetLogging([FromBody]TrendQueryModel model)
        {
            model.StartDate = model.StartDate.ToLocalTime();
            model.EndDate = model.EndDate.ToLocalTime();

            TrendServices serv = new TrendServices(_anaContext, _userManager, _signInManager);
            return serv.GetLogging(model);
        }

        // GET: Customer
        [HttpGet("[action]")]
        public TrendDetailModel GetByTagLogName()
        {
            string trendName = HttpContext.Request.Query["tagLogName"].Count > 0 ? HttpContext.Request.Query["tagLogName"].ToString() : "";

            if (trendName?.Length > 0)
            {
                TrendServices trendServices = new TrendServices(_anaContext, _userManager, _signInManager);
                return trendServices.GetByTagLogName(trendName);
            }
            else
            {
                return null;
            }
        }

        //
        // POST: /api/Account/UpdateUserSettigs
        [HttpPost("[action]")]
        [AllowAnonymous]
        public GenericResponse UpdateDetail([FromBody]TrendDetailModel model)//, string returnUrl = null)
        {
            try
            {
                TrendServices serv = new TrendServices(_anaContext, _userManager, _signInManager);
                string tagLogName = serv.UpdateDetail(model);

                return new GenericResponse
                {
                    Status = "Success",
                    Value = tagLogName
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

    }
}
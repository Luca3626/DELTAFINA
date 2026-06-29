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

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlcController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly IdentityUser _identityUser;


        public PlcController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetPlcList()
        {
            PlcServices serv = new PlcServices(ConStr.ConnectionString, _userManager, _signInManager);
            return serv.GetPlcList();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetPlcListByZoneId()
        {
            string zoneId = HttpContext.Request.Query["zoneId"].Count > 0 ? HttpContext.Request.Query["zoneId"].ToString() : "";

            PlcServices serv = new PlcServices(ConStr.ConnectionString, _userManager, _signInManager);
            return serv.GetPlcListByZone(int.Parse(zoneId));
        }


        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetPlcListByZoneName()
        {
            string zone = HttpContext.Request.Query["zone"].Count > 0 ? HttpContext.Request.Query["zone"].ToString() : "";

            PlcServices serv = new PlcServices(ConStr.ConnectionString, _userManager, _signInManager);
            return serv.GetPlcListByZone(zone);
        }


        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetTagstByPlc()
        {
            string plcName = HttpContext.Request.Query["plcName"].Count > 0 ? HttpContext.Request.Query["plcName"].ToString() : "";

            PlcServices serv = new PlcServices(ConStr.ConnectionString, _userManager, _signInManager);
            return serv.GetTagsByPlc(plcName);
        }
    }
}
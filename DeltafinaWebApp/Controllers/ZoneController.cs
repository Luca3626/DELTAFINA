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
    public class ZoneController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly IdentityUser _identityUser;


        public ZoneController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneACOOLList()
        {
            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneACOOLList();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneACOOLListByRecipeId()
        {
            string recipeId = HttpContext.Request.Query["recipeId"].Count > 0 ? HttpContext.Request.Query["recipeId"].ToString() : "";

            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneACOOLList(new Guid(recipeId));
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneUTAList()
        {
            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneUTAList();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneUTAListByRecipeId()
        {
            string recipeId = HttpContext.Request.Query["recipeId"].Count > 0 ? HttpContext.Request.Query["recipeId"].ToString() : "";

            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneUTAList(new Guid(recipeId));
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneRECList()
        {
            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneRECList();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneRECListByRecipeId()
        {
            string recipeId = HttpContext.Request.Query["recipeId"].Count > 0 ? HttpContext.Request.Query["recipeId"].ToString() : "";

            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneRECList(new Guid(recipeId));
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneLuxPLList()
        {
            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneLuxPLList();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneLuxPLListByRecipeId()
        {
            string recipeId = HttpContext.Request.Query["recipeId"].Count > 0 ? HttpContext.Request.Query["recipeId"].ToString() : "";

            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneLuxPLList(new Guid(recipeId));
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneLuxPPList()
        {
            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneLuxPPList();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneLuxPPListByRecipeId()
        {
            string recipeId = HttpContext.Request.Query["recipeId"].Count > 0 ? HttpContext.Request.Query["recipeId"].ToString() : "";

            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneLuxPPList(new Guid(recipeId));
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneFancoilList()
        {
            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneFancoilList();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneFancoilListByRecipeId()
        {
            string recipeId = HttpContext.Request.Query["recipeId"].Count > 0 ? HttpContext.Request.Query["recipeId"].ToString() : "";

            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetDisabledZoneFancoilList(new Guid(recipeId));
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultIntString> GetZones()
        {
            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetZones();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetZoneTypeList()
        {
            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetZoneTypeList();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetZonesByZoneType()
        {
            string zoneTypeId = HttpContext.Request.Query["zoneTypeId"].Count > 0 ? HttpContext.Request.Query["zoneTypeId"].ToString() : "";

            ZoneServices serv = new ZoneServices(_anaContext, _userManager, _signInManager);
            return serv.GetZonesByZoneType(int.Parse(zoneTypeId));
        }

    }
}
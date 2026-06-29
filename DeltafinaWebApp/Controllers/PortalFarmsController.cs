using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using DeltafinaWebApp.Data.Archives;
using Models;
using Models.Archives;
using Models.Archives.PortalFarms;
using Services;
using Microsoft.AspNetCore.Identity;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortalFarmsController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public PortalFarmsController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // GET: PortalFarm
        [HttpGet("[action]")]
        public IEnumerable<PortalFarmModel> GetList()
        {
            PortalFarmServices serv = new PortalFarmServices(_anaContext);
            return serv.GetList();
        }

        // GET: PortalFarm
        [HttpGet("[action]")]
        public PortalFarmDetailModel GetById()//[FromHeader] string id)
        {
            string id = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";

            PortalFarmServices serv = new PortalFarmServices(_anaContext);
            return serv.GetById(new Guid(id));

        }

        // GET: PortalFarm
        [HttpPost("[action]")]
        public GenericResponse UpdateDetail([FromBody] PortalFarmDetailModel model)
        {
            try
            {
                PortalFarmServices serv = new PortalFarmServices(_anaContext);
                Guid newId = serv.Update(model);

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

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetResultValueLabelDisabledModelList()
        {
            PortalFarmServices serv = new PortalFarmServices(_anaContext);
            return serv.GetResultValueLabelDisabledList();
        }

        [HttpGet("[action]")]
        public GenericResponse DeletePortalFarm()//[FromHeader] string id)
        {
            try
            {
                string portalFarmId = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";
                if (portalFarmId.Length > 0)
                {
                    PortalFarmServices serv = new PortalFarmServices(_anaContext);
                    serv.DeletePortalFarm(new Guid(portalFarmId));

                    return new GenericResponse
                    {
                        Status = "Success",
                        Value = portalFarmId
                    };
                }
                else
                    return new GenericResponse
                    {
                        Status = "Failed",
                        Value = "Company id not valid"
                    };

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
        }

    }
}
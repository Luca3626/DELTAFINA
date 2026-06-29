using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using Models;
using Models.Archives;
using Models.Archives.Warehouse.Silo;
using Services;
using DeltafinaWebApp.Data.Archives;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SilosController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public SilosController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<SiloModel> GetList()
        {
            SiloServices serv = new SiloServices(_anaContext);
            return serv.GetList();
        }

        //// GET: Company
        //[HttpGet("[action]")]
        //public IEnumerable<SiloModel> GetListByPortalFarmId()
        //{
        //    string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";

        //    SiloServices serv = new SiloServices(_anaContext);
        //    return serv.GetListByPortalFarmId(new Guid(portalFarmId));
        //}

        // GET: Company
        [HttpGet("[action]")]
        public SiloModel GetById()//[FromHeader] string id)
        {
            string id = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";

            SiloServices serv = new SiloServices(_anaContext);
            return serv.GetById(new Guid(id));
        }

        // GET: Company
        [HttpGet("[action]")]
        public SiloModel GetByProgressiveId()//[FromHeader] string id)
        {
            string id = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";

            SiloServices serv = new SiloServices(_anaContext);
            return serv.GetById(new Guid(id));
        }

        // GET: Company
        [HttpGet("[action]")]
        public SiloModel GetByCode()//[FromHeader] string id)
        {
            string code = HttpContext.Request.Query["code"].Count > 0 ? HttpContext.Request.Query["code"].ToString() : "";

            SiloServices serv = new SiloServices(_anaContext);
            return serv.GetByCode(code);
        }

        // GET: Company
        [HttpGet("[action]")]
        public SiloModel GetByName()//[FromHeader] string id)
        {
            string name = HttpContext.Request.Query["name"].Count > 0 ? HttpContext.Request.Query["name"].ToString() : "";

            SiloServices serv = new SiloServices(_anaContext);
            return serv.GetByName(name);
        }

        // GET: Company
        [HttpPost("[action]")]
        public GenericResponse UpdateDetail([FromBody] SiloModel model)
        {
            try
            {
                SiloServices serv = new SiloServices(_anaContext);
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
        public IEnumerable<ResultValueLabelDisabledModel> GetResultValueLabelDisabledList()
        {
            SiloServices serv = new SiloServices(_anaContext);
            return serv.GetResultValueLabelDisabledList();
        }

        //// GET: Customer
        //[HttpGet("[action]")]
        //public IEnumerable<ResultValueLabelDisabledModel> GetResultValueLabelDisabledListByPortalFarmId()
        //{
        //    string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";

        //    SiloServices serv = new SiloServices(_anaContext);
        //    return serv.GetResultValueLabelDisabledListByPortalFarmId(new Guid(portalFarmId));
        //}

        [HttpGet("[action]")]
        public GenericResponse DeleteSilo()//[FromHeader] string id)
        {
            try
            {
                string id = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";
                if (id.Length > 0)
                {
                    SiloServices serv = new SiloServices(_anaContext);
                    serv.DeleteSilo(new Guid(id));

                    return new GenericResponse
                    {
                        Status = "Success",
                        Value = id
                    };
                }
                else
                    return new GenericResponse
                    {
                        Status = "Failed",
                        Value = "Silo id not valid"
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using Models;
using Models.Archives;
using Models.Archives.Materials;
using Services;
using DeltafinaWebApp.Data.Archives;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialsController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public MaterialsController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<MaterialModel> GetList()
        {
            MaterialServices serv = new MaterialServices(_anaContext);
            return serv.GetList();
        }

        //// GET: Company
        //[HttpGet("[action]")]
        //public IEnumerable<MaterialModel> GetListByPortalFarmId()
        //{
        //    string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";

        //    MaterialServices serv = new MaterialServices(_anaContext);
        //    return serv.GetListByPortalFarmId(new Guid(portalFarmId));
        //}

        // GET: Company
        [HttpGet("[action]")]
        public MaterialDetailModel GetById()//[FromHeader] string id)
        {
            string id = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";

            MaterialServices serv = new MaterialServices(_anaContext);
            return serv.GetById(new Guid(id));
        }

        // GET: Company
        [HttpPost("[action]")]
        public GenericResponse UpdateDetail([FromBody] MaterialDetailModel model)
        {
            try
            {
                MaterialServices serv = new MaterialServices(_anaContext);
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
            MaterialServices serv = new MaterialServices(_anaContext);
            return serv.GetResultValueLabelDisabledList();
        }

        //// GET: Customer
        //[HttpGet("[action]")]
        //public IEnumerable<ResultValueLabelDisabledModel> GetResultValueLabelDisabledListByPortalFarmId()
        //{
        //    string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";

        //    MaterialServices serv = new MaterialServices(_anaContext);
        //    return serv.GetResultValueLabelDisabledListByPortalFarmId(new Guid(portalFarmId));
        //}

        [HttpGet("[action]")]
        public GenericResponse DeleteMaterial()//[FromHeader] string id)
        {
            try
            {
                string id = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";
                if (id.Length > 0)
                {
                    MaterialServices serv = new MaterialServices(_anaContext);
                    serv.DeleteMaterial(new Guid(id));

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
                        Value = "Material id not valid"
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
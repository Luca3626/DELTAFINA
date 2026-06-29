using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using DeltafinaWebApp.Data.Archives;
using Models;
using Models.Archives;
using Models.Archives.Company;
using Services;
using Microsoft.AspNetCore.Identity;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public CompaniesController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<CompanyModel> GetList()
        {
            CompanyServices serv = new CompanyServices(_anaContext);
            return serv.GetList();
        }

        // GET: Company
        [HttpGet("[action]")]
        public IEnumerable<CompanyModel> GetListByPortalFarmId()
        {
            string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";

            CompanyServices serv = new CompanyServices(_anaContext);
            return serv.GetListByPortalFarmId(new Guid(portalFarmId));
        }

        // GET: Company
        [HttpGet("[action]")]
        public CustomerDetailModel GetById()//[FromHeader] string id)
        {
            string id = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";

            CompanyServices serv = new CompanyServices(_anaContext);
            return serv.GetById(new Guid(id));
        }

        // GET: Company
        [HttpPost("[action]")]
        public GenericResponse UpdateDetail([FromBody] CustomerDetailModel model)
        {
            try
            {
                CompanyServices serv = new CompanyServices(_anaContext);
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
            CompanyServices serv = new CompanyServices(_anaContext);
            return serv.GetResultValueLabelDisabledList();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<ResultValueLabelDisabledModel> GetResultValueLabelDisabledListByPortalFarmId()
        {
            string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";

            CompanyServices serv = new CompanyServices(_anaContext);
            return serv.GetResultValueLabelDisabledListByPortalFarmId(new Guid(portalFarmId));
        }

        [HttpGet("[action]")]
        public GenericResponse DeleteCompany()//[FromHeader] string id)
        {
            try
            {
                string companyId = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";
                if (companyId.Length > 0)
                {
                    CompanyServices serv = new CompanyServices(_anaContext);
                    serv.DeleteCompany(new Guid(companyId));

                    return new GenericResponse
                    {
                        Status = "Success",
                        Value = companyId
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
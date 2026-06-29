using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using DeltafinaWebApp.Data.Archives;
using Microsoft.AspNetCore.Identity;
using Models;
using Models.Archives.Maintenances;
using Services;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaintenancesController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public MaintenancesController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        #region Maintenance Activities

        // GET: Maintenance
        [HttpGet("[action]")]
        public IEnumerable<MaintenanceActivityModel> GetMaintenanceActivityListByPortalFarmId()
        {
            MaintenanceServices serv = new MaintenanceServices(_anaContext);
            return serv.GetMaintenanceActivityList();
        }

        // GET: Maintenance
        [HttpGet("[action]")]
        public MaintenanceActivityDetailModel GetMaintenanceActivityById()
        {
            string id = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";

            MaintenanceServices serv = new MaintenanceServices(_anaContext);
            return serv.GetMaintenanceActivityById(new Guid(id));
        }

        // GET: MaintenanceActivity
        [HttpPost("[action]")]
        public GenericResponse UpdateDetailMaintenanceActivity([FromBody] MaintenanceActivityDetailModel model)
        {
            try
            {
                MaintenanceServices serv = new MaintenanceServices(_anaContext);

                ////Per il fuso orario aggiungo un'ora
                //model.FromDate = model.FromDate.AddHours(1);
                //model.ToDate = model.ToDate.AddHours(1);

                if (model.Id.HasValue)
                    serv.UpdateMaintenanceActivity(model);
                else
                    serv.AddMaintenanceActivity(model);

                return new GenericResponse
                {
                    Status = "Success",
                    Value = ""
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

        [HttpGet("[action]")]
        public GenericResponse DeleteMaintenanceActivity()
        {
            try
            {
                string refluelingId = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";

                MaintenanceServices serv = new MaintenanceServices(_anaContext);
                serv.DeleteMaintenanceActivity(new Guid(refluelingId));

                return new GenericResponse
                {
                    Status = "Success",
                    Value = ""
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

        // GET: Maintenance
        [HttpGet("[action]")]
        public IEnumerable<MaintenanceActivityDetailModel> GetMaintenanceActivityToDoNext3Items()
        {
            MaintenanceServices serv = new MaintenanceServices(_anaContext);
            return serv.GetMaintenanceActivityToDoNext3Items();
        }

        #endregion

    }
}
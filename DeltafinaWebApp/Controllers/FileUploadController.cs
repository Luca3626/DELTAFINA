using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using DeltafinaWebApp.Data.Archives;
using Models;
using Models.Archives;
using Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private IHostingEnvironment _environment;


        public FileUploadController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IHostingEnvironment environment)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _environment = environment;
        }

        // POST: /api/Upload/UploadFile
        [HttpPost("[action]")]
        public async Task<string> UploadMoreFileActivityMaintenances()
        {
            try
            {
                if (HttpContext.Request.Form.Files.Any())
                {
                    string activityId = "";
                    string portalFarmId = "";
                    ICollection<string> list = HttpContext.Request.Form.Keys;

                    foreach (var item in list)
                    {
                        if (item.Equals("activityId"))
                            activityId = Request.Form[item];
                    }

                    FileUploadServices fileUploadServ = new FileUploadServices(_anaContext, _userManager, _signInManager, _environment);
                    await fileUploadServ.UploadMoreFileMaintenanceActivities(new Guid(activityId), HttpContext.Request.Form.Files);

                    return "Success";
                }
                else
                    return "No files to upload";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet("[action]")]
        public GenericResponse DeleteMoreFileActivityMaintenances()
        {
            try
            {
                string idStr = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";
                Guid id = new Guid(idStr);

                FileUploadServices fileUploadServ = new FileUploadServices(_anaContext, _userManager, _signInManager, _environment);
                Guid rValue = fileUploadServ.DeleteMoreFileMaintenanceActivities(id);

                return new GenericResponse
                {
                    Status = "Success",
                    Value = rValue.ToString()
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
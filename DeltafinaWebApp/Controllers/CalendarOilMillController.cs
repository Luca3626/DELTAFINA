using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using DeltafinaWebApp.Data.Archives;
using Models;
using Models.Archives.Calendar;
using Models.Archives.Contract;
using Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Services.Hosted;
using Microsoft.Extensions.Options;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarOilMillController : ControllerBase
    {

        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.ConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private IHostingEnvironment _environment;
        private readonly ILogger<CalendarOilMillController> _logger;
        private readonly TaskSettings _settings;


        public CalendarOilMillController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IHostingEnvironment environment,
            ILogger<CalendarOilMillController> logger,
            IOptions<TaskSettings> settings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _environment = environment;
            _logger = logger;
            _settings = settings.Value;
        }

        public string GetBaseUrl()
        {
            var request = HttpContext.Request;

            //var baseUrl = string.Format("{0}://{1}{2}", request.Scheme, request.Host, request.Protocol);
            var baseUrl = string.Format("{0}://{1}", request.Scheme, request.Host);

            return baseUrl;
        }

        //// GET: Company
        //[HttpGet("[action]")]
        //public IEnumerable<Weighing> GetWeighingsByCalendarId()
        //{
        //    string calendarId = HttpContext.Request.Query["calendarId"].Count > 0 ? HttpContext.Request.Query["calendarId"].ToString() : "";

        //    CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //    return serv.GetWeighingsByCalendarId(new Guid(calendarId));
        //}

        //// GET: Company
        //[HttpPost("[action]")]
        //public GenericResponse SendOilReady([FromBody] CalendarOilMillContractModel model)
        //{
        //    try
        //    {
        //        CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //        model = serv.GetById(model.Id.Value);
        //        bool result = false;// EmailSenderServices.SendOilReady(_environment.WebRootPath, model, _anaContext, _logger);

        //        if (result)
        //        {
        //            return new GenericResponse
        //            {
        //                Status = "Success",
        //                Value = ""
        //            };
        //        }
        //        else
        //        {
        //            return new GenericResponse
        //            {
        //                Status = "Failed",
        //                Value = "Errore in invio del promemoria al cliente!"
        //            };
        //        }


        //    }
        //    catch (Exception ex)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = ex.Message
        //        };
        //    }
        //}

        //// GET: Company
        //[HttpPost("[action]")]
        //public GenericResponse SendReminder([FromBody] CalendarOilMillContractModel model)
        //{
        //    try
        //    {
        //        CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //        model = serv.GetById(model.Id.Value);
        //        bool result = false;// EmailSenderServices.SendReminderBooking(_environment.WebRootPath, model, _anaContext, _logger);

        //        if (result)
        //        {
        //            return new GenericResponse
        //            {
        //                Status = "Success",
        //                Value = ""
        //            };
        //        }
        //        else
        //        {
        //            return new GenericResponse
        //            {
        //                Status = "Failed",
        //                Value = "Errore in invio del promemoria al cliente!"
        //            };
        //        }


        //    }
        //    catch (Exception ex)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = ex.Message
        //        };
        //    }
        //}

        //// GET: Company
        //[HttpPost("[action]")]
        //public GenericResponse UpdateDetail([FromBody] CalendarOilMillContractModel model)
        //{
        //    try
        //    {
        //        CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //        Guid newId = serv.Update(model, GetBaseUrl());

        //        return new GenericResponse
        //        {
        //            Status = "Success",
        //            Value = newId.ToString()
        //        };

        //    }
        //    catch (Exception ex)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = ex.Message
        //        };
        //    }
        //}

        //[HttpGet("[action]")]
        //public GenericResponse SetWorkable()//[FromHeader] string id)
        //{
        //    try
        //    {
        //        string calendarId = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";
        //        if (calendarId.Length > 0)
        //        {
        //            CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //            serv.SetWorkable(new Guid(calendarId));

        //            return new GenericResponse
        //            {
        //                Status = "Success",
        //                Value = calendarId
        //            };
        //        }
        //        else
        //            return new GenericResponse
        //            {
        //                Status = "Failed",
        //                Value = "Event id not valid"
        //            };

        //    }
        //    catch (Microsoft.EntityFrameworkCore.DbUpdateException dbEx)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = dbEx.InnerException.Message
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = ex.Message
        //        };
        //    }
        //}

        //// GET: Company
        //[HttpPost("[action]")]
        //public GenericResponse SendConfirmBooking([FromBody] CalendarOilMillContractModel model)
        //{
        //    try
        //    {
        //        CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //        serv.SendConfirmBooking(model, GetBaseUrl());

        //        return new GenericResponse
        //        {
        //            Status = "Success",
        //            Value = "Email Sended"
        //        };

        //    }
        //    catch (Exception ex)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = ex.Message
        //        };
        //    }
        //}

        //// GET: Company
        //[HttpGet("[action]")]
        //public IEnumerable<CalendarOilMillContractModel> GetDetailedListByPortalFarmId()
        //{
        //    string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";

        //    CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //    return serv.GetDetailedListByPortalFarmId(new Guid(portalFarmId));
        //}

        //// GET: Company
        //[HttpGet("[action]")]
        //public IEnumerable<CalendarModel> GetListByPortalFarmId()
        //{
        //    string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";

        //    CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //    return serv.GetListByPortalFarmId(new Guid(portalFarmId));
        //}

        //// GET: Company
        //[HttpGet("[action]")]
        //public IEnumerable<CalendarOilMillContractModel> GetDetailedListCurrentYearByPortalFarmId()
        //{
        //    string portalFarmId = HttpContext.Request.Query["portalFarmId"].Count > 0 ? HttpContext.Request.Query["portalFarmId"].ToString() : "";

        //    CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //    return serv.GetDetailedListCurrentYearByPortalFarmId(new Guid(portalFarmId));
        //}

        //// GET: Company
        //[HttpGet("[action]")]
        //public CalendarOilMillContractModel GetById()//[FromHeader] string id)
        //{
        //    string calendarId = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";

        //    CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //    return serv.GetById(new Guid(calendarId));
        //}

        //// GET: Company
        //[HttpGet("[action]")]
        //public CalendarOilMillContractModel GetByCode()//[FromHeader] string id)
        //{
        //    string code = HttpContext.Request.Query["code"].Count > 0 ? HttpContext.Request.Query["code"].ToString() : "";

        //    CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //    return serv.GetByCode(code);
        //}

        //// GET: Company
        //[HttpGet("[action]")]
        //public CalendarOilMillContractModel GetByPlcId()//[FromHeader] string id)
        //{
        //    string plcId = HttpContext.Request.Query["plcId"].Count > 0 ? HttpContext.Request.Query["plcId"].ToString() : "";

        //    CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //    return serv.GetByPlcId(int.Parse(plcId));
        //}

        //[HttpGet("[action]")]
        //public GenericResponse Delete()//[FromHeader] string id)
        //{
        //    try
        //    {
        //        string calendarId = HttpContext.Request.Query["id"].Count > 0 ? HttpContext.Request.Query["id"].ToString() : "";
        //        if (calendarId.Length > 0)
        //        {
        //            CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //            serv.Delete(new Guid(calendarId));

        //            return new GenericResponse
        //            {
        //                Status = "Success",
        //                Value = calendarId
        //            };
        //        }
        //        else
        //            return new GenericResponse
        //            {
        //                Status = "Failed",
        //                Value = "Event id not valid"
        //            };

        //    }
        //    catch (Microsoft.EntityFrameworkCore.DbUpdateException dbEx)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = dbEx.InnerException.Message
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = ex.Message
        //        };
        //    }
        //}

        //// GET: Company
        //[HttpPost("[action]")]
        //public GenericResponse AddOliveWeight([FromBody] Weighing model)
        //{
        //    try
        //    {
        //        CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //        serv.AddOliveWeight(model);

        //        return new GenericResponse
        //        {
        //            Status = "Success",
        //            Value = ""
        //        };

        //    }
        //    catch (Exception ex)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = ex.Message
        //        };
        //    }
        //}

        //// GET: Company
        //[HttpPost("[action]")]
        //public GenericResponse RemoveOliveWeight([FromBody] Weighing model)
        //{
        //    try
        //    {
        //        CalendarOilMillServices serv = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //        serv.RemoveOliveWeight(model);

        //        return new GenericResponse
        //        {
        //            Status = "Success",
        //            Value = ""
        //        };

        //    }
        //    catch (Exception ex)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = ex.Message
        //        };
        //    }
        //}

        //[HttpGet("[action]")]
        //public GenericResponse StartJob()//[FromHeader] string id)
        //{
        //    try
        //    {
        //        string calendarId = HttpContext.Request.Query["calendarId"].Count > 0 ? HttpContext.Request.Query["calendarId"].ToString() : "";
        //        string recipeId = HttpContext.Request.Query["recipeId"].Count > 0 ? HttpContext.Request.Query["recipeId"].ToString() : "";
        //        if (calendarId.Length > 0 && recipeId.Length > 0)
        //        {
        //            //CalendarOilMillServices servContract = new CalendarOilMillServices(_anaContext, _environment, _logger);
        //            //CalendarOilMillContractModel contractModel = servContract.GetById(new Guid(calendarId));

        //            //RecipeServices servRecipe = new RecipeServices(_anaContext);
        //            //Models.Archives.Recipes.RecipeModel recipeModel =  servRecipe.GetRecipeById(new Guid(recipeId));


        //            Tasks.RecipeTask.Commessa_ID = new Guid(calendarId);
        //            Tasks.RecipeTask.Ricetta_ID = new Guid(recipeId);
        //            Tasks.RecipeTask.NuovaCommessa = true;

        //            return new GenericResponse
        //            {
        //                Status = "Success",
        //                Value = calendarId
        //            };
        //        }
        //        else
        //            return new GenericResponse
        //            {
        //                Status = "Failed",
        //                Value = "Event id not valid"
        //            };

        //    }
        //    catch (Microsoft.EntityFrameworkCore.DbUpdateException dbEx)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = dbEx.InnerException.Message
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new GenericResponse
        //        {
        //            Status = "Failed",
        //            Value = ex.Message
        //        };
        //    }
        //}

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Identity;
using DeltafinaWebApp.Data.Archives;
using Models;
using Models.Alarm;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Services.Hosted;

namespace DeltafinaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlarmController : ControllerBase
    {
        private ArchivesDbContext _anaContext = ArchivesDbContext.Create(ConStr.AlarmsConnectionString);
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly TaskSettings _settings;

        private readonly IdentityUser _identityUser;


        public AlarmController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager
            , IOptions<TaskSettings> settings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _settings = settings.Value;
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<AlarmModel> GetListFilteredByPLC(string plcs)
        {
            AlarmServices serv = new AlarmServices(_anaContext, _userManager, _signInManager);
            return serv.GetListFilteredByPLC(plcs);
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<AlarmModel> GetListFilteredByZones(string zones)
        {
            AlarmServices serv = new AlarmServices(_anaContext, _userManager, _signInManager);
            return serv.GetListFilteredByZones(zones);
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<AlarmModel> GetLast3()
        {
            AlarmServices serv = new AlarmServices(_anaContext, _userManager, _signInManager);
            return serv.GetLast3();
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<AlarmModel> GetAllActiveAlarms()
        {
            AlarmServices serv = new AlarmServices(_anaContext, _userManager, _signInManager);
            return serv.GetAllActiveAlarms();
        }

        // GET: Customer
        [HttpPost("[action]")]
        [AllowAnonymous]
        public IEnumerable<AlarmSettingModel> GetAlarmSettingListByZone([FromBody]string[] zones)
        {
            AlarmServices serv = new AlarmServices(_anaContext, _userManager, _signInManager);
            return serv.GetAlarmSettingListByZone(zones.ToList());
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<AlarmSettingModel> GetAlarmSettingList()
        {
            AlarmServices serv = new AlarmServices(_anaContext, _userManager, _signInManager);
            return serv.GetAlarmSettingList();
        }

        // GET: Customer
        [HttpPost("[action]")]
        [AllowAnonymous]
        public GenericResponse UpdateAlarmSettings([FromBody]AlarmSettingGroupActionModel query)
        {
            try
            {
                AlarmServices serv = new AlarmServices(_anaContext, _userManager, _signInManager);
                bool rValue = serv.UpdateAlarmSettings(query);

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

        // GET: Customer
        [HttpPost("[action]")]
        [AllowAnonymous]
        public IEnumerable<AlarmModel> GetAlarmsFiltered([FromBody]AlarmQueryModel query)
        {
            AlarmServices serv = new AlarmServices(_anaContext, _userManager, _signInManager);
            return serv.GetAlarmsFiltered(query);
        }

        // GET: Customer
        [HttpGet("[action]")]
        public IEnumerable<AlarmSettingModel> GetAlarmSettingById(string[] zones)
        {
            AlarmServices serv = new AlarmServices(_anaContext, _userManager, _signInManager);
            return serv.GetAlarmSettingListByZone(zones.ToList());
        }

        // GET: Customer
        [HttpGet("[action]")]
        public GenericResponse GetPlcState()
        {
            try
            {
                GenericResponse rValue = new GenericResponse
                {
                    Status = "Failed",
                    Value = "Plc not found!"
                };

                string plcName = HttpContext.Request.Query["plcName"].Count > 0 ? HttpContext.Request.Query["plcName"].ToString() : "";

                foreach (var item in Core.Communication.WatchDog.PLC_STATE)
                {
                    if(item.PlcName.ToLower().Trim().Equals(plcName.ToLower().Trim()))
                    {
                        if(item.CommState)
                        {
                            rValue = new GenericResponse
                            {
                                Status = "Success",
                                Value = ""
                            };
                        }
                        else
                        {
                            rValue = new GenericResponse
                            {
                                Status = "Failed",
                                Value = "Not connected"
                            };
                        }

                        break;
                    }
                }

                return rValue;

                //if (Core.Communication.WatchDog.PLC_STATE[0].CommState)
                //    return new GenericResponse
                //    {
                //        Status = "Success",
                //        Value = ""
                //    };
                //else
                //    return new GenericResponse
                //    {
                //        Status = "Failed",
                //        Value = ""
                //    };

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
        public GenericResponse CheckDatabase()
        {
            try
            {
                bool isOk = false;
                using (ArchivesDbContext dbContext = ArchivesDbContext.Create(ConStr.ConnectionString))
                {
                    var listaPlc = dbContext.Plcs;

                    if (listaPlc.FirstOrDefault() != null)
                        isOk = true;
                    else
                        isOk = false;
                }

                if (isOk)
                {
                    return new GenericResponse
                    {
                        Status = "Success",
                        Value = ""
                    };
                }
                else
                {
                    return new GenericResponse
                    {
                        Status = "Failed",
                        Value = "Plc record not found!"
                    };
                }

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
        public GenericResponse GetIsStandAlone()
        {
            try
            {
                return new GenericResponse
                {
                    Status = "Success",
                    Value = _settings.IsStandAlonePC.ToString()
                };

            }
            catch (Exception ex)
            {
                return new GenericResponse
                {
                    Status = "Failed",
                    Value = "true"
                };
            }
        }

        //// GET: Customer
        //[HttpGet("[action]")]
        //public IEnumerable<AlarmSettingModel> GetAlarmSettings()
        //{
        //    AlarmServices serv = new AlarmServices(_anaContext, _userManager, _signInManager);
        //    return serv.GetAlarmSettingListByZone();
        //}

    }
}
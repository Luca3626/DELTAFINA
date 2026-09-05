using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DeltafinaWebApp.Data.Archives;
using Models;
using Models.Account;
using Models.Archives;
using Models.Archives.Days;
using Models.Archives.Zone;

namespace Services
{
    public class PlcServices
    {

        private ArchivesDbContext ctx;
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;

        public string ConnectionString { get; set; }


        //public PlcServices(ArchivesDbContext anaContext, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        //{
        //    ctx = anaContext;
        //    _userManager = userManager;
        //    _signInManager = signInManager;
        //}
        public PlcServices(string connectionString, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            ConnectionString = connectionString;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetPlcList()
        {
            using (var ctx = ArchivesDbContext.Create(ConnectionString))
            {
                List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

                foreach (var item in ctx.Plcs.OrderBy(x => x.PositionOrder))
                {
                    rValue.Add(new ResultValueLabelDisabledModel
                    {
                        Value = item.Id.ToString(),
                        Label = item.Name.ToUpper(),
                        Disabled = false
                    });
                }

                return rValue.AsEnumerable(); 
            }
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetPlcListByZone(int zoneId)
        {
            using (var ctx = ArchivesDbContext.Create(ConnectionString))
            {
                List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

                var plcs = from p in ctx.Plcs
                           join pz in ctx.PlcsZones on p.Id equals pz.Plcid
                           where pz.ZoneId == zoneId
                           select p;// new
                                    //{
                                    //    p.Id,
                                    //    p.Name,
                                    //    p.PositionOrder,
                                    //    pz.ZoneId
                                    //};

                foreach (var item in plcs.OrderBy(x => x.PositionOrder))
                {
                    rValue.Add(new ResultValueLabelDisabledModel
                    {
                        Value = item.Id.ToString(),
                        Label = item.Name.ToUpper(),
                        Disabled = false
                    });
                }

                return rValue.AsEnumerable(); 
            }
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetPlcListByZone(string name)
        {
            using (var ctx = ArchivesDbContext.Create(ConnectionString))
            {
                List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

                var plcs = from p in ctx.Plcs
                           join pz in ctx.PlcsZones on p.Id equals pz.Plcid
                           join z in ctx.Zones on pz.ZoneId equals z.Id
                           where z.Name == name
                           select p;// new
                                    //{
                                    //    p.Id,
                                    //    p.Name,
                                    //    p.PositionOrder,
                                    //    pz.ZoneId
                                    //};

                foreach (var item in plcs.OrderBy(x => x.PositionOrder))
                {
                    rValue.Add(new ResultValueLabelDisabledModel
                    {
                        Value = item.Id.ToString(),
                        Label = item.Name.ToUpper(),
                        Disabled = false
                    });
                }

                return rValue.AsEnumerable(); 
            }
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetTagsByPlc(string plcName)
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            switch (plcName.ToUpper())
            {
                case "S7_1500":
                    rValue = Core.Communication.tagsList.list.Select(x => new ResultValueLabelDisabledModel
                    {
                        Label = x.NAME,
                        Value = x.NAME,
                        Disabled = false
                    }).ToList();
                    break;

                default:
                    break;
            }

            return rValue.AsEnumerable();

        }

    }
}

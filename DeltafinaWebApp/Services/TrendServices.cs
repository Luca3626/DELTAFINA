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
using Models.Archives.Trend;
using Models.Archives.Zone;

namespace Services
{
    public class TrendServices
    {

        private ArchivesDbContext _ctx;
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;

        public string ConnectionString { get; set; }


        public TrendServices(ArchivesDbContext ctx, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _ctx = ctx;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        //public TrendServices(string connectionString, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        //{
        //    ConnectionString = connectionString;
        //    _userManager = userManager;
        //    _signInManager = signInManager;
        //}

        public IEnumerable<ResultValueLabelDisabledModel> GetEnabledTrendList()
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            foreach (var item in _ctx.TagsToSave.Where(x => x.Enabled).OrderBy(x => x.Descriptions))
            {
                rValue.Add(new ResultValueLabelDisabledModel
                {
                    Value = item.TagLogName.ToString(),
                    Label = item.Descriptions.ToUpper(),
                    Disabled = false
                });
            }

            return rValue.AsEnumerable();
        }

        public IEnumerable<TrendModel> GetTrends()
        {
            List<TrendModel> rValue = new List<TrendModel>();

            //var result = from z in _ctx.Zones
            //             join zp in _ctx.PlcsZones on z.Id equals zp.ZoneId
            //             join p in _ctx.Plcs on zp.Plcid equals p.Id
            //             select new
            //             {
            //                 ZoneId = z.Id,
            //                 ZoneName = z.Name,
            //                 z.ZoneTypeId,
            //                 PlcId = p.Id,
            //                 PlcName = p.Name
            //             };

            foreach (var item in _ctx.TagsToSave.Where(x => x.Enabled).OrderBy(x => x.Descriptions))
            {
                rValue.Add(new TrendModel
                {
                    //CountCycleForSave = item.CountCycleForSave,
                    Description = item.Descriptions,
                    Enabled = item.Enabled,
                    LastLog = item.LastLog,
                    PlcName = item.Plcname,
                    ZoneName = item.ZoneName,// result.Where(x => x.PlcName == item.Plcname).First().ZoneName,
                    TagLogName = item.TagLogName,
                    TagPlcName = item.TagPlcname,
                    TimeCycleForSave = item.CountCycleForSave + " " + item.TimeCycleForSave,
                    Unit = item.Unit,
                    ValueType = item.ValueType
                });
            }

            return rValue;

        }

        public IEnumerable<TrendLogModel> GetLogging(TrendQueryModel query)
        {
            var result = from tl in _ctx.TagLogging
                         join ts in _ctx.TagsToSave on tl.TagLogName equals ts.TagLogName
                         where query.TagLogNameList.Contains(tl.TagLogName) && tl.LogDate >= query.StartDate && tl.LogDate <= query.EndDate
                            && ((query.PlcFilterList == null || query.PlcFilterList.Count == 0) || (query.PlcFilterList != null && query.PlcFilterList.Contains(ts.Plcname)))
                            && ((query.ZoneFilterList == null || query.ZoneFilterList.Count == 0) || (query.ZoneFilterList != null && query.ZoneFilterList.Contains(ts.ZoneName)))
                         orderby ts.Descriptions
                         select new TrendLogModel
                         {
                             Description = ts.Descriptions,
                             LogDate = tl.LogDate,
                             LogValue = tl.LogValue,
                             PlcName = tl.Plcname,
                             TagLogName = tl.TagLogName,
                             TagPlcName = tl.TagPlcname,
                             Unit = ts.Unit,
                             ZoneName = ts.ZoneName//zonePlc.Where(x => x.PlcName == tl.Plcname).First().ZoneName
                         };

            return result.AsEnumerable();
        }

        public TrendDetailModel GetByTagLogName(string tagLogName)
        {
            TagsToSave tag = _ctx.TagsToSave.Where(x => x.TagLogName.Equals(tagLogName)).FirstOrDefault();
            if (tag == null)
                throw new Exception("Tag not found");
            else
            {
                return new TrendDetailModel
                {
                    CountCycleDetection = tag.CountCycleDetection,
                    TagLogName = tag.TagLogName,
                    CountCycleForSave = tag.CountCycleForSave,
                    CreationDate = tag.CreationDate,
                    Description = tag.Descriptions,
                    Enabled = tag.Enabled,
                    HysteresisType = tag.HysteresisType,
                    HysteresisValue = tag.HysteresisValue,
                    LastLog = tag.LastLog,
                    LastUpdateDate = tag.LastUpdateDate,
                    MaxValue = tag.MaxValue,
                    MinValue = tag.MinValue,
                    PlcName = tag.Plcname,
                    RoundDigit = tag.RoundDigit.HasValue ? tag.RoundDigit.Value : -1,
                    TagPlcName = tag.TagPlcname,
                    TimeCycleDetection = tag.TimeCycleDetection,
                    TimeCycleForSave = tag.TimeCycleForSave,
                    Unit = tag.Unit,
                    UserId = tag.UserId,
                    ValueType = tag.ValueType,
                    ZoneName = tag.ZoneName
                };
            }
        }

        public string UpdateDetail(TrendDetailModel model)
        {
            TagsToSave item = _ctx.TagsToSave.Where(x => x.TagLogName.Equals(model.TagLogName)).FirstOrDefault();

            if (item == null)
            {
                int? roundDigit = null;
                if (model.RoundDigit > -1)
                    roundDigit = model.RoundDigit;

                item = new TagsToSave
                {
                    CountCycleDetection = model.CountCycleDetection,
                    TagLogName = model.TagLogName,
                    ZoneName = model.ZoneName,
                    CountCycleForSave = model.CountCycleForSave,
                    CreationDate = DateTime.Now,
                    Descriptions = model.Description,
                    Enabled = true,
                    HysteresisType = model.HysteresisType,
                    HysteresisValue = model.HysteresisValue,
                    LastUpdateDate = DateTime.Now,
                    MaxValue = model.MaxValue,
                    MinValue = model.MinValue,
                    Plcname = model.PlcName,
                    RoundDigit = roundDigit,
                    TagPlcname = model.TagPlcName,
                    TimeCycleDetection = model.TimeCycleDetection,
                    TimeCycleForSave = model.TimeCycleForSave,
                    Unit = model.Unit,
                    UserId = model.UserId,
                    ValueType = model.ValueType
                };

                _ctx.Add(item);

                _ctx.SaveChanges();

                return item.TagLogName;
            }
            else
            {
                int? roundDigit = null;
                if (model.RoundDigit > -1)
                    roundDigit = model.RoundDigit;

                item.CountCycleDetection = model.CountCycleDetection;
                item.TagLogName = model.TagLogName;
                item.ZoneName = model.ZoneName;
                item.CountCycleForSave = model.CountCycleForSave;
                item.Descriptions = model.Description;
                item.Enabled = model.Enabled;
                item.HysteresisType = model.HysteresisType;
                item.HysteresisValue = model.HysteresisValue;
                item.LastUpdateDate = DateTime.Now;
                item.MaxValue = model.MaxValue;
                item.MinValue = model.MinValue;
                item.Plcname = model.PlcName;
                item.RoundDigit = roundDigit;
                item.TagPlcname = model.TagPlcName;
                item.TimeCycleDetection = model.TimeCycleDetection;
                item.TimeCycleForSave = model.TimeCycleForSave;
                item.Unit = model.Unit;
                item.UserId = model.UserId;
                item.ValueType = model.ValueType;

                _ctx.SaveChanges();

                return item.TagLogName;
            }
        }

    }
}

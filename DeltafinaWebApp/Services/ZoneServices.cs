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
    public class ZoneServices
    {

        private ArchivesDbContext _anaContext;
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;


        public ZoneServices(ArchivesDbContext anaContext, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _anaContext = anaContext;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetZoneTypeList()
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            foreach (var item in _anaContext.ZoneTypes.Where(x => !x.Deleted).OrderBy(x => x.Id))
            {
                rValue.Add(new ResultValueLabelDisabledModel
                {
                    Value = item.Id.ToString(),
                    Label = item.Description.ToUpper(),
                    Disabled = false
                });
            }

            return rValue.AsEnumerable();
        }

        protected IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneList(int zoneTypeId)
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            foreach (var item in _anaContext.Zones.Where(x => x.ZoneTypeId == zoneTypeId).OrderBy(x => x.PositionOrder))
            {
                //if (_anaContext.RecipesZones.Count(x => x.ZoneId == item.Id) > 0)
                //    rValue.Add(new ResultValueLabelDisabledModel
                //    {
                //        Value = item.Id.ToString(),
                //        Label = item.Name.ToUpper(),
                //        Disabled = true
                //    });
                //else
                //    rValue.Add(new ResultValueLabelDisabledModel
                //    {
                //        Value = item.Id.ToString(),
                //        Label = item.Name.ToUpper(),
                //        Disabled = false
                //    });
            }

            return rValue.AsEnumerable();
        }

        protected IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneList(int zoneTypeId, Guid recipeId)
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            foreach (var item in _anaContext.Zones.Where(x => x.ZoneTypeId == zoneTypeId).OrderBy(x => x.PositionOrder))
            {
                //if (_anaContext.RecipesZones.Count(x => x.ZoneId == item.Id && x.RecipeId != recipeId) > 0)
                //    rValue.Add(new ResultValueLabelDisabledModel
                //    {
                //        Value = item.Id.ToString(),
                //        Label = item.Name.ToUpper(),
                //        Disabled = true
                //    });
                //else
                //    rValue.Add(new ResultValueLabelDisabledModel
                //    {
                //        Value = item.Id.ToString(),
                //        Label = item.Name.ToUpper(),
                //        Disabled = false
                //    });
            }

            return rValue.AsEnumerable();
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneACOOLList()
        {
            return GetDisabledZoneList(1);
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneACOOLList(Guid recipeId)
        {
            return GetDisabledZoneList(1, recipeId);
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneUTAList()
        {
            return GetDisabledZoneList(2);
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneUTAList(Guid recipeId)
        {
            return GetDisabledZoneList(2, recipeId);
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneRECList()
        {
            return GetDisabledZoneList(3);
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneRECList(Guid recipeId)
        {
            return GetDisabledZoneList(3, recipeId);
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneLuxPLList()
        {
            return GetDisabledZoneList(6);
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneLuxPLList(Guid recipeId)
        {
            return GetDisabledZoneList(6, recipeId);
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneLuxPPList()
        {
            return GetDisabledZoneList(7);
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneLuxPPList(Guid recipeId)
        {
            return GetDisabledZoneList(7, recipeId);
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneFancoilList()
        {
            return GetDisabledZoneList(8);
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetDisabledZoneFancoilList(Guid recipeId)
        {
            return GetDisabledZoneList(8, recipeId);
        }

        public IEnumerable<ResultIntString> GetZones()
        {
            return _anaContext.Zones.Where(x => !x.IsDeleted).OrderBy(x => x.PositionOrder).Select(x => new ResultIntString()
            {
                Value = x.Id,
                Label = x.Name
            }).AsEnumerable();
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetZonesByZoneType(int id)
        {
            return _anaContext.Zones.Where(x => !x.IsDeleted & x.ZoneTypeId == id).OrderBy(x => x.PositionOrder).Select(x => new ResultValueLabelDisabledModel()
            {
                Value = x.Id.ToString(),
                Label = x.Name,
                Disabled = false
            }).AsEnumerable();
        }

    }
}

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

namespace Services
{
    public class DaysServices
    {

        private ArchivesDbContext _anaContext;
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;


        public DaysServices(ArchivesDbContext anaContext, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _anaContext = anaContext;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IEnumerable<DaysSelectedModel> GetSelectedDaysOfWeekList()
        {
            var days = from dow in _anaContext.DaysOfWeek
                       orderby dow.Id
                       select new DaysSelectedModel()
                        {
                            Id = dow.Id,
                            Name = dow.ShortName.ToUpper(),
                            Selected = false
                        };

            return days.AsEnumerable();
        }

        public IEnumerable<DaysSelectedModel> GetSelectedSpecialDaysList()
        {
            var days = from sd in _anaContext.SpecialDays
                       orderby sd.PositionOrder
                       select new DaysSelectedModel()
                       {
                           Id = sd.Id,
                           Name = sd.Name.ToUpper(),
                           Selected = false
                       };

            return days.AsEnumerable();
        }

    }
}

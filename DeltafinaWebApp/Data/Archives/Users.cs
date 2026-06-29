using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Users
    {
        public Users()
        {
            ActivitiesUsers = new HashSet<ActivitiesUsers>();
            AlarmsUsers = new HashSet<AlarmsUsers>();
            HistoricalParameterChange = new HashSet<HistoricalParameterChange>();
        }

        public Guid UsersId { get; set; }
        public int UserTypeId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string FullName { get; set; }
        public string NickName { get; set; }
        public string Job { get; set; }
        public DateTime? BornDate { get; set; }
        public string Gender { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public Guid AddressId { get; set; }
        public Guid ContactId { get; set; }
        public Guid? PictureId { get; set; }
        public Guid? PortalFarmId { get; set; }

        public Addresses Address { get; set; }
        public Contacts Contact { get; set; }
        public Pictures Picture { get; set; }
        public PortalFarms PortalFarm { get; set; }
        public UserTypes UserType { get; set; }
        public ICollection<ActivitiesUsers> ActivitiesUsers { get; set; }
        public ICollection<AlarmsUsers> AlarmsUsers { get; set; }
        public ICollection<HistoricalParameterChange> HistoricalParameterChange { get; set; }
    }
}

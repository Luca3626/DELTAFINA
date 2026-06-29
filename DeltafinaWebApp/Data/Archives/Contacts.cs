using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Contacts
    {
        public Contacts()
        {
            AlarmsContacts = new HashSet<AlarmsContacts>();
            AlternativeEmail = new HashSet<AlternativeEmail>();
            Companies = new HashSet<Companies>();
            CompaniesContacts = new HashSet<CompaniesContacts>();
            PortalFarms = new HashSet<PortalFarms>();
            Users = new HashSet<Users>();
        }

        public Guid Id { get; set; }
        public int ContactTypeId { get; set; }
        public string NameContact { get; set; }
        public string Email { get; set; }
        public string Url { get; set; }
        public string Phone { get; set; }
        public string MobilePhone { get; set; }
        public string MobilePhone2 { get; set; }
        public string Fax { get; set; }
        public string Skype { get; set; }
        public string WathsApp { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public string Note { get; set; }
        public Guid PortalFarmId { get; set; }

        public ContactTypes ContactType { get; set; }
        public ICollection<AlarmsContacts> AlarmsContacts { get; set; }
        public ICollection<AlternativeEmail> AlternativeEmail { get; set; }
        public ICollection<Companies> Companies { get; set; }
        public ICollection<CompaniesContacts> CompaniesContacts { get; set; }
        public ICollection<PortalFarms> PortalFarms { get; set; }
        public ICollection<Users> Users { get; set; }
    }
}

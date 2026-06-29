using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Contacts
{
    public class ContactDetailModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public Guid? CompanyId { get; set; }
        public string Company { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Fax { get; set; }
        public string Url { get; set; }
        public string Skype { get; set; }
        public string Wathsapp { get; set; }
        public string Note { get; set; }
        public Guid PortalFarmId { get; set; }
        public string PortalFarm { get; set; }
    }
}

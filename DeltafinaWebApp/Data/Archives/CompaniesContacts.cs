using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class CompaniesContacts
    {
        public Guid CompanyId { get; set; }
        public Guid ContactId { get; set; }
        public Guid PortalFarmId { get; set; }

        public Companies Company { get; set; }
        public Contacts Contact { get; set; }
    }
}

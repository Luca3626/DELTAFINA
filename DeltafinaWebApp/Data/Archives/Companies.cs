using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Companies
    {
        public Companies()
        {
            CompaniesContacts = new HashSet<CompaniesContacts>();
        }

        public Guid CompanyId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string TaxCode { get; set; }
        public string Vat { get; set; }
        public Guid? PictureId { get; set; }
        public Guid ContactId { get; set; }
        public Guid AddressId { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public string Note { get; set; }
        public Guid PortalFarmId { get; set; }

        public Addresses Address { get; set; }
        public Contacts Contact { get; set; }
        public Pictures Picture { get; set; }
        public Customers Customers { get; set; }
        public ICollection<CompaniesContacts> CompaniesContacts { get; set; }
    }
}

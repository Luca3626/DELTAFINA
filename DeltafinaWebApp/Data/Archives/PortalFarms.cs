using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class PortalFarms
    {
        public PortalFarms()
        {
            Users = new HashSet<Users>();
        }

        public Guid FarmId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string TaxCode { get; set; }
        public string Vat { get; set; }
        public Guid? PictureId { get; set; }
        public Guid? ContactId { get; set; }
        public Guid? AddressId { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public string Note { get; set; }

        public Addresses Address { get; set; }
        public Contacts Contact { get; set; }
        public ICollection<Users> Users { get; set; }
    }
}

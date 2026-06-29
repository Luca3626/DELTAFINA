using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Addresses
    {
        public Addresses()
        {
            Companies = new HashSet<Companies>();
            PortalFarms = new HashSet<PortalFarms>();
            Users = new HashSet<Users>();
        }

        public Guid Id { get; set; }
        public string AddressStreet { get; set; }
        public string AddressNumber { get; set; }
        public string AddressCity { get; set; }
        public string AddressState { get; set; }
        public string AddressCode { get; set; }
        public string AddressLocation { get; set; }
        public string AddressZone { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public Guid PortalFarmId { get; set; }

        public ICollection<Companies> Companies { get; set; }
        public ICollection<PortalFarms> PortalFarms { get; set; }
        public ICollection<Users> Users { get; set; }
    }
}

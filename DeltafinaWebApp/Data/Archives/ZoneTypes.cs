using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class ZoneTypes
    {
        public ZoneTypes()
        {
            Zones = new HashSet<Zones>();
        }

        public byte Id { get; set; }
        public string Description { get; set; }
        public bool Enabled { get; set; }
        public bool Deleted { get; set; }
        public string Note { get; set; }
        public Guid? CompanyIdMaster { get; set; }

        public ICollection<Zones> Zones { get; set; }
    }
}

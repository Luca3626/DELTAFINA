using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Zones
    {
        public Zones()
        {
            PlcsZones = new HashSet<PlcsZones>();
        }

        public int Id { get; set; }
        public byte ZoneTypeId { get; set; }
        public string Name { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public int PositionOrder { get; set; }
        public string Note { get; set; }
        public Guid? CompanyIdMaster { get; set; }

        public ZoneTypes ZoneType { get; set; }
        public ICollection<PlcsZones> PlcsZones { get; set; }
    }
}

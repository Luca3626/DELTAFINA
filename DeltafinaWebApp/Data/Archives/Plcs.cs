using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Plcs
    {
        public Plcs()
        {
            PlcsZones = new HashSet<PlcsZones>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string IpAddress { get; set; }
        public int Port { get; set; }
        public int PositionOrder { get; set; }
        public string Note { get; set; }
        public Guid? CompanyIdMaster { get; set; }

        public ICollection<PlcsZones> PlcsZones { get; set; }
    }
}

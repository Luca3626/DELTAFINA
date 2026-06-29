using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Locations
{
    public class LocationDetailModel
    {
        public Guid? Id { get; set; }
        public int LocationTypeId { get; set; }
        public string LocationType { get; set; }
        public string Description { get; set; }
        public bool Enabled { get; set; }
        public bool Deleted { get; set; }
        public string Note { get; set; }
        public Guid PortalFarmId { get; set; }
        public string PortalFarm { get; set; }
    }
}

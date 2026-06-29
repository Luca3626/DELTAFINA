using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Locations
{
    public class LocationModel
    {
        public Guid? Id { get; set; }
        public string LocationType { get; set; }
        public string Description { get; set; }
        public bool Enabled { get; set; }
        public string Note { get; set; }
    }
}

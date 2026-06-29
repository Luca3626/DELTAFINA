using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class PlcsZones
    {
        public int Plcid { get; set; }
        public int ZoneId { get; set; }

        public Plcs Plc { get; set; }
        public Zones Zone { get; set; }
    }
}

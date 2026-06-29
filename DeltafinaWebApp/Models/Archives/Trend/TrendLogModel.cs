using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Trend
{
    public class TrendLogModel
    {
        public string TagLogName { get; set; }
        public string PlcName { get; set; }
        public string ZoneName { get; set; }
        public string TagPlcName { get; set; }
        public string Description { get; set; }
        public string Unit { get; set; }
        public double LogValue { get; set; }
        public DateTime LogDate { get; set; }
    }
}

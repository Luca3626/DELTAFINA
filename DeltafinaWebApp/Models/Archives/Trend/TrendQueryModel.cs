using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Trend
{
    public class TrendQueryModel
    {
        public List<string> ZoneFilterList { get; set; }
        public List<string> PlcFilterList { get; set; }
        public List<string> TagLogNameList { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}

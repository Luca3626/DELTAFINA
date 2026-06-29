using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Trend
{
    public class TrendDetailModel
    {
        public string TagLogName { get; set; }
        public string ZoneName { get; set; }
        public string PlcName { get; set; }
        public string TagPlcName { get; set; }
        public string Description { get; set; }
        public string TimeCycleDetection { get; set; }
        public int CountCycleDetection { get; set; }
        public string TimeCycleForSave { get; set; }
        public int CountCycleForSave { get; set; }
        public double HysteresisValue { get; set; }
        public string HysteresisType { get; set; }
        public double? MinValue { get; set; }
        public double? MaxValue { get; set; }
        public int RoundDigit { get; set; }
        public bool Enabled { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public Guid? UserId { get; set; }
        public DateTime? LastLog { get; set; }
        public string ValueType { get; set; }
        public string Unit { get; set; }
    }
}

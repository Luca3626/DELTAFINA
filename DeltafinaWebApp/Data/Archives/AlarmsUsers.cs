using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class AlarmsUsers
    {
        public int AlarmId { get; set; }
        public Guid UserId { get; set; }
        public bool OnAlarm { get; set; }
        public bool OnReset { get; set; }
        public int? DelayOnAlarm { get; set; }
        public double? AlarmThreshold { get; set; }
        public DateTime LastUpdateDate { get; set; }

        public Users User { get; set; }
    }
}

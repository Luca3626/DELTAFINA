using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class AlarmsNotifyTo
    {
        public int AlarmId { get; set; }
        public int NotifyToId { get; set; }
        public bool OnAlarm { get; set; }
        public bool OnReset { get; set; }
        public int? DelayOnAlarm { get; set; }
        public double? AlarmThreshold { get; set; }
        public DateTime LastUpdateDate { get; set; }

        public NotifyTo NotifyTo { get; set; }
    }
}

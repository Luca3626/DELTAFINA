using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Alarm
{
    public class AlarmNotifyToModel
    {
        public int NotifyToId { get; set; }
        public string NotifyToValue { get; set; }
        public string NotifyToRecipient { get; set; }
        public int DelayOnAlarm { get; set; }
        public double AlarmThreshold { get; set; }
        public DateTime LastUpdateDate { get; set; }
    }
}

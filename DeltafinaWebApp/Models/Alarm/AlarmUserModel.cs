using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Alarm
{
    public class AlarmUserModel
    {
        public Guid UserId { get; set; }
        public string User { get; set; }
        public string Email { get; set; }
        public int DelayOnAlarm { get; set; }
        public double AlarmThreshold { get; set; }
        public DateTime LastUpdateDate { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Alarm
{
    public class AlarmSettingGroupActionModel
    {
        public List<AlarmSettingModel> Alarms { get; set; }

        public List<string> AlarmNotifyToUserOnAlarmList { get; set; }
        public List<string> AlarmNotifyToOnAlarmList { get; set; }
        public List<string> AlarmNotifyToUserOnResetList { get; set; }
        public List<string> AlarmNotifyToOnResetList { get; set; }
    }
}

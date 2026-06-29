using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Alarm
{
    public class AlarmSettingModel
    {
        public string MachineUser { get; set; }
        public string TagName { get; set; }
        public string PLCName { get; set; }
        public string TextLang { get; set; }
        public string Zone { get; set; }
        public int Id { get; set; }
        public bool Selected { get; set; }

        public string AlarmNotifyToUserOnAlarm { get; set; }
        public string AlarmNotifyToOnAlarm { get; set; }
        public string AlarmNotifyToUserOnReset { get; set; }
        public string AlarmNotifyToOnReset { get; set; }
    }
}

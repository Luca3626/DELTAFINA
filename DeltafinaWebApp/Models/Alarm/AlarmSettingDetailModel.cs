using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Alarm
{
    public class AlarmSettingDetailModel
    {
        public string MachineUser { get; set; }
        public string TagName { get; set; }
        public string PLCName { get; set; }
        public string TextLang1 { get; set; }
        public string TextLang2 { get; set; }
        public string TextLang3 { get; set; }
        public string Zone { get; set; }
        public int Id { get; set; }

        public List<AlarmUserModel> AlarmNotifyToUserOnAlarmList { get; set; }
        public List<AlarmNotifyToModel> AlarmNotifyToOnAlarmList { get; set; }
        public List<AlarmUserModel> AlarmNotifyToUserOnResetList { get; set; }
        public List<AlarmNotifyToModel> AlarmNotifyToOnResetList { get; set; }
    }
}

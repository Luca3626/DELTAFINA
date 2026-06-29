using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class AlarmsNotifications
    {
        public int IdAlarm { get; set; }
        public int IdSettingAlarm { get; set; }
        public bool ActiveEmailSended { get; set; }
        public DateTime? DateActiveEmailSended { get; set; }
        public bool DisactiveEmailSended { get; set; }
        public DateTime? DateDisactiveEmailSended { get; set; }
    }
}

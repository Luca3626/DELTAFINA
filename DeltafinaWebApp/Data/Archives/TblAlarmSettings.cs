using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class TblAlarmSettings
    {
        public int Id { get; set; }
        public string TagName { get; set; }
        public string Utenza { get; set; }
        public string TestoLang1 { get; set; }
        public string TestoLang2 { get; set; }
        public string TestoLang3 { get; set; }
        public string Zona { get; set; }
        public bool SendEmail { get; set; }
        public bool SendSms { get; set; }
    }
}

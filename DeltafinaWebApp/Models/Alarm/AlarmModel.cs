using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Alarm
{
    public class AlarmModel
    {
        public string MachineUser { get; set; }
        public string TagName { get; set; }
        public string PLCName { get; set; }
        public string TextLang1 { get; set; }
        public string TextLang2 { get; set; }
        public string TextLang3 { get; set; }
        public string State { get; set; }
        public DateTime DateIN { get; set; }
        public DateTime DateOUT { get; set; }
        public DateTime DateACK { get; set; }
        public string Category { get; set; }
        public string Zone { get; set; }
        public int Id { get; set; }
    }
}

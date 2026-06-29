using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Alarm
{
    public class AlarmQueryModel
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string QueryText { get; set; }
        public string State { get; set; }
    }
}

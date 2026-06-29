using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class As400RequestQueue
    {
        public int RequestDate { get; set; }
        public int RequestTime { get; set; }
        public int RequestTypeId { get; set; }
        public bool ResponseDone { get; set; }
        public bool Failed { get; set; }
        public string Note { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}

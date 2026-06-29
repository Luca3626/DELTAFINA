using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class TagLogging
    {
        public string TagLogName { get; set; }
        public string TagPlcname { get; set; }
        public string Plcname { get; set; }
        public double LogValue { get; set; }
        public DateTime LogDate { get; set; }

        public TagsToSave TagLogNameNavigation { get; set; }
    }
}

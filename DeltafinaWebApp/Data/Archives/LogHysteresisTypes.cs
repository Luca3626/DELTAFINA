using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class LogHysteresisTypes
    {
        public LogHysteresisTypes()
        {
            TagsToSave = new HashSet<TagsToSave>();
        }

        public string HysteresisName { get; set; }

        public ICollection<TagsToSave> TagsToSave { get; set; }
    }
}

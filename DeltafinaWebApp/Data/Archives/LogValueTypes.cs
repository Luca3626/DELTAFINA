using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class LogValueTypes
    {
        public LogValueTypes()
        {
            TagsToSave = new HashSet<TagsToSave>();
        }

        public string ValueName { get; set; }

        public ICollection<TagsToSave> TagsToSave { get; set; }
    }
}

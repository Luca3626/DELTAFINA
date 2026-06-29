using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class LogCycleTypes
    {
        public LogCycleTypes()
        {
            TagsToSaveTimeCycleDetectionNavigation = new HashSet<TagsToSave>();
            TagsToSaveTimeCycleForSaveNavigation = new HashSet<TagsToSave>();
        }

        public string CycleName { get; set; }

        public ICollection<TagsToSave> TagsToSaveTimeCycleDetectionNavigation { get; set; }
        public ICollection<TagsToSave> TagsToSaveTimeCycleForSaveNavigation { get; set; }
    }
}

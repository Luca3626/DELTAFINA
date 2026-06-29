using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class ReportValueTypes
    {
        public ReportValueTypes()
        {
            ReportsTagsToSave = new HashSet<ReportsTagsToSave>();
        }

        public string Name { get; set; }

        public ICollection<ReportsTagsToSave> ReportsTagsToSave { get; set; }
    }
}

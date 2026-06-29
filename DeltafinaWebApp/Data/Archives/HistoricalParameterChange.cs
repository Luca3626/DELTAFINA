using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class HistoricalParameterChange
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string TagName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public string Unity { get; set; }
        public Guid UserId { get; set; }
        public string UserFullName { get; set; }
        public DateTime LastUpdate { get; set; }

        public Users User { get; set; }
    }
}

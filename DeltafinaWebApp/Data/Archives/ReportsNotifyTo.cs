using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class ReportsNotifyTo
    {
        public Guid ReportId { get; set; }
        public int NotifyToId { get; set; }

        public NotifyTo NotifyTo { get; set; }
        public Reports Report { get; set; }
    }
}

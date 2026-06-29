using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class ActivitiesReports
    {
        public Guid ReportId { get; set; }
        public Guid ActivityId { get; set; }

        public Activities Activity { get; set; }
        public Reports Report { get; set; }
    }
}

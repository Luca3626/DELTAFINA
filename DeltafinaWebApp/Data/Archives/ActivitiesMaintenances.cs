using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class ActivitiesMaintenances
    {
        public Guid ActivityId { get; set; }

        public Activities Activity { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class ActivitiesNotifyTo
    {
        public Guid ActivityId { get; set; }
        public int NotifyToId { get; set; }

        public Activities Activity { get; set; }
        public NotifyTo NotifyTo { get; set; }
    }
}

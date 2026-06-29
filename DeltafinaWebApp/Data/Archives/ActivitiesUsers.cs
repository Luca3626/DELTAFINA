using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class ActivitiesUsers
    {
        public Guid ActivityId { get; set; }
        public Guid UsersId { get; set; }

        public Activities Activity { get; set; }
        public Users Users { get; set; }
    }
}

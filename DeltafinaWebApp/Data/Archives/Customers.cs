using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Customers
    {
        public Guid CustomerId { get; set; }
        public Guid PortalFarmId { get; set; }

        public Companies Customer { get; set; }
    }
}

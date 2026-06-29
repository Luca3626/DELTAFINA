using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class WarehouseLinks
    {
        public Guid WarehouseIdFrom { get; set; }
        public Guid WarehouseIdTo { get; set; }

        public Warehouse WarehouseIdFromNavigation { get; set; }
        public Warehouse WarehouseIdToNavigation { get; set; }
    }
}

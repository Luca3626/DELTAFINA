using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class WarehouseContent
    {
        public Guid WarehouseId { get; set; }
        public int Layer { get; set; }
        public Guid? BatchId { get; set; }
        public double Quantity { get; set; }
        public double Volume { get; set; }
        public decimal UnitPrice { get; set; }

        public Batches Batch { get; set; }
        public Warehouse Warehouse { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class MaterialsWarehouseSettings
    {
        public Guid MaterialId { get; set; }
        public Guid WarehouseId { get; set; }
        public byte Priority { get; set; }

        public Materials Material { get; set; }
        public Warehouse Warehouse { get; set; }
    }
}

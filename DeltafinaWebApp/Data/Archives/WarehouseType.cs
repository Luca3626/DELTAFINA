using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class WarehouseType
    {
        public WarehouseType()
        {
            Warehouse = new HashSet<Warehouse>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Warehouse> Warehouse { get; set; }
    }
}

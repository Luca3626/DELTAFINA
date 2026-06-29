using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Models.Archives.Warehouse
{
    public class WarehouseContentModel
    {
        
        public int WarehouseId { get; set; }
        
        public int LayerId { get; set; }
        
        public Guid BatchId { get; set; }
        
        public string Batch { get; set; }
        
        public Guid SupplierId { get; set; }
        
        public string Supplier { get; set; }
        
        public Guid MaterialId { get; set; }
        
        public string Material { get; set; }
        
        public double Quantity { get; set; }
        
        public double Volume { get; set; }
        
        public decimal UnitPrice { get; set; }

    }
}
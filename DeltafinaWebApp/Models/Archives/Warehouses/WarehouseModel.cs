using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Models.Archives.Warehouse
{
    public class WarehouseModel
    {
        
        public Guid? Id { get; set; }
        public int ProgressiveId { get; set; }
        public string Code { get; set; }        
        public string Name { get; set; }        
        public double Capacity { get; set; }        
        public double Volume { get; set; }        
        public bool IsLoadEnabled { get; set; }        
        public bool IsUnloadEnabled { get; set; }        
        public int WarehouseTypeId { get; set; }        
        public string WarehouseType { get; set; }   
        public Guid? MaterialId { get; set; }
        public string MaterialCode { get; set; }
        public string Material { get; set; }     
        public bool IsDeleted { get; set; }

    }
}
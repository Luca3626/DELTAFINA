using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Models.Archives.Warehouse
{
    public class WarehouseViewModel
    {
        public int Id { get; set; }
        
        public string Code { get; set; }
        
        public string Name { get; set; }
        
        public double Capacity { get; set; }
        
        public double Volume { get; set; }
        
        public bool IsLoadEnabled { get; set; }
        
        public bool IsUnloadEnabled { get; set; }
        
        public Guid MaterialId { get; set; }
        
        public string MaterialCode { get; set; }
        
        public string MaterialName { get; set; }
        
        public float? MaterialSpecificWeight { get; set; }
        
        public float? MaterialThresholdWarningTemp { get; set; }
        
        public float? MaterialThresholdAlarmTemp { get; set; }
        
        public string UnityOfMeasure { get; set; }
        
        public double TotalQuantity { get; set; }
        
        public double TotalVolume { get; set; }
        
        public int Layers { get; set; }
        
        public decimal TotalPrice { get; set; }

    }
}
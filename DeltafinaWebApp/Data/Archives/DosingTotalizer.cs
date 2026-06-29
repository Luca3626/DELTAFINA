using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class DosingTotalizer
    {
        public Guid Id { get; set; }
        public int TotalNumber { get; set; }
        public DateTime RegistrationDate { get; set; }
        public Guid MaterialId { get; set; }
        public string MaterialCode { get; set; }
        public string Material { get; set; }
        public string Unity { get; set; }
        public Guid WarehouseSiloId { get; set; }
        public int WarehouseSiloProgressiveId { get; set; }
        public string SiloCode { get; set; }
        public string Silo { get; set; }
        public double TotalDosedQuantity { get; set; }
        public double TotalRequestedQuantity { get; set; }

        public Materials MaterialNavigation { get; set; }
        public Warehouse WarehouseSilo { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class DosingOrdersCompleted
    {
        public Guid Id { get; set; }
        public int Number { get; set; }
        public DateTime EndDate { get; set; }
        public Guid? RecipeId { get; set; }
        public int? RecipeProgressiveId { get; set; }
        public string Recipe { get; set; }
        public Guid WarehouseDestionationId { get; set; }
        public int WarehouseDestionationProgressiveId { get; set; }
        public string WarehouseDestionation { get; set; }
        public Guid MaterialId { get; set; }
        public string MaterialCode { get; set; }
        public string Material { get; set; }
        public double MaterialDensity { get; set; }
        public string Unity { get; set; }
        public Guid WarehouseSiloId { get; set; }
        public int WarehouseSiloProgressiveId { get; set; }
        public string SiloCode { get; set; }
        public string Silo { get; set; }
        public double ActualSiloQuantity { get; set; }
        public double ActualSiloVolume { get; set; }
        public Guid? WarehouseScaleId { get; set; }
        public int? WarehouseScaleProgressiveId { get; set; }
        public string Scale { get; set; }
        public double DosedQuantity { get; set; }
        public double RequestedQuantityInMix { get; set; }
        public int RepetitionInMix { get; set; }
        public double RequestedQuantityNoMix { get; set; }
        public int RepetitionNoMix { get; set; }
        public string Note { get; set; }

        public Materials MaterialNavigation { get; set; }
        public Recipes RecipeNavigation { get; set; }
        public Warehouse WarehouseScale { get; set; }
        public Warehouse WarehouseSilo { get; set; }
    }
}

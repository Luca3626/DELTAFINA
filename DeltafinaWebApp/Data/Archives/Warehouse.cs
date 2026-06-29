using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Warehouse
    {
        public Warehouse()
        {
            DosingOrdersCompletedWarehouseScale = new HashSet<DosingOrdersCompleted>();
            DosingOrdersCompletedWarehouseSilo = new HashSet<DosingOrdersCompleted>();
            DosingTotalizer = new HashSet<DosingTotalizer>();
            DosingWorkshiftTotalizer = new HashSet<DosingWorkshiftTotalizer>();
            MaterialsWarehouseSettings = new HashSet<MaterialsWarehouseSettings>();
            RecipesWarehouses = new HashSet<RecipesWarehouses>();
            WarehouseContent = new HashSet<WarehouseContent>();
            WarehouseLinksWarehouseIdFromNavigation = new HashSet<WarehouseLinks>();
            WarehouseLinksWarehouseIdToNavigation = new HashSet<WarehouseLinks>();
        }

        public Guid Id { get; set; }
        public int ProgressiveId { get; set; }
        public int OrderPosition { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public double Capacity { get; set; }
        public double Volume { get; set; }
        public bool EnableLoad { get; set; }
        public bool EnableUnload { get; set; }
        public int WarehouseTypeId { get; set; }
        public Guid? MaterialId { get; set; }
        public bool IsDeleted { get; set; }

        public Materials Material { get; set; }
        public WarehouseType WarehouseType { get; set; }
        public ICollection<DosingOrdersCompleted> DosingOrdersCompletedWarehouseScale { get; set; }
        public ICollection<DosingOrdersCompleted> DosingOrdersCompletedWarehouseSilo { get; set; }
        public ICollection<DosingTotalizer> DosingTotalizer { get; set; }
        public ICollection<DosingWorkshiftTotalizer> DosingWorkshiftTotalizer { get; set; }
        public ICollection<MaterialsWarehouseSettings> MaterialsWarehouseSettings { get; set; }
        public ICollection<RecipesWarehouses> RecipesWarehouses { get; set; }
        public ICollection<WarehouseContent> WarehouseContent { get; set; }
        public ICollection<WarehouseLinks> WarehouseLinksWarehouseIdFromNavigation { get; set; }
        public ICollection<WarehouseLinks> WarehouseLinksWarehouseIdToNavigation { get; set; }
    }
}

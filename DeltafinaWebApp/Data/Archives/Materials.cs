using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Materials
    {
        public Materials()
        {
            DosingOrdersCompleted = new HashSet<DosingOrdersCompleted>();
            DosingTotalizer = new HashSet<DosingTotalizer>();
            DosingWorkshiftTotalizer = new HashSet<DosingWorkshiftTotalizer>();
            MaterialsWarehouseSettings = new HashSet<MaterialsWarehouseSettings>();
            Recipes = new HashSet<Recipes>();
            RecipesMaterials = new HashSet<RecipesMaterials>();
            Warehouse = new HashSet<Warehouse>();
        }

        public Guid Id { get; set; }
        public int MaterialTypeId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float? SpecificWeight { get; set; }
        public string SpecificWeightUdM { get; set; }
        public float? ThresholdWarningTemp { get; set; }
        public float? ThresholdAlarmTemp { get; set; }
        public string UnityOfMeasure { get; set; }
        public bool OutTotalPercentageRecipe { get; set; }
        public bool EnableReorderQuantity { get; set; }
        public double ReorderQuantity { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }

        public MaterialTypes MaterialType { get; set; }
        public ICollection<DosingOrdersCompleted> DosingOrdersCompleted { get; set; }
        public ICollection<DosingTotalizer> DosingTotalizer { get; set; }
        public ICollection<DosingWorkshiftTotalizer> DosingWorkshiftTotalizer { get; set; }
        public ICollection<MaterialsWarehouseSettings> MaterialsWarehouseSettings { get; set; }
        public ICollection<Recipes> Recipes { get; set; }
        public ICollection<RecipesMaterials> RecipesMaterials { get; set; }
        public ICollection<Warehouse> Warehouse { get; set; }
    }
}

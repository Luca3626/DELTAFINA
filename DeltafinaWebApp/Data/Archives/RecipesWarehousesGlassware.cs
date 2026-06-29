using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class RecipesWarehousesGlassware
    {
        public Guid Id { get; set; }
        public Guid RecipeId { get; set; }
        public Guid WarehouseId { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public Guid UserId { get; set; }

        public Recipes Recipe { get; set; }
        public Warehouse Warehouse { get; set; }
        public RecipesWarehousesGlasswares RecipesWarehousesGlasswares { get; set; }
    }
}

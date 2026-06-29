using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class RecipesWarehousesGlasswares
    {
        public Guid RecipeWarehouseId { get; set; }
        public double QuantityMix { get; set; }
        public int Repetition { get; set; }
        public double QuantityNotMix { get; set; }
        public int RepetitionNotMix { get; set; }

        public RecipesWarehouses RecipeWarehouse { get; set; }
    }
}

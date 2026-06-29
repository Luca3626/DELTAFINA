using System;

namespace Models.Archives.Recipes.Glassware
{
    public class RecipeWarehouseGlasswareModel : RecipeWarehouseModel
    {
        public double QuantityMix { get; set; }
        public int Repetition { get; set; }
        public double QuantityNotMix { get; set; }
        public int RepetitionNotMix { get; set; }
    }    
}
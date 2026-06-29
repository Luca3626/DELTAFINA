using System;
using System.Collections.Generic;

namespace Models.Archives.Recipes.Glassware
{
    public class RecipeGlasswareModel : RecipeModel
    {
        public int TimeMixWater { get; set; }
        public int TimeMixing { get; set; }
        public List<RecipeWarehouseGlasswareModel> Components { get; set; }

        public RecipeGlasswareModel()
        {
            RecipeTypeId = 2;
            RecipeType = "Glassware";
        }
    }
}
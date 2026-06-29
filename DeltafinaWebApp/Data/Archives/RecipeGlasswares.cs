using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class RecipeGlasswares
    {
        public Guid RecipeId { get; set; }
        public int TimeMixWater { get; set; }
        public int TimeMixing { get; set; }

        public Recipes Recipe { get; set; }
    }
}

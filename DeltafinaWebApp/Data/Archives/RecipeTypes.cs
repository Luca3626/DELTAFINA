using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class RecipeTypes
    {
        public RecipeTypes()
        {
            Recipes = new HashSet<Recipes>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Recipes> Recipes { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class RecipesMaterials
    {
        public Guid Id { get; set; }
        public Guid RecipeId { get; set; }
        public Guid MaterialId { get; set; }
        public float Percentage { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }

        public Materials Material { get; set; }
        public Recipes Recipe { get; set; }
    }
}

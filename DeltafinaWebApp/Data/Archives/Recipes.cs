using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Recipes
    {
        public Recipes()
        {
            DosingOrdersCompleted = new HashSet<DosingOrdersCompleted>();
            RecipesMaterials = new HashSet<RecipesMaterials>();
            RecipesWarehouses = new HashSet<RecipesWarehouses>();
        }

        public Guid Id { get; set; }
        public int ProgressiveId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int RecipeTypeId { get; set; }
        public Guid? MaterialId { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public string Note { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public Guid UserId { get; set; }

        public Materials Material { get; set; }
        public RecipeTypes RecipeType { get; set; }
        public RecipeGlasswares RecipeGlasswares { get; set; }
        public ICollection<DosingOrdersCompleted> DosingOrdersCompleted { get; set; }
        public ICollection<RecipesMaterials> RecipesMaterials { get; set; }
        public ICollection<RecipesWarehouses> RecipesWarehouses { get; set; }
    }
}

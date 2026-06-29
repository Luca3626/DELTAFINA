using System;

namespace Models.Archives.Recipes
{
    public class RecipeModel
    {
        public Guid? Id { get; set; }
        public int ProgressiveId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Note { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public Guid? MaterialId { get; set; }
        public string Material { get; set; }
        public int RecipeTypeId { get; set; }
        public string RecipeType { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
    }
}
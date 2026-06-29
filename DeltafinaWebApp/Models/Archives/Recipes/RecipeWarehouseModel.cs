using System;

namespace Models.Archives.Recipes
{
    public class RecipeWarehouseModel
    {
        public Guid? Id { get; set; }
        public Guid RecipeId { get; set; }
        public string Recipe { get; set; }
        public Guid SiloId { get; set; }
        public string Silo { get; set; }
        public Guid? MaterialId { get; set; }
        public string Material { get; set; }
        public string UnityOfMeasure { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public int RowIndex { get; set; }
    }
}
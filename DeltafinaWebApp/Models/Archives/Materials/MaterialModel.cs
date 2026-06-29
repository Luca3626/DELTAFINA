using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Models.Archives.Materials
{
    public class MaterialModel
    {
        public Guid? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int MaterialTypeId { get; set; }
        public bool OutTotalPercentageRecipe { get; set; }
    }
}

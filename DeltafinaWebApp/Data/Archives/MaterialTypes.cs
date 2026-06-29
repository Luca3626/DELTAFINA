using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class MaterialTypes
    {
        public MaterialTypes()
        {
            Materials = new HashSet<Materials>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Materials> Materials { get; set; }
    }
}

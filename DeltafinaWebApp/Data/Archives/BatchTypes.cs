using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class BatchTypes
    {
        public BatchTypes()
        {
            Batches = new HashSet<Batches>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Prefix { get; set; }

        public ICollection<Batches> Batches { get; set; }
    }
}

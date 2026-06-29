using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Batches
    {
        public Batches()
        {
            WarehouseContent = new HashSet<WarehouseContent>();
        }

        public Guid Id { get; set; }
        public int NumericCode { get; set; }
        public string Code { get; set; }
        public int BatchTypeId { get; set; }
        public DateTime InitialDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsDeleted { get; set; }

        public BatchTypes BatchType { get; set; }
        public ICollection<WarehouseContent> WarehouseContent { get; set; }
    }
}

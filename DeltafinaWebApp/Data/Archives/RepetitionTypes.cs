using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class RepetitionTypes
    {
        public RepetitionTypes()
        {
            Plannings = new HashSet<Plannings>();
            Reports = new HashSet<Reports>();
        }

        public int RepetitionTypeId { get; set; }
        public string Description { get; set; }
        public int? AddDays { get; set; }
        public int? AddMonth { get; set; }
        public int? AddYear { get; set; }
        public int ItemOrder { get; set; }

        public ICollection<Plannings> Plannings { get; set; }
        public ICollection<Reports> Reports { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class AdviseTypes
    {
        public AdviseTypes()
        {
            Plannings = new HashSet<Plannings>();
            Reports = new HashSet<Reports>();
        }

        public int AdviseTypeId { get; set; }
        public string Description { get; set; }
        public int? AddMinutes { get; set; }
        public int? AddHours { get; set; }
        public int? AddDays { get; set; }
        public int ItemOrder { get; set; }

        public ICollection<Plannings> Plannings { get; set; }
        public ICollection<Reports> Reports { get; set; }
    }
}

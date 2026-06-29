using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Plannings
    {
        public Plannings()
        {
            Activities = new HashSet<Activities>();
        }

        public Guid PlanId { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public int RepetitionTypeId { get; set; }
        public int AdviseTypeId { get; set; }
        public bool IsDeleted { get; set; }

        public AdviseTypes AdviseType { get; set; }
        public RepetitionTypes RepetitionType { get; set; }
        public ICollection<Activities> Activities { get; set; }
    }
}

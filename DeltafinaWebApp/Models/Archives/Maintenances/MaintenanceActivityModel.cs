using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Maintenances
{
    public class MaintenanceActivityModel
    {
        public Guid? Id { get; set; }
        public string Description { get; set; }
        public string State { get; set; }
        public bool Planned { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string RepetitionType { get; set; }
        public string AdviseType { get; set; }
        public string Users { get; set; }
        public string Contacts { get; set; }
    }
}

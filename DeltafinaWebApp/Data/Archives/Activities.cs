using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Activities
    {
        public Activities()
        {
            ActivitiesFileUpload = new HashSet<ActivitiesFileUpload>();
            ActivitiesNotifyTo = new HashSet<ActivitiesNotifyTo>();
            ActivitiesReports = new HashSet<ActivitiesReports>();
            ActivitiesUsers = new HashSet<ActivitiesUsers>();
        }

        public Guid ActivityId { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string Description { get; set; }
        public string State { get; set; }
        public bool IsPlanned { get; set; }
        public Guid? PlanId { get; set; }
        public bool IsDeleted { get; set; }
        public bool ToDoSended { get; set; }
        public bool CompletedSended { get; set; }
        public string Note { get; set; }
        public Guid? CompanyIdMaster { get; set; }

        public Plannings Plan { get; set; }
        public ActivitiesMaintenances ActivitiesMaintenances { get; set; }
        public ICollection<ActivitiesFileUpload> ActivitiesFileUpload { get; set; }
        public ICollection<ActivitiesNotifyTo> ActivitiesNotifyTo { get; set; }
        public ICollection<ActivitiesReports> ActivitiesReports { get; set; }
        public ICollection<ActivitiesUsers> ActivitiesUsers { get; set; }
    }
}

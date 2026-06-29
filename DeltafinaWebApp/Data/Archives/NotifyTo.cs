using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class NotifyTo
    {
        public NotifyTo()
        {
            ActivitiesNotifyTo = new HashSet<ActivitiesNotifyTo>();
            AlarmsNotifyTo = new HashSet<AlarmsNotifyTo>();
            ReportsNotifyTo = new HashSet<ReportsNotifyTo>();
        }

        public int Id { get; set; }
        public int NotifyToTypeId { get; set; }
        public string NotifyToValue { get; set; }
        public string Recipient { get; set; }
        public Guid? CompanyIdMaster { get; set; }

        public NotifyToTypes NotifyToType { get; set; }
        public ICollection<ActivitiesNotifyTo> ActivitiesNotifyTo { get; set; }
        public ICollection<AlarmsNotifyTo> AlarmsNotifyTo { get; set; }
        public ICollection<ReportsNotifyTo> ReportsNotifyTo { get; set; }
    }
}

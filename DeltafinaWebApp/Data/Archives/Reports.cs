using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Reports
    {
        public Reports()
        {
            ActivitiesReports = new HashSet<ActivitiesReports>();
            ReportsNotifyTo = new HashSet<ReportsNotifyTo>();
            ReportsTagsToSave = new HashSet<ReportsTagsToSave>();
        }

        public Guid Id { get; set; }
        public int ReportTypeId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime? LastSent { get; set; }
        public string State { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public int RepetitionTypeId { get; set; }
        public int AdviseTypeId { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public Guid? UserId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? LastUpdateDate { get; set; }
        public Guid? CompanyIdMaster { get; set; }

        public AdviseTypes AdviseType { get; set; }
        public RepetitionTypes RepetitionType { get; set; }
        public ReportTypes ReportType { get; set; }
        public ICollection<ActivitiesReports> ActivitiesReports { get; set; }
        public ICollection<ReportsNotifyTo> ReportsNotifyTo { get; set; }
        public ICollection<ReportsTagsToSave> ReportsTagsToSave { get; set; }
    }
}

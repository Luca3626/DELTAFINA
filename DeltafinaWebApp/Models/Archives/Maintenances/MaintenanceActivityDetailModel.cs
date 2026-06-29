using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models.FileUpload;

namespace Models.Archives.Maintenances
{
    public class MaintenanceActivityDetailModel
    {
        public Guid? Id { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string Description { get; set; }
        public string State { get; set; }
        public bool Planned { get; set; }
        //public Guid? ActivityId { get; set; }
        public Guid? PlanningId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int RepetitionTypeId { get; set; }
        public string RepetitionType { get; set; }
        public int AdviseTypeId { get; set; }
        public string AdviseType { get; set; }
        public List<Guid> Users { get; set; }
        public List<string> Contacts { get; set; }
        public List<FileUploadDetailModel> OtherUploadedFiles { get; set; }
        public bool ToDoSended { get; set; }
        public bool CompletedSended { get; set; }
        public string Note { get; set; }
    }
}

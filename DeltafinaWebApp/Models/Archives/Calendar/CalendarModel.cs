using Models.FileUpload;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Calendar
{
    public class CalendarModel
    {
        public Guid? Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Color { get; set; }
        public bool AllDay { get; set; }
        public bool Editable { get; set; }
        public bool Workable { get; set; }
        public bool Invoiced { get; set; }
        public string Note { get; set; }
        public List<FileUploadDetailModel> OtherUploadedFiles { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdate { get; set; }
        public Guid PortalFarmId { get; set; }
        public string PortalFarm { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class FileUpload
    {
        public FileUpload()
        {
            ActivitiesFileUpload = new HashSet<ActivitiesFileUpload>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string FileName { get; set; }
        public string AbsoluteUrl { get; set; }
        public string RelativeUrl { get; set; }
        public string RewriteUrl { get; set; }
        public string ContentType { get; set; }
        public long FileLength { get; set; }
        public DateTime DateUpload { get; set; }
        public Guid PortalFarmId { get; set; }

        public ICollection<ActivitiesFileUpload> ActivitiesFileUpload { get; set; }
    }
}

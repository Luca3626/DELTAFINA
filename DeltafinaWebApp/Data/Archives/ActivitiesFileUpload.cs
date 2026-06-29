using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class ActivitiesFileUpload
    {
        public Guid ActivityId { get; set; }
        public Guid FileUploadId { get; set; }

        public Activities Activity { get; set; }
        public FileUpload FileUpload { get; set; }
    }
}

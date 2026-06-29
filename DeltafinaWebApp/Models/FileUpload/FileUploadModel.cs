using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.FileUpload
{
    public class FileUploadModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string FileName { get; set; }
        public string AbsoluteUrl { get; set; }
        public string RelativeUrl { get; set; }
        public string RewriteUrl { get; set; }
        public string ContentType { get; set; }
        public long FileLength { get; set; }
        public DateTime DateUpload { get; set; }

    }
}

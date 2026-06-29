using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class Pictures
    {
        public Pictures()
        {
            Companies = new HashSet<Companies>();
            Users = new HashSet<Users>();
        }

        public Guid PictureId { get; set; }
        public string RelativePath { get; set; }
        public string RelativeUrlPath { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
        public bool IsEnabled { get; set; }
        public Guid PortalFarmId { get; set; }

        public ICollection<Companies> Companies { get; set; }
        public ICollection<Users> Users { get; set; }
    }
}

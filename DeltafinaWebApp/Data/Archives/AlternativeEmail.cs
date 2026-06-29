using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class AlternativeEmail
    {
        public Guid ContactId { get; set; }
        public string AlternativeEmail1 { get; set; }
        public int OrderPosition { get; set; }
        public Guid PortalFarmId { get; set; }

        public Contacts Contact { get; set; }
    }
}

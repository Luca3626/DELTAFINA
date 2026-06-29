using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class NotifyToTypes
    {
        public NotifyToTypes()
        {
            NotifyTo = new HashSet<NotifyTo>();
        }

        public int Id { get; set; }
        public string Description { get; set; }
        public int PositionOrder { get; set; }
        public bool Enabled { get; set; }
        public bool Deleted { get; set; }
        public string Note { get; set; }
        public Guid? CompanyIdMaster { get; set; }

        public ICollection<NotifyTo> NotifyTo { get; set; }
    }
}

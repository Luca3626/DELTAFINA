using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class UserTypes
    {
        public UserTypes()
        {
            Users = new HashSet<Users>();
        }

        public int Id { get; set; }
        public string Description { get; set; }
        public int PositionOrder { get; set; }
        public bool Enabled { get; set; }
        public bool Deleted { get; set; }
        public string Note { get; set; }
        public Guid? PortalFarmId { get; set; }

        public ICollection<Users> Users { get; set; }
    }
}

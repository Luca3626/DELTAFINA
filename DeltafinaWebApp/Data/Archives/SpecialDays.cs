using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class SpecialDays
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte Day { get; set; }
        public byte Month { get; set; }
        public int PositionOrder { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime LastUpdate { get; set; }
        public Guid? UserId { get; set; }
        public Guid? CompanyIdMaster { get; set; }
    }
}

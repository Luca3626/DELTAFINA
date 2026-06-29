using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Users
{
    public class LogParameter
    {
        public Guid? Id { get; set; }
        public string Description { get; set; }
        public string TagName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public string Unity { get; set; }
        public Guid UserId { get; set; }
        public string User { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}

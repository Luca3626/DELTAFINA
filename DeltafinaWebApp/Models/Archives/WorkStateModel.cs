using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives
{
    public class WorkStateModel
    {
        public string Description { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public string CompanyId { get; set; }
    }
}

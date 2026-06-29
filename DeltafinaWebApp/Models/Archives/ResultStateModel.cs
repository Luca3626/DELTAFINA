using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives
{
    public class ResultStateModel
    {
        public string Description { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public int OrderPosition { get; set; }
        public Guid CompanyId { get; set; }
    }
}

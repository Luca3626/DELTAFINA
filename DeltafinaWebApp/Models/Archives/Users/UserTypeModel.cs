using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Users
{
    public class UserTypeModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int OrderPosition { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsDeleted { get; set; }
        public string CompanyId { get; set; }
    }
}

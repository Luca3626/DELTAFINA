using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives
{
    public class ResultIdName
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }

    public class ResultIdName_V2
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class ResultIdName_KeyStr
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}

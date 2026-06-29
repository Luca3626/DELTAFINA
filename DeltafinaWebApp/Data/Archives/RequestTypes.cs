using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class RequestTypes
    {
        public RequestTypes()
        {
            As400Requests = new HashSet<As400Requests>();
        }

        public int Id { get; set; }
        public string Description { get; set; }

        public ICollection<As400Requests> As400Requests { get; set; }
    }
}

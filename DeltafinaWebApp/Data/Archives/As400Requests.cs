using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class As400Requests
    {
        public As400Requests()
        {
            As400Responses = new HashSet<As400Responses>();
        }

        public int RequestDate { get; set; }
        public int RequestTime { get; set; }
        public int RequestTypeId { get; set; }
        public string SiloCode { get; set; }
        public bool Completed { get; set; }
        public bool Failed { get; set; }
        public string Note { get; set; }
        public DateTime LastUpdate { get; set; }

        public RequestTypes RequestType { get; set; }
        public ICollection<As400Responses> As400Responses { get; set; }
    }
}

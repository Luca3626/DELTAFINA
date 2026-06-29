using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class As400Responses
    {
        public Guid Id { get; set; }
        public int RequestDate { get; set; }
        public int RequestTime { get; set; }
        public int RequestTypeId { get; set; }
        public string SiloCode { get; set; }
        public int ActualSiloState { get; set; }
        public bool ActualLoadEnabled { get; set; }
        public bool ActualPlcState { get; set; }
        public DateTime LastUpdate { get; set; }

        public As400Requests Request { get; set; }
    }
}

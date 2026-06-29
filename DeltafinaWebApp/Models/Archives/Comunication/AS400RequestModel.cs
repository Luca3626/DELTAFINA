using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Models.FileUpload;

namespace Models.Archives.Comunication
{
    public class AS400RequestModel
    {
        public int RequestDate { get; set; }
        public int RequestTime { get; set; }
        public AS400RequestTypeModel RequestType { get; set; }
        public string SiloCode { get; set; }
        public bool Completed { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Archives.Keywords
{
    public class KeywordDetailModel
    {
        public Guid? Id { get; set; }
        public int? KeywordMasterId { get; set; }
        public string KeywordMasterName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Enabled { get; set; }
        public bool Deleted { get; set; }
        public Guid PortalFarmId { get; set; }
        public string PortalFarm { get; set; }
    }
}

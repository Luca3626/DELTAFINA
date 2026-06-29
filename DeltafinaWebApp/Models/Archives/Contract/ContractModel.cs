using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Models.FileUpload;

namespace Models.Archives.Contract
{
    public class ContractModel
    {
        public Guid? Id { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        public Guid CustomerId { get; set; }
        public string Customer { get; set; }
        public DateTime ContractDate { get; set; }
        public bool Deleted { get; set; }
        public string Barcode { get; set; }
        public string QrCode { get; set; }
        public string Note { get; set; }
        public int WorkStateId { get; set; }
        public string WorkState { get; set; }
        public bool Workable { get; set; }
        public bool Invoiced { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdate { get; set; }
        public List<FileUploadDetailModel> OtherUploadedFiles { get; set; }
        public DateTime? StartWorkDate { get; set; }
        public DateTime? EndWorkDate { get; set; }
        public Guid? RecipeId { get; set; }
        public int PlcId { get; set; }
        public Guid PortalFarmId { get; set; }
        public string PortalFarm { get; set; }
    }
}

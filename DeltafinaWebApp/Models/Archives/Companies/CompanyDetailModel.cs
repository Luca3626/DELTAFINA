using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Company
{
    public class CompanyDetailModel
    {
        public Guid? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string TaxCode { get; set; }
        public string VAT { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Fax { get; set; }
        public string Url { get; set; }
        public string Street { get; set; }
        public string StreetNumber { get; set; }
        public string AddressCode { get; set; }
        public string City { get; set; }
        public string Location { get; set; }
        public string State { get; set; }
        public string Note { get; set; }
        public Guid PortalFarmId { get; set; }
        public string PortalFarm { get; set; }
    }
}

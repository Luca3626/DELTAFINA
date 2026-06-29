using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Models.Archives.Dosing
{
    public class DosingTotalizerModel
    {
        public Guid Id { get; set; }
        public int TotalNumber { get; set; }
        public DateTime RegistrationDate { get; set; }
        public Guid MaterialId { get; set; }
        public string MaterialCode { get; set; }
        public string Material { get; set; }
        public string Unity { get; set; }
        public Guid SiloId { get; set; }
        public int SiloProgressiveId { get; set; }
        public string Silo { get; set; }
        public double TotalDosedQuantity { get; set; }
        public double TotalRequestedQuantity { get; set; }
    }
}

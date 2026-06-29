using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Models.Archives.Dosing
{
    public class DosingDetailModel
    {
        public Guid? Id { get; set; }
        public int Number { get; set; }
        public DateTime EndDate { get; set; }
        public Guid? RecipeId { get; set; }
        public int? RecipeProgressiveId { get; set; }
        public string Recipe { get; set; }
        public Guid DestionationId { get; set; }
        public int DestionationProgressiveId { get; set; }
        public string Destionation { get; set; }
        public Guid MaterialId { get; set; }
        public string MaterialCode { get; set; }
        public string Material { get; set; }
        public double MaterialDensity { get; set; }
        public string Unity { get; set; }
        public Guid SiloId { get; set; }
        public int SiloProgressiveId { get; set; }
        public string SiloCode { get; set; }
        public string Silo { get; set; }
        public double ActualSiloQuantity { get; set; }
        public double ActualSiloVolume { get; set; }
        public Guid? ScaleId { get; set; }
        public int? ScaleProgressiveId { get; set; }
        public string Scale { get; set; }
        public double DosedQuantity { get; set; }
        public double RequestedQuantityInMix { get; set; }
        public int RepetitionInMix { get; set; }
        public double RequestedQuantityNoMix { get; set; }
        public int RepetitionNoMix { get; set; }
        public string Note { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Contract
{
    public class Weighing
    {
        public int Id { get; set; }
        public Guid CalendarId { get; set; }
        public Guid ContractId { get; set; }
        public string Bin { get; set; }
        public double Weight { get; set; }
        public DateTime Date { get; set; }
        public Guid PortalFarmId { get; set; }
        public string PortalFarm { get; set; }
    }

    public class OilMillContractModel: ContractModel
    {
        public int CultivarId { get; set; }
        public string Cultivar { get; set; }
        public DateTime? CollectionOliveDate { get; set; }
        public string RegionCollectionOlive { get; set; }
        public string LocationCollectionOlive { get; set; }
        public double OliveWeightExpected { get; set; }//Quantità totale di oliva prevista da molire
        public double OliveWeight { get; set; }//Quantità totale di oliva prevista da molire
        public byte OilFilterTypeId { get; set; }//1-No, 2-Standard, 3-Lenticolare
        public string OilFilterType { get; set; }//1-No, 2-Standard, 3-Lenticolare
        public string DesideredOilFilteredQuantity { get; set; }//Quantità filtrata richiesta
        public bool PurchasedOlives { get; set; }//Olive acquistate
        public byte CrusherTypeId { get; set; }
        public string CrusherType { get; set; }
        public bool ThirdParties { get; set; }
        public DateTime? MillDate { get; set; }
        public double OilWeight { get; set; }
        public double ReturnPercent { get; set; }
        public double OilWeightInDeposit { get; set; }
        public byte OilAnalysisTypeId { get; set; }
        public string OilAnalysisType { get; set; }
        public bool CustomLabel { get; set; }
        public bool Packaging { get; set; }
        public bool OilReady { get; set; }
        public byte BinsTaken { get; set; }
        public int Tank5L { get; set; }
        public int Tank10L { get; set; }
        public int Tank15L { get; set; }
        public int Tank20L { get; set; }
        public int Tank25L { get; set; }
        public int Tank30L { get; set; }
        public int Tank50L { get; set; }
        public Weighing[] OliveWeighings { get; set; }
        public int Bottle100 { get; set; }
        public int Bottle250 { get; set; }
        public int Bottle500 { get; set; }
        public int Bottle750 { get; set; }
        public int BB3 { get; set; }
        public int BB5 { get; set; }
        public bool PackagingComplete { get; set; }
        public double OilFilteredWeight { get; set; }
        public bool EmailOilReadySended { get; set; }
    }
}

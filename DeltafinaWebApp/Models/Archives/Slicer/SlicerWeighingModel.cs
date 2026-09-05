using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Slicer
{
    /// <summary>
    /// Riga del registro pesate casse (tabella SlicerWeighings) come la vede il client.
    /// Solo i campi che la maschera mostra: i nomi dei tag e il PLC restano sulla riga a
    /// database, qui non servono.
    /// </summary>
    public class SlicerWeighingModel
    {
        public Guid Id { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime ProductionDate { get; set; }
        public string Workshift { get; set; }
        public int ProgressiveNumber { get; set; }

        public string LineCode { get; set; }
        public string Line { get; set; }

        public int Weight { get; set; }
        public string Unity { get; set; }

        public int? BeltWeight { get; set; }
        public int? AverageWeight { get; set; }
        public int? Totalizer { get; set; }
        public int? CaseCount { get; set; }
        public int? CutCount { get; set; }
        public int? FlowRate { get; set; }
        public int? FlowRateSetpoint { get; set; }

        public int? DestinationSilo { get; set; }
        public int? DestinationSiloTotalizer { get; set; }
        public int? SiloFillMode { get; set; }
        public bool? SingleCutMode { get; set; }
        public bool? LineConsent { get; set; }
        public bool? LineInAlarm { get; set; }

        public string Note { get; set; }
    }
}

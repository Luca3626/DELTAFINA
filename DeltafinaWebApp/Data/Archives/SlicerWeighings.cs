using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    /// <summary>
    /// Registro delle pesate delle casse sui due slicer (Virginia / Burley).
    /// Una riga per ogni cassa pesata sul nastro pesatore prima della ghigliottina:
    /// la scrive SlicerWeighingTask quando il PLC alza il bit di richiesta.
    /// I valori di produzione sono congelati all'istante della pesata, cosi' la riga
    /// e' autoconsistente e non va incrociata con TagLogging.
    /// </summary>
    public partial class SlicerWeighings
    {
        public Guid Id { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime ProductionDate { get; set; }
        public string Workshift { get; set; }
        public int ProgressiveNumber { get; set; }

        public string LineCode { get; set; }
        public string Line { get; set; }
        public string PlcName { get; set; }
        public string TriggerTagName { get; set; }
        public string WeightTagName { get; set; }

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

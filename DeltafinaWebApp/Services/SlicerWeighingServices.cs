using System;
using System.Collections.Generic;
using System.Linq;

using DeltafinaWebApp.Data.Archives;
using Models.Archives.Slicer;
using Services.Helpers;

namespace Services
{

    /// <summary>
    /// Registro delle pesate delle casse sui due slicer (tabella SlicerWeighings).
    /// Lo usa SlicerWeighingTask: quando il PLC alza PLC_VSL_PesoDaRegistrare o
    /// PLC_BSL_PesoDaRegistrare, il task chiama il metodo della linea corrispondente e poi
    /// riabbassa il bit.
    ///
    /// Come in DosingServices, i valori vengono letti qui direttamente dai tag, cosi' peso e
    /// contorno di produzione si riferiscono allo stesso istante e la riga resta autoconsistente
    /// senza doverla incrociare con TagLogging.
    /// </summary>
    public class SlicerWeighingServices
    {

        private ArchivesDbContext _anaContext;


        public SlicerWeighingServices(ArchivesDbContext anaContext)
        {
            _anaContext = anaContext;
        }


        /// <summary>
        /// Progressivo della prossima pesata nella giornata produttiva, per la linea indicata.
        /// Riparte da 1 a ogni cambio di giornata produttiva (06:00).
        /// </summary>
        private int GetNextProgressiveNumber(string lineCode, DateTime productionDate)
        {
            DateTime day = productionDate.Date;

            int last = _anaContext.SlicerWeighings
                .Where(x => x.LineCode == lineCode && x.ProductionDate == day)
                .Select(x => (int?)x.ProgressiveNumber)
                .Max() ?? 0;

            return last + 1;
        }


        /// <summary>
        /// Totalizzatore del silo indicato (V301..V304). Null se il numero di silo non e' fra
        /// 1 e 4, cioe' se in quel momento la linea non sta caricando nessun silo.
        /// </summary>
        private int? GetSiloTotalizer(int siloNumber)
        {
            switch (siloNumber)
            {
                case 1:
                    return int.Parse(Core.Communication.tagsList.VAR_V301.VALUE.ToString());

                case 2:
                    return int.Parse(Core.Communication.tagsList.VAR_V302.VALUE.ToString());

                case 3:
                    return int.Parse(Core.Communication.tagsList.VAR_V303.VALUE.ToString());

                case 4:
                    return int.Parse(Core.Communication.tagsList.VAR_V304.VALUE.ToString());

                default:
                    return null;
            }
        }


        /// <summary>
        /// Registra la pesata della cassa sul Virginia Slicer.
        /// </summary>
        public bool AddWeighing_VSL()
        {
            DateTime registrationDate = DateTime.Now;
            DateTime productionDate = WorkshiftHelper.GetProductionDate(registrationDate);

            int destinationSilo = int.Parse(Core.Communication.tagsList.VAR_V311.VALUE.ToString());

            _anaContext.Add(new SlicerWeighings
            {
                Id = Guid.NewGuid(),
                RegistrationDate = registrationDate,
                ProductionDate = productionDate,
                Workshift = WorkshiftHelper.GetWorkshift(registrationDate),
                ProgressiveNumber = GetNextProgressiveNumber("VSL", productionDate),

                LineCode = "VSL",
                Line = "Slicer linea Virginia",
                PlcName = Core.MyApp.PLC_NAME_S7_1500,
                TriggerTagName = Core.Communication.tagsList.PLC_VSL_PesoDaRegistrare.NAME,
                WeightTagName = Core.Communication.tagsList.VAR_V3997.NAME,

                //V3997 - peso della cassa da registrare
                Weight = int.Parse(Core.Communication.tagsList.VAR_V3997.VALUE.ToString()),
                Unity = "kg",

                //V78   - peso al nastro pesatore
                BeltWeight = int.Parse(Core.Communication.tagsList.VAR_V78.VALUE.ToString()),
                //V422  - peso medio delle ultime 5 casse
                AverageWeight = int.Parse(Core.Communication.tagsList.VAR_V422.VALUE.ToString()),
                //V79   - totalizzatore di linea
                Totalizer = int.Parse(Core.Communication.tagsList.VAR_V79.VALUE.ToString()),
                //V90   - numero casse passate
                CaseCount = int.Parse(Core.Communication.tagsList.VAR_V90.VALUE.ToString()),
                //V1100 - numero di tagli
                CutCount = int.Parse(Core.Communication.tagsList.VAR_V1100.VALUE.ToString()),
                //V427  - flusso attuale
                FlowRate = int.Parse(Core.Communication.tagsList.VAR_V427.VALUE.ToString()),
                //V71   - setpoint di flusso
                FlowRateSetpoint = int.Parse(Core.Communication.tagsList.VAR_V71.VALUE.ToString()),

                //V311  - silo in riempimento dalla linea Virginia
                DestinationSilo = destinationSilo,
                DestinationSiloTotalizer = GetSiloTotalizer(destinationSilo),
                //V310  - tipo di riempimento globale
                SiloFillMode = int.Parse(Core.Communication.tagsList.VAR_V310.VALUE.ToString()),
                //{C1500} 0=CONT, 1=SINGLE
                SingleCutMode = (bool)Core.Communication.tagsList.FROM_HMI_VSL_PRG.VALUE,
                LineConsent = (bool)Core.Communication.tagsList.PLC_VSL_CX.VALUE,
                LineInAlarm = (bool)Core.Communication.tagsList.PLC_VSL_System_AL_Flsr.VALUE,

                Note = null
            });

            _anaContext.SaveChanges();

            return true;
        }


        /// <summary>
        /// Registra la pesata della cassa sul Burley Slicer.
        /// </summary>
        public bool AddWeighing_BSL()
        {
            DateTime registrationDate = DateTime.Now;
            DateTime productionDate = WorkshiftHelper.GetProductionDate(registrationDate);

            int destinationSilo = int.Parse(Core.Communication.tagsList.VAR_V312.VALUE.ToString());

            _anaContext.Add(new SlicerWeighings
            {
                Id = Guid.NewGuid(),
                RegistrationDate = registrationDate,
                ProductionDate = productionDate,
                Workshift = WorkshiftHelper.GetWorkshift(registrationDate),
                ProgressiveNumber = GetNextProgressiveNumber("BSL", productionDate),

                LineCode = "BSL",
                Line = "Slicer linea Burley",
                PlcName = Core.MyApp.PLC_NAME_S7_1500,
                TriggerTagName = Core.Communication.tagsList.PLC_BSL_PesoDaRegistrare.NAME,
                WeightTagName = Core.Communication.tagsList.VAR_V3998.NAME,

                //V3998 - peso della cassa da registrare
                Weight = int.Parse(Core.Communication.tagsList.VAR_V3998.VALUE.ToString()),
                Unity = "kg",

                //V378  - peso al nastro pesatore
                BeltWeight = int.Parse(Core.Communication.tagsList.VAR_V378.VALUE.ToString()),
                //V222  - peso medio delle ultime 5 casse
                AverageWeight = int.Parse(Core.Communication.tagsList.VAR_V222.VALUE.ToString()),
                //V379  - totalizzatore di linea
                Totalizer = int.Parse(Core.Communication.tagsList.VAR_V379.VALUE.ToString()),
                //V390  - numero casse passate (corrispondente di V90 sulla Virginia, offset +300
                //        come V71->V371 e V78->V378). Nel foglio DB190 - VAR la riga risulta
                //        "BslRetnrLp...": e' il foglio a essere disallineato, non il tag.
                CaseCount = int.Parse(Core.Communication.tagsList.VAR_V390.VALUE.ToString()),
                //V1101 - numero di tagli
                CutCount = int.Parse(Core.Communication.tagsList.VAR_V1101.VALUE.ToString()),
                //V227  - flusso attuale
                FlowRate = int.Parse(Core.Communication.tagsList.VAR_V227.VALUE.ToString()),
                //V371  - setpoint di flusso
                FlowRateSetpoint = int.Parse(Core.Communication.tagsList.VAR_V371.VALUE.ToString()),

                //V312  - silo in riempimento dalla linea Burley
                DestinationSilo = destinationSilo,
                DestinationSiloTotalizer = GetSiloTotalizer(destinationSilo),
                //V310  - tipo di riempimento globale
                SiloFillMode = int.Parse(Core.Communication.tagsList.VAR_V310.VALUE.ToString()),
                //{C1000} 0=CONT, 1=SINGLE
                SingleCutMode = (bool)Core.Communication.tagsList.FROM_HMI_BSL_PRG.VALUE,
                LineConsent = (bool)Core.Communication.tagsList.PLC_BSL_CX.VALUE,
                LineInAlarm = (bool)Core.Communication.tagsList.PLC_BSL_System_AL_Flsr.VALUE,

                Note = null
            });

            _anaContext.SaveChanges();

            return true;
        }


        /// <summary>
        /// Pesate registrate su una linea, filtrate per giornata produttiva.
        /// Il filtro e' su ProductionDate e non su RegistrationDate: cosi' le casse del
        /// turno di notte restano con la giornata a cui appartengono, come nei totalizzatori
        /// di turno. Le date arrivano dal client come giorni interi, gli estremi sono compresi.
        /// </summary>
        public IEnumerable<SlicerWeighingModel> GetWeighings(SlicerWeighingQueryModel query)
        {
            DateTime dateFrom = query.StartDate.Date;
            DateTime dateTo = query.EndDate.Date;

            var results = from w in _anaContext.SlicerWeighings
                          where w.LineCode == query.LineCode
                             && w.ProductionDate >= dateFrom
                             && w.ProductionDate <= dateTo
                          orderby w.RegistrationDate descending, w.ProgressiveNumber descending
                          select new SlicerWeighingModel()
                          {
                              Id = w.Id,
                              RegistrationDate = w.RegistrationDate,
                              ProductionDate = w.ProductionDate,
                              Workshift = w.Workshift,
                              ProgressiveNumber = w.ProgressiveNumber,

                              LineCode = w.LineCode,
                              Line = w.Line,

                              Weight = w.Weight,
                              Unity = w.Unity,

                              BeltWeight = w.BeltWeight,
                              AverageWeight = w.AverageWeight,
                              Totalizer = w.Totalizer,
                              CaseCount = w.CaseCount,
                              CutCount = w.CutCount,
                              FlowRate = w.FlowRate,
                              FlowRateSetpoint = w.FlowRateSetpoint,

                              DestinationSilo = w.DestinationSilo,
                              DestinationSiloTotalizer = w.DestinationSiloTotalizer,
                              SiloFillMode = w.SiloFillMode,
                              SingleCutMode = w.SingleCutMode,
                              LineConsent = w.LineConsent,
                              LineInAlarm = w.LineInAlarm,

                              Note = w.Note
                          };

            return results.AsEnumerable();
        }

    }
}

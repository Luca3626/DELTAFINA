using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Archives.Slicer
{
    /// <summary>
    /// Filtro della maschera pesate casse. LineCode e' la linea ("VSL" / "BSL"): ogni
    /// pagina slicer chiede solo le proprie pesate. StartDate/EndDate sono giornate
    /// produttive (il campo ProductionDate della riga), non istanti di registrazione,
    /// cosi' il turno di notte resta con la giornata a cui appartiene.
    /// </summary>
    public class SlicerWeighingQueryModel
    {
        public string LineCode { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}

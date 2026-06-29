using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MANGANELLI_Database.Models.Productions
{
    public enum EnumProcesses
    {
        Acceptance,//ricezione
        Recycle,//ricircolo
        Bulk,//rinfusa
        Shipping,//spedizione
        Correction//rettifica
    }
}
using System;
using System.Collections.Generic;

namespace DeltafinaWebApp.Data.Archives
{
    public partial class TblAllarmi
    {
        public int Num { get; set; }
        public string TagName { get; set; }
        public string PlcName { get; set; }
        public string Utenza { get; set; }
        public string TestoLang1 { get; set; }
        public string TestoLang2 { get; set; }
        public string TestoLang3 { get; set; }
        public string Stato { get; set; }
        public DateTime DataIn { get; set; }
        public DateTime DataOut { get; set; }
        public DateTime DataAck { get; set; }
        public string Categoria { get; set; }
        public string Zona { get; set; }
    }
}

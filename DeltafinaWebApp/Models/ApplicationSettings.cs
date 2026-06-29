using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models
{
    public class ApplicationSettings
    {
        public ApplicationSettings()
        {
            // Set default value.
            Option1 = "";
        }

        public string Option1 { get; set; }
        //public int Option2 { get; set; } = 5;
        public bool IsStandAlonePC { get; set; }
        public int CheckUpdateTime { get; set; }
        public bool EnableSoundAlarm { get; set; }//impostazione suono allarme per l'applicazione
        public bool ActiveSoundAlarm { get; set; }//impostazione suono allarme in esecuzione (per gestione effetto suona/tacita)
    }
}


namespace Services.Hosted
{
    public class TaskSettings
    {
        public TaskSettings()
        {
            // Set default value.
            Option1 = "";
        }

        public string Option1 { get; set; }
        public bool IsStandAlonePC { get; set; }// = 5;
        public int CheckUpdateTime { get; set; }// = 5000;
        public bool EnableSoundAlarm { get; set; }
        public bool ActiveSoundAlarm { get; set; }//impostazione suono allarme in esecuzione (per gestione effetto suona/tacita)
    }   

}

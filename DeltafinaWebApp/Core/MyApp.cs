
using Models;
using Services.Hosted;
using System;
using System.Collections.Generic;
using System.Threading;

namespace Core
{
    class MyApp
    {
        //public static string FR1_Name = "FR_1", FR2_Name = "FR_2", DEC1_Name = "DEC_1", DEC2_Name = "DEC_2";
        public delegate void ChangedEventHandler(object sender, EventArgs e);
        public static event ChangedEventHandler RefreshRequest;
        public static CommunicationLib.ApplicationState _as;
        //public static SettingsObj SettObj;
        //public static CommunicationLib.Helper.ErrorEventsLog eeLog;

        public static Alarms.Allarmi allarmi;

        public const string PLC_NAME_OMRON = "OMRON";
        public const string PLC_NAME_S7 = "S7_300";
        public const string PLC_NAME_MOXA = "MOXA";


        public static string ConnectionString { get; set; }
        public static string ConnectionStringAlarm { get; set; }

        public static ApplicationSettings MyApplicationSettings { get; set; }


        public static void onStartApp(string connectionString, string connectionStringAlarm, TaskSettings settings)
        {
            ConnectionString = connectionString;
            ConnectionStringAlarm = connectionStringAlarm;

            MyApplicationSettings = new ApplicationSettings
            {
                ActiveSoundAlarm = settings.ActiveSoundAlarm,
                CheckUpdateTime = settings.CheckUpdateTime,
                EnableSoundAlarm = settings.EnableSoundAlarm,
                Option1 = settings.Option1,
                IsStandAlonePC = settings.IsStandAlonePC
            };

            _as = new CommunicationLib.ApplicationState() { IS_RUNNING = true };


            Communication.initialize(_as);


            allarmi = new Alarms.Allarmi("DELTAFINA_ALARMS_DB", Communication.PLC_LIST, Communication.WatchDog, _as, connectionStringAlarm);


        }

        public static void Refresh()
        {
            RefreshRequest(_as, new EventArgs());
        }

        static void SettObj_ValuesChanged(object sender, EventArgs e)
        {
        }

        public static void SettObj_ValuesChanged()
        {
        }

        public static void onStopApp()
        {
            _as.IS_RUNNING = false;

            allarmi.destroy();

            Communication.destroy();

            try
            {
            }
            catch
            {
            }
        }
    }
}

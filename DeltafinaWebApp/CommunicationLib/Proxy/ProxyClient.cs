using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections.ObjectModel;
using System.ServiceModel;


namespace CommunicationLib
{
    /// <summary>
    /// Classe che implementa il callBack del server
    /// </summary>
    [CallbackBehavior(UseSynchronizationContext = false,ConcurrencyMode=ConcurrencyMode.Multiple)]
    public class ProxyClient : IProxyClient
    {
        public delegate void ChangedEventHandler(object sender, EventArgs e);
        public event ChangedEventHandler NewAlarm;
        public event ChangedEventHandler NewDosaggio;
        
        public event ChangedEventHandler NewAlarmSound;
        


        private ObservableCollection<Tags> TagsList;

        #region COSTRUTTORE

        public ProxyClient(ObservableCollection<Tags> TagsList)
        {
            dlast = DateTime.Now;
            dact = DateTime.Now;
            this.TagsList = TagsList;
        }

        #endregion

        #region Properties

        public DateTime dlast, dact;

        public int M_SECONDS_E
        {
            get { return dact.Subtract(dlast).Milliseconds; }

        }

        private int numOfTags = 0;
        public int NUM_OF_TAGS
        {
            get { return numOfTags; }
            set
            {
                numOfTags = value;
            }
        }

        #endregion

        public void ReceiveTags(List<KeyValuePair<int, object>> tags)
        {
            try
            {

                Tags tag;
                numOfTags = tags.Count;
                dlast = dact;
                dact = DateTime.Now;
                foreach (KeyValuePair<int, object> kvp in tags)
                {

                    tag = TagsList.FirstOrDefault(n => n.ID == kvp.Key);
                    if (tag != null)
                    {
                        tag.DATE = DateTime.Now;
                        tag.SRV_VALUE = kvp.Value;
                    }
                }
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
        }


        public void refreshAlarms()
        {
            try
            {
                if (NewAlarm != null)
                    NewAlarm(this, new EventArgs());
            }
            catch
            {
            }
        }

        

        public void refreshDosaggio()
        {
            try
            {
                if (NewDosaggio != null)
                    NewDosaggio(this, new EventArgs());
            }
            catch
            {
            }
        }

       

        public void refreshAlarmsSound()
        {
            try
            {
                if (NewAlarmSound != null)
                    NewAlarmSound(this, new EventArgs());
            }
            catch
            {
            }
        }
    }
}

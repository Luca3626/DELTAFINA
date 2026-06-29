using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;

namespace CommunicationLib
{
    public class TagsClient : Tags, INotifyPropertyChanged
    {
        

        
        //public override event ChangedEventHandler WriteRequest;
        public event PropertyChangedEventHandler PropertyChanged;

        #region PRIVATE

        private VAR_TYPE_Enum var_type;

        private string name;
        private string address = "Internal";
        private object actValue;
        private string plc_name;
        private int sequence;
        private int id;
        private DateTime timespan;
        #endregion

        #region PROPERTY

        public override int ID
        {
            get { return id; }
        }

        public override string ADDRESS
        {
            get { return address; }
        }

        public override string NAME
        {
            get { return name; }
        }

        /// <summary>
        /// usato in visualizzazione
        /// </summary>
        public override object VALUE
        {
            get
            {
                return actValue;
            }
            set
            {
                if (!value.Equals(actValue))
                {
                    if (IO == IO_Enum.IN_OUT | IO == IO_Enum.OUT) 
                        OnWriteRequest(new KeyValuePair<int, object>(id, value), new EventArgs());
                   /* try
                    {
                        if (WriteRequest != null)
                            WriteRequest(new KeyValuePair<string,object>(name,value), new EventArgs());
                    }
                    catch (Exception e)
                    {
                        System.Diagnostics.Debug.WriteLine(e.Message);
                    }*/
                }
            }
        }

        public override string PLC_NAME
        {
            get { return plc_name; }
        }

        public override int SEQUENCE
        {
            get { return sequence; }
        }

        public override DateTime DATE
        {
            get
            {
                if (timespan == null)
                {
                    timespan = DateTime.Now;
                }
                return timespan;
            }
            set
            {
                if (timespan != null)
                {
                    if (timespan != value)
                    {
                        timespan = value;
                        //NotifyPropertyChanged("TIME_SPAN");
                    }
                }
                else
                {
                    timespan = value;
                    //NotifyPropertyChanged("TIME_SPAN");
                }
            }
        }

        public override string TIME_SPAN
        {
            get
            {

                return DATE.ToLongTimeString();
            }
        }

        /// <summary>
        /// Usato dalla classe proxy per aggiornare il valore del tag
        /// </summary>
        public override object SRV_VALUE
        {
            set
            {
                if (!value.Equals(actValue))
                {
                    NotifyPropertyChanged("TIME_SPAN");
                    NotifyPropertyChanged("VALUE");
                }
                actValue = value;
            }
        }

        #endregion

        #region COSTRUCTOR

        public TagsClient(int id,string name, string address,string plc_name,int sequence, VAR_TYPE_Enum var_type,IO_Enum io_type)
        {
            this.id = id;
            this.name = name;
            this.address = address;
            this.var_type = var_type;
            this.sequence = sequence;
            this.plc_name = plc_name;
            this.TYPE = var_type;
            this.IO = io_type;
            switch (this.TYPE)
            {
                case VAR_TYPE_Enum.BIT:
                    this.actValue = false;
                    break;
                case VAR_TYPE_Enum.STRING:
                    this.actValue = "";
                    break;
                default:
                    this.actValue = 0;
                    break;
            }
        }

        #endregion


        #region EVENTS

        protected override void OnWriteRequest(object sender, EventArgs e)
        {
            base.OnWriteRequest(sender, e);
        }

        private void NotifyPropertyChanged(String propertyName)
        {

            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
            }
        }

        #endregion
    }
}

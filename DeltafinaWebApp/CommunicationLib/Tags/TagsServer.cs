using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;

namespace CommunicationLib
{
    public class TagsServer : Tags, INotifyPropertyChanged
    {
        #region PRIVATE

        //public delegate void ChangedEventHandler(object sender, EventArgs e);
        //public override event ChangedEventHandler SendRequest;

        public event PropertyChangedEventHandler PropertyChanged;

        private VAR_TYPE_Enum var_type;

        private string name;
        private string address="Internal";
        private string plc_name = "Server";
        private int sequence;
        private object actValue;
        private int id;

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
                    NotifyPropertyChanged("VALUE");
                        OnSendRequest(new KeyValuePair<string, object>(this.NAME, this.VALUE), new EventArgs());
                }
                actValue = value;
            }
        }

        public override int SEQUENCE
        {
            get { return sequence; }
        }

        public override string PLC_NAME
        {
            get { return plc_name; }
        }

        #endregion

        #region COSTRUCTOR

        public TagsServer(int id,string name,int sequence, VAR_TYPE_Enum var_type)
        {
            this.id = id;
            this.name = name;
            this.var_type = var_type;
            this.sequence = sequence;
        }

        #endregion


        #region EVENTS

        protected override void OnSendRequest(object sender, EventArgs e)
        {
            base.OnSendRequest(sender, e);
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

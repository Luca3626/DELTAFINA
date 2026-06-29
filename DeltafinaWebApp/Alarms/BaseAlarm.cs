using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CommunicationLib;
using SQLCommLib;

namespace Alarms
{
    public enum ALARM_CATEGORY
    {
        ALARM,
        WARNING,
        MESSAGE,
        EVENT
    }

    public enum ALARM_STATE
    {
        NONE,
        I,
        I_O,
        I_O_A
    }


    public class BaseAlarm
    {
        public delegate void ChangedEventHandler(object sender, EventArgs e);
        public event ChangedEventHandler IsInAlarm;
        public event ChangedEventHandler OutAlarm;
        private bool eIsOn;
        private string tblName;
        private int actDelay=0;

        #region Properties

        public string UTENZA
        {
            get;
            set;
        }
        
        public string TEXT_LANG1
        {
            get;
            set;
        }

        public string TEXT_LANG2
        {
            get;
            set;
        }

        public string TEXT_LANG3
        {
            get;
            set;
        }

        public string PLC_NAME
        {
            get;
            set;
        }

        public string TAG_NAME
        {
            get;
            set;
        }

        public DateTime DATA_IN
        {
            get;
            set;
        }

        public DateTime DATA_OUT
        {
            get;
            set;
        }

        public DateTime DATA_ACK
        {
            get;
            set;
        }

        public ALARM_STATE STATE
        {
            get;
            set;
        }

        public ALARM_CATEGORY CATEGORY
        {
            get;
            set;
        }

        public string ZONA
        {
            get;
            set;
        }

        /// <summary>
        /// ritardo in multipli del tempo di controllo dell allarme
        /// </summary>
        public int DELAY
        {
            get;
            set;
        }

        public bool IS_ON
        {
            get;
            set;
        }

        public bool SEND_EMAIL
        {
            get;
            set;
        }

        public bool SEND_SMS
        {
            get;
            set;
        }

        public bool REVERSE
        {
            get;
            set;
        }

        public bool NEW_ALM
        {
            get;
            set;
        }

        #endregion

        #region COSTRUTTORE

        /// <summary>
        /// 
        /// </summary>
        /// <param name="plcName"></param>
        /// <param name="tagName"></param>       
        /// <param name="text">Testo allarme</param>
        /// <param name="category">tipo </param>
        /// <param name="zona" >Zona</param>
        /// <param name="delay">ritardo in multipli del tempo di controllo dell allarme</param>
        /// <param name="tblName"></param>
        /// <param name="conSql">connessione gia aperta</param>
        public BaseAlarm(string tagName, string plcName,string utenza, string text_lang1,string text_lang2,string text_lang3, ALARM_CATEGORY category,string zona, int delay,bool reverse, string tblName,bool sendEmail,bool sendSms, SQLServerConnection conSql)
        {
            this.UTENZA = utenza;
            this.TEXT_LANG1 = text_lang1;
            this.TEXT_LANG2 = text_lang2;
            this.TEXT_LANG3 = text_lang3;
            this.CATEGORY = category;
            this.DELAY = delay;
            this.REVERSE = reverse;
            this.ZONA = zona;
            this.PLC_NAME = plcName;
            this.TAG_NAME = tagName;
            this.tblName = tblName;
            this.SEND_EMAIL = sendEmail;
            this.SEND_SMS = sendSms;
            InsertInTblalarmSettings(conSql);
            checkForAlarmInDb(conSql);

        }

        #endregion



        #region PRIVATE

        private void InsertInTblalarmSettings(SQLServerConnection conSql)
        {
            try
            {
                if (int.Parse(conSql.readValueFromDb("SELECT COUNT(Tag_Name) FROM tblAlarmSettings WHERE Tag_Name='" + this.TAG_NAME + "'").ToString()) == 0)
                {
                    conSql.insertRowToDb("tblAlarmSettings", new object[] { conSql.getNextID("tblAlarmSettings", "ID"),
                        this.TAG_NAME,
                        this.UTENZA,
                        this.TEXT_LANG1.Replace("'", "''"),
                        this.TEXT_LANG2.Replace("'", "''"),
                        this.TEXT_LANG3.Replace("'", "''"),
                        this.ZONA,
                        this.SEND_EMAIL,
                        this.SEND_SMS });
                }
                else
                {
                    updateAlarmText(conSql);
                }
            }
            catch
            {
            }

        }

        private void checkForAlarmInDb(SQLServerConnection conSql)
        {
            //"G", new System.Globalization.CultureInfo("it-IT")
            //Il controllo viene fatto solo per allarmi e warnings
            if (conSql.IS_CONNECTED & (CATEGORY == ALARM_CATEGORY.ALARM || CATEGORY == ALARM_CATEGORY.WARNING))
            {
                object[] row = null;
                try
                {
                    row = conSql.readSingleRow("SELECT * FROM " + this.tblName + " WHERE Tag_Name='" + this.TAG_NAME + "' AND PLC_Name='" + this.PLC_NAME + "' AND Stato='" + ALARM_STATE.I + "'");
                    if (row != null)
                    {
                        if (row.Length != 0)
                        {
                            //object dataIn = conSql.readValueFromDb("SELECT DataIN FROM " + this.tblName + " WHERE Tag_Name='" + this.TAG_NAME + "' AND PLC_Name='" + this.PLC_NAME + "' AND Stato='" + ALARM_STATE.I + "'");
                            this.DATA_IN = DateTime.Parse(row[8].ToString());
                            this.STATE = ALARM_STATE.I;

                            eIsOn = true;
                        }

                        else
                        {
                            eIsOn = false;
                        }
                    }
                    else
                    {
                        eIsOn = false;
                    }
                }
                catch
                {
                }
            }
        }

        private void insertInDb(SQLServerConnection conSql)
        {
           
            object[] row = new object[13];
            row[0] = conSql.getNextID(tblName, "Num");
            row[1] = this.TAG_NAME;
            row[2] = this.PLC_NAME;
            row[3] = this.UTENZA;
            row[4] = this.TEXT_LANG1.Replace("'","''");
            row[5] = this.TEXT_LANG2.Replace("'", "''");
            row[6] = this.TEXT_LANG3.Replace("'", "''");
            row[7] = this.STATE;
            row[8] = this.DATA_IN.ToString("G", new System.Globalization.CultureInfo("it-IT"));
            row[9] = this.DATA_OUT.ToString("G", new System.Globalization.CultureInfo("it-IT"));
            row[10] = this.DATA_ACK.ToString("G", new System.Globalization.CultureInfo("it-IT"));
            row[11] = this.CATEGORY;
            row[12] = this.ZONA;
            conSql.insertRowToDb(tblName, row);
           

        }

        private void updateRow(SQLServerConnection conSql)
        {
            string[] columns = { "Stato", "DataOUT", "DataACK" };
            object[] row = new object[3];
            row[0] = this.STATE;
            row[1] = this.DATA_OUT.ToString("G", new System.Globalization.CultureInfo("it-IT"));
            row[2] = this.DATA_ACK.ToString("G", new System.Globalization.CultureInfo("it-IT"));

            conSql.updateRowsInDb(tblName, row, columns, " WHERE Tag_Name='" + this.TAG_NAME + "' AND PLC_Name='" + this.PLC_NAME + "' AND DataIN='" + this.DATA_IN + "'");
        }

        #endregion


        #region PUBLIC 

        public void updateAlarmText(SQLServerConnection conSql)
        {
            object[] row = conSql.readSingleRow("SELECT * FROM tblAlarmSettings WHERE Tag_Name='" + this.TAG_NAME + "'");
            if (row != null)
            {
                if (row.Length > 0)
                {
                    this.TEXT_LANG1 = row[3].ToString();
                    this.TEXT_LANG2 = row[4].ToString();
                    this.TEXT_LANG3 = row[5].ToString();
                    this.ZONA = row[6].ToString();
                    this.SEND_EMAIL = (bool)row[7];
                    this.SEND_SMS = (bool)row[8];
                }
            }
        }

        public void checkAlarm(bool condition, SQLServerConnection conSql)
        {
            checkForAlarmInDb(conSql);
            if (REVERSE)
            {
                IS_ON = !condition;
            }
            else
            {
                IS_ON = condition;
            }
            if (IS_ON & actDelay >= this.DELAY)
            {
                actDelay = 0;
                
                if (IS_ON /*& !eIsOn*/ & this.STATE == ALARM_STATE.NONE)
                {
                    NEW_ALM = true;
                    if (!eIsOn)
                    {
                        this.STATE = ALARM_STATE.I;
                        this.DATA_IN = DateTime.Now;
                        this.DATA_OUT = this.DATA_IN;
                        this.DATA_ACK = this.DATA_OUT;
                        insertInDb(conSql);
                        try
                        {
                            if (IsInAlarm != null)
                                IsInAlarm(this, new EventArgs());
                        }
                        catch
                        {
                        }
                    }
                }
            }
            else if (IS_ON & actDelay < this.DELAY)
            {
                actDelay++;
            }
           
            if (!IS_ON/* & eIsOn*/ & this.STATE == ALARM_STATE.I)
            {
                this.STATE = ALARM_STATE.I_O;
                this.DATA_OUT = DateTime.Now;
                this.DATA_ACK = this.DATA_OUT;
                updateRow(conSql);
                this.STATE = ALARM_STATE.NONE;
                try
                {
                    if (OutAlarm != null)
                        OutAlarm(this, new EventArgs());

                    //Models.Alarm.AlarmModel alarmModel = new Models.Alarm.AlarmModel
                    //{
                    //    DateIN = DATA_IN,
                    //    DateOUT = DATA_OUT,
                    //    TagName = TAG_NAME
                    //};
                    //Services.EmailSenderServices.SendAlarmNotificationOnReset(alarmModel);
                }
                catch
                {
                }
            }

            //eIsOn = IS_ON;

        }

        #endregion
    }
}

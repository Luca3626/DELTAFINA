using SQLCommLib;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Alarms
{
    class AlarmE_MailSender
    {
        BaseAlarm _newAlarm;
        string subject;

        CommunicationLib.ApplicationState _as;

        CommunicationLib.Helper.ErrorEventsLog eel;

        #region costruttore

        public AlarmE_MailSender(BaseAlarm _newAlarm, string subject, CommunicationLib.ApplicationState _as, CommunicationLib.Helper.ErrorEventsLog eel)
        {
            this._newAlarm = _newAlarm;
            this.subject = subject;
            this._as = _as;
            this.eel = eel;
            //if(this._newAlarm.SEND_EMAIL)
            //    new Thread(new ThreadStart(runAlarmSender)).Start();
        }

        #endregion

        #region Private

        private ArrayList getAllE_MailAdrress(SQLServerConnection sql1)
        {
            DataTable dt = new DataTable();

            object[] row;
            ArrayList a = new ArrayList();
            try
            {

                dt = sql1.fillDataTable("SELECT * FROM tblE_Mailer WHERE Enabled='true'");
                if (dt != null)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        row = dt.Rows[i].ItemArray;
                        a.Add(row[1].ToString());
                    }
                }
                return a;
            }
            catch
            {
                return new ArrayList();
            }
            finally
            {
                dt.Dispose();
                dt = null;
                row = null;
                a = null;
            }
        }

        private int countActiveAllarms(SQLServerConnection sql1)
        {
            try
            {
                return int.Parse(sql1.readValueFromDb("SELECT COUNT(Num) FROM vstAllarmi WHERE  Stato='" + ALARM_STATE.I + "' AND (Categoria='" + ALARM_CATEGORY.ALARM +
                    "' OR Categoria='" + ALARM_CATEGORY.WARNING + "') AND SendEmail='True'").ToString());
            }
            catch
            {
                return 0;
            }
        }

        private ArrayList getAllActiveAllarms(SQLServerConnection sql1)
        {
            DataTable dt = new DataTable();
            string sprt = "";
            object[] row;
            ArrayList a = new ArrayList();
            try
            {

                dt = sql1.fillDataTable("SELECT * FROM vstAllarmi WHERE Stato='" + ALARM_STATE.I + "' AND (Categoria='" + ALARM_CATEGORY.ALARM +
                    "' OR Categoria='" + ALARM_CATEGORY.WARNING + "') AND SendEmail='True' ORDER BY DataON DESC");
                if (dt != null)
                {
                    a.Add("Allarmi Attivi : ");
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        row = dt.Rows[i].ItemArray;
                        if (row[4].ToString() == ALARM_CATEGORY.ALARM.ToString())
                            sprt = "ALLARME: ";
                        else if (row[4].ToString() == ALARM_CATEGORY.WARNING.ToString())
                            sprt = "WARNING: ";

                        a.Add(sprt + " " + row[3] + " " + row[9] + " " + row[5]);
                    }
                }
                return a;
                // for (int i = 0; i < a.Count; i++)
                //     retVal = a[i] + "\n\r";
                // return retVal;

            }
            catch
            {
                return new ArrayList();
            }
            finally
            {
                // dt.Dispose();
                dt = null;
                row = null;
                a = null;
            }

        }

        //private void runAlarmSender()
        //{
        //    string newOne, alarms;
        //    ArrayList ae;
        //    E_Mailer.E_Mailer emailer = new E_Mailer.E_Mailer(eel);
        //    string smtp = Properties.Settings.Default.SMTP,
        //        sender = Properties.Settings.Default.Sender,
        //        senderPWD = Properties.Settings.Default.SenderPWD;
        //    int portSMTP = Properties.Settings.Default.Port_SMTP;
        //    BaseAlarm actAlarm = _newAlarm;
        //    int counter = 1;
        //    SQLServerConnection conSqlRAS = new SQLServerConnection();
        //    conSqlRAS.open(@Properties.Settings.Default.AlmConStr);

        //    ArrayList sendTo = getAllE_MailAdrress(conSqlRAS);
        //    newOne = "Nuovo Allarme : \n\r" + actAlarm.TEXT_LANG1 + " "+actAlarm.ZONA+" " + actAlarm.DATA_IN + "\n\r";

        //    int state;

        //    if (countActiveAllarms(conSqlRAS) > 1)
        //    {
        //        alarms = "************************************************************************\n\r";
        //        ae = getAllActiveAllarms(conSqlRAS);
        //        if (ae.Count > 1)
        //        {
        //            for (int i = 1; i < ae.Count; i++)
        //            {
        //                alarms += ae[i] + "\n\r";
        //            }
        //        }


        //        for (int i = 0; i < sendTo.Count; i++)
        //        {
        //            counter = 1;
        //            do
        //            {
        //                state = emailer.SendMessage(sendTo[i].ToString(), sender, senderPWD, "ALLARMI CASA", newOne + alarms, smtp, portSMTP);
        //                Thread.Sleep(100);
        //                counter++;
        //            }
        //            while (state == -1 & counter<=10 & _as.IS_RUNNING);
        //        }

        //    }
        //    else
        //    {

        //        for (int i = 0; i < sendTo.Count; i++)
        //        {
        //            counter = 1;
        //            do
        //            {
        //                state = emailer.SendMessage(sendTo[i].ToString(), sender, senderPWD, "ALLARMI CASA", newOne, smtp, portSMTP);
        //                Thread.Sleep(100);
        //            }
        //            while (state == -1 & counter <= 10 & _as.IS_RUNNING);
        //        }
        //    }

        //}

        #endregion
    }
}

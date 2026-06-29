using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alarms
{
    class AlarmSMSSender
    {
        BaseAlarm _newAlarm;
        CommunicationLib.ApplicationState _as;
        CommunicationLib.Helper.ErrorEventsLog eel;
        #region costruttore

        public AlarmSMSSender(BaseAlarm _newAlarm, CommunicationLib.ApplicationState _as, CommunicationLib.Helper.ErrorEventsLog eel)
        {
            this._newAlarm = _newAlarm;
            this._as = _as;
            this.eel = eel;
            //if(this._newAlarm.SEND_SMS)
            //    new Thread(new ThreadStart(runAlarmSender)).Start();
        }

        #endregion

        #region Private

        //private ArrayList getAllSMSNums(SQLServerConnection sql1)
        //{
        //    DataTable dt = new DataTable();

        //    object[] row;
        //    ArrayList a = new ArrayList();
        //    try
        //    {

        //        dt = sql1.fillDataTable("SELECT * FROM tblSMS WHERE Enabled='true'");
        //        if (dt != null)
        //        {
        //            for (int i = 0; i < dt.Rows.Count; i++)
        //            {
        //                row = dt.Rows[i].ItemArray;
        //                a.Add(row[1].ToString());
        //            }
        //        }
        //        return a;
        //    }
        //    catch
        //    {
        //        return new ArrayList();
        //    }
        //    finally
        //    {
        //        //dt.Dispose();
        //        dt = null;
        //        row = null;
        //        a = null;
        //    }
        //}

        //private void runAlarmSender()
        //{
        //    string newOne;
        //    SMS.SMSSender smsSender = new SMS.SMSSender(eel);
        //    string smtp = Properties.Settings.Default.SMTP,
        //        sender = Properties.Settings.Default.Sender,
        //        senderPWD = Properties.Settings.Default.SenderPWD;
        //    int portSMTP = Properties.Settings.Default.Port_SMTP;
        //    BaseAlarm actAlarm = _newAlarm;

        //    SQLServerConnection conSqlRAS = new SQLServerConnection();
        //    conSqlRAS.open(ConStr.AlarmsConnectionString);

        //    ArrayList sendTo = getAllSMSNums(conSqlRAS);
        //    newOne = "Nuovo Allarme : \n\r" + actAlarm.TEXT_LANG1 + " " + actAlarm.ZONA + " " + actAlarm.DATA_IN + "\n\r";
        //    conSqlRAS.close();
        //    int counter = 1;
        //    for (int i = 0; i < sendTo.Count; i++)
        //    {
        //        counter = 1;
        //        while (counter <= 10)
        //        {
        //            if (!_as.IS_RUNNING)
        //                return;
        //            if (smsSender.send(sendTo[i].ToString(), newOne, Properties.Settings.Default.IP_GSM, Properties.Settings.Default.Port_GSM))
        //                break;
        //            else
        //                counter++;
        //        }
        //        Thread.Sleep(100);

        //    }
        //}

        #endregion
    }
}

using CommunicationLib;
using SQLCommLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alarms
{
    public class Allarme
    {

        public BaseAlarm ba;
        private Tags tag;
        /// <summary>
        /// conSql-->Serve una connessione aperta
        /// </summary>
        /// <param name="tag">PLC Tag corrispondente all allarme</param>
        /// <param name="Text">Testo allarme</param>
        /// <param name="a_c">Categoria allarme</param>
        /// <param name="delay">Ritardo multiplo del controllo dell allarme </param>
        /// <param name="tblAllarmi"></param>
        /// <param name="conSql"></param>
        public Allarme(Tags tag, string utenza, string TextLang1, string TextLang2, string TextLang3, ALARM_CATEGORY a_c, int delay, bool reverse, string zona, string tblAllarmi, bool sendEmail, bool sendSms, SQLServerConnection conSql)
        {
            this.tag = tag;
            ba = new BaseAlarm(tag.NAME, tag.PLC_NAME, utenza, TextLang1, TextLang2, TextLang3, a_c, zona, delay, reverse, tblAllarmi, sendEmail, sendSms, conSql);
        }

        /// <summary>
        /// conSql-->Serve una connessione aperta
        /// </summary>
        /// <param name="conSql"></param>
        public void checkAllarme(SQLServerConnection conSql)
        {
            ba.checkAlarm((bool)tag.VALUE, conSql);
        }
    }
}

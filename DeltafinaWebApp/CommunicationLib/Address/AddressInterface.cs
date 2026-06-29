using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommunicationLib
{
    public class AddressInterface
    {
        #region MODBUS

        /// <summary>
        /// MODBUS
        /// Indirizzo del dispositivo (numero dell'ultimo byte dell'indirizzo ip)
        /// </summary>
        public byte M_ID_SLAVE { get; set; }

        /// <summary>
        /// MODBUS
        /// Codice per la lettura (vedi funzioni supportate plc, read holding registers)
        /// </summary>
        public byte M_R_CODE { get; set; }

        /// <summary>
        /// MODBUS
        /// Codice per la scrittura (vedi funzioni supportate plc, preset multiple registers)
        /// </summary>
        public byte M_W_CODE { get; set; }
        /// <summary>
        /// MODBUS
        /// Indirizzo di partenza (numero della word di riferimento)
        /// </summary>
        public int M_ADDRESS { get; set; } 

        /// <summary>
        /// MODBUS
        /// Numero di byte MASSIMO 248 (grandezza in byte del pacchetto)
        /// </summary>
        public short M_BYTE { get; set; }

     
        #endregion

        #region LV-PROTOCOL

        /// <summary>
        /// LV-PROTOCOL
        /// Numero del pacchetto
        /// </summary>
        public byte LV_P_NUMBER
        { get; set; }

        /// <summary>
        /// LV-PROTOCOL
        /// Numero di byte da leggere
        /// </summary>
        public short LV_BYTE_NUMBER
        { get; set; }

        #endregion

        #region ISO-on-TCP

        /// <summary>
        /// ISO-on-TCP
        /// Numero del DB
        /// </summary>
        public short ISO_on_TCP_DB_Num { get; set; }

        /// <summary>
        /// ISO-on-TCP
        /// Lunghezza del DB espressa in byte
        /// MAX=200 byte
        /// </summary>
        public short ISO_on_TCP_DB_Len { get; set; }

        /// <summary>
        /// ISO-on-TCP
        /// Indirizzo del DB
        /// </summary>
        public short ISO_on_TCP_DB_Addr { get; set; }

        #endregion 

        #region FINS
        //___________________________OMRON_______________________________   
         /* MEM ACCESS --->
         * 
         * CIO  (Word)-->Cod: B0
         * WR   (Word)-->Cod: B1
         * HR   (Word)-->Cod: B2
         * AR   (Word)-->Cod: B3
         * DM   (Word)-->Cod: 82
         * 
         * 
         * 
         */
        public byte FINS_MRC_R { get; set; }

        public byte FINS_SRC_R { get; set; }

        public byte FINS_MRC_W { get; set; }

        public byte FINS_SRC_W { get; set; }

        public byte FINS_M_ACCESS { get; set; }//Tipo di memoria da legge

        public ushort FINS_ADDRESS { get; set; }//Indirizzo di partenza

        public ushort FINS_LEN { get; set; }//Lunghezza pacchetto (Max 980 bytes)

        #endregion
    }
}

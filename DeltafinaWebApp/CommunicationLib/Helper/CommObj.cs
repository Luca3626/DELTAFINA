using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Net;
using System.Net.Sockets;

namespace CommunicationLib
{
    public abstract class CommObj:NotificationObject
    {
        #region FIELDS

        //Common
        protected bool isOpened = false,isConnected=false;
        protected int bytes_read=0,bytes_write=0,packets_read=0,packets_write=0;
        protected long t_write;
        protected long t_read;
        protected string name;
        protected bool erroreR_W;
        protected string errorR_W_cause = "";
        #endregion

        #region PROPERTIES
        public string NAME
        {
            get { return name; }
            set
            {
                if (name != value)
                {
                    name = value;
                    RaisePropertyChanged(() => NAME);
                }
            }
        }
        /// <summary>
        /// descrive lo stato della connessione
        /// </summary>
        public bool IS_OPENED
        {
            get
            {
                return isOpened;
            }
            set
            {
                if (isOpened != value)
                {
                    isOpened = value;
                    RaisePropertyChanged(() => IS_OPENED);
                    RaisePropertyChanged(() => CONN_STATE);
                }
            }
        }

        public string CONN_STATE
        {
            get {
                if (isOpened)
                {
                    if (isConnected)
                    {
                        return "CONNECTED";
                    }
                    else
                    {
                        return "OPEN";
                    }
                }
                else
                {
                    return "CLOSED";
                }
            }
        }

        /// <summary>
        /// descrive lo stato della connessione
        /// </summary>
        public bool IS_CONNECTED
        {
            get
            {
                return isConnected;
            }
            set
            {
                if (isConnected != value)
                {
                    isConnected = value;
                    RaisePropertyChanged(() => IS_CONNECTED);
                    RaisePropertyChanged(() => CONN_STATE);
                }
            }
        }


        public int B_READ
        {
            get { return bytes_read; }
            set
            {
                if (bytes_read != value)
                {
                    bytes_read = value;
                    RaisePropertyChanged(() => B_READ);
                }
            }
        }

        public int B_WRITE
        {
            get { return bytes_write; }
            set
            {
                if (bytes_write != value)
                {
                    bytes_write = value;
                    RaisePropertyChanged(() => B_WRITE);
                }
            }
        }

        public int P_READ
        {
            get { return packets_read; }
            set
            {
                if (packets_read != value)
                {
                    packets_read = value;
                    RaisePropertyChanged(() => P_READ);
                }
            }
        }

        public int P_WRITE
        {
            get { return packets_write; }
            set
            {
                if (packets_write != value)
                {
                    packets_write = value;
                    RaisePropertyChanged(() => P_WRITE);
                }
            }
        }

        public long T_READ
        {
            get { return t_read; }
            set
            {
                if (t_read != value)
                {
                    t_read = value;
                    RaisePropertyChanged(() => T_READ);
                }
            }
        }

        public long T_WRITE
        {
            get { return t_write; }
            set
            {
                if (t_write != value)
                {
                    t_write = value;
                    RaisePropertyChanged(() => T_WRITE);
                }
            }
        }

        /// <summary>
        /// Presenza di un errore lettura scrittura
        /// </summary>
        public bool ERROR_R_W
        {
            get { return erroreR_W; }
            set
            {
                if (erroreR_W != value)
                {
                    erroreR_W = value;
                    RaisePropertyChanged(() => ERROR_R_W);
                    RaisePropertyChanged(() => ERROR);
                }
            }
        }

        public string ERROR
        {
            get { return ERROR_R_W ? "ERROR" : "OK"; }
        }

        /// <summary>
        /// Errore di lettura scrittura indipendente dall protocollo dello strato superiore
        /// </summary>
        public string ERROR_R_W_CAUSE
        {
            get { return errorR_W_cause; }
            set
            {
                if (errorR_W_cause != value)
                {
                    errorR_W_cause = value;
                    RaisePropertyChanged(() => ERROR_R_W_CAUSE);
                }
            }
        }

        #endregion

        #region COSTRUCTOR

        public CommObj()
        {
        }

        #endregion

        #region Abstract Methods

        /// <summary>
        /// Open connection
        /// </summary>
        public abstract void Open();

        /// <summary>
        /// Close connection
        /// </summary>
        public abstract void Close();

        /// <summary>
        /// Read data from connection
        /// </summary>
        /// <param name="ReadParams"></param>
        /// <returns></returns>
        public abstract byte[] Read(AddressInterface ai);

        /// <summary>
        /// write data to connection
        /// </summary>
        /// <param name="ai"></param>
        /// <param name="buffer"></param>
        /// <returns></returns>
        public abstract int Write(AddressInterface ai, byte[] buffer);

        #endregion

    }

    class ConnectionException : Exception
    {

        public string ErrorMessage
        {
            get
            {
                return "Limite di tentativi di Lettura/Scrittura superato";
            }
        }
    }

    class ParamsException : Exception
    {

        public string ErrorMessage
        {
            get
            {
                return "Parametri non validi per l operazione richiesta";
            }
        }
    }
}

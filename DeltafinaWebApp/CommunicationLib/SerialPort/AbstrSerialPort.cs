using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO.Ports;
using System.Threading;
using System.ComponentModel;

namespace CommunicationLib
{
    public abstract class AbstrSerialPort:CommObj
    {
        #region FIELDS
        protected string portName = "COM3";
        protected int baudRate = 19200;
        protected Parity parity = Parity.None;
        protected int dataBits = 8;
        protected StopBits stopBits = StopBits.One;
        protected int dimTxBuf = 256;
        protected int dimRxBuf = 256;
        protected int readTimeOut = 50;
        protected int writeTimeOut = 50;
        protected int noDataTimeOut = 1000;
        protected bool commError = true;
        
        
        protected string internalError_cause = "";
        protected bool isInitialized = false;
        protected bool dataRecevied, readTimeoutElapsed;
        
        protected System.Timers.Timer waitTimer;
        protected SerialPort serialPort;
        protected CRC16_V2 crc16;
        #endregion

        #region PROPERTIES

        

        /// <summary>
        /// NUMERO PORTA
        /// </summary>
        public string PORT_NAME
        {
            get { return portName; }
            set
            {
                if (portName != value)
                {
                    portName = value;
                    RaisePropertyChanged(() => PORT_NAME);
                }
            }
        }

        /// <summary>
        /// Velocità Trasmissione
        /// </summary>
        public int BAUD_RATE
        {
            get { return baudRate; }
            set
            {
                if (baudRate != value)
                {
                    baudRate = value;
                    RaisePropertyChanged(() => BAUD_RATE);
                }
            }
        }

        /// <summary>
        /// Parità
        /// </summary>
        public Parity PARITY
        {
            get { return parity; }
            set
            {
                if (parity != value)
                {
                    parity = value;
                    RaisePropertyChanged(() => PARITY);
                }
            }
        }

        /// <summary>
        /// Bit di dati
        /// </summary>
        public int DATA_BITS
        {
            get { return dataBits; }
            set
            {
                if (dataBits != value)
                {
                    dataBits = value;
                    RaisePropertyChanged(() => DATA_BITS);
                }
            }
        }

        /// <summary>
        /// Bit di stop
        /// </summary>
        public StopBits STOP_BITS
        {
            get { return stopBits; }
            set
            {
                if (stopBits != value)
                {
                    stopBits = value;
                    RaisePropertyChanged(() => STOP_BITS);
                }
            }
        }

        /// <summary>
        /// Read timeout
        /// </summary>
        public int READ_TIMEOUT
        {
            get { return readTimeOut; }
            set
            {
                if (readTimeOut != value)
                {
                    readTimeOut = value;
                    RaisePropertyChanged(() => READ_TIMEOUT);
                }
            }
        }

        /// <summary>
        /// Write timeout
        /// </summary>
        public int WRITE_TIMEOUT
        {
            get { return writeTimeOut; }
            set
            {
                if (writeTimeOut != value)
                {
                    writeTimeOut = value;
                    RaisePropertyChanged(() => WRITE_TIMEOUT);
                }
            }
        }


        /// <summary>
        /// Presenza di un errore interno
        /// </summary>
        public bool INTERNAL_ERROR
        {
            get { return commError; }
            set
            {
                if (commError != value)
                {
                    commError = value;
                    RaisePropertyChanged(() => INTERNAL_ERROR);
                }
            }

        }

        /// <summary>
        /// Errore interno all apertura della porta
        /// </summary>
        public string INTERNAL_ERROR_CAUSE
        {
            get { return internalError_cause; }
            set
            {
                if (internalError_cause != value)
                {
                    internalError_cause = value;
                    RaisePropertyChanged(() => INTERNAL_ERROR_CAUSE);
                }
            }
        }

       

        

        /// <summary>
        /// Definisce lo stato di inizializzazione della porta
        /// </summary>
        public bool IS_INITIALIZED
        {
            get { return isInitialized; }
            set
            {
                if (isInitialized != value)
                {
                    isInitialized = value;
                    RaisePropertyChanged(() => IS_INITIALIZED);
                }
            }


        }

       

        #endregion


        #region CONSTRUCTOR

        public AbstrSerialPort()
        {
           
            crc16 = new CRC16_V2();
            serialPort = new SerialPort();
            serialPort.DataReceived += new SerialDataReceivedEventHandler(serialPort_DataReceived);
            InizializePort();

            waitTimer = new System.Timers.Timer();
            waitTimer.Interval = noDataTimeOut;
            //waitTimer.Enabled = false;
            waitTimer.Elapsed += new System.Timers.ElapsedEventHandler(waitTimer_Elapsed);



        }





        #endregion


        #region PRIVATE METHODS

        private void InizializePort()
        {
           
            serialPort.PortName = PORT_NAME;
            serialPort.BaudRate = BAUD_RATE;
            serialPort.Parity = PARITY;
            serialPort.DataBits = DATA_BITS;
            serialPort.StopBits = STOP_BITS;
            serialPort.ReadBufferSize = dimRxBuf;
            serialPort.WriteBufferSize = dimTxBuf;
            serialPort.ReadTimeout = READ_TIMEOUT;
            serialPort.WriteTimeout = WRITE_TIMEOUT;
            serialPort.RtsEnable = true;
            serialPort.DtrEnable = true;
            serialPort.Handshake = Handshake.None;

            IS_INITIALIZED = true;
        }



        #endregion

        #region EVENTS

        void serialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            dataRecevied = true;
        }

        void waitTimer_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            readTimeoutElapsed = true;
        }


        #endregion

        #region PUBLIC

        /// <summary>
        /// apri porta seriale
        /// </summary>
        public override void Open()
        {
            try
            {
                InizializePort();
                serialPort.Open();
                IS_OPENED = true;
                INTERNAL_ERROR = false; 
                INTERNAL_ERROR_CAUSE = "";
            }
            catch (Exception e)
            {
                IS_OPENED = false;
                INTERNAL_ERROR = true;
                INTERNAL_ERROR_CAUSE = e.Message;

            }
        }

        /// <summary>
        /// chiudi porta seriale
        /// </summary>
        public override void Close()
        {
            try
            {
                serialPort.DiscardOutBuffer();
                serialPort.DiscardInBuffer();
                serialPort.Close();
                IS_OPENED = false;
            }
            catch
            {

            }
        }

        #endregion

        

        
    }
}

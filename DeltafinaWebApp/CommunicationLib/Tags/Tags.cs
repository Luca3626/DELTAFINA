using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommunicationLib
{
    #region ENUMS

    public enum Endian
    {
        Little,
        Big,
        Omron

    }

    public enum VAR_TYPE_Enum
    {
        BIT,
        BYTE,
        INT16,
        UINT16,
        INT32,
        INT64,
        FLOAT,
        DOUBLE,
        STRING,
        S5TIME

    }

    public enum IO_Enum
    {
        IN,
        OUT,
        IN_OUT
    }

    public enum S5Time_T_Base
    {
        _10ms,
        _100ms,
        _1s,
        _10s
    }

    /* public enum BYTE
     {
         ZERO,
         ONE
     }

     public enum BIT
     {
         ZERO,
         ONE,
         TWO,
         THREE,
         FOUR,
         FIVE,
         SIX,
         SEVEN
     }*/

    #endregion

    public abstract class Tags
    {
        public delegate void ChangedEventHandler(object sender, EventArgs e);
        public event ChangedEventHandler SendRequest;
        public event ChangedEventHandler WriteRequest;
        object dummy;

        public abstract int ID
        {
            get;
        }

        public abstract string NAME
        {
            get;
        }
        public abstract object VALUE
        { 
            get; 
            set; 
        }
        public abstract string ADDRESS
        {
            get;
        }
        public abstract string PLC_NAME
        {
            get;
        }
        public abstract int SEQUENCE
        {
            get;
        }

        public virtual bool NEW_DATA
        {
            get;
            set;
        }


        public virtual VAR_TYPE_Enum TYPE
        {
            get;
            set;
        }

        public virtual IO_Enum IO
        {
            get;
            set;
        }

        public virtual DateTime DATE
        {
            get;
            set;
        }

        public virtual S5Time_T_Base S5TIME_T_BASE
        {
            get;
            set;
        }

        public virtual string TIME_SPAN
        {
            get { return ""; }
        }

        /// <summary>
        /// Visibilita sul lato client, usato solo da TagsPLC
        /// </summary>
        public virtual bool CLIENT_VISIBLE
        {
            get { return true; }
        }

        protected virtual void OnSendRequest(object sender, EventArgs e)
        {
            SendRequest?.Invoke(sender, e);
        }

        protected virtual void OnWriteRequest(object sender, EventArgs e)
        {
            if (WriteRequest != null)
                WriteRequest(sender, e);
        }

        public virtual object SRV_VALUE
        {
            set { dummy = value; }
        }

        public virtual bool RETAIN
        {
            get;
            set;
        }

        public virtual bool GET_RETAIN
        {
            get;
            set;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;


namespace CommunicationLib
{
   

    public class TagsPLC : Tags, INotifyPropertyChanged
    {
        //public delegate void ChangedEventHandler(object sender, EventArgs e);
        //public override event ChangedEventHandler SendRequest;
        public event PropertyChangedEventHandler PropertyChanged;

        string AlmConStr = "";

        #region PRIVATE

        private ByteContainer data;
        private Endian endian;
        private VAR_TYPE_Enum var_type;
        private int posInBuffer;
        private byte bytePos;
        private string name;
        private string address;
        private byte bitPos;
      
        private int strLen;
        private string plc_name;
        private int sequence;
        private bool clientVisible = false;
        private int id;
        private bool newdata;
        private DateTime timespan;


        private bool floatingT_Base;
        #endregion

        #region PROPERTY

        public override int ID
        {
            get { return id; }
        }

        public override string NAME
        {
            get { return name; }
        }

        public override object VALUE
        {
            get
            {
                
                return getValue();
            }
            set
            {
                if(IO==IO_Enum.IN_OUT | IO==IO_Enum.OUT)
                    setValue(value);

            }
        }

        public override string ADDRESS
        {
            get { return address; }
        }

        public override string PLC_NAME
        {
            get { return plc_name; }
        }

        public override int SEQUENCE
        {
            get { return sequence; }
        }

        public override bool CLIENT_VISIBLE
        {
            get { return clientVisible; }
        }

        private bool retain = false;
        public override bool RETAIN
        {
            get
            {
                return retain;
            }
            set
            {
                retain = value;
            }
        }

        private bool get_retain = false;
        public override bool GET_RETAIN
        {
            get
            {
                return get_retain;
            }
            set
            {
                get_retain = value;
            }
        }

        public override VAR_TYPE_Enum TYPE
        {
            get
            {
                return var_type;
            }
            set
            {
                var_type = value;
            }
        }

        public override bool NEW_DATA
        {
            get
            {
                return newdata;
            }
            set
            {
                newdata = value;
            }
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
                        NotifyPropertyChanged("TIME_SPAN");
                    }
                }
                else
                {
                    timespan = value;
                    NotifyPropertyChanged("TIME_SPAN");
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

        #endregion

        #region COSTRUCTOR

        /// <summary>
        /// INT16-UINT16-INT32-INT64-FLOAT-DOUBLE
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="address">indirizzo nel plc</param>
        /// <param name="plc_name">nome del plc di provenienza</param>
        /// <param name="sequence">Sequenza del pacchetto Riservato per usi futuri</param>
        /// <param name="F_BytePosInC">posizione in ByteContainer primo byte</param>
        /// <param name="data"></param>
        /// <param name="com_type"></param>
        /// <param name="var_type"></param>
        public TagsPLC(int id,string name, string address, string plc_name, int sequence, int F_BytePosInC, ByteContainer data, Endian endian, VAR_TYPE_Enum var_type,bool ClientVisible,IO_Enum io)
        {
            this.id = id;
            this.name = name;
            this.address = address;
            this.posInBuffer = F_BytePosInC;
            this.data = data;
            this.data.Changed += new ByteContainer.ChangedEventHandler(data_Changed);
            this.endian = endian;
            this.var_type = var_type;
            this.sequence = sequence;
            this.plc_name = plc_name;
            this.IO = io;
            this.clientVisible = ClientVisible;  
        }

        /// <summary>
        /// INT16-UINT16-INT32-INT64-FLOAT-DOUBLE
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="address">indirizzo nel plc</param>
        /// <param name="plc_name">nome del plc di provenienza</param>
        /// <param name="sequence">Sequenza del pacchetto Riservato per usi futuri</param>
        /// <param name="F_BytePosInC">posizione in ByteContainer primo byte</param>
        /// <param name="data"></param>
        /// <param name="com_type"></param>
        /// <param name="var_type"></param>
        public TagsPLC(int id, string name, string address, string plc_name, int sequence, int F_BytePosInC, ByteContainer data, Endian endian, VAR_TYPE_Enum var_type, bool ClientVisible, bool retain, IO_Enum io)
        {
            this.id = id;
            this.name = name;
            this.address = address;
            this.posInBuffer = F_BytePosInC;
            this.data = data;
            this.data.Changed += new ByteContainer.ChangedEventHandler(data_Changed);
            this.endian = endian;
            this.var_type = var_type;
            this.sequence = sequence;
            this.plc_name = plc_name;
            this.clientVisible = ClientVisible;
            this.retain = retain;
            this.IO = io;
        }

        /// <summary>
        /// STRING
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="address">indirizzo nel plc</param>
        /// <param name="plc_name">nome del plc di provenienza</param>
        /// <param name="sequence">Sequenza del pacchetto Riservato per usi futuri</param>
        /// <param name="F_BytePosInC">posizione in ByteContainer primo byte</param>
        /// <param name="data"></param>
        /// <param name="com_type"></param>
        /// <param name="var_type"></param>
        /// <param name="strLen"></param>
        public TagsPLC(int id,string name, string address, string plc_name, int sequence, int F_BytePosInC, ByteContainer data, Endian endian, VAR_TYPE_Enum var_type, int strLen, bool ClientVisible,IO_Enum io)
        {
            this.id = id;
            this.name = name;
            this.address = address;
            this.posInBuffer = F_BytePosInC;
            this.data = data;
            this.data.Changed += new ByteContainer.ChangedEventHandler(data_Changed);
            this.endian = endian;
            this.var_type = var_type;
            this.strLen=strLen;
            this.sequence = sequence;
            this.plc_name = plc_name;
            this.clientVisible = ClientVisible;
            this.IO = io;
           
        }

        /// <summary>
        /// STRING
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="address">indirizzo nel plc</param>
        /// <param name="plc_name">nome del plc di provenienza</param>
        /// <param name="sequence">Sequenza del pacchetto Riservato per usi futuri</param>
        /// <param name="F_BytePosInC">posizione in ByteContainer primo byte</param>
        /// <param name="data"></param>
        /// <param name="com_type"></param>
        /// <param name="var_type"></param>
        /// <param name="strLen"></param>
        public TagsPLC(string name, string address, string plc_name, int sequence, int F_BytePosInC, ByteContainer data, Endian endian, VAR_TYPE_Enum var_type, int strLen, bool ClientVisible,bool retain,IO_Enum io)
        {
            this.name = name;
            this.address = address;
            this.posInBuffer = F_BytePosInC;
            this.data = data;
            this.data.Changed += new ByteContainer.ChangedEventHandler(data_Changed);
            this.endian = endian;
            this.var_type = var_type;
            this.strLen = strLen;
            this.sequence = sequence;
            this.plc_name = plc_name;
            this.clientVisible = ClientVisible;
            this.retain = retain;
            this.IO = io;

        }

        /// <summary>
        /// BYTE
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="address">indirizzo nel plc</param>
        /// <param name="plc_name">nome del plc di provenienza</param>
        /// <param name="sequence">Sequenza del pacchetto Riservato per usi futuri</param>
        /// <param name="F_BytePosInC">posizione in ByteContainer primo byte</param>
        /// <param name="data"></param>
        /// <param name="com_type"></param>
        /// <param name="var_type"></param>
        /// <param name="bytePos"></param>
        public TagsPLC(int id, string name, string address, string plc_name, int sequence, int F_BytePosInC, ByteContainer data, Endian endian, VAR_TYPE_Enum var_type, byte bytePos, bool ClientVisible, IO_Enum io)
        {
            this.id = id;
            this.name = name;
            this.address = address;
            this.posInBuffer = F_BytePosInC;
            this.data = data;
            this.data.Changed += new ByteContainer.ChangedEventHandler(data_Changed);
            this.endian = endian;
            this.var_type = var_type;
            this.sequence = sequence;
            this.plc_name = plc_name;
            this.bytePos = bytePos;
            this.clientVisible = ClientVisible;
            this.IO = io;
        }

        /// <summary>
        /// BYTE
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="address">indirizzo nel plc</param>
        /// <param name="plc_name">nome del plc di provenienza</param>
        /// <param name="sequence">Sequenza del pacchetto Riservato per usi futuri</param>
        /// <param name="F_BytePosInC">posizione in ByteContainer primo byte</param>
        /// <param name="data"></param>
        /// <param name="com_type"></param>
        /// <param name="var_type"></param>
        /// <param name="bytePos"></param>
        public TagsPLC(int id, string name, string address, string plc_name, int sequence, int F_BytePosInC, ByteContainer data, Endian endian, VAR_TYPE_Enum var_type, byte bytePos, bool ClientVisible, bool retain, IO_Enum io)
        {
            this.name = name;
            this.address = address;
            this.posInBuffer = F_BytePosInC;
            this.data = data;
            this.data.Changed += new ByteContainer.ChangedEventHandler(data_Changed);
            this.endian = endian;
            this.var_type = var_type;
            this.sequence = sequence;
            this.plc_name = plc_name;
            this.bytePos = bytePos;
            this.clientVisible = ClientVisible;
            this.retain = retain;
            this.IO = io;
        }

        /// <summary>
        /// BIT
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="address">indirizzo nel plc</param>
        /// <param name="plc_name">nome del plc di provenienza</param>
        /// <param name="sequence">Sequenza del pacchetto Riservato per usi futuri</param>
        /// <param name="F_BytePosInC">posizione in ByteContainer primo byte</param>
        /// <param name="data"></param>
        /// <param name="com_type"></param>
        /// <param name="var_type"></param>
        /// <param name="bytePos"></param>
        /// <param name="bitPos"></param>
        public TagsPLC(int id, string name, string address, string plc_name, int sequence, int F_BytePosInC, ByteContainer data, Endian endian, VAR_TYPE_Enum var_type, byte bytePos, byte bitPos, bool ClientVisible, IO_Enum io)
        {
            this.id = id;
            this.name = name;
            this.address = address;
            this.posInBuffer = F_BytePosInC;
            this.data = data;
            this.data.Changed += new ByteContainer.ChangedEventHandler(data_Changed);
            this.endian = endian;
            this.var_type = var_type;
            this.bytePos = bytePos ;
            this.sequence = sequence;
            this.plc_name = plc_name;
            this.bitPos = bitPos;
            this.clientVisible = ClientVisible;
            this.IO = io;
        }

        /// <summary>
        /// BIT
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="address">indirizzo nel plc</param>
        /// <param name="plc_name">nome del plc di provenienza</param>
        /// <param name="sequence">Sequenza del pacchetto Riservato per usi futuri</param>
        /// <param name="F_BytePosInC">posizione in ByteContainer primo byte</param>
        /// <param name="data"></param>
        /// <param name="com_type"></param>
        /// <param name="var_type"></param>
        /// <param name="bytePos"></param>
        /// <param name="bitPos"></param>
        public TagsPLC(int id, string name, string address, string plc_name, int sequence, int F_BytePosInC, ByteContainer data, Endian endian, VAR_TYPE_Enum var_type, byte bytePos, byte bitPos, bool ClientVisible, bool retain, IO_Enum io)
        {
            this.name = name;
            this.address = address;
            this.posInBuffer = F_BytePosInC;
            this.data = data;
            this.data.Changed += new ByteContainer.ChangedEventHandler(data_Changed);
            this.endian = endian;
            this.var_type = var_type;
            this.bytePos = bytePos;
            this.sequence = sequence;
            this.plc_name = plc_name;
            this.bitPos = bitPos;
            this.clientVisible = ClientVisible;
            this.retain = retain;
            this.IO = io;
        }


        /// <summary>
        /// S5TIME
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="address">indirizzo nel plc</param>
        /// <param name="plc_name">nome del plc di provenienza</param>
        /// <param name="sequence">Sequenza del pacchetto Riservato per usi futuri</param>
        /// <param name="F_BytePosInC">posizione in ByteContainer primo byte</param>
        /// <param name="data"></param>
        /// <param name="com_type"></param>
        /// <param name="var_type"></param>
        public TagsPLC(int id, string name, string address, string plc_name, int sequence, int F_BytePosInC, ByteContainer data, Endian endian, VAR_TYPE_Enum var_type, bool ClientVisible, IO_Enum io, S5Time_T_Base T_Base, bool floatingT_Base)
        {
            this.id = id;
            this.name = name;
            this.address = address;
            this.posInBuffer = F_BytePosInC;
            this.data = data;
            this.data.Changed += new ByteContainer.ChangedEventHandler(data_Changed);
            this.endian = endian;
            this.var_type = var_type;
            this.sequence = sequence;
            this.plc_name = plc_name;
            this.IO = io;
            this.S5TIME_T_BASE = T_Base;
            this.floatingT_Base = floatingT_Base;
            this.clientVisible = ClientVisible;
        }

        /// <summary>
        /// S5TIME
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="address">indirizzo nel plc</param>
        /// <param name="plc_name">nome del plc di provenienza</param>
        /// <param name="sequence">Sequenza del pacchetto Riservato per usi futuri</param>
        /// <param name="F_BytePosInC">posizione in ByteContainer primo byte</param>
        /// <param name="data"></param>
        /// <param name="com_type"></param>
        /// <param name="var_type"></param>
        public TagsPLC(int id, string name, string address, string plc_name, int sequence, int F_BytePosInC, ByteContainer data, Endian endian, VAR_TYPE_Enum var_type, bool ClientVisible, bool retain, IO_Enum io, S5Time_T_Base T_Base,bool floatingT_Base)
        {
            this.id = id;
            this.name = name;
            this.address = address;
            this.posInBuffer = F_BytePosInC;
            this.data = data;
            this.data.Changed += new ByteContainer.ChangedEventHandler(data_Changed);
            this.endian = endian;
            this.var_type = var_type;
            this.sequence = sequence;
            this.plc_name = plc_name;
            this.clientVisible = ClientVisible;
            this.retain = retain;
            this.IO = io;
            this.S5TIME_T_BASE = T_Base;
            this.floatingT_Base = floatingT_Base;
        }


        #endregion

        #region EVENTS

        protected override void OnSendRequest(object sender, EventArgs e)
        {
            base.OnSendRequest(sender, e);
        }

        private void NotifyPropertyChanged(String propertyName)
        {

            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        void data_Changed(object sender, EventArgs e)
        {
            int changedData = (int)sender;
            bool fireEvent = false;
            switch (endian)
            {
                case Endian.Little:
                case Endian.Big:
                case Endian.Omron:
                    switch (var_type)
                    {
                        case VAR_TYPE_Enum.BIT:
                        case VAR_TYPE_Enum.BYTE:
                            //Modificato 18/08/2020
                            //fireEvent = changedData >= posInBuffer & changedData <= posInBuffer + 1;
                            fireEvent = changedData >= posInBuffer & changedData <= posInBuffer + 1;
                            //if (fireEvent)
                            //    Console.Out.WriteLine("TROVATO BYTE");
                            break;
                        case VAR_TYPE_Enum.INT16:
                        case VAR_TYPE_Enum.UINT16:
                        case VAR_TYPE_Enum.S5TIME:
                            //Modificato 15/08/2020
                            //fireEvent = changedData >= posInBuffer & changedData <= posInBuffer + 2;
                            fireEvent = changedData >= posInBuffer & changedData <= posInBuffer + 2;
                            break;
                        case VAR_TYPE_Enum.INT32:
                        case VAR_TYPE_Enum.FLOAT:
                            //Modificato 15/08/2020
                            //fireEvent = changedData >= posInBuffer & changedData <= posInBuffer + 4;
                            fireEvent = changedData >= posInBuffer & changedData <= posInBuffer + 4;
                            //if (fireEvent && NAME.Equals("real32_240_241"))
                            //    Console.Out.WriteLine("TROVATO BYTE");
                            break;
                        case VAR_TYPE_Enum.INT64:
                        case VAR_TYPE_Enum.DOUBLE:
                            //Modificato 18/08/2020 per uniformità con la modifica del 15 ma non l'ho provato
                            //fireEvent = changedData >= posInBuffer & changedData <= posInBuffer + 8;
                            fireEvent = changedData >= posInBuffer & changedData <= posInBuffer + 8;
                            break;
                        case VAR_TYPE_Enum.STRING:
                            //Modificato 18/08/2020 per uniformità con la modifica del 15 ma non l'ho provato
                            //fireEvent = changedData >= posInBuffer & changedData <= posInBuffer + strLen;
                            fireEvent = changedData >= posInBuffer & changedData <= posInBuffer + strLen;
                            break;
                    }
                    break;

            }
            if (fireEvent)
            {
                DATE = DateTime.Now;
                NEW_DATA = true;
                NotifyPropertyChanged("VALUE");
                if (CLIENT_VISIBLE)
                    OnSendRequest(new KeyValuePair<string, object>(NAME, VALUE), new EventArgs());
            }
        }

        #endregion

        #region HELPER

        private object getValue()
        {

            switch (endian)
            {
                case Endian.Big:
                    switch (var_type)
                    {
                        case VAR_TYPE_Enum.BIT:
                            return getInvertedBit();
                        case VAR_TYPE_Enum.BYTE:
                            return getInvertedByte();
                        case VAR_TYPE_Enum.INT16:
                            return getInvertedInt16();
                        case VAR_TYPE_Enum.UINT16:
                            return getInvertedUInt16();
                        case VAR_TYPE_Enum.INT32:
                            return getInvertedInt32();
                        case VAR_TYPE_Enum.INT64:
                            return getInvertedInt64();
                        case VAR_TYPE_Enum.FLOAT:
                            return getInvertedSingle();
                        case VAR_TYPE_Enum.DOUBLE:
                            return getInvertedDouble();
                        case VAR_TYPE_Enum.STRING:
                            return getInvertedString();
                        case VAR_TYPE_Enum.S5TIME:
                            return getInvertedS5TIME();
                        default: return null;
                    }
                case Endian.Little:
                    switch (var_type)
                    {
                        case VAR_TYPE_Enum.BIT:
                            return getStraightBit();
                        case VAR_TYPE_Enum.BYTE:
                            return getStraightByte();
                        case VAR_TYPE_Enum.INT16:
                            return getStraightInt16();
                        case VAR_TYPE_Enum.UINT16:
                            return getStraightUInt16();
                        case VAR_TYPE_Enum.INT32:
                            return getStraightInt32();
                        case VAR_TYPE_Enum.INT64:
                            return getStraightInt64();
                        case VAR_TYPE_Enum.FLOAT:
                            return getStraightSingle();
                        case VAR_TYPE_Enum.DOUBLE:
                            return getStraightDouble();
                        case VAR_TYPE_Enum.STRING:
                            return getStraightString();
                        case VAR_TYPE_Enum.S5TIME:
                            return getStraightS5TIME();
                        default: return null;
                    }
                case Endian.Omron:
                    switch (var_type)
                    {
                        case VAR_TYPE_Enum.BIT:
                            return getOmronBit();
                        case VAR_TYPE_Enum.BYTE:
                            return getOmronByte();
                        case VAR_TYPE_Enum.INT16:
                            return getOmronInt16();
                        case VAR_TYPE_Enum.UINT16:
                            return getOmronUInt16();
                        case VAR_TYPE_Enum.INT32:
                            return getOmronInt32();
                        case VAR_TYPE_Enum.INT64:
                            return getOmronInt64();
                        case VAR_TYPE_Enum.FLOAT:
                            return getOmronSingle();
                        case VAR_TYPE_Enum.DOUBLE:
                            return getOmronDouble();
                        case VAR_TYPE_Enum.STRING:
                            return getOmronString();
                        default: return null;
                    }
               
                default: return null;
            }

        }

        private void setValue(object value)
        {
            try
            {
                switch (endian)
                {
                    case Endian.Big:
                        switch (var_type)
                        {
                            case VAR_TYPE_Enum.BIT:
                                setInvertedBit(bool.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.BYTE:
                                setInvertedByte(byte.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.INT16:
                                setInvertedInt16(Int16.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.UINT16:
                                setInvertedUInt16(UInt16.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.INT32:
                                setInvertedInt32(Int32.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.INT64:
                                setInvertedInt64(Int64.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.FLOAT:
                                setInvertedSingle(Single.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.DOUBLE:
                                setInvertedDouble(Double.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.STRING:
                                setInvertedString(value.ToString());
                                break;
                            case VAR_TYPE_Enum.S5TIME:
                                setInvertedS5TIME(UInt16.Parse(value.ToString()));
                                break;
                        }
                        break;
                    case Endian.Little:
                        switch (var_type)
                        {
                            case VAR_TYPE_Enum.BIT:
                                setStraightBit(bool.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.BYTE:
                                setStraightByte(byte.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.INT16:
                                setStraightInt16(Int16.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.UINT16:
                                setStraightUInt16(UInt16.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.INT32:
                                setStraightInt32(Int32.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.INT64:
                                setStraightInt64(Int64.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.FLOAT:
                                setStraightSingle(Single.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.DOUBLE:
                                setStraightDouble(Double.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.STRING:
                                setStraightString(value.ToString());
                                break;
                            case VAR_TYPE_Enum.S5TIME:
                                setStraightS5TIME(UInt16.Parse(value.ToString()));
                                break;
                        }
                        break;
                    case Endian.Omron:
                        switch (var_type)
                        {
                            case VAR_TYPE_Enum.BIT:
                                setOmronBit(bool.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.BYTE:
                                setOmronByte(byte.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.INT16:
                                setOmronInt16(Int16.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.UINT16:
                                setOmronUInt16(UInt16.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.INT32:
                                setOmronInt32(Int32.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.INT64:
                                setOmronInt64(Int64.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.FLOAT:
                                setOmronSingle(Single.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.DOUBLE:
                                setOmronDouble(Double.Parse(value.ToString()));
                                break;
                            case VAR_TYPE_Enum.STRING:
                                setOmronString(value.ToString());
                                break;
                        }
                        break;
                }
            }
            catch
            {
            }
        }

        #region Inverted

        private bool getInvertedBit()
        {
            if (!RETAIN)
            {
                GET_RETAIN = false;
                byte[] xData = new byte[2];
                xData[0] = data[posInBuffer + 1];
                xData[1] = data[posInBuffer];
                return (xData[bytePos] & (1 << bitPos)) != 0;
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedBit((bool)temp);
                        GET_RETAIN = false;
                        return (bool)temp;
                    }
                    else
                    {
                        byte[] xData = new byte[2];
                        xData[0] = data[posInBuffer + 1];
                        xData[1] = data[posInBuffer];
                        return (xData[bytePos] & (1 << bitPos)) != 0;
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[0] = data[posInBuffer + 1];
                    xData[1] = data[posInBuffer];
                    return (xData[bytePos] & (1 << bitPos)) != 0;
                }
            }
        }

        private void setInvertedBit(bool value)
        {
            byte[] xData = new byte[2];
            xData[0] = data[posInBuffer + 1];
            xData[1] = data[posInBuffer];
            if (value)
            {
                xData[bytePos] = (byte)(xData[bytePos] | (1 << bitPos));
            }
            else
            {
                xData[bytePos] = (byte)(xData[bytePos] & ~(1 << bitPos));
            }
            data[posInBuffer] = xData[1];
            data[posInBuffer + 1] = xData[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }

        }

        private byte getInvertedByte()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[1];
                xData[0] = data[posInBuffer + 1];
                //xData[1] = data[posInBuffer];
                return xData[bytePos];
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedByte(byte.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return byte.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[1];
                        xData[0] = data[posInBuffer + 1];
                        //xData[1] = data[posInBuffer];
                        return xData[bytePos];
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[1];
                    xData[0] = data[posInBuffer + 1];
                    //xData[1] = data[posInBuffer];
                    return xData[bytePos];
                }
            }
        }

        private void setInvertedByte(byte value)
        {
            byte[] xData = new byte[1];
            xData[0] = data[posInBuffer + 1];
            //xData[1] = data[posInBuffer];
            xData[bytePos] = value;
            data[posInBuffer] = xData[1];
            //data[posInBuffer + 1] = xData[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Int16 getInvertedInt16()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[2];
                xData[0] = data[posInBuffer + 1];
                xData[1] = data[posInBuffer];
                try
                {
                    return BitConverter.ToInt16(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedInt16(Int16.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Int16.Parse(temp.ToString());
                    }
                    else
                    {
                        
                        byte[] xData = new byte[2];
                        xData[0] = data[posInBuffer + 1];
                        xData[1] = data[posInBuffer];
                        try
                        {
                            return BitConverter.ToInt16(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[0] = data[posInBuffer + 1];
                    xData[1] = data[posInBuffer];
                    try
                    {
                        return BitConverter.ToInt16(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setInvertedInt16(Int16 value)
        {
            byte[] xData = BitConverter.GetBytes(value);
            data[posInBuffer] = xData[1];
            data[posInBuffer + 1] = xData[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private UInt16 getInvertedUInt16()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[2];
                xData[0] = data[posInBuffer + 1];
                xData[1] = data[posInBuffer];
                try
                {
                    return BitConverter.ToUInt16(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedUInt16(UInt16.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return UInt16.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[2];
                        xData[0] = data[posInBuffer + 1];
                        xData[1] = data[posInBuffer];
                        try
                        {
                            return BitConverter.ToUInt16(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[0] = data[posInBuffer + 1];
                    xData[1] = data[posInBuffer];
                    try
                    {
                        return BitConverter.ToUInt16(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setInvertedUInt16(UInt16 value)
        {
            byte[] xData = BitConverter.GetBytes(value);
            data[posInBuffer] = xData[1];
            data[posInBuffer + 1] = xData[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Int32 getInvertedInt32()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[4];

                xData[3] = data[posInBuffer];
                xData[2] = data[posInBuffer + 1];
                xData[1] = data[posInBuffer + 2];
                xData[0] = data[posInBuffer + 3];

                try
                {
                    return BitConverter.ToInt32(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedInt32(Int32.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Int32.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[4];

                        xData[3] = data[posInBuffer];
                        xData[2] = data[posInBuffer + 1];
                        xData[1] = data[posInBuffer + 2];
                        xData[0] = data[posInBuffer + 3];

                        try
                        {
                            return BitConverter.ToInt32(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[4];

                    xData[3] = data[posInBuffer];
                    xData[2] = data[posInBuffer + 1];
                    xData[1] = data[posInBuffer + 2];
                    xData[0] = data[posInBuffer + 3];

                    try
                    {
                        return BitConverter.ToInt32(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setInvertedInt32(Int32 value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[3];
            data[posInBuffer + 1] = sprt[2];
            data[posInBuffer + 2] = sprt[1];
            data[posInBuffer + 3] = sprt[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Int32 getInvertedInt32_V2()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[4];

                xData[3] = data[posInBuffer + 3];
                xData[2] = data[posInBuffer + 2];
                xData[1] = data[posInBuffer + 1];
                xData[0] = data[posInBuffer + 0];

                try
                {
                    return BitConverter.ToInt32(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedInt32(Int32.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Int32.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[4];

                        xData[3] = data[posInBuffer + 3];
                        xData[2] = data[posInBuffer + 2];
                        xData[1] = data[posInBuffer + 1];
                        xData[0] = data[posInBuffer + 0];

                        try
                        {
                            return BitConverter.ToInt32(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[4];

                    xData[3] = data[posInBuffer + 3];
                    xData[2] = data[posInBuffer + 2];
                    xData[1] = data[posInBuffer + 1];
                    xData[0] = data[posInBuffer + 0];

                    try
                    {
                        return BitConverter.ToInt32(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setInvertedInt32_V2(Int32 value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[0];
            data[posInBuffer + 1] = sprt[1];
            data[posInBuffer + 2] = sprt[2];
            data[posInBuffer + 3] = sprt[3];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Int64 getInvertedInt64()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[8];
                xData[7] = data[posInBuffer];
                xData[6] = data[posInBuffer + 1];
                xData[5] = data[posInBuffer + 2];
                xData[4] = data[posInBuffer + 3];
                xData[3] = data[posInBuffer + 4];
                xData[2] = data[posInBuffer + 5];
                xData[1] = data[posInBuffer + 6];
                xData[0] = data[posInBuffer + 7];

                try
                {
                    return BitConverter.ToInt64(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedInt64(Int64.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Int64.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[8];
                        xData[7] = data[posInBuffer];
                        xData[6] = data[posInBuffer + 1];
                        xData[5] = data[posInBuffer + 2];
                        xData[4] = data[posInBuffer + 3];
                        xData[3] = data[posInBuffer + 4];
                        xData[2] = data[posInBuffer + 5];
                        xData[1] = data[posInBuffer + 6];
                        xData[0] = data[posInBuffer + 7];

                        try
                        {
                            return BitConverter.ToInt64(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[8];
                    xData[7] = data[posInBuffer];
                    xData[6] = data[posInBuffer + 1];
                    xData[5] = data[posInBuffer + 2];
                    xData[4] = data[posInBuffer + 3];
                    xData[3] = data[posInBuffer + 4];
                    xData[2] = data[posInBuffer + 5];
                    xData[1] = data[posInBuffer + 6];
                    xData[0] = data[posInBuffer + 7];

                    try
                    {
                        return BitConverter.ToInt64(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setInvertedInt64(Int64 value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[7];
            data[posInBuffer + 1] = sprt[6];
            data[posInBuffer + 2] = sprt[5];
            data[posInBuffer + 3] = sprt[4];
            data[posInBuffer + 4] = sprt[3];
            data[posInBuffer + 5] = sprt[2];
            data[posInBuffer + 6] = sprt[1];
            data[posInBuffer + 7] = sprt[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Single getInvertedSingle()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[4];

                xData[3] = data[posInBuffer];
                xData[2] = data[posInBuffer + 1];
                xData[1] = data[posInBuffer + 2];
                xData[0] = data[posInBuffer + 3];

                try
                {
                    return BitConverter.ToSingle(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedSingle(Single.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Single.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[4];

                        xData[3] = data[posInBuffer];
                        xData[2] = data[posInBuffer + 1];
                        xData[1] = data[posInBuffer + 2];
                        xData[0] = data[posInBuffer + 3];

                        try
                        {
                            return BitConverter.ToSingle(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[4];

                    xData[3] = data[posInBuffer];
                    xData[2] = data[posInBuffer + 1];
                    xData[1] = data[posInBuffer + 2];
                    xData[0] = data[posInBuffer + 3];

                    try
                    {
                        return BitConverter.ToSingle(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setInvertedSingle(Single value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[3];
            data[posInBuffer + 1] = sprt[2];
            data[posInBuffer + 2] = sprt[1];
            data[posInBuffer + 3] = sprt[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Double getInvertedDouble()
        {
            if (RETAIN)
            {
                byte[] xData = new byte[8];
                xData[7] = data[posInBuffer];
                xData[6] = data[posInBuffer + 1];
                xData[5] = data[posInBuffer + 2];
                xData[4] = data[posInBuffer + 3];
                xData[3] = data[posInBuffer + 4];
                xData[2] = data[posInBuffer + 5];
                xData[1] = data[posInBuffer + 6];
                xData[0] = data[posInBuffer + 7];
                try
                {
                    return BitConverter.ToDouble(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedDouble(Double.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Double.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[8];
                        xData[7] = data[posInBuffer];
                        xData[6] = data[posInBuffer + 1];
                        xData[5] = data[posInBuffer + 2];
                        xData[4] = data[posInBuffer + 3];
                        xData[3] = data[posInBuffer + 4];
                        xData[2] = data[posInBuffer + 5];
                        xData[1] = data[posInBuffer + 6];
                        xData[0] = data[posInBuffer + 7];
                        try
                        {
                            return BitConverter.ToDouble(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[8];
                    xData[7] = data[posInBuffer];
                    xData[6] = data[posInBuffer + 1];
                    xData[5] = data[posInBuffer + 2];
                    xData[4] = data[posInBuffer + 3];
                    xData[3] = data[posInBuffer + 4];
                    xData[2] = data[posInBuffer + 5];
                    xData[1] = data[posInBuffer + 6];
                    xData[0] = data[posInBuffer + 7];
                    try
                    {
                        return BitConverter.ToDouble(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setInvertedDouble(Double value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[7];
            data[posInBuffer + 1] = sprt[6];
            data[posInBuffer + 2] = sprt[5];
            data[posInBuffer + 3] = sprt[4];
            data[posInBuffer + 4] = sprt[3];
            data[posInBuffer + 5] = sprt[2];
            data[posInBuffer + 6] = sprt[1];
            data[posInBuffer + 7] = sprt[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private String getInvertedString()
        {
            if (!RETAIN)
            {
                string sprt = "";
                byte[] xData = new byte[strLen % 2 == 0 ? strLen : strLen + 1];
                for (int i = 0; i <= xData.Length - 2; i += 2)
                {
                    xData[i + 1] = data[posInBuffer + i];
                    xData[i] = data[posInBuffer + i + 1];
                }
                for (int i = 0; i < strLen; i++)
                {
                    if (xData[i] != 0)
                        sprt += (char)xData[i];
                    else
                        break;
                }
                return sprt;
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedString(temp.ToString());
                        GET_RETAIN = false;
                        return temp.ToString();
                    }
                    else
                    {
                        string sprt = "";
                        byte[] xData = new byte[strLen % 2 == 0 ? strLen : strLen + 1];
                        for (int i = 0; i <= xData.Length - 2; i += 2)
                        {
                            xData[i + 1] = data[posInBuffer + i];
                            xData[i] = data[posInBuffer + i + 1];
                        }
                        for (int i = 0; i < strLen; i++)
                            sprt += (char)xData[i];
                        return sprt;
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    string sprt = "";
                    byte[] xData = new byte[strLen % 2 == 0 ? strLen : strLen + 1];
                    for (int i = 0; i <= xData.Length - 2; i += 2)
                    {
                        xData[i + 1] = data[posInBuffer + i];
                        xData[i] = data[posInBuffer + i + 1];
                    }
                    for (int i = 0; i < strLen; i++)
                        sprt += (char)xData[i];
                    return sprt;
                }
            }
        }

        private void setInvertedString(string value)
        {
            int len = value.Length > strLen ? strLen : value.Length;
            value = value.Substring(0, len);
            value = value.Length % 2 == 0 ? value : value + (char)0;// " ";
            for (int i = 0; i <= value.Length - 2; i += 2)
            {
                data[posInBuffer + i] = (byte)value[i + 1];
                data[posInBuffer + i + 1] = (byte)value[i];
            }
            for (int i = value.Length; i < strLen; i++)
            {
                data[posInBuffer + i] = 0;
            }
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private UInt16 getInvertedS5TIME()
        {
            string sRet = "";
            byte b0lo, b0hi, b1lo,b1hi;

            if (!RETAIN)
            {
                byte[] xData = new byte[2];
                xData[0] = data[posInBuffer + 1];
                xData[1] = data[posInBuffer];
                try
                { 
                    b0lo = (byte)(xData[0] & 0xF);
                    b0hi = (byte)(xData[0] & 0xF0);
                    b0hi = (byte)(b0hi >> 4);
                    b1lo = (byte)(xData[1] & 0xF);
                    if (floatingT_Base)
                    {
                        b1hi = (byte)(xData[1] & 0x30);
                        switch (b1hi)
                        {
                            case 0x00:
                                this.S5TIME_T_BASE = S5Time_T_Base._10ms;
                                break;
                            case 0x10:
                                this.S5TIME_T_BASE = S5Time_T_Base._100ms;
                                break;
                            case 0x20:
                                this.S5TIME_T_BASE = S5Time_T_Base._1s;
                                break;
                            case 0x30:
                                this.S5TIME_T_BASE = S5Time_T_Base._10s;
                                break;
                        }
                    }
                    if (b1lo > 0)
                    {
                        sRet += b1lo.ToString();
                        sRet += b0hi.ToString();
                        sRet += b0lo.ToString();
                    }
                    else if (b0hi > 0)
                    {

                        sRet += b0hi.ToString();
                        sRet += b0lo.ToString();
                    }
                    else
                    {
                        sRet += b0lo.ToString();
                    }
                    return ushort.Parse(sRet);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedUInt16(UInt16.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        byte[] xData = BitConverter.GetBytes(UInt16.Parse(temp.ToString()));

                        try
                        {
                            b0lo = (byte)(xData[0] & 0xF);
                            b0hi = (byte)(xData[0] & 0xF0);
                            b0hi = (byte)(b0hi >> 4);
                            b1lo = (byte)(xData[1] & 0xF);
                            if (floatingT_Base)
                            {
                                b1hi = (byte)(xData[1] & 0x30);
                                switch (b1hi)
                                {
                                    case 0x00:
                                        this.S5TIME_T_BASE = S5Time_T_Base._10ms;
                                        break;
                                    case 0x10:
                                        this.S5TIME_T_BASE = S5Time_T_Base._100ms;
                                        break;
                                    case 0x20:
                                        this.S5TIME_T_BASE = S5Time_T_Base._1s;
                                        break;
                                    case 0x30:
                                        this.S5TIME_T_BASE = S5Time_T_Base._10s;
                                        break;
                                }
                            }
                            if (b1lo > 0)
                            {
                                sRet += b1lo.ToString();
                                sRet += b0hi.ToString();
                                sRet += b0lo.ToString();
                            }
                            else if (b0hi > 0)
                            {

                                sRet += b0hi.ToString();
                                sRet += b0lo.ToString();
                            }
                            else
                            {
                                sRet += b0lo.ToString();
                            }
                            return ushort.Parse(sRet);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                    else
                    {
                        byte[] xData = new byte[2];
                        xData[0] = data[posInBuffer + 1];
                        xData[1] = data[posInBuffer];
                        try
                        {
                            b0lo = (byte)(xData[0] & 0xF);
                            b0hi = (byte)(xData[0] & 0xF0);
                            b0hi = (byte)(b0hi >> 4);
                            b1lo = (byte)(xData[1] & 0xF);
                            if (floatingT_Base)
                            {
                                b1hi = (byte)(xData[1] & 0x30);
                                switch (b1hi)
                                {
                                    case 0x00:
                                        this.S5TIME_T_BASE = S5Time_T_Base._10ms;
                                        break;
                                    case 0x10:
                                        this.S5TIME_T_BASE = S5Time_T_Base._100ms;
                                        break;
                                    case 0x20:
                                        this.S5TIME_T_BASE = S5Time_T_Base._1s;
                                        break;
                                    case 0x30:
                                        this.S5TIME_T_BASE = S5Time_T_Base._10s;
                                        break;
                                }
                            }
                            if (b1lo > 0)
                            {
                                sRet += b1lo.ToString();
                                sRet += b0hi.ToString();
                                sRet += b0lo.ToString();
                            }
                            else if (b0hi > 0)
                            {

                                sRet += b0hi.ToString();
                                sRet += b0lo.ToString();
                            }
                            else
                            {
                                sRet += b0lo.ToString();
                            }
                            return ushort.Parse(sRet);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[0] = data[posInBuffer + 1];
                    xData[1] = data[posInBuffer];
                    try
                    {
                        b0lo = (byte)(xData[0] & 0xF);
                        b0hi = (byte)(xData[0] & 0xF0);
                        b0hi = (byte)(b0hi >> 4);
                        b1lo = (byte)(xData[1] & 0xF);
                        if (floatingT_Base)
                        {
                            b1hi = (byte)(xData[1] & 0x30);
                            switch (b1hi)
                            {
                                case 0x00:
                                    this.S5TIME_T_BASE = S5Time_T_Base._10ms;
                                    break;
                                case 0x10:
                                    this.S5TIME_T_BASE = S5Time_T_Base._100ms;
                                    break;
                                case 0x20:
                                    this.S5TIME_T_BASE = S5Time_T_Base._1s;
                                    break;
                                case 0x30:
                                    this.S5TIME_T_BASE = S5Time_T_Base._10s;
                                    break;
                            }
                        }
                        if (b1lo > 0)
                        {
                            sRet += b1lo.ToString();
                            sRet += b0hi.ToString();
                            sRet += b0lo.ToString();
                        }
                        else if (b0hi > 0)
                        {

                            sRet += b0hi.ToString();
                            sRet += b0lo.ToString();
                        }
                        else
                        {
                            sRet += b0lo.ToString();
                        }
                        return ushort.Parse(sRet);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setInvertedS5TIME(UInt16 value)
        {
            ushort convVal = 0;

            byte[] tempB = new byte[2];

            byte sprtB;

            string sprtStr;

            byte tBase;

            if (value <= 999)
            {

                switch (S5TIME_T_BASE)
                {
                    case S5Time_T_Base._10ms:
                        tBase = 0x0;
                        break;
                    case S5Time_T_Base._100ms:
                        tBase = 0x10;
                        break;
                    case S5Time_T_Base._1s:
                         tBase = 0x20;
                        break;
                    case S5Time_T_Base._10s:
                         tBase = 0x30;
                        break;
                    default:
                         tBase = 0x0;
                        break;
                }

                sprtStr= value.ToString();
                switch (sprtStr.Length)
                {
                    case 1:
                        tempB[0] = (byte)((byte)sprtStr[0] - 48);
                        tempB[1] = 0;
                        tempB[1] = (byte)(tempB[1] | tBase);
                        convVal = BitConverter.ToUInt16(tempB, 0);
                        break;
                    case 2:
                        tempB[0] = (byte)((byte)sprtStr[1] - 48);
                        sprtB = (byte)((byte)sprtStr[0] - 48);
                        sprtB = (byte)((byte)sprtB << 4);
                        tempB[0] = (byte)(tempB[0] | sprtB);
                        tempB[1] = 0;
                        tempB[1] = (byte)(tempB[1] | tBase);

                        convVal = BitConverter.ToUInt16(tempB, 0);
                        break;
                    case 3:
                        tempB[0] = (byte)((byte)sprtStr[2] - 48);
                        sprtB = (byte)((byte)sprtStr[1] - 48);
                        sprtB = (byte)((byte)sprtB << 4);
                        tempB[0] = (byte)(tempB[0] | sprtB);
                        tempB[1] = (byte)((byte)sprtStr[0] - 48);
                        tempB[1] = (byte)(tempB[1] | tBase);
                        convVal = BitConverter.ToUInt16(tempB, 0);
                        break;
                }
            }
            else
            {
                value = 0;
            }

            byte[] xData = BitConverter.GetBytes(convVal);
            data[posInBuffer] = xData[1];
            data[posInBuffer + 1] = xData[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        #endregion

        #region Straight

        private bool getStraightBit()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[2];
                xData[0] = data[posInBuffer];
                xData[1] = data[posInBuffer + 1];
                return (xData[bytePos] & (1 << bitPos)) != 0;
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setStraightBit((bool)temp);
                        GET_RETAIN = false;
                        return (bool)temp;
                    }
                    else
                    {
                        byte[] xData = new byte[2];
                        xData[0] = data[posInBuffer];
                        xData[1] = data[posInBuffer + 1];
                        return (xData[bytePos] & (1 << bitPos)) != 0;
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[0] = data[posInBuffer];
                    xData[1] = data[posInBuffer + 1];
                    return (xData[bytePos] & (1 << bitPos)) != 0;
                }
            }
        }

        private void setStraightBit(bool value)
        {
            byte[] xData = new byte[2];
            xData[0] = data[posInBuffer ];
            xData[1] = data[posInBuffer + 1];
            if (value)
            {
                xData[bytePos] = (byte)(xData[bytePos] | (1 << bitPos));
            }
            else
            {
                xData[bytePos] = (byte)(xData[bytePos] & ~(1 << bitPos));
            }
            data[posInBuffer] = xData[0];
            data[posInBuffer + 1] = xData[1];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private byte getStraightByte()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[1];
                xData[0] = data[posInBuffer];
                //xData[1] = data[posInBuffer + 1];
                return xData[bytePos];
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setStraightByte(byte.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return byte.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[1];
                        xData[0] = data[posInBuffer];
                        //xData[1] = data[posInBuffer + 1];
                        return xData[bytePos];
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[1];
                    xData[0] = data[posInBuffer];
                    //xData[1] = data[posInBuffer + 1];
                    return xData[bytePos];
                }
            }
        }

        private void setStraightByte(byte value)
        {
            byte[] xData = new byte[1];
            xData[0] = data[posInBuffer ];
            //xData[1] = data[posInBuffer + 1];
            xData[bytePos] = value;
            data[posInBuffer] = xData[0];
            //data[posInBuffer + 1] = xData[1];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Int16 getStraightInt16()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[2];
                xData[0] = data[posInBuffer];
                xData[1] = data[posInBuffer + 1];
                try
                {
                    return BitConverter.ToInt16(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setStraightInt16(Int16.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Int16.Parse(temp.ToString());
                    }
                    else
                    {
                        
                        byte[] xData = new byte[2];
                        xData[0] = data[posInBuffer];
                        xData[1] = data[posInBuffer + 1];
                        try
                        {
                            return BitConverter.ToInt16(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[0] = data[posInBuffer];
                    xData[1] = data[posInBuffer + 1];
                    try
                    {
                        return BitConverter.ToInt16(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setStraightInt16(Int16 value)
        {
            byte[] xData = BitConverter.GetBytes(value);
            data[posInBuffer] = xData[0];
            data[posInBuffer + 1] = xData[1];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private UInt16 getStraightUInt16()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[2];
                xData[0] = data[posInBuffer];
                xData[1] = data[posInBuffer + 1];
                try
                {
                    return BitConverter.ToUInt16(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setStraightUInt16(UInt16.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return UInt16.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[2];
                        xData[0] = data[posInBuffer];
                        xData[1] = data[posInBuffer + 1];
                        try
                        {
                            return BitConverter.ToUInt16(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[0] = data[posInBuffer];
                    xData[1] = data[posInBuffer + 1];
                    try
                    {
                        return BitConverter.ToUInt16(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setStraightUInt16(UInt16 value)
        {
            byte[] xData = BitConverter.GetBytes(value);
            data[posInBuffer] = xData[0];
            data[posInBuffer + 1] = xData[1];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Int32 getStraightInt32()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[4];

                xData[0] = data[posInBuffer + 0];
                xData[1] = data[posInBuffer + 1];
                xData[2] = data[posInBuffer + 2];
                xData[3] = data[posInBuffer + 3];

                try
                {
                    return BitConverter.ToInt32(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setStraightInt32(Int32.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Int32.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[4];

                        xData[0] = data[posInBuffer + 0];
                        xData[1] = data[posInBuffer + 1];
                        xData[2] = data[posInBuffer + 2];
                        xData[3] = data[posInBuffer + 3];

                        try
                        {
                            return BitConverter.ToInt32(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[4];

                    xData[0] = data[posInBuffer + 0];
                    xData[1] = data[posInBuffer + 1];
                    xData[2] = data[posInBuffer + 2];
                    xData[3] = data[posInBuffer + 3];

                    try
                    {
                        return BitConverter.ToInt32(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setStraightInt32(Int32 value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[0];
            data[posInBuffer + 1] = sprt[1];
            data[posInBuffer + 2] = sprt[2];
            data[posInBuffer + 3] = sprt[3];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Int64 getStraightInt64()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[8];
                xData[0] = data[posInBuffer];
                xData[1] = data[posInBuffer + 1];
                xData[2] = data[posInBuffer + 2];
                xData[3] = data[posInBuffer + 3];
                xData[4] = data[posInBuffer + 4];
                xData[5] = data[posInBuffer + 5];
                xData[6] = data[posInBuffer + 6];
                xData[7] = data[posInBuffer + 7];

                try
                {
                    return BitConverter.ToInt64(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setStraightInt64(Int64.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Int64.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[8];
                        xData[0] = data[posInBuffer];
                        xData[1] = data[posInBuffer + 1];
                        xData[2] = data[posInBuffer + 2];
                        xData[3] = data[posInBuffer + 3];
                        xData[4] = data[posInBuffer + 4];
                        xData[5] = data[posInBuffer + 5];
                        xData[6] = data[posInBuffer + 6];
                        xData[7] = data[posInBuffer + 7];

                        try
                        {
                            return BitConverter.ToInt64(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[8];
                    xData[0] = data[posInBuffer];
                    xData[1] = data[posInBuffer + 1];
                    xData[2] = data[posInBuffer + 2];
                    xData[3] = data[posInBuffer + 3];
                    xData[4] = data[posInBuffer + 4];
                    xData[5] = data[posInBuffer + 5];
                    xData[6] = data[posInBuffer + 6];
                    xData[7] = data[posInBuffer + 7];

                    try
                    {
                        return BitConverter.ToInt64(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setStraightInt64(Int64 value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[0];
            data[posInBuffer + 1] = sprt[1];
            data[posInBuffer + 2] = sprt[2];
            data[posInBuffer + 3] = sprt[3];
            data[posInBuffer + 4] = sprt[4];
            data[posInBuffer + 5] = sprt[5];
            data[posInBuffer + 6] = sprt[6];
            data[posInBuffer + 7] = sprt[7];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Single getStraightSingle()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[4];

                xData[0] = data[posInBuffer];
                xData[1] = data[posInBuffer + 1];
                xData[2] = data[posInBuffer + 2];
                xData[3] = data[posInBuffer + 3];

                try
                {
                    return BitConverter.ToSingle(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setStraightSingle(Single.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Single.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[4];

                        xData[0] = data[posInBuffer];
                        xData[1] = data[posInBuffer + 1];
                        xData[2] = data[posInBuffer + 2];
                        xData[3] = data[posInBuffer + 3];

                        try
                        {
                            return BitConverter.ToSingle(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[4];

                    xData[0] = data[posInBuffer];
                    xData[1] = data[posInBuffer + 1];
                    xData[2] = data[posInBuffer + 2];
                    xData[3] = data[posInBuffer + 3];

                    try
                    {
                        return BitConverter.ToSingle(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setStraightSingle(Single value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[0];
            data[posInBuffer + 1] = sprt[1];
            data[posInBuffer + 2] = sprt[2];
            data[posInBuffer + 3] = sprt[3];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Double getStraightDouble()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[8];
                xData[0] = data[posInBuffer];
                xData[1] = data[posInBuffer + 1];
                xData[2] = data[posInBuffer + 2];
                xData[3] = data[posInBuffer + 3];
                xData[4] = data[posInBuffer + 4];
                xData[5] = data[posInBuffer + 5];
                xData[6] = data[posInBuffer + 6];
                xData[7] = data[posInBuffer + 7];
                try
                {
                    return BitConverter.ToDouble(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setStraightDouble(Double.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Double.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[8];
                        xData[0] = data[posInBuffer];
                        xData[1] = data[posInBuffer + 1];
                        xData[2] = data[posInBuffer + 2];
                        xData[3] = data[posInBuffer + 3];
                        xData[4] = data[posInBuffer + 4];
                        xData[5] = data[posInBuffer + 5];
                        xData[6] = data[posInBuffer + 6];
                        xData[7] = data[posInBuffer + 7];
                        try
                        {
                            return BitConverter.ToDouble(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[8];
                    xData[0] = data[posInBuffer];
                    xData[1] = data[posInBuffer + 1];
                    xData[2] = data[posInBuffer + 2];
                    xData[3] = data[posInBuffer + 3];
                    xData[4] = data[posInBuffer + 4];
                    xData[5] = data[posInBuffer + 5];
                    xData[6] = data[posInBuffer + 6];
                    xData[7] = data[posInBuffer + 7];
                    try
                    {
                        return BitConverter.ToDouble(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setStraightDouble(Double value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[0];
            data[posInBuffer + 1] = sprt[1];
            data[posInBuffer + 2] = sprt[2];
            data[posInBuffer + 3] = sprt[3];
            data[posInBuffer + 4] = sprt[4];
            data[posInBuffer + 5] = sprt[5];
            data[posInBuffer + 6] = sprt[6];
            data[posInBuffer + 7] = sprt[7];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private String getStraightString()
        {
            if (!RETAIN)
            {
                string sprt = "";
                byte[] xData = new byte[strLen % 2 == 0 ? strLen : strLen + 1];
                for (int i = 0; i <= xData.Length - 2; i += 2)
                {
                    xData[i] = data[posInBuffer + i];
                    xData[i + 1] = data[posInBuffer + i + 1];
                }
                for (int i = 0; i < strLen; i++)
                {
                    if (xData[i] != 0)
                        sprt += (char)xData[i];
                    else
                        break;
                }
                return sprt;
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setStraightString(temp.ToString());
                        GET_RETAIN = false;
                        return temp.ToString();
                    }
                    else
                    {
                        string sprt = "";
                        byte[] xData = new byte[strLen % 2 == 0 ? strLen : strLen + 1];
                        for (int i = 0; i <= xData.Length - 2; i += 2)
                        {
                            xData[i] = data[posInBuffer + i];
                            xData[i + 1] = data[posInBuffer + i + 1];
                        }
                        for (int i = 0; i < strLen; i++)
                            sprt += (char)xData[i];
                        return sprt;
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    string sprt = "";
                    byte[] xData = new byte[strLen % 2 == 0 ? strLen : strLen + 1];
                    for (int i = 0; i <= xData.Length - 2; i += 2)
                    {
                        xData[i] = data[posInBuffer + i];
                        xData[i + 1] = data[posInBuffer + i + 1];
                    }
                    for (int i = 0; i < strLen; i++)
                        sprt += (char)xData[i];
                    return sprt;
                }
            }
        }

        private void setStraightString(string value)
        {
            int len = value.Length > strLen ? strLen : value.Length;
            value = value.Substring(0, len);
            value = value.Length % 2 == 0 ? value : value + (char)0;
            for (int i = 0; i <= value.Length - 2; i += 2)
            {
                data[posInBuffer + i] = (byte)value[i ];
                data[posInBuffer + i + 1] = (byte)value[i + 1];
            }
            for (int i = value.Length; i < strLen; i++)
            {
                data[posInBuffer + i] = 0;
            }
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private UInt16 getStraightS5TIME()
        {
            string sRet = "";
            byte b0lo, b0hi, b1lo,b1hi;

            if (!RETAIN)
            {
                byte[] xData = new byte[2];
                xData[1] = data[posInBuffer + 1];
                xData[0] = data[posInBuffer];
                try
                {
                    b0lo = (byte)(xData[0] & 0xF);
                    b0hi = (byte)(xData[0] & 0xF0);
                    b0hi = (byte)(b0hi >> 4);
                    b1lo = (byte)(xData[1] & 0xF);
                    if (floatingT_Base)
                    {
                        b1hi = (byte)(xData[1] & 0x30);
                        switch (b1hi)
                        {
                            case 0x00:
                                this.S5TIME_T_BASE = S5Time_T_Base._10ms;
                                break;
                            case 0x10:
                                this.S5TIME_T_BASE = S5Time_T_Base._100ms;
                                break;
                            case 0x20:
                                this.S5TIME_T_BASE = S5Time_T_Base._1s;
                                break;
                            case 0x30:
                                this.S5TIME_T_BASE = S5Time_T_Base._10s;
                                break;
                        }
                    }
                    if (b1lo > 0)
                    {
                        sRet += b1lo.ToString();
                        sRet += b0hi.ToString();
                        sRet += b0lo.ToString();
                    }
                    else if (b0hi > 0)
                    {

                        sRet += b0hi.ToString();
                        sRet += b0lo.ToString();
                    }
                    else
                    {
                        sRet += b0lo.ToString();
                    }
                    return ushort.Parse(sRet);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setInvertedUInt16(UInt16.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        byte[] xData = BitConverter.GetBytes(UInt16.Parse(temp.ToString()));

                        try
                        {
                            b0lo = (byte)(xData[0] & 0xF);
                            b0hi = (byte)(xData[0] & 0xF0);
                            b0hi = (byte)(b0hi >> 4);
                            b1lo = (byte)(xData[1] & 0xF);
                            if (floatingT_Base)
                            {
                                b1hi = (byte)(xData[1] & 0x30);
                                switch (b1hi)
                                {
                                    case 0x00:
                                        this.S5TIME_T_BASE = S5Time_T_Base._10ms;
                                        break;
                                    case 0x10:
                                        this.S5TIME_T_BASE = S5Time_T_Base._100ms;
                                        break;
                                    case 0x20:
                                        this.S5TIME_T_BASE = S5Time_T_Base._1s;
                                        break;
                                    case 0x30:
                                        this.S5TIME_T_BASE = S5Time_T_Base._10s;
                                        break;
                                }
                            }
                            if (b1lo > 0)
                            {
                                sRet += b1lo.ToString();
                                sRet += b0hi.ToString();
                                sRet += b0lo.ToString();
                            }
                            else if (b0hi > 0)
                            {

                                sRet += b0hi.ToString();
                                sRet += b0lo.ToString();
                            }
                            else
                            {
                                sRet += b0lo.ToString();
                            }
                            return ushort.Parse(sRet);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                    else
                    {
                        byte[] xData = new byte[2];
                        xData[1] = data[posInBuffer + 1];
                        xData[0] = data[posInBuffer];
                        try
                        {
                            b0lo = (byte)(xData[0] & 0xF);
                            b0hi = (byte)(xData[0] & 0xF0);
                            b0hi = (byte)(b0hi >> 4);
                            b1lo = (byte)(xData[1] & 0xF);
                            if (floatingT_Base)
                            {
                                b1hi = (byte)(xData[1] & 0x30);
                                switch (b1hi)
                                {
                                    case 0x00:
                                        this.S5TIME_T_BASE = S5Time_T_Base._10ms;
                                        break;
                                    case 0x10:
                                        this.S5TIME_T_BASE = S5Time_T_Base._100ms;
                                        break;
                                    case 0x20:
                                        this.S5TIME_T_BASE = S5Time_T_Base._1s;
                                        break;
                                    case 0x30:
                                        this.S5TIME_T_BASE = S5Time_T_Base._10s;
                                        break;
                                }
                            }
                            if (b1lo > 0)
                            {
                                sRet += b1lo.ToString();
                                sRet += b0hi.ToString();
                                sRet += b0lo.ToString();
                            }
                            else if (b0hi > 0)
                            {

                                sRet += b0hi.ToString();
                                sRet += b0lo.ToString();
                            }
                            else
                            {
                                sRet += b0lo.ToString();
                            }
                            return ushort.Parse(sRet);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[1] = data[posInBuffer + 1];
                    xData[0] = data[posInBuffer];
                    try
                    {
                        b0lo = (byte)(xData[0] & 0xF);
                        b0hi = (byte)(xData[0] & 0xF0);
                        b0hi = (byte)(b0hi >> 4);
                        b1lo = (byte)(xData[1] & 0xF);
                        if (floatingT_Base)
                        {
                            b1hi = (byte)(xData[1] & 0x30);
                            switch (b1hi)
                            {
                                case 0x00:
                                    this.S5TIME_T_BASE = S5Time_T_Base._10ms;
                                    break;
                                case 0x10:
                                    this.S5TIME_T_BASE = S5Time_T_Base._100ms;
                                    break;
                                case 0x20:
                                    this.S5TIME_T_BASE = S5Time_T_Base._1s;
                                    break;
                                case 0x30:
                                    this.S5TIME_T_BASE = S5Time_T_Base._10s;
                                    break;
                            }
                        }
                        if (b1lo > 0)
                        {
                            sRet += b1lo.ToString();
                            sRet += b0hi.ToString();
                            sRet += b0lo.ToString();
                        }
                        else if (b0hi > 0)
                        {

                            sRet += b0hi.ToString();
                            sRet += b0lo.ToString();
                        }
                        else
                        {
                            sRet += b0lo.ToString();
                        }
                        return ushort.Parse(sRet);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setStraightS5TIME(UInt16 value)
        {
            ushort convVal = 0;

            byte[] tempB = new byte[2];

            byte sprtB;

            string sprtStr;

            byte tBase;

            if (value <= 999)
            {

                switch (S5TIME_T_BASE)
                {
                    case S5Time_T_Base._10ms:
                        tBase = 0x0;
                        break;
                    case S5Time_T_Base._100ms:
                        tBase = 0x10;
                        break;
                    case S5Time_T_Base._1s:
                        tBase = 0x20;
                        break;
                    case S5Time_T_Base._10s:
                        tBase = 0x30;
                        break;
                    default:
                        tBase = 0x0;
                        break;
                }

                sprtStr = value.ToString();
                switch (sprtStr.Length)
                {
                    case 1:
                        tempB[0] = (byte)((byte)sprtStr[0] - 48);
                        tempB[1] = 0;
                        tempB[1] = (byte)(tempB[1] | tBase);
                        convVal = BitConverter.ToUInt16(tempB, 0);
                        break;
                    case 2:
                        tempB[0] = (byte)((byte)sprtStr[0] - 48);
                        sprtB = (byte)((byte)sprtStr[1] - 48);
                        sprtB = (byte)((byte)sprtB << 4);
                        tempB[0] = (byte)(tempB[0] | sprtB);
                        tempB[1] = 0;
                        tempB[1] = (byte)(tempB[1] | tBase);

                        convVal = BitConverter.ToUInt16(tempB, 0);
                        break;
                    case 3:
                        tempB[0] = (byte)((byte)sprtStr[0] - 48);
                        sprtB = (byte)((byte)sprtStr[1] - 48);
                        sprtB = (byte)((byte)sprtB << 4);
                        tempB[0] = (byte)(tempB[0] | sprtB);
                        tempB[1] = (byte)((byte)sprtStr[2] - 48);
                        tempB[1] = (byte)(tempB[1] | tBase);
                        convVal = BitConverter.ToUInt16(tempB, 0);
                        break;
                }
            }
            else
            {
                value = 0;
            }

            byte[] xData = BitConverter.GetBytes(convVal);
            data[posInBuffer] = xData[0];
            data[posInBuffer + 1] = xData[1];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        #endregion

        #region Omron

        private bool getOmronBit()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[2];
                xData[1] = data[posInBuffer];
                xData[0] = data[posInBuffer + 1];
                return (xData[bytePos] & (1 << bitPos)) != 0;
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setOmronBit((bool)temp);
                        GET_RETAIN = false;
                        return (bool)temp;
                    }
                    else
                    {
                        byte[] xData = new byte[2];
                        xData[1] = data[posInBuffer];
                        xData[0] = data[posInBuffer + 1];
                        return (xData[bytePos] & (1 << bitPos)) != 0;
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[1] = data[posInBuffer];
                    xData[0] = data[posInBuffer + 1];
                    return (xData[bytePos] & (1 << bitPos)) != 0;
                }
            }
        }

        private void setOmronBit(bool value)
        {
            byte[] xData = new byte[2];
            xData[1] = data[posInBuffer];
            xData[0] = data[posInBuffer + 1];
            if (value)
            {
                xData[bytePos] = (byte)(xData[bytePos] | (1 << bitPos));
            }
            else
            {
                xData[bytePos] = (byte)(xData[bytePos] & ~(1 << bitPos));
            }
            data[posInBuffer] = xData[1];
            data[posInBuffer + 1] = xData[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private byte getOmronByte()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[2];
                xData[1] = data[posInBuffer];
                xData[0] = data[posInBuffer + 1];
                return xData[bytePos];
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setOmronByte(byte.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return byte.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[2];
                        xData[1] = data[posInBuffer];
                        xData[0] = data[posInBuffer + 1];
                        return xData[bytePos];
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[1] = data[posInBuffer];
                    xData[0] = data[posInBuffer + 1];
                    return xData[bytePos];
                }
            }
        }

        private void setOmronByte(byte value)
        {
            byte[] xData = new byte[2];
            xData[1] = data[posInBuffer];
            xData[0] = data[posInBuffer + 1];
            xData[bytePos] = value;
            data[posInBuffer] = xData[1];
            data[posInBuffer + 1] = xData[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Int16 getOmronInt16()
        {
            if (!RETAIN)
            {
                string a = "";

                byte[] xData = new byte[2];
                xData[1] = data[posInBuffer];
                xData[0] = data[posInBuffer + 1];
                try
                {
                    return BitConverter.ToInt16(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setOmronInt16(Int16.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Int16.Parse(temp.ToString());
                    }
                    else
                    {

                        byte[] xData = new byte[2];
                        xData[1] = data[posInBuffer];
                        xData[0] = data[posInBuffer + 1];
                        try
                        {
                            return BitConverter.ToInt16(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[1] = data[posInBuffer];
                    xData[0] = data[posInBuffer + 1];
                    try
                    {
                        return BitConverter.ToInt16(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setOmronInt16(Int16 value)
        {
            byte[] xData = BitConverter.GetBytes(value);
            data[posInBuffer] = xData[1];
            data[posInBuffer + 1] = xData[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private UInt16 getOmronUInt16()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[2];
                xData[1] = data[posInBuffer];
                xData[0] = data[posInBuffer + 1];
                try
                {
                    return BitConverter.ToUInt16(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setOmronUInt16(UInt16.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return UInt16.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[2];
                        xData[1] = data[posInBuffer];
                        xData[0] = data[posInBuffer + 1];
                        try
                        {
                            return BitConverter.ToUInt16(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[2];
                    xData[1] = data[posInBuffer];
                    xData[0] = data[posInBuffer + 1];
                    try
                    {
                        return BitConverter.ToUInt16(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setOmronUInt16(UInt16 value)
        {
            byte[] xData = BitConverter.GetBytes(value);
            data[posInBuffer] = xData[1];
            data[posInBuffer + 1] = xData[0];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Int32 getOmronInt32()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[4];

                xData[1] = data[posInBuffer + 0];
                xData[0] = data[posInBuffer + 1];
                xData[3] = data[posInBuffer + 2];
                xData[2] = data[posInBuffer + 3];

                try
                {
                    return BitConverter.ToInt32(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setOmronInt32(Int32.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Int32.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[4];

                        xData[1] = data[posInBuffer + 0];
                        xData[0] = data[posInBuffer + 1];
                        xData[3] = data[posInBuffer + 2];
                        xData[2] = data[posInBuffer + 3];

                        try
                        {
                            return BitConverter.ToInt32(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[4];

                    xData[1] = data[posInBuffer + 0];
                    xData[0] = data[posInBuffer + 1];
                    xData[3] = data[posInBuffer + 2];
                    xData[2] = data[posInBuffer + 3];

                    try
                    {
                        return BitConverter.ToInt32(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setOmronInt32(Int32 value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[1];
            data[posInBuffer + 1] = sprt[0];
            data[posInBuffer + 2] = sprt[3];
            data[posInBuffer + 3] = sprt[2];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Int64 getOmronInt64()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[8];
                xData[1] = data[posInBuffer];
                xData[0] = data[posInBuffer + 1];
                xData[3] = data[posInBuffer + 2];
                xData[2] = data[posInBuffer + 3];
                xData[5] = data[posInBuffer + 4];
                xData[4] = data[posInBuffer + 5];
                xData[7] = data[posInBuffer + 6];
                xData[6] = data[posInBuffer + 7];

                try
                {
                    return BitConverter.ToInt64(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setOmronInt64(Int64.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Int64.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[8];
                        xData[1] = data[posInBuffer];
                        xData[0] = data[posInBuffer + 1];
                        xData[3] = data[posInBuffer + 2];
                        xData[2] = data[posInBuffer + 3];
                        xData[5] = data[posInBuffer + 4];
                        xData[4] = data[posInBuffer + 5];
                        xData[7] = data[posInBuffer + 6];
                        xData[6] = data[posInBuffer + 7];

                        try
                        {
                            return BitConverter.ToInt64(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[8];
                    xData[1] = data[posInBuffer];
                    xData[0] = data[posInBuffer + 1];
                    xData[3] = data[posInBuffer + 2];
                    xData[2] = data[posInBuffer + 3];
                    xData[5] = data[posInBuffer + 4];
                    xData[4] = data[posInBuffer + 5];
                    xData[7] = data[posInBuffer + 6];
                    xData[6] = data[posInBuffer + 7];

                    try
                    {
                        return BitConverter.ToInt64(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setOmronInt64(Int64 value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[1];
            data[posInBuffer + 1] = sprt[0];
            data[posInBuffer + 2] = sprt[3];
            data[posInBuffer + 3] = sprt[2];
            data[posInBuffer + 4] = sprt[5];
            data[posInBuffer + 5] = sprt[4];
            data[posInBuffer + 6] = sprt[7];
            data[posInBuffer + 7] = sprt[6];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Single getOmronSingle()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[4];

                xData[1] = data[posInBuffer];
                xData[0] = data[posInBuffer + 1];
                xData[3] = data[posInBuffer + 2];
                xData[2] = data[posInBuffer + 3];

                try
                {
                    return BitConverter.ToSingle(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setOmronSingle(Single.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Single.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[4];

                        xData[1] = data[posInBuffer];
                        xData[0] = data[posInBuffer + 1];
                        xData[3] = data[posInBuffer + 2];
                        xData[2] = data[posInBuffer + 3];

                        try
                        {
                            return BitConverter.ToSingle(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[4];

                    xData[1] = data[posInBuffer];
                    xData[0] = data[posInBuffer + 1];
                    xData[3] = data[posInBuffer + 2];
                    xData[2] = data[posInBuffer + 3];

                    try
                    {
                        return BitConverter.ToSingle(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setOmronSingle(Single value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[1];
            data[posInBuffer + 1] = sprt[0];
            data[posInBuffer + 2] = sprt[3];
            data[posInBuffer + 3] = sprt[2];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private Double getOmronDouble()
        {
            if (!RETAIN)
            {
                byte[] xData = new byte[8];
                xData[1] = data[posInBuffer];
                xData[0] = data[posInBuffer + 1];
                xData[3] = data[posInBuffer + 2];
                xData[2] = data[posInBuffer + 3];
                xData[5] = data[posInBuffer + 4];
                xData[4] = data[posInBuffer + 5];
                xData[7] = data[posInBuffer + 6];
                xData[6] = data[posInBuffer + 7];
                try
                {
                    return BitConverter.ToDouble(xData, 0);
                }
                catch
                {
                    return 0;
                }
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setOmronDouble(Double.Parse(temp.ToString()));
                        GET_RETAIN = false;
                        return Double.Parse(temp.ToString());
                    }
                    else
                    {
                        byte[] xData = new byte[8];
                        xData[1] = data[posInBuffer];
                        xData[0] = data[posInBuffer + 1];
                        xData[3] = data[posInBuffer + 2];
                        xData[2] = data[posInBuffer + 3];
                        xData[5] = data[posInBuffer + 4];
                        xData[4] = data[posInBuffer + 5];
                        xData[7] = data[posInBuffer + 6];
                        xData[6] = data[posInBuffer + 7];
                        try
                        {
                            return BitConverter.ToDouble(xData, 0);
                        }
                        catch
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    byte[] xData = new byte[8];
                    xData[1] = data[posInBuffer];
                    xData[0] = data[posInBuffer + 1];
                    xData[3] = data[posInBuffer + 2];
                    xData[2] = data[posInBuffer + 3];
                    xData[5] = data[posInBuffer + 4];
                    xData[4] = data[posInBuffer + 5];
                    xData[7] = data[posInBuffer + 6];
                    xData[6] = data[posInBuffer + 7];
                    try
                    {
                        return BitConverter.ToDouble(xData, 0);
                    }
                    catch
                    {
                        return 0;
                    }
                }
            }
        }

        private void setOmronDouble(Double value)
        {
            byte[] sprt = BitConverter.GetBytes(value);
            data[posInBuffer] = sprt[1];
            data[posInBuffer + 1] = sprt[0];
            data[posInBuffer + 2] = sprt[3];
            data[posInBuffer + 3] = sprt[2];
            data[posInBuffer + 4] = sprt[5];
            data[posInBuffer + 5] = sprt[4];
            data[posInBuffer + 6] = sprt[7];
            data[posInBuffer + 7] = sprt[6];
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        private String getOmronString()
        {
            if (!RETAIN)
            {
                string sprt = "";
                byte[] xData = new byte[strLen % 2 == 0 ? strLen : strLen + 1];
                for (int i = 0; i <= xData.Length - 2; i += 2)
                {
                    xData[i+1] = data[posInBuffer + i];
                    xData[i ] = data[posInBuffer + i + 1];
                }
                for (int i = 0; i < strLen; i++)
                {
                    if (xData[i] != 0)
                        sprt += (char)xData[i];
                    else
                        break;
                }
                return sprt;
            }
            else
            {
                if (GET_RETAIN)
                {
                    object temp = RetainTags.getValue(NAME, AlmConStr);
                    if (temp != null)
                    {
                        setOmronString(temp.ToString());
                        GET_RETAIN = false;
                        return temp.ToString();
                    }
                    else
                    {
                        string sprt = "";
                        byte[] xData = new byte[strLen % 2 == 0 ? strLen : strLen + 1];
                        for (int i = 0; i <= xData.Length - 2; i += 2)
                        {
                            xData[i+1] = data[posInBuffer + i];
                            xData[i] = data[posInBuffer + i + 1];
                        }
                        for (int i = 0; i < strLen; i++)
                            sprt += (char)xData[i];
                        return sprt;
                    }
                }
                else
                {
                    GET_RETAIN = false;
                    string sprt = "";
                    byte[] xData = new byte[strLen % 2 == 0 ? strLen : strLen + 1];
                    for (int i = 0; i <= xData.Length - 2; i += 2)
                    {
                        xData[i+1] = data[posInBuffer + i];
                        xData[i] = data[posInBuffer + i + 1];
                    }
                    for (int i = 0; i < strLen; i++)
                        sprt += (char)xData[i];
                    return sprt;
                }
            }
        }

        private void setOmronString(string value)
        {
            int len = value.Length > strLen ? strLen : value.Length;
            value = value.Substring(0, len);
            value = value.Length % 2 == 0 ? value : value + (char)0;
            for (int i = 0; i <= value.Length - 2; i += 2)
            {
                data[posInBuffer + i + 1] = (byte)value[i];
                data[posInBuffer + i] = (byte)value[i + 1];
            }
            for (int i = value.Length; i < strLen; i++)
            {
                data[posInBuffer + i] = 0;
            }
            if (RETAIN)
            {
                RetainTags.setValue(NAME, value, AlmConStr);
            }
        }

        #endregion

        #endregion

        #region Tester

        public void Test()
        {
            OnSendRequest(new KeyValuePair<string, object>(NAME, VALUE), new EventArgs());
        }

        #endregion
    }
}

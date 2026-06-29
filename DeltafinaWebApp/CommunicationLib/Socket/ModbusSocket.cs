using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Net;
using System.Net.Sockets;

namespace CommunicationLib
{
    public class ModbusSocket : AbstrSocket
    {
        private byte[] MBAPHeader;

        public ModbusSocket(string plcName, string hostIp, int hostPort)
        {
            this.name = plcName;
            this.hostIp = hostIp;
            this.hostPort = hostPort;
        }


        #region open/close socket

        /// <summary>
        /// Open comm with the specific device
        /// </summary>
        /// <returns></returns>
        public override void Open()
        {
            try
            {
                _thisClient = new TcpClient(hostIp, hostPort);
                _clientStream = _thisClient.GetStream();

                IS_OPENED = _thisClient.Connected;
                IS_CONNECTED = _thisClient.Connected;

            }
            catch
            {

                IS_OPENED = false;
                IS_CONNECTED = false;
            }
        }

        /// <summary>
        /// Close comm with the specific device
        /// </summary>
        public override void Close()
        {
            try
            {
                _clientStream.Close();
                _clientStream.Dispose();
                _thisClient.Close();
                _thisClient = null;
                IS_OPENED = false;
                IS_CONNECTED = false;
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("Exception in closing socket :" + e.Message);
            }

        }

        #endregion

        #region Private Methods

        private byte[] setMBAPHeader(int lenghtFrame)
        {
            byte[] retHead = new byte[7];
            byte[] length;
            length = BitConverter.GetBytes(lenghtFrame + 1);//ModbusFrame and UnitId
            retHead[0] = 0x00;              //Transaction ID HI-byte
            retHead[1] = 0x05;              //Transaction ID LO-byte
            retHead[2] = 0x00;              //Protocol ID HI-Byte
            retHead[3] = 0x00;                //Protocol ID LO-Byte==>Modbus-->0
            retHead[4] = length[0];
            retHead[5] = length[1];
            retHead[6] = 0xFF;                //Unit ID
            return retHead;
        }

        private byte[] setMBAPHeader(AddressInterface ai, short lenghtFrame)
        {
            byte[] retHead = new byte[7];
            byte[] length;
            length = BitConverter.GetBytes(lenghtFrame + 1);//ModbusFrame and UnitId
            retHead[0] = getTransactionIdentifierHI(ai); //0x01;              //Transaction ID HI-byte
            retHead[1] = getTransactionIdentifierLO(ai); //0x02;              //Transaction ID LO-byte, vecchio valore 0x05
            retHead[2] = 0x00;              //Protocol ID HI-Byte
            retHead[3] = 0x00;              //Protocol ID LO-Byte==>Modbus-->0
            retHead[4] = length[1]; //0x00;// BitConverter.GetBytes(short.Parse("0006", System.Globalization.NumberStyles.HexNumber))[0];
            retHead[5] = length[0]; //0x06;// BitConverter.GetBytes(short.Parse("0006", System.Globalization.NumberStyles.HexNumber))[1];
            retHead[6] = ai.M_ID_SLAVE; //0x01;                //Unit ID
            return retHead;
        }

        private byte getTransactionIdentifierHI(AddressInterface ai)
        {
            switch (ai.M_R_CODE)
            {
                case 0x03:
                    return 0x01;
                default:
                    return 0x01;
            }
        }

        private byte getTransactionIdentifierLO(AddressInterface ai)
        {
            switch (ai.M_R_CODE)
            {
                case 0x03:
                    return 0x02;
                default:
                    return 0x02;
            }
        }

        #endregion

        int countErrors = 0;
        /// <summary>
        /// Read From Device
        /// </summary>
        /// <param name="ai"></param>
        /// <returns></returns>
        public override byte[] Read(AddressInterface ai)
        {
            
            byte[] reqFrame = new byte[7 + 5];
            byte[] respFrame = new byte[7 + 2];
            byte[] dataFrame;
            byte[] addr = BitConverter.GetBytes(ai.M_ADDRESS);
            byte[] len=null ;
            //MBAPHeader = setMBAPHeader(5);
            MBAPHeader = setMBAPHeader(ai, 5);//vecchio valore 5
            reqFrame[0] = MBAPHeader[0];
            reqFrame[1] = MBAPHeader[1];
            reqFrame[2] = MBAPHeader[2];
            reqFrame[3] = MBAPHeader[3];
            reqFrame[4] = MBAPHeader[4];
            reqFrame[5] = MBAPHeader[5];
            reqFrame[6] = MBAPHeader[6];
            switch (ai.M_R_CODE)
            {
                case 0x01:
                    len = BitConverter.GetBytes(ai.M_BYTE*8);
                    break;
                case 0x03:
                    len = BitConverter.GetBytes(ai.M_BYTE / 2);
                    break;
                default:
                    ERROR_R_W = true;
                    ERROR_R_W_CAUSE = "Codice lettura non valido";
                    return null;
            }
            reqFrame[7] = (byte)ai.M_R_CODE;                //Modbus function code
            reqFrame[8] = addr[1];                  //Start address HI-Byte 
            reqFrame[9] = addr[0];                  //Start address LO-byte
            reqFrame[10] = len[1];                  //Word Count HI-byte    
            reqFrame[11] = len[0];  //Word Count LO-Byte    (1-125)

                _clientStream.Write(reqFrame, 0, reqFrame.Length);
                _clientStream.ReadTimeout = 30000;

                _clientStream.Read(respFrame, 0, respFrame.Length);
                if (respFrame[7] != (byte)ai.M_R_CODE)
                {
                    ERROR_R_W = true;
                    ERROR_R_W_CAUSE = "Errore modbus";
                    countErrors++;
                    if (countErrors >= 20)
                    {
                        countErrors = 0;
                        throw new ConnectionException();
                    }
                    return null;
                }
                else
                {
                    ERROR_R_W = false;
                    dataFrame = new byte[(int)respFrame[8]];
                    _clientStream.Read(dataFrame, 0, dataFrame.Length);
                    return dataFrame;
                }

            
        }

        /// <summary>
        /// Write To Device
        /// </summary>
        /// <param name="ai"></param>
        /// <param name="buffer"></param>
        /// <returns></returns>
        public override int Write(AddressInterface ai, byte[] buffer)
        {
            
            
            byte[] reqFrame = new byte[7 + 6 + buffer.Length];
            byte[] respFrame = new byte[7 + 2];
            byte[] restOfRespFrame = new byte[3];
            byte[] addr = BitConverter.GetBytes(ai.M_ADDRESS);
            byte[] len = null;

            //MBAPHeader = setMBAPHeader(6 + buffer.Length);
            MBAPHeader = setMBAPHeader(ai, short.Parse((6 + buffer.Length).ToString()));

            reqFrame[0] = MBAPHeader[0];
            reqFrame[1] = MBAPHeader[1];
            reqFrame[2] = MBAPHeader[2];
            reqFrame[3] = MBAPHeader[3];
            reqFrame[4] = MBAPHeader[4];
            reqFrame[5] = MBAPHeader[5];
            reqFrame[6] = MBAPHeader[6];
            reqFrame[7] = (byte)ai.M_W_CODE;                //Modbus function code
            //switch (ai.M_R_CODE)
            switch (ai.M_W_CODE)
            {
                case 0x0F:
                    len = BitConverter.GetBytes(ai.M_BYTE * 8);
                    break;
                case 0x10:
                    len = BitConverter.GetBytes(ai.M_BYTE / 2);
                    break;
                default:
                    ERROR_R_W = true;
                    ERROR_R_W_CAUSE = "Codice scrittura non valido";
                    return 0;
            }
            reqFrame[8] = addr[1];                  //Start address HI-Byte 
            reqFrame[9] = addr[0];                  //Start address LO-byte
            reqFrame[10] = len[1];                  //Word Count HI-byte    
            reqFrame[11] = len[0];                  //Word Count LO-Byte    (1-100)  
            reqFrame[12] = (byte)buffer.Length;
            for (int i = 0; i < buffer.Length; i++)
                reqFrame[13 + i] = buffer[i];

                _clientStream.WriteTimeout = 5000;
                _clientStream.Write(reqFrame, 0, reqFrame.Length);
                _clientStream.ReadTimeout = 5000;
                _clientStream.Read(respFrame, 0, respFrame.Length);
                // MessageBox.Show(respFrame[7].ToString() + "\n" + respFrame[8]);
                if (respFrame[7] != (byte)ai.M_W_CODE)
                {
                    countErrors++;
                    if (countErrors >= 20)
                    {
                        countErrors = 0;
                        throw new ConnectionException();
                    }
                    ERROR_R_W = true;
                    ERROR_R_W_CAUSE = "Errore modbus";
                    return 0;
                }
                else
                {

                    _clientStream.Read(restOfRespFrame, 0, restOfRespFrame.Length);
                    if ((respFrame[8] == reqFrame[8] & restOfRespFrame[0] == reqFrame[9])
                        & (reqFrame[10] == restOfRespFrame[1] & reqFrame[11] == restOfRespFrame[2]))
                    {
                        ERROR_R_W = false;
                        return 1;
                    }
                    else
                    {
                        ERROR_R_W = true;
                        ERROR_R_W_CAUSE = "Errore modbus";
                        return 0;
                    }
                }

        }


    }
}

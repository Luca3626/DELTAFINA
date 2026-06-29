using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Net;
using System.Net.Sockets;

namespace CommunicationLib
{
    public class LVSocket:AbstrSocket
    {
        public LVSocket(string plcName, string hostIp, int hostPort)
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

        int countErrors = 0;
        /// <summary>
        /// Read From Device
        /// </summary>
        /// <param name="ai"></param>
        /// <returns></returns>
        public override byte[] Read(AddressInterface ai)
        {
            byte[] rData = new byte[ai.LV_BYTE_NUMBER];
            byte[] reqFrame = new byte[2];
            byte[] respFrame = new byte[2];
            byte[] sprt=BitConverter.GetBytes(ai.LV_BYTE_NUMBER);
            byte[] temp = new byte[1460];
            //Formatta la richiesta
            reqFrame[0] = ai.LV_P_NUMBER;
            reqFrame[1] = 1;//Richiesta di lettura

            System.Diagnostics.Debug.WriteLine(ai.LV_P_NUMBER + " Req");
                _clientStream.Write(reqFrame, 0, reqFrame.Length);
                _clientStream.ReadTimeout = 30000;
           
                _clientStream.Read(respFrame, 0, respFrame.Length);
                
               
                if (respFrame[0] != reqFrame[0] || respFrame[1] != reqFrame[1] )
                {
                    countErrors++;
                    _clientStream.Read(rData, 0, rData.Length);
                    
                    if (countErrors >= 20)
                    {
                        countErrors = 0;
                        throw new ConnectionException();
                    }
                    return null;
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine(ai.LV_P_NUMBER + " Req OK");
                    _clientStream.Read(rData, 0, rData.Length);
                    System.Diagnostics.Debug.WriteLine(ai.LV_P_NUMBER +"Resp OK");
                    return rData;
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
            byte[] reqFrame = new byte[2 + buffer.Length];
            byte[] respFrame = new byte[2 + buffer.Length];


            byte[] len = BitConverter.GetBytes((short)reqFrame.Length);

            reqFrame[0] = ai.LV_P_NUMBER;
            reqFrame[1] = 2;//richiesta di scrittura

            for (int i = 0; i < buffer.Length; i++)
                reqFrame[2 + i] = buffer[i];

            _clientStream.WriteTimeout = 5000;
            _clientStream.Write(reqFrame, 0, reqFrame.Length);
            _clientStream.ReadTimeout = 5000;
            _clientStream.Read(respFrame, 0, respFrame.Length);

            if (respFrame[0] != reqFrame[0] || respFrame[1] != reqFrame[1])
            {
                countErrors++;
                if (countErrors == 20)
                {
                    countErrors = 0;
                    throw new ConnectionException();
                }
                return 0;
            }
            else
            {

                return 1;

            }
        }
    }
}

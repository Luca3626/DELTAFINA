using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Net;
using System.Net.Sockets;
namespace CommunicationLib
{
    class FINS_Socket : AbstrSocket
    {
        private byte[] CND = new byte[4];       //Client node address
        private byte[] SND = new byte[4];       //Server node address

        public FINS_Socket(string plcName, string hostIp, int hostPort)
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
            byte[] openReq = new byte[20];  //4 open connection
            byte[] openRisp = new byte[24]; //4 open connection response
            byte[] dummy = new byte[4];     //4 support
            //---------------------------------------------------------------------------------
            openReq[0] = (byte)'F';     //*************************
            openReq[1] = (byte)'I';     //HEADER
            openReq[2] = (byte)'N';     //
            openReq[3] = (byte)'S';     //*************************
            //---------------------------------------------------------------------------------
            openReq[4] = 0;             //*************************
            openReq[5] = 0;             //length of data from
            openReq[6] = 0;             //COMMANDS onwards(incluso)
            openReq[7] = 12;            //*************************
            //---------------------------------------------------------------------------------
            openReq[8] = 0;             //*************************
            openReq[9] = 0;             //COMMANDS(not used)
            openReq[10] = 0;            //
            openReq[11] = 0;            //*************************
            //---------------------------------------------------------------------------------
            openReq[12] = 0;            //*************************
            openReq[13] = 0;            //ERROR CODE(not used)
            openReq[14] = 0;            //
            openReq[15] = 0;            //*************************
            //---------------------------------------------------------------------------------
            openReq[16] = 0;            //*******************************************
            openReq[17] = 0;            //CLIENT NODE ADDRESS if 0x0 then address
            openReq[18] = 0;            //is automatically obtained, else: 1 to 254
            openReq[19] = 0;            //*******************************************
            //---------------------------------------------------------------------------------
            //****************************
            //open TCP/FINS connection
            //****************************
            try
            {
                _thisClient = new TcpClient(hostIp, hostPort);
                _clientStream = _thisClient.GetStream();

                _clientStream.Write(openReq, 0, 20);
                _clientStream.Flush();
                _clientStream.Read(openRisp, 0, 24);
                _clientStream.Flush();
                //*****************************
                dummy[0] = openRisp[15];
                dummy[1] = openRisp[14];
                dummy[2] = openRisp[13];
                dummy[3] = openRisp[12];

                for (int i = 0; i < 4; i++)
                {
                    CND[i] = openRisp[16 + i];
                    SND[i] = openRisp[20 + i];
                  

                }             

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


        int countErrorsR = 0,countErrorsW=0;
        /// <summary>
        /// Read From Device
        /// </summary>
        /// <param name="ai"></param>
        /// <returns></returns>
        public override byte[] Read(AddressInterface ai)
        {
            byte[] readReq = new byte[34];    //4 read request
            byte[] readRisp;                //4 read request response
            byte[] data = new byte[ai.FINS_LEN];
            byte[] addrWords = new byte[2];
            byte[] numWords = new byte[2];
            byte MRES, SRES;     //codici di errore

            addrWords = BitConverter.GetBytes(ai.FINS_ADDRESS);
            numWords = BitConverter.GetBytes(ai.FINS_LEN/2);
            readRisp = new byte[30 + ai.FINS_LEN];
            //----------------------------------------------------------------------------------
            readReq[0] = (byte)'F';     //*************************
            readReq[1] = (byte)'I';     //HEADER
            readReq[2] = (byte)'N';     //
            readReq[3] = (byte)'S';     //*************************
            //----------------------------------------------------------------------------------
            readReq[4] = 0;             //*************************
            readReq[5] = 0;             //length of data from
            readReq[6] = 0;             //COMMANDS onwards
            readReq[7] = 26;            //*************************
            //----------------------------------------------------------------------------------
            readReq[8] = 0;             //*************************
            readReq[9] = 0;             //COMMANDS
            readReq[10] = 0;            //
            readReq[11] = 2;            //*************************
            //----------------------------------------------------------------------------------
            readReq[12] = 0;            //*************************
            readReq[13] = 0;            //ERROR CODE(not used)
            readReq[14] = 0;            //
            readReq[15] = 0;            //*************************
            //----------------------------------------------------------------------------------
            readReq[16] = 128;            //ICV(display frame info)
            readReq[17] = 0;              //RSV(reserved by system)
            readReq[18] = 3;              //GCT(perrmissible number of gates
            readReq[19] = 0;              //DNA(dest. net. addr. ->0=LocalNet
            readReq[20] = 0;              //DA1(dest. node addr. ->0=localPLC
            readReq[21] = 0;              //DA2(dest. unit addr. ->0=PLC(CPU unit)
            readReq[22] = 0;              //SNA(src. net. addr. ->0=LocalNet
            readReq[23] = CND[3];        //SA1(src. node addr.)
            readReq[24] = 0;              //SA2(src. unit addr.)
            readReq[25] = 11;             //SID(service ID)
            readReq[26] = ai.FINS_MRC_R;              //MRC(main request)
            readReq[27] = ai.FINS_SRC_R;              //SRC(sub request)
            readReq[28] = ai.FINS_M_ACCESS;            //VAR TYPE (DM->130)
            readReq[29] = addrWords[1];              //Read start adrr.(byte 2)
            readReq[30] = addrWords[0];            //Read start addr.(byte 1)
            readReq[31] = 0;              //
            readReq[32] = numWords[1];                //Num of words(byte 2)
            readReq[33] = numWords[0];              //Num of words(byte 1)
            //----------------------------------------------------------------------------------
            _clientStream.Write(readReq, 0, 34);
            _clientStream.Flush();
            _clientStream.Read(readRisp, 0, (30 + ai.FINS_LEN));
            _clientStream.Flush();
            //*****************************************
            // gestione errori
            //*****************************************
            MRES = readRisp[28];
            SRES = readRisp[29];
            if (MRES != 0 & SRES != 0)
            {
                ERROR_R_W = true;
                ERROR_R_W_CAUSE = "Errore lettura FINS";
                countErrorsR++;
                if (countErrorsR >= 20)
                {
                    countErrorsR = 0;
                    throw new ConnectionException();
                }
                return null;
            }
            else
            {
                ERROR_R_W = false;
                for (int i = 0; i < ai.FINS_LEN; i++)
                    data[i] = readRisp[30 + i];
                return data;
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
            int restDim = 0;
            int frameDim = 0;
            int frameAddr = 0;
            int offset = 0;
            int error = 0;
            byte[] bufBb;

            if (ai.FINS_LEN > 200)
            {
                frameAddr = ai.FINS_ADDRESS;
                restDim = ai.FINS_LEN;
                while (restDim != 0)
                {
                    if (restDim > 200)
                    {
                        frameDim = 200;
                        restDim = restDim - 200;
                        bufBb = new byte[frameDim];
                    }
                    else
                    {
                        frameDim = restDim;
                        restDim = 0;
                        bufBb = new byte[frameDim];
                    }
                    for (int i = offset; i <= offset + frameDim - 1; i++)
                        bufBb[i - offset] = buffer[i];
                    error=write(ai.FINS_MRC_W, ai.FINS_SRC_W, ai.FINS_M_ACCESS, (ushort)frameAddr, (ushort)(frameDim / 2),(ushort)frameDim, bufBb);
                    if (error == 0)
                    {
                        countErrorsW++;
                        if (countErrorsW >= 2)
                        {
                            countErrorsW = 0;
                            ERROR_R_W = true;
                            ERROR_R_W_CAUSE = "Errore scrittura FINS";
                            
                            throw new ConnectionException();
                        }
                        ERROR_R_W = true;
                        ERROR_R_W_CAUSE = "Errore scritura FINS";
                    }
                    frameAddr = frameAddr + (frameDim / 2);
                    offset = offset + frameDim;
                }
                ERROR_R_W = false;
                return 1;
                
            }
            else
            {
                error = write(ai.FINS_MRC_W, ai.FINS_SRC_W, ai.FINS_M_ACCESS, ai.FINS_ADDRESS, (ushort)(ai.FINS_LEN / 2), (ushort)ai.FINS_LEN, buffer);
                if (error == 0)
                {
                    countErrorsW++;
                    if (countErrorsW >= 2)
                    {
                        countErrorsW = 0;
                        throw new ConnectionException();
                    }
                    ERROR_R_W = true;
                    ERROR_R_W_CAUSE = "Errore scritura FINS";
                    return 0;
                }
                else
                {
                    ERROR_R_W = false;
                    return 1;
                }
            }

        }

        #region Private

        private int write(byte MRC, byte SRC, byte vType, ushort addr, ushort num, ushort len, byte[] data)
        {
            byte[] writeRisp = new byte[30];  //4 write request
            byte[] writeReq;                //4 write request response
            byte[] addrWords = new byte[2];
            byte[] numWords = new byte[2];
            byte MRES, SRES;     //codici di errore

            writeReq = new byte[34 + len];
            addrWords = BitConverter.GetBytes(addr);
            numWords = BitConverter.GetBytes(num);
            //------------------------------------------------------------------------------
            writeReq[0] = (byte)'F';     //*************************
            writeReq[1] = (byte)'I';     //HEADER
            writeReq[2] = (byte)'N';     //
            writeReq[3] = (byte)'S';     //*************************
            //------------------------------------------------------------------------------
            writeReq[4] = 0;             //*************************
            writeReq[5] = 0;             //length of data from
            writeReq[6] = 0;             //COMMANDS onwards
            writeReq[7] = (byte)(26 + len);      //*************************
            //------------------------------------------------------------------------------
            writeReq[8] = 0;             //*************************
            writeReq[9] = 0;             //COMMANDS
            writeReq[10] = 0;            //
            writeReq[11] = 2;            //*************************
            //------------------------------------------------------------------------------
            writeReq[12] = 0;            //*************************
            writeReq[13] = 0;            //ERROR CODE(not used)
            writeReq[14] = 0;            //
            writeReq[15] = 0;            //*************************
            //------------------------------------------------------------------------------
            writeReq[16] = 128;          //ICV(display frame info)
            writeReq[17] = 0;            //RSV(reserved by system)
            writeReq[18] = 2;            //GCT(perrmissible number of gates
            writeReq[19] = 0;            //DNA(dest. net. addr. ->0=LocalNet
            writeReq[20] = 0;            //DA1(dest. node addr. ->0=localPLC
            writeReq[21] = 0;            //DA2(dest. unit addr. ->0=PLC(CPU unit)
            writeReq[22] = 0;            //SNA(src. net. addr. ->0=LocalNet
            writeReq[23] = CND[3];       //SA1(src. node addr.)
            writeReq[24] = 0;            //SA2(src. unit addr.)
            writeReq[25] = 10;           //SID(service ID)
            writeReq[26] = MRC;          //MRC(main request)
            writeReq[27] = SRC;          //SRC(sub request)
            writeReq[28] = vType;        //VAR TYPE (DM->130)
            writeReq[29] = addrWords[1];  //Write start adrr.(byte 2)
            writeReq[30] = addrWords[0];  //Write start addr.(byte 1)
            writeReq[31] = 0;              //start bit adrr
            writeReq[32] = numWords[1];    //Num of words(byte 2)
            writeReq[33] = numWords[0];    //Num of words(byte 1)
            //------------------------------------------------------------------------------
            for (int i = 0; i < len; i++)
                writeReq[34 + i] = data[i];
            //******************************************************************************
            _clientStream.Write(writeReq, 0, 34 + len);
            _clientStream.Flush();
            _clientStream.Read(writeRisp, 0, 30);
            _clientStream.Flush();
            MRES = writeRisp[28];             //in caso venisse implementata una gestione di errori
            SRES = writeRisp[29];             //migliore
            if (MRES != 0 & SRES != 0)
            {
               
                
                return 0;
            }
            else
            {
               
                return 1;
            }
        }

        #endregion
    }
}

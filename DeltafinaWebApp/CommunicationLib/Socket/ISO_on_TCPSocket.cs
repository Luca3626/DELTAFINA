using Sharp7;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommunicationLib
{
    class ISO_on_TCPSocket : AbstrSocket
    {
        #region ISO ON TCP

        //private libnodave.daveOSserialType fds;
        //private libnodave.daveInterface di;
        //private libnodave.daveConnection dc;
        private int rack = 0;
        private int slot = 0;//s7300 2,s71500 0, s7400 3
        private int app = 0;
        #endregion


        S7Client client;



        #region Properties

        public int RACK
        {
            get { return rack; }
            set { rack = value; }
        }

        public int SLOT
        {
            get { return slot; }
            set { slot = value; }
        }

        #endregion

        public ISO_on_TCPSocket(string plcName, string hostIp)
        {
            //SHARP 7 (SNAP 7)
            client = new S7Client();

            this.name = plcName;
            this.hostIp = hostIp;
            this.hostPort = 102;

        }

        /// <summary>
        /// Open comm with the specific device
        /// </summary>
        /// <returns></returns>
        public override void Open()
        {
            try
            {
                //SHARP 7 (SNAP 7)
                int result = client.ConnectTo(hostIp, rack, slot);
                if (result == 0)
                {
                    Console.WriteLine("Connected to " + hostIp);

                    app = 1;
                    IS_CONNECTED = app == 1;
                    IS_OPENED = app == 1;
                }
                else
                {
                    Console.WriteLine(client.ErrorText(result));

                    app = 0;
                    //di = null;
                    IS_CONNECTED = app == 1;
                    IS_OPENED = app == 1;
                }


                ////LIBNODAVE
                //fds.rfd = libnodave.openSocket(102, hostIp);
                //fds.wfd = fds.rfd;
                //if (fds.rfd > 0)
                //{
                //    di = new libnodave.daveInterface(fds, "IF1", 2, libnodave.daveProtoISOTCP/*daveProtoISOTCP*/, libnodave.daveSpeed1500k);//libnodave.daveSpeed187k);
                //    di.setTimeout(4000);
                //    dc = new libnodave.daveConnection(di, 0, rack, slot);
                //    int i = dc.connectPLC();

                //    if (0 == i)
                //    {
                //        app = 1;
                //        IS_CONNECTED = app == 1;
                //        IS_OPENED = app == 1;
                //    }
                //    else
                //    {
                //        app = 0;
                //        di = null;
                //        IS_CONNECTED = app == 1;
                //        IS_OPENED = app == 1;
                //    }

                //}
                //else
                //{
                //    app = 0;
                //    di = null;
                //    dc = null;
                //    IS_CONNECTED = app == 1;
                //    IS_OPENED = app == 1;
                //}

            }
            catch (Exception e)
            {
                app = 0;
                IS_CONNECTED = app == 1;
                IS_OPENED = app == 1;
                System.Diagnostics.Debug.WriteLine("ISO-on-TCP connect: " + e.Message);

            }
        }

        /// <summary>
        /// Close comm with the specific device
        /// </summary>
        public override void Close()
        {
            try
            {
                ////LIBNODAVE
                //if (dc != null)
                //    dc.disconnectPLC();
                //if (di != null)
                //    di.disconnectAdapter();
                //libnodave.closeSocket(fds.rfd);


                //SHARP 7 (SNAP 7)
                client.Disconnect();


                //di = null;
                //dc = null;
                app = 0;
                IS_CONNECTED = app == 1;
                IS_OPENED = app == 1;
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("ISO-on-TCP close :" + e.Message);
            }

        }

        int countErrors = 0;
        /// <summary>
        /// Read From Device
        /// </summary>
        /// <param name="ai"></param>
        /// <returns></returns>
        public override byte[] Read(AddressInterface ai)
        {
            byte[] fData = new byte[ai.ISO_on_TCP_DB_Len];
            int errorCode = 0;
            try
            {
                //SHARP 7 (SNAP 7)
                if (ai.ISO_on_TCP_DB_Num > 0)
                    errorCode = client.DBRead(ai.ISO_on_TCP_DB_Num, ai.ISO_on_TCP_DB_Addr, ai.ISO_on_TCP_DB_Len, fData);


                ////LIBNODAVE
                //if (ai.ISO_on_TCP_DB_Num > 0)
                //    errorCode = dc.readBytes(libnodave.daveDB, ai.ISO_on_TCP_DB_Num, ai.ISO_on_TCP_DB_Addr, ai.ISO_on_TCP_DB_Len, fData);
                //else
                //{
                //    switch (ai.ISO_on_TCP_DB_Num)
                //    {
                //        case -1://E -- ingressi
                //            errorCode = dc.readBytes(libnodave.daveInputs, 0, ai.ISO_on_TCP_DB_Addr, ai.ISO_on_TCP_DB_Len, fData);
                //            break;
                //        case -2://A -- uscite
                //            errorCode = dc.readBytes(libnodave.daveOutputs, 0, ai.ISO_on_TCP_DB_Addr, ai.ISO_on_TCP_DB_Len, fData);
                //            break;
                //        case -3:
                //            errorCode = dc.readBytes(libnodave.daveFlags, 0, ai.ISO_on_TCP_DB_Addr, ai.ISO_on_TCP_DB_Len, fData);
                //            break;
                //        default:
                //            errorCode = -1;
                //            break;
                //    }
                //}
            }
            catch
            {
                throw new Exception();
            }
            if (errorCode == 0)
                return fData;
            else
            {
                //SHARP 7 (SNAP 7)
                if (errorCode == 5)
                {
                    Console.Out.Write(client.ErrorText(errorCode));
                    throw new ConnectionException();
                }
                else
                {
                    countErrors++;
                    if (countErrors >= 20)
                    {
                        countErrors = 0;
                        Console.Out.Write("ConnectionException Error: Error " + errorCode + "DB Number: " + ai.ISO_on_TCP_DB_Num.ToString() + ", Lenght: " + ai.ISO_on_TCP_DB_Len.ToString()
                            + "\n" + client.ErrorText(errorCode) + "\n");
                        throw new ConnectionException();
                    }
                }



                ////LIBNODAVE
                ////string s = libnodave.daveStrerror(errorCode);
                //string errStr = Encoding.ASCII.GetString(Encoding.Unicode.GetBytes(libnodave.daveStrerror(errorCode)));
                //if (errorCode == -1025)
                //{
                //    Console.Out.Write(errStr);
                //    throw new ConnectionException();
                //}
                //else
                //{
                //    countErrors++;
                //    if (countErrors >= 20)
                //    {
                //        countErrors = 0;
                //        Console.Out.Write("ConnectionException Error: Error " + errorCode + "DB Number: " + ai.ISO_on_TCP_DB_Num.ToString() + ", Lenght: " + ai.ISO_on_TCP_DB_Len.ToString()
                //            + "\n" + errStr + "\n");
                //        throw new ConnectionException();
                //    }
                //}
                return null;
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
            int errorCode = 0;//,errorCode2=0;
            try
            {
                if (ai.ISO_on_TCP_DB_Num > 0)
                {
                    ////LIBNODAVE
                    //if (ai.ISO_on_TCP_DB_Len > 200)
                    //{
                    //    byte[] b = new byte[200];
                    //    for (int i = 0; i < b.Length; i++)
                    //    {
                    //        b[i] = buffer[i];
                    //    }
                    //    errorCode = dc.writeBytes(libnodave.daveDB, ai.ISO_on_TCP_DB_Num, ai.ISO_on_TCP_DB_Addr, b.Length, b);
                    //    b = new byte[buffer.Length - 200];
                    //    for (int i = 200; i < buffer.Length; i++)
                    //    {
                    //        b[i - 200] = buffer[i];
                    //    }
                    //    errorCode2 = dc.writeBytes(libnodave.daveDB, ai.ISO_on_TCP_DB_Num, ai.ISO_on_TCP_DB_Addr + 200, b.Length, b);
                    //}
                    //else
                    //{
                    //    errorCode = dc.writeBytes(libnodave.daveDB, ai.ISO_on_TCP_DB_Num, ai.ISO_on_TCP_DB_Addr, ai.ISO_on_TCP_DB_Len, buffer);
                    //}


                    //SHARP 7 (SNAP7)
                    errorCode = client.DBWrite(ai.ISO_on_TCP_DB_Num, ai.ISO_on_TCP_DB_Addr, ai.ISO_on_TCP_DB_Len, buffer);
                }
                else
                {
                    return 1;
                }
            }
            catch
            {
                return 0;
            }

            ////LIBNODAVE
            //string errStr = Encoding.ASCII.GetString(Encoding.Unicode.GetBytes(libnodave.daveStrerror(errorCode)));
            //if (errorCode == 0 & errorCode2 == 0)
            //    return 1;
            //else
            //{
            //    if (errorCode == -1025)
            //    {
            //        Console.Out.Write(errStr);
            //        throw new ConnectionException();
            //    }
            //    else
            //    {
            //        countErrors++;
            //        if (countErrors >= 20)
            //        {
            //            countErrors = 0;
            //            Console.Out.Write("ConnectionException Error: Error " + errorCode + "DB Number: " + ai.ISO_on_TCP_DB_Num.ToString() + ", Lenght: " + ai.ISO_on_TCP_DB_Len.ToString()
            //                + "\n" + errStr + "\n");
            //            throw new ConnectionException();
            //        }
            //        return 0;
            //    }
            //}



            //SHARP 7 (SNAP 7)
            if (errorCode == 0)
                return 1;
            else
            {
                //SHARP 7 (SNAP 7)
                if (errorCode == 5)
                {
                    Console.Out.Write(client.ErrorText(errorCode));
                    throw new ConnectionException();
                }
                else
                {
                    countErrors++;
                    if (countErrors >= 20)
                    {
                        countErrors = 0;
                        Console.Out.Write("ConnectionException Error: Error " + errorCode + "DB Number: " + ai.ISO_on_TCP_DB_Num.ToString() + ", Lenght: " + ai.ISO_on_TCP_DB_Len.ToString()
                            + "\n" + client.ErrorText(errorCode) + "\n");
                        throw new ConnectionException();
                    }
                }
                return 0;
            }
        }
    }
}

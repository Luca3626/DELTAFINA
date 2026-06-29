using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommunicationLib
{
    class ModbusRTUSerialPort:AbstrSerialPort
    {
        private int W_ErrorCnt = 0, R_ErrorCnt = 0;

       
        /// <summary>
        /// Read From Device
        /// </summary>
        /// <param name="ai"></param>
        /// <returns></returns>
        public override byte[] Read(AddressInterface ai)
        {
            System.Collections.ArrayList a = new System.Collections.ArrayList();
            byte[] frame=new byte[0];
            byte[] temp;
            int b;
            switch (ai.M_R_CODE)
            {
                case 0x01:
                    frame = new byte[8];
                    frame[0] = ai.M_ID_SLAVE;
                    frame[1] = ai.M_R_CODE;
                    temp = BitConverter.GetBytes(ai.M_ADDRESS);
                    frame[2] = temp[1];
                    frame[3] = temp[0];
                    temp = BitConverter.GetBytes(ai.M_BYTE * 8);
                    frame[4] = temp[1];
                    frame[5] = temp[0];
                    temp = crc16.Crc16_B(frame, frame.Length - 2);
                    frame[6] = temp[1];
                    frame[7] = temp[0];

                    
                    
                    
                    break;
                case 0x03:
                    frame = new byte[8];
                    frame[0] = ai.M_ID_SLAVE;
                    frame[1] = ai.M_R_CODE;
                    temp = BitConverter.GetBytes(ai.M_ADDRESS);
                    frame[2] = temp[1];
                    frame[3] = temp[0];
                    temp = BitConverter.GetBytes(ai.M_BYTE /2);
                    frame[4] = temp[1];
                    frame[5] = temp[0];
                    temp = crc16.Crc16_B(frame, frame.Length - 2);
                    frame[6] = temp[1];
                    frame[7] = temp[0];
                    break;
                default:
                    ERROR_R_W = true;
                    ERROR_R_W_CAUSE = "Codice lettura non valido";
                    return null;
            }
            if (IS_OPENED)
            {
                System.Diagnostics.Debug.WriteLine(ERROR_R_W_CAUSE);
                serialPort.Write(frame, 0, frame.Length);
                //ci si aspetta almeno 3 caratteri prima di proseguire
                serialPort.ReceivedBytesThreshold = 3;
                waitTimer.Interval = noDataTimeOut;
                dataRecevied = false;
                readTimeoutElapsed = false;
                waitTimer.Enabled = true;
                //Aspetta risposta o timeout
                while (!readTimeoutElapsed & !dataRecevied)
                {
                    System.Threading.Thread.Sleep(1);
                }
                waitTimer.Enabled = false;
                if (readTimeoutElapsed)
                {
                    IS_CONNECTED = false;
                    ERROR_R_W = true;
                    ERROR_R_W_CAUSE = "Timeout";
                    return null;
                }
                if (dataRecevied)
                {
                    //try
                    //{
                    //    while ((b = serialPort.ReadByte()) != -1)
                    //    {
                    //        a.Add(b);
                    //    }
                    //}
                    //catch(Exception e1)
                    //{
                        //ERROR_R_W = true;
                        //ERROR_R_W_CAUSE = "Errore: "+e1.Message;
                        //return null;
                    //}
                    try
                    {
                        int i = 0;
                        do
                        {
                            b = serialPort.ReadByte();
                           
                            if (b != -1)
                            {
                                i++;
                                a.Add(b);
                            }

                            System.Threading.Thread.Sleep(2);
                        }
                        while (serialPort.BytesToRead > 0 );
                        System.Diagnostics.Debug.WriteLine( i);
                    }
                    catch
                    {
                    }
                    if (a.Count >= 3)
                    {
                        if (frame[0] == byte.Parse(a[0].ToString()) && frame[1] == byte.Parse(a[1].ToString()) )
                        {
                            temp = new byte[a.Count - 3];
                            for (int i = 0; i < temp.Length; i++)
                            {
                                temp[i] = byte.Parse(a[i + 3].ToString());
                            }
                            IS_CONNECTED = true;
                            ERROR_R_W = false;
                            return temp;
                        }
                        else
                        {
                            IS_CONNECTED = false;
                            ERROR_R_W = true;
                            ERROR_R_W_CAUSE = "Errore modbus: " + (byte.Parse(a[1].ToString())).ToString("X2") + " " + (byte.Parse(a[2].ToString())).ToString("X2");
                            R_ErrorCnt++;
                            if (R_ErrorCnt >= 20)
                            {
                                R_ErrorCnt = 0;
                                throw new ConnectionException();
                            }
                            return null;                           
                        }
                    }
                    else
                    {
                        IS_CONNECTED = false;
                        ERROR_R_W = true;
                        ERROR_R_W_CAUSE = "Risposta incoerente";
                        return null;
                    }
                }
                else
                {
                    IS_CONNECTED = false;
                    ERROR_R_W = true;
                    ERROR_R_W_CAUSE = "Errore sconosciuto";
                    return null;
                }
            }
            else
            {
                IS_CONNECTED = false;
                ERROR_R_W = true;
                ERROR_R_W_CAUSE = "Port closed";
                return null;
            }
        }

        /// <summary>
        /// Write to device
        /// </summary>
        /// <param name="ai"></param>
        /// <param name="buffer"></param>
        /// <returns></returns>
        public override int Write(AddressInterface ai, byte[] buffer)
        {
             System.Collections.ArrayList a = new System.Collections.ArrayList();
            byte[] frame=new byte[0];
            byte[] temp;
            int b;
            switch (ai.M_W_CODE)
            {
                case 0x0F:
                    frame = new byte[9+ai.M_BYTE];
                    frame[0] = ai.M_ID_SLAVE;
                    frame[1] = ai.M_W_CODE;
                    temp = BitConverter.GetBytes(ai.M_ADDRESS);
                    frame[2] = temp[1];
                    frame[3] = temp[0];
                    temp = BitConverter.GetBytes(ai.M_BYTE * 8);
                    frame[4] = temp[1];
                    frame[5] = temp[0];
                    frame[6] = (byte)ai.M_BYTE;
                    for (int i = 0; i < buffer.Length; i++)
                    {
                        frame[7 + i] = buffer[i];
                    }
                    temp = crc16.Crc16_B(frame, frame.Length - 2);
                    frame[frame.Length - 2] = temp[1];
                    frame[frame.Length - 1] = temp[0];
                    break;
                case 0x10:
                    frame = new byte[9+ai.M_BYTE];
                    frame[0] = ai.M_ID_SLAVE;
                    frame[1] = ai.M_W_CODE;
                    temp = BitConverter.GetBytes(ai.M_ADDRESS);
                    frame[2] = temp[1];
                    frame[3] = temp[0];
                    temp = BitConverter.GetBytes(ai.M_BYTE / 2);
                    frame[4] = temp[1];
                    frame[5] = temp[0];
                    frame[6] = (byte)ai.M_BYTE;
                    for (int i = 0; i < buffer.Length; i++)
                    {
                        frame[7 + i] = buffer[i];
                    }
                    temp = crc16.Crc16_B(frame, frame.Length - 2);
                    frame[frame.Length - 2] = temp[1];
                    frame[frame.Length - 1] = temp[0];
                    break;
                default:
                    ERROR_R_W = true;
                    ERROR_R_W_CAUSE = "Codice scrittura non valido";
                    return 0;
            }
            if (IS_OPENED)
            {
                serialPort.Write(frame, 0, frame.Length);
                //ci si aspetta almeno 3 caratteri prima di proseguire
                serialPort.ReceivedBytesThreshold = 3;
                waitTimer.Interval = noDataTimeOut;
                dataRecevied = false;
                readTimeoutElapsed = false;
                waitTimer.Enabled = true;
                //Aspetta risposta o timeout
                while (!readTimeoutElapsed & !dataRecevied)
                {
                    System.Threading.Thread.Sleep(1);
                }
                waitTimer.Enabled = false;
                if (readTimeoutElapsed)
                {
                    ERROR_R_W = true;
                    ERROR_R_W_CAUSE = "Timeout";
                    IS_CONNECTED = false;
                    return 0;
                }
                if (dataRecevied)
                {
                    //try
                    //{
                    //    while ((b = serialPort.ReadByte()) != -1)
                    //    {
                    //        a.Add(b);
                    //    }
                    //}
                    //catch(Exception e1)
                    //{
                    //ERROR_R_W = true;
                    //ERROR_R_W_CAUSE = "Errore: "+e1.Message;
                    //return null;
                    //}
                    try
                    {
                        int i = 0;
                        do
                        {
                            b = serialPort.ReadByte();
                            i++;
                            if (b != -1)
                                a.Add(b);

                            System.Threading.Thread.Sleep(2);
                            //System.Diagnostics.Debug.WriteLine(b + " " + serialPort.BytesToRead+" "+i);

                        }
                        while (serialPort.BytesToRead > 0);
                    }
                    catch
                    {
                    }
                    if (a.Count >= 3)
                    {
                        if (frame[0] == byte.Parse(a[0].ToString()) && frame[1] == byte.Parse(a[1].ToString()) )
                        {
                            IS_CONNECTED = true;
                            ERROR_R_W = false;
                            return 1;
                        }
                        else
                        {
                            IS_CONNECTED = false;
                            ERROR_R_W = true;
                            ERROR_R_W_CAUSE = "Errore modbus: " + (byte.Parse(a[1].ToString())).ToString("X2") + " " + (byte.Parse(a[02].ToString())).ToString("X2");
                            W_ErrorCnt++;
                            if (W_ErrorCnt >= 20)
                            {
                                W_ErrorCnt = 0;
                                throw new ConnectionException();
                            }
                            return 0;
                        }
                    }
                    else
                    {
                        IS_CONNECTED = false;
                        ERROR_R_W = true;
                        ERROR_R_W_CAUSE = "Risposta incoerente";
                        return 0;
                    }
                }
                else
                {
                    IS_CONNECTED = false;
                    ERROR_R_W = true;
                    ERROR_R_W_CAUSE = "Errore sconosciuto";
                    return 0;
                }
            }
            else
            {
                IS_CONNECTED = false;
                ERROR_R_W = true;
                ERROR_R_W_CAUSE = "Port closed";
                return 0;
            }
        }
    }
}

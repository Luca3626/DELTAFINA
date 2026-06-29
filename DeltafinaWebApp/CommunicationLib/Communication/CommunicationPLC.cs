using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace CommunicationLib
{
    public class CommunicationPLC
    {

        public delegate void ChangedEventHandler(object sender, EventArgs e);
        public static event ChangedEventHandler BroadcastRequest;
        public static event ChangedEventHandler TagListRequest;

        private AddrSetInterface thisAddrSet;
        private CommObj thisObj;
        private ApplicationState thisApp;
        private Thread runIt;
        bool firstTm { get; set; } = true;
        private bool enableBroadcast, enableTaglist;
        private string name;

        private System.Diagnostics.Stopwatch w_StopW, r_StopW;
        private System.Timers.Timer timer;
        private int p_read=0, b_read=0, p_write=0, b_write=0;
        #region PROPERTY

        public string NAME
        {
            get { return name; }
        }

        public bool ENABLE_BROADCAST
        {
            get { return enableBroadcast; }
            set { enableBroadcast = value; }
        }

        public bool ENABLE_TAGLIST
        {
            get { return enableTaglist; }
            set { enableTaglist = value; }
        }

        #endregion

        public CommunicationPLC(string name, CommObj thisObj, AddrSetInterface thisAddrSet, ApplicationState thisApp)
        {
            this.thisObj = thisObj;
            this.thisAddrSet = thisAddrSet;
            this.thisApp = thisApp;
            this.name = name;
            w_StopW = new System.Diagnostics.Stopwatch();
            r_StopW = new System.Diagnostics.Stopwatch();
            timer = new System.Timers.Timer();
            timer.Interval = 1000;
            timer.Elapsed += new System.Timers.ElapsedEventHandler(timer_Elapsed);
            timer.Enabled = true;
            runIt = new Thread(new ThreadStart(run));
            runIt.Name = name;
            runIt.Start();
        }

        void timer_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            thisObj.B_READ = b_read;
            thisObj.B_WRITE = b_write;
            thisObj.P_READ = b_read;
            thisObj.P_WRITE = b_write;
            b_read = 0;
            p_read = 0;
            b_write = 0;
            p_write = 0;
        }

        public void destroy()
        {
            timer.Elapsed -= timer_Elapsed;
            try
            {
                runIt.Abort();
            }
            catch
            {
            }
        }

        public void run()
        {
            bool go = false;
            int counterT = 0;
            byte[] rData, wData;
            bool newData = false;
            bool writeRequest = false;
            while (thisApp.IS_RUNNING)
            {
                try
                {

                    do
                    {

                        thisObj.Open();
                        if (thisObj.IS_OPENED)
                        {
                            counterT = 0;
                            go = true;
                        }
                        else
                        {
                            go = false;
                            counterT++;
                        }

                        if (!thisApp.IS_RUNNING)
                            return;
                        Thread.Sleep(10000);

                    }
                    while (!thisObj.IS_OPENED);

                    while (go)
                    {
                        if (!thisApp.IS_RUNNING)
                            return;
                        try
                        {
                            for (int i = 0; i < thisAddrSet.AddrList.Count; i++)
                            {
                                //READ
                                r_StopW.Reset();
                                r_StopW.Start();
                                rData = null;
                                rData = thisObj.Read(thisAddrSet.AddrList[i]);
                                if (rData != null)
                                {
                                    for (int j = 0; j < ((ByteContainer)thisAddrSet.DataListPLC[i]).LENGTH; j++)
                                    {
                                        ((ByteContainer)thisAddrSet.DataListPLC[i])[j] = rData[j];
                                    }
                                    p_read++;
                                    b_read+=((ByteContainer)thisAddrSet.DataListPLC[i]).LENGTH;
                                    if (ENABLE_BROADCAST)
                                    {
                                        try
                                        {
                                            if (BroadcastRequest != null)
                                                BroadcastRequest(new KeyValuePair<string, int>(NAME, i), new EventArgs());
                                        }
                                        catch
                                        {
                                        }
                                    }
                                }
                                r_StopW.Stop();
                                thisObj.T_READ = r_StopW.ElapsedMilliseconds;

                                //CHECK BUFFERS
                                for (int j = 0; j <= ((ByteContainer)thisAddrSet.DataListPLC[i]).LENGTH - 1; j++)
                                {                                    
                                    if (((ByteContainer)thisAddrSet.DataListNEW[i])[j] != ((ByteContainer)thisAddrSet.DataListOLD[i])[j] & !firstTm)
                                    {
                                        ((ByteContainer)thisAddrSet.DataListPLC[i])[j] = ((ByteContainer)thisAddrSet.DataListNEW[i])[j];
                                        ((ByteContainer)thisAddrSet.DataListOLD[i])[j] = ((ByteContainer)thisAddrSet.DataListNEW[i])[j];
                                        writeRequest = true;    //flag nuovi dati ->PLC
                                    }
                                    else if (((ByteContainer)thisAddrSet.DataListNEW[i])[j] == ((ByteContainer)thisAddrSet.DataListOLD[i])[j])
                                    {
                                        if (((ByteContainer)thisAddrSet.DataListNEW[i])[j] != ((ByteContainer)thisAddrSet.DataListPLC[i])[j])
                                        {
                                            newData = true;
                                        }
                                        ((ByteContainer)thisAddrSet.DataListNEW[i])[j] = ((ByteContainer)thisAddrSet.DataListPLC[i])[j];
                                        ((ByteContainer)thisAddrSet.DataListOLD[i])[j] = ((ByteContainer)thisAddrSet.DataListNEW[i])[j];

                                    }
                                }

                                if (newData)
                                {
                                    if (ENABLE_TAGLIST)
                                    {
                                        try
                                        {
                                            TagListRequest?.Invoke(this, new EventArgs());
                                        }
                                        catch
                                        {

                                        }
                                    }
                                }

                                //WRITE
                                if (writeRequest )
                                {
                                    w_StopW.Reset();
                                    w_StopW.Start();
                                    writeRequest = false;
                                    wData = new byte[((ByteContainer)thisAddrSet.DataListPLC[i]).LENGTH];
                                    for (int j = 0; j < ((ByteContainer)thisAddrSet.DataListPLC[i]).LENGTH; j++)
                                        wData[j] = ((ByteContainer)thisAddrSet.DataListPLC[i])[j];
                                    if (this.thisObj.Write(thisAddrSet.AddrList[i], wData) == 1)
                                    {
                                        p_write++;
                                        b_write += ((ByteContainer)thisAddrSet.DataListPLC[i]).LENGTH;
                                    }
                                    w_StopW.Stop();
                                    thisObj.T_WRITE = w_StopW.ElapsedMilliseconds;
                                }

                                if (!thisObj.IS_OPENED)
                                {
                                    go = false;
                                    break;
                                }
                                Thread.Sleep(10);
                            }
                            firstTm = false;

                        }
                        catch (ThreadAbortException)
                        {
                            go = false;
                            firstTm = true;

                            thisObj.Close();

                            return;
                        }
                        catch (Exception ex)
                        {
                            go = false;
                            firstTm = true;

                            thisObj.Close();
                        }
                       
                    }
                    

                }

                catch (ThreadAbortException)
                {
                    go = false;
                    firstTm = true;
                    thisObj.Close();
                    return;
                }
                catch (Exception)
                {
                    go = false;
                    firstTm = true;
                    thisObj.Close();
                }
            }
        }
    }
}

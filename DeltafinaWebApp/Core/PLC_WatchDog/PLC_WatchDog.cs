using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;
using System.Net.NetworkInformation;
using CommunicationLib;
using System.Threading;
using System.Collections.ObjectModel;
using System.Threading.Tasks;

namespace Core
{



    public class PLC_WatchDog : NotificationObject
    {
        [DllImport("sensapi.dll")]
        protected static extern bool IsNetworkAlive(out int flags);
        //private SQLServerConnection w_dog;
        protected int flags;
        protected bool state;



        protected List<PLC_CommState> plc_state;
        protected ApplicationState _as;
        protected List<CommObj> socket;
        protected ObservableCollection<Tags> Tagslist;


        /// <summary>
        /// Fronte positivo per la comunicazione con il plc
        /// </summary>
        protected List<bool> PE_plc_state;


        //private Thread _watchDog;
        protected Task _watchDog;
        protected CancellationTokenSource canctokenSource;
        protected CancellationToken ct;

        #region Properties
        public List<PLC_CommState> PLC_STATE
        {
            get { return plc_state; }
            set
            {

                plc_state = value;
                RaisePropertyChanged(() => PLC_STATE);

            }
        }



        #endregion

        #region costructor

        public PLC_WatchDog() { }

        public PLC_WatchDog(ApplicationState _as, List<CommObj> socket, ObservableCollection<Tags> Tagslist)
        {
            this._as = _as;
            this.socket = socket;
            this.Tagslist = Tagslist;
            this.plc_state = new List<PLC_CommState>();
            PE_plc_state = new List<bool>();
            foreach (CommObj co in socket)
            {
                plc_state.Add(new PLC_CommState()
                {
                    CommState = false,
                    PlcName = co.NAME,
                    //AGGIUNTO: 03/04/2017
                    B_Read = co.B_READ
                });
                PE_plc_state.Add(false);
            }

            canctokenSource = new CancellationTokenSource();
            ct = canctokenSource.Token;
            _watchDog = Task.Factory.StartNew(() => run(), ct, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);//.Run(() => Run());
            //_watchDog = new Thread(new ThreadStart(run));
            //_watchDog.Name = "WatchDog";
            //_watchDog.Start();
        }

        #endregion

        public void destroy()
        {
            try
            {
                //_watchDog.Abort();
                canctokenSource.Cancel();
            }
            catch
            {
            }
        }


        protected void run()
        {
            while (_as.IS_RUNNING & !canctokenSource.IsCancellationRequested)
            {
                try
                {
                    //if (System.Diagnostics.Debugger.IsAttached)
                    //{
                    //    for (int i = 0; i < socket.Count; i++)
                    //    {
                    //        PLC_STATE[i].CommState = true;
                    //        //AGGIUNTO: 03/04/2017
                    //        PLC_STATE[i].B_Read = 100;
                    //    }
                    //}
                    //else
                    //{
                    //****************************************************************
                    state = IsNetworkAlive(out flags);
                    if (state)
                    {
                        for (int i = 0; i < socket.Count; i++)
                        {
                            PLC_STATE[i].CommState = socket[i].IS_CONNECTED;
                            //AGGIUNTO: 03/04/2017
                            PLC_STATE[i].B_Read = socket[i].B_READ;
                        }


                    }
                    else
                    {
                        for (int i = 0; i < PLC_STATE.Count; i++)
                        {
                            PLC_STATE[i].CommState = socket[i].GetType() == typeof(ModbusRTUSerialPort) ? socket[i].IS_CONNECTED : false;
                            //AGGIUNTO: 03/04/2017
                            PLC_STATE[i].B_Read = socket[i].B_READ;
                        }
                    }
                    for (int i = 0; i < PLC_STATE.Count; i++)
                    {
                        if (PLC_STATE[i].CommState & !PE_plc_state[i])
                        {
                            foreach (Tags t in Tagslist)
                            {
                                if (socket[i].NAME == t.PLC_NAME)
                                    t.GET_RETAIN = true;
                            }
                        }
                        PE_plc_state[i] = PLC_STATE[i].CommState;
                    }
                    //}


                    //Thread.Sleep(1000);
                    Task.Delay(1000).Wait();
                    //****************************************************************
                }
                catch (ThreadAbortException)
                {
                    return;
                }
                catch (Exception)
                {

                }
            }
        }
    }
}

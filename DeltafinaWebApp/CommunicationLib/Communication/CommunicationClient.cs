using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Collections.ObjectModel;
using System.Threading;

namespace CommunicationLib
{
    public class CommunicationClient
    {
        public delegate void ChangedEventHandler(object sender, EventArgs e);
        public static event ChangedEventHandler NewAlarm;//Per effettuare il bubbling dell evento fino al gestore dei allarmi
        public static event ChangedEventHandler NewAlarmSound;//Per effettuare il bubbling dell evento fino al gestore dei allarmi
        
        private ChannelFactory<IProxy> channel;
        private NetTcpBinding ntb;
        public IProxy proxy;
        public ProxyClient proxyClient;
        private Thread _keepAlive;
        private ApplicationState appState;
        private ObservableCollection<Tags> TagsList;

        #region NetTcpBinding

        int MaxReceivedMessageSize = int.MaxValue;
        TimeSpan ReceiveTimeout = TimeSpan.FromMinutes(5);
        TimeSpan SendTimeout = TimeSpan.FromMinutes(5);
        SecurityMode Security = SecurityMode.None;

        #endregion

        private string hostAddress;
        private int hostPort;
        private string serviceName;

        private int keepAlive = 0;
        private bool running = false;

        #region PROPERTY

        /// <summary>
        /// Indica lo stato del servizio
        /// </summary>
        public CommunicationState COM_STATE
        {
            get
            {
                if (channel != null)
                    return channel.State;
                else
                    return CommunicationState.Faulted;
            }

        }

        private bool connected;
        public bool CONNECTED
        {
            set
            {
                connected = value;
            }
            get
            {

                return connected;
            }
        }

        public DateTime dlast, dact;

        public int M_SECONDS_E
        {
            get { return dact.Subtract(dlast).Milliseconds; }
        }

        private int numOfTags;
        public int NUM_OF_TAGS
        {
            get { return numOfTags; }
        }

        #endregion


        #region COSTRUCTOR

        /// <summary>
        /// Costruttore base di CommunicationClient
        /// </summary>
        /// <param name="hostAddress"></param>
        /// <param name="hostPort"></param>
        /// <param name="serviceName"></param>
        /// <param name="appState"></param>
        /// <param name="TagsList"></param>
        public CommunicationClient(string hostAddress, int hostPort, string serviceName, ApplicationState appState, ObservableCollection<Tags> TagsList)
        {
            this.hostAddress = hostAddress;
            this.hostPort = hostPort;
            this.serviceName = serviceName;
            this.TagsList = TagsList;
            this.appState = appState;
            foreach (Tags tag in TagsList)
            {
                tag.WriteRequest += new TagsClient.ChangedEventHandler(TagsClient_WriteRequest);
            }
            _keepAlive = new Thread(new ThreadStart(run));
            _keepAlive.Name = "CommunicationClient";
            _keepAlive.Start();
        }



        /// <summary>
        /// Costruttore esteso con parametri NetTcpBinding di CommunicationClient
        /// </summary>
        /// <param name="hostAddress"></param>
        /// <param name="hostPort"></param>
        /// <param name="serviceName"></param>
        /// <param name="MaxReceivedMessageSize"></param>
        /// <param name="ReceiveTimeout"></param>
        /// <param name="SendTimeout"></param>
        /// <param name="Security"></param>
        /// <param name="appState"></param>
        /// <param name="TagsList"></param>
        public CommunicationClient(string hostAddress, int hostPort, string serviceName, int MaxReceivedMessageSize, TimeSpan ReceiveTimeout, TimeSpan SendTimeout, SecurityMode Security, ApplicationState appState, ObservableCollection<Tags> TagsList)
        {
            this.hostAddress = hostAddress;
            this.hostPort = hostPort;
            this.serviceName = serviceName;
            this.TagsList = TagsList;
            this.appState = appState;
            this.MaxReceivedMessageSize = MaxReceivedMessageSize;
            this.ReceiveTimeout = ReceiveTimeout;
            this.SendTimeout = SendTimeout;
            this.Security = Security;
            foreach (Tags tag in TagsList)
            {
                tag.WriteRequest += new TagsClient.ChangedEventHandler(TagsClient_WriteRequest);
            }
            //TagsClient.WriteRequest += new TagsClient.ChangedEventHandler(TagsClient_WriteRequest);
            _keepAlive = new Thread(new ThreadStart(run));
            _keepAlive.Name = "CommunicationClient";
            _keepAlive.Priority = ThreadPriority.Highest;
            _keepAlive.Start();

        }

        void TagsClient_WriteRequest(object sender, EventArgs e)
        {
            List<KeyValuePair<int, object>> sendList = new List<KeyValuePair<int, object>>();
            sendList.Add((KeyValuePair<int, object>)sender);
            if (CONNECTED)//COM_STATE == CommunicationState.Opened)
                try
                {
                    proxy.SetTags(sendList);
                }
                catch
                {
                }

        }

        #endregion

        public void Close()
        {
            closeClient();
            try
            {
                _keepAlive.Abort();
            }
            catch
            {
            }
        }


        #region PRIVATE

        private void runClient()
        {
            hostAddress = "";
            hostPort = 0;
            throw new NotImplementedException();
            List<int> TagNames = new List<int>();
            List<KeyValuePair<int, object>> retList;

            ntb = new NetTcpBinding(Security);
            ntb.ReceiveTimeout = ReceiveTimeout;
            ntb.SendTimeout = SendTimeout;
            ntb.MaxReceivedMessageSize = MaxReceivedMessageSize;
            proxyClient = new ProxyClient(TagsList);
            try
            {
                proxyClient.NewAlarm += new ProxyClient.ChangedEventHandler(proxyClient_NewAlarm);//Notifica del nuovo allarme da parte del server
                proxyClient.NewAlarmSound += new ProxyClient.ChangedEventHandler(proxyClient_NewAlarmSound);
            }
            catch
            {
            }
            

            channel = new DuplexChannelFactory<IProxy>(proxyClient, ntb, new EndpointAddress("net.tcp://" + hostAddress + ":" + hostPort + "/" + serviceName));
            channel.Open();
            proxy = channel.CreateChannel();
            try
            {
                proxy.Login(Environment.MachineName);
                foreach (Tags tag in TagsList)
                {
                    TagNames.Add(tag.ID);
                }
                retList = proxy.GetTags(TagNames);
                Tags _tag;
                foreach (KeyValuePair<int, object> kvp in retList)
                {

                    try
                    {
                        _tag = TagsList.FirstOrDefault(n => n.ID == kvp.Key);
                        if (_tag != null)
                        {
                            _tag.DATE = DateTime.Now;
                            _tag.SRV_VALUE = kvp.Value;
                        }
                    }
                    catch
                    {
                    }
                }
                CONNECTED = true;
            }
            catch (EndpointNotFoundException)
            {
                CONNECTED = false;
            }
            catch (CommunicationObjectFaultedException)
            {
                CONNECTED = false;
            }
        }

        

        void proxyClient_NewAlarm(object sender, EventArgs e)
        {
            try
            {
                if (NewAlarm != null)
                    NewAlarm(this, new EventArgs());
            }
            catch
            {
            }
        }

        void proxyClient_NewAlarmSound(object sender, EventArgs e)
        {
            try
            {
                if (NewAlarmSound != null)
                    NewAlarmSound(this, new EventArgs());
            }
            catch
            {
            }
        }

        private void closeClient()
        {
            try
            {
                if (proxyClient != null)
                {
                    try
                    {
                        proxyClient.NewAlarm -= proxyClient_NewAlarm;
                        proxyClient.NewAlarmSound -= proxyClient_NewAlarmSound;
                    }
                    catch
                    {
                    }
                }
            }
            catch
            {

            }
            if (CONNECTED)
            {
                try
                {
                    if (proxy != null)
                        proxy.Logout();
                }
                catch
                {
                }
                try
                {
                    if (channel != null)
                        channel.Close();
                }
                catch
                {
                }
            }
            ntb = null;
            proxyClient = null;
            proxy = null;
            channel = null;
        }

        private void run()
        {
            List<KeyValuePair<int, object>> retList;
            List<int> TagNames;
            int keepAliveCounter = 0,requestAllTags=0,reqTags=0;
            bool firstime = true;
            Tags _tag;
            DateTime _req;
            while (appState.IS_RUNNING)
            {
                try
                {
                    do
                    {
                        if (!appState.IS_RUNNING)
                        {
                            closeClient();
                            return;
                        }
                        closeClient();
                        runClient();
                        Thread.Sleep(10000);
                        running = CONNECTED;
                        keepAliveCounter = 0;
                    }
                    while (!connected);
                    //Client Aperto
                    while (running)
                    {
                        if (CONNECTED)
                        {
                            if (keepAliveCounter >= 10)
                            {
                                try
                                {
                                    if (keepAlive + 1 <= 10)
                                        keepAlive = keepAlive + 1;
                                    else
                                        keepAlive = 1;
                                    proxy.KeepAlive(keepAlive);
                                }
                                catch (EndpointNotFoundException)
                                {
                                    CONNECTED = false;
                                    running = false;
                                    keepAliveCounter = 0;
                                }
                                catch (CommunicationObjectFaultedException)
                                {
                                    CONNECTED = false;
                                    running = false;
                                    keepAliveCounter = 0;
                                }
                                keepAliveCounter = 0;
                            }
                            else
                            {
                                keepAliveCounter++;
                            }
                            if (firstime)
                            {
                                if (requestAllTags <= 300)
                                {
                                    requestAllTags++;
                                }
                                else
                                {
                                    requestAllTags = 0;
                                    firstime = false;
                                    TagNames = new List<int>();
                                    foreach (Tags tag in TagsList)
                                    {
                                        TagNames.Add(tag.ID);
                                    }
                                    retList = proxy.GetTags(TagNames);

                                    foreach (KeyValuePair<int, object> kvp in retList)
                                    {

                                        try
                                        {
                                            _tag = TagsList.FirstOrDefault(n => n.ID == kvp.Key);
                                            if (_tag != null)
                                            {
                                                _tag.DATE = DateTime.Now;
                                                _tag.SRV_VALUE = kvp.Value;
                                            }
                                        }
                                        catch
                                        {
                                        }
                                    }
                                }
                                proxyClient_NewAlarm(this, new EventArgs());
                            }

                            /*if (reqTags <= 1000)
                            {
                                if (!firstime)
                                    reqTags++;
                            }
                            else
                            {
                                reqTags = 0;
                                TagNames = new List<int>();
                                foreach (Tags tag in TagsList)
                                {
                                    TagNames.Add(tag.ID);
                                }
                                retList = proxy.GetTags(TagNames);

                                foreach (KeyValuePair<int, object> kvp in retList)
                                {

                                    try
                                    {
                                        _tag = TagsList.FirstOrDefault(n => n.ID == kvp.Key);
                                        if (_tag != null)
                                            //_tag.VALUE = kvp.Value;
                                            _tag.SRV_VALUE = kvp.Value;
                                    }
                                    catch
                                    {
                                    }
                                }

                            }*/
                            //SOLO PER PROVA
                            if (reqTags <= 15)
                            {
                                if (!firstime)
                                    reqTags++;
                            }
                            else
                            {
                                reqTags = 0;
                                _req = DateTime.Now.AddSeconds(-10);
                                TagNames = new List<int>();
                                foreach (Tags tag in TagsList)
                                {
                                    if (tag.DATE < _req)
                                        TagNames.Add(tag.ID);
                                }
                                if (TagNames.Count > 0)
                                {

                                    dlast = DateTime.Now;
                                    dact = DateTime.Now;
                                }
                                retList = proxy.GetTags(TagNames);
                                if (TagNames.Count > 0)
                                {
                                    numOfTags = retList.Count;

                                    dact = DateTime.Now;
                                }
                                foreach (KeyValuePair<int, object> kvp in retList)
                                {

                                    try
                                    {
                                        _tag = TagsList.FirstOrDefault(n => n.ID == kvp.Key);
                                        if (_tag != null)
                                        {
                                            _tag.DATE = DateTime.Now;
                                            _tag.SRV_VALUE = kvp.Value;
                                        }
                                    }
                                    catch
                                    {
                                    }
                                }

                            }
                        }
                        else
                        {
                            running = false;
                            keepAliveCounter = 0;
                            firstime = true;
                            requestAllTags = 0;
                            reqTags = 0;
                        }
                        Thread.Sleep(10000);
                    }

                }
                catch (ThreadAbortException)
                {
                    closeClient();
                    CONNECTED = false;
                    return;
                }
                catch (Exception e)
                {
                    System.Diagnostics.Debug.WriteLine("CommunicationClient: " + e.Message);
                    closeClient();
                    CONNECTED = false;
                    running = false;
                    keepAliveCounter = 0;
                    Thread.Sleep(10000);
                }
            }
        }

        #endregion

    }
}

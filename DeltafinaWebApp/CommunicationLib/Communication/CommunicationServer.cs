using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections.ObjectModel;
using System.ServiceModel;
using System.Security.Permissions;
using System.ServiceModel.Dispatcher;

namespace CommunicationLib
{

    #region ENUMS

     public enum FIRE_EVENTS
    {
        Tag_Event,
        Broadcast_Event,
        Tag_List_Event
    }
    #endregion

    /// <summary>
    /// Servizio di comunicazione lato server
    /// </summary>
    public class CommunicationServer
    {
        public delegate void Sender(object a);

        private ServiceHost host;
        private NetTcpBinding ntb;
        public Proxy proxy;
        ObservableCollection<Tags> TagsList;

        #region NetTcpBinding

        int MaxReceivedMessageSize = int.MaxValue;
        TimeSpan ReceiveTimeout =TimeSpan.FromSeconds(30);
        TimeSpan SendTimeout = TimeSpan.FromSeconds(30);
        SecurityMode Security = SecurityMode.None;

        #endregion

        private string hostAddress;
        private int hostPort;
        private string serviceName;

        #region PROPERTY

        /// <summary>
        /// Indica lo stato del servizio
        /// </summary>
        public CommunicationState COM_STATE
        {
            get
            {
                if (host != null)
                    return host.State;
                else
                    return CommunicationState.Faulted;
            }
            
        }

        #endregion

        #region COSTRUCTOR

        /// <summary>
        /// Costruttore base di CommunicationServer
        /// </summary>
        /// <param name="hostAddress"></param>
        /// <param name="hostPort"></param>
        /// <param name="serviceName"></param>
        /// <param name="TagsList"></param>
        public CommunicationServer(string hostAddress, int hostPort, string serviceName, ObservableCollection<Tags> TagsList,FIRE_EVENTS fireEvents,int numOfPackets)
        {
            this.hostAddress = hostAddress;
            this.hostPort = hostPort;
            this.serviceName = serviceName;
            this.TagsList = TagsList;
            if (fireEvents == FIRE_EVENTS.Broadcast_Event)
            {
                CommunicationPLC.BroadcastRequest += new CommunicationPLC.ChangedEventHandler(CommunicationPLC_BroadcastRequest);
            }
            else if (fireEvents == FIRE_EVENTS.Tag_Event)
            {
                foreach (Tags tag in TagsList)
                {
                    tag.SendRequest += new Tags.ChangedEventHandler(Tags_SendRequest);
                }
            }
            else if (fireEvents == FIRE_EVENTS.Tag_List_Event)
            {
                CommunicationPLC.TagListRequest += new CommunicationPLC.ChangedEventHandler(CommunicationPLC_TagListRequest);
                if (TagsList != null)
                {
                    foreach (Tags tag in TagsList)
                    {
                        if (tag is TagsServer)
                            tag.SendRequest += new Tags.ChangedEventHandler(Tags_SendRequest);
                    }
                }
            }
            startService(TagsList,numOfPackets);
        }

        

        /// <summary>
        /// Costruttore esteso con parametri NetTcpBinding di CommunicationServer
        /// </summary>
        /// <param name="hostAddress"></param>
        /// <param name="hostPort"></param>
        /// <param name="serviceName"></param>
        /// <param name="MaxReceivedMessageSize"></param>
        /// <param name="ReceiveTimeout"></param>
        /// <param name="SendTimeout"></param>
        /// <param name="Security"></param>
        /// <param name="TagsList"></param>
        public CommunicationServer(string hostAddress, int hostPort, string serviceName, int MaxReceivedMessageSize, TimeSpan ReceiveTimeout, TimeSpan SendTimeout, SecurityMode Security, ObservableCollection<Tags> TagsList, FIRE_EVENTS fireEvents, int numOfPackets)
        {
            this.hostAddress = hostAddress;
            this.hostPort = hostPort;
            this.serviceName = serviceName;
            //this.MaxReceivedMessageSize = MaxReceivedMessageSize;
            this.ReceiveTimeout = ReceiveTimeout;
            this.SendTimeout = SendTimeout;
            this.Security = Security;
            this.TagsList = TagsList;
            if (fireEvents == FIRE_EVENTS.Broadcast_Event)
            {
                CommunicationPLC.BroadcastRequest += new CommunicationPLC.ChangedEventHandler(CommunicationPLC_BroadcastRequest);
            }
            else if (fireEvents == FIRE_EVENTS.Tag_Event)
            {
                foreach (Tags tag in TagsList)
                {
                    tag.SendRequest += new Tags.ChangedEventHandler(Tags_SendRequest);
                }
            }
            else if (fireEvents == FIRE_EVENTS.Tag_List_Event)
            {
                CommunicationPLC.TagListRequest += new CommunicationPLC.ChangedEventHandler(CommunicationPLC_TagListRequest);
                foreach (Tags tag in TagsList)
                {
                    if(tag is TagsServer)
                        tag.SendRequest += new Tags.ChangedEventHandler(Tags_SendRequest);
                }
            }
           
            startService(TagsList,numOfPackets);
        }

        #endregion

        void Tags_SendRequest(object sender, EventArgs e)
        {
            ObservableCollection<Tags> _TagsToSend = new ObservableCollection<Tags>();
            KeyValuePair<string, object> req = (KeyValuePair<string, object>)sender;
            Tags tag=TagsList.FirstOrDefault(x => x.NAME==req.Key);
            if (tag != null)
            {
                _TagsToSend.Add(tag);
                ServerSendTags(_TagsToSend);
            }
        }
        

        void CommunicationPLC_BroadcastRequest(object sender, EventArgs e)
        {
            ObservableCollection<Tags> _TagsToSend = new ObservableCollection<Tags>();
            KeyValuePair<int, int> req = (KeyValuePair<int, int>)sender;
            foreach (Tags tag in TagsList)
            {
                if (tag.ID == req.Key & tag.SEQUENCE == req.Value)
                    _TagsToSend.Add(tag);
            }
            if (_TagsToSend.Count > 0)
                ServerSendTags(_TagsToSend);
        }

        void CommunicationPLC_TagListRequest(object sender, EventArgs e)
        {
            ObservableCollection<Tags> _TagsToSend = new ObservableCollection<Tags>();
            if (TagsList != null)
            {
                foreach (Tags tag in TagsList)
                {
                    if (tag.NEW_DATA)
                    {
                        tag.NEW_DATA = false;
                        _TagsToSend.Add(tag);
                    }
                } 
            }
            if (_TagsToSend.Count > 0)
                ServerSendTags(_TagsToSend);
        }

        #region Public

        public void RestartService(ObservableCollection<Tags> TagsList, int numOfPackets)
        {
            switch (COM_STATE)
            {
                case CommunicationState.Opened:
                case CommunicationState.Opening:
                    host.Close();
                    break;
            }
            proxy = null;
            ntb = null;
            host = null;
            startService(TagsList,numOfPackets);
        }

        public void StopService()
        {
            switch (COM_STATE)
            {
                case CommunicationState.Opened:
                case CommunicationState.Opening:
                    host.Close();
                    break;
            }
            proxy = null;
            ntb = null;
            host = null;
        }

        public void ServerSendTags(ObservableCollection<Tags> _TagsList)
        {
            try
            {
                proxy.autoSendTags(_TagsList);
            }
            catch
            {
            }
        }

        #endregion

        #region Private

        private void startService(ObservableCollection<Tags> TagsList,int numOfPackets)
        {
            try
            {
                //Init proxy
                proxy = new Proxy(TagsList,numOfPackets);
                //Init host
                host = new ServiceHost
                    
                (proxy, new Uri("net.tcp://" + hostAddress + ":" + hostPort));
                //Init ntb
                ntb = new NetTcpBinding(Security);
                ntb.ReceiveTimeout = ReceiveTimeout;
                ntb.SendTimeout = SendTimeout;
                ntb.MaxReceivedMessageSize = MaxReceivedMessageSize;
                //Start host
                host.AddServiceEndpoint(typeof(IProxy), ntb, serviceName);

                ////AGGIUNTO: 11/11/2016
                //foreach (ChannelDispatcher channelDipsatcher in host.ChannelDispatchers)
                //{
                //    foreach (EndpointDispatcher endpointDispatcher in channelDipsatcher.Endpoints)
                //    {
                //        endpointDispatcher.DispatchRuntime.AutomaticInputSessionShutdown = false;
                //    }
                //}
                ////FINE AGGIUNTA

                host.Open();
                
            }
            catch
            {
            }
        }

        #endregion

    }
}

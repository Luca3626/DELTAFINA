using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Net;
using System.Net.Sockets;

namespace CommunicationLib
{
    public abstract class AbstrSocket : CommObj
    {
        protected string hostIp;
        protected int hostPort;
      

        protected TcpClient _thisClient;
        protected NetworkStream _clientStream;

        #region PROPERTIES

        /*public bool CONNECTED
        {
            get { return _thisClient != null ? _thisClient.Connected : false; }
        }*/

        public string HOST_IP
        {
            get { return hostIp; }
            set { hostIp = value; }

        }

        public int HOST_PORT
        {
            get { return hostPort; }
            set { hostPort = value; }
        }

        

       

        #endregion

        #region Constructor

        public AbstrSocket()
        {
        }

        public AbstrSocket(string plcName,string hostIp)
        {
            this.name = plcName;
            this.hostIp = hostIp;
        }

        public AbstrSocket(string plcName, string hostIp, int hostPort)
        {
            this.name = plcName;
            this.hostIp = hostIp;
            this.hostPort = hostPort;
        }

        #endregion

     

        
    }

    
}

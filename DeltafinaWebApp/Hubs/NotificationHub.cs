using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;

namespace Hubs
{
    public class NotificationHub : Hub
    {

        public IEnumerable<object> GetTagsOfPacket(string plcName, int NumOfPacket)
        {
            return ServerSignalR.GetTagsOfPacket(plcName, NumOfPacket);
        }

        public int GetPacketsCount(string plcName)
        {
            //if (Core.CommunicationAircooler.addrSetList != null)
            //    return 4;
            //else
            //    return 3;
            return ServerSignalR.GetPacketsCount(plcName);
        }

        public bool SetTag(string plcName, int id, object value)
        {
            return ServerSignalR.SetTag(plcName, id, value);
        }

    }
}

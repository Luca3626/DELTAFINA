using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommunicationLib
{
    public class ApplicationState
    {
        public bool IS_RUNNING { get; set; }
    }

    public class PLC_CommState
    {

        public bool CommState
        {
            get;
            set;
        }

        public string PlcName
        {
            get;
            set;
        }

        //AGGIUNTO: 03/04/2017
        public int B_Read
        {
            get;
            set;
        }
    }
}

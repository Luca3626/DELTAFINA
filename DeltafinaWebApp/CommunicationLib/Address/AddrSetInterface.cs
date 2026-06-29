using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommunicationLib
{
    public class AddrSetInterface
    {

        public string Name { get; set; }

        public List<AddressInterface> AddrList;
        public List<ByteContainer> DataListNEW;
        public List<ByteContainer> DataListOLD;
        public List<ByteContainer> DataListPLC;

        public AddrSetInterface(string namePLC)
        {
            Name = namePLC;

            AddrList = new List<AddressInterface>();
            DataListNEW = new List<ByteContainer>();
            DataListPLC = new List<ByteContainer>();
            DataListOLD = new List<ByteContainer>();
        }

        public void AddToList(AddressInterface ai, ByteContainer dataNEW, ByteContainer dataPLC, ByteContainer dataOLD)
        {
            AddrList.Add(ai);
            DataListNEW.Add(dataNEW);
            DataListPLC.Add(dataPLC);
            DataListOLD.Add(dataOLD);
        }

        public void AddToList(AddressInterface ai,int len)
        {
            AddrList.Add(ai);
            DataListNEW.Add(new ByteContainer(len, DataListNEW.Count));
            DataListPLC.Add(new ByteContainer(len, DataListPLC.Count));
            DataListOLD.Add(new ByteContainer(len, DataListOLD.Count));
        }
    }

    
}

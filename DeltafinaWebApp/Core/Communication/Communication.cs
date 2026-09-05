using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CommunicationLib;
using DeltafinaWebApp.Data.Archives;

namespace Core
{
    class Communication
    {
        #region PLC
        
        public static List<CommObj> PLC_LIST;
        public static List<AddrSetInterface> addrSetList;

        #region S7_1500
        public static AddrSetInterface addrSet_S7_1500;
        public static ISO_on_TCPSocket iso_on_tcp_S7_1500;
        public static CommunicationPLC S7_1500;
        #endregion

        public static PLC_WatchDog WatchDog;

        #endregion

        #region Tags
        public static TagsList tagsList;
        #endregion

        //#region Server
        //public static CommunicationServer ServerRiviello;
        //#endregion

        private static void initialize_S7_1500(ApplicationState _as, string plcName, string ipAddress, int port)
        {
            addrSet_S7_1500 = new AddrSetInterface(plcName);

            //P0 - DB100 - PID
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 600, ISO_on_TCP_DB_Num = 100 }, 600);
            //P1 - DB100 - PID
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 600, ISO_on_TCP_DB_Len = 600, ISO_on_TCP_DB_Num = 100 }, 600);
            //P2 - DB101 - AI (ANALOGICHE DI 
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 1840, ISO_on_TCP_DB_Num = 101 }, 1840);
            //P3 - DB101 - AI (ANALOGICHE DI 
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 1840, ISO_on_TCP_DB_Len = 1840, ISO_on_TCP_DB_Num = 101 }, 1840);
            //P4 - DB103 - PC MOTOR COMMANDS
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 500, ISO_on_TCP_DB_Num = 103 }, 500);
            //P5- DB104 - MOTORS FILTER (BYP
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 500, ISO_on_TCP_DB_Num = 104 }, 500);
            //P6 - DB105 - MOTORS STS (STATI 
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 500, ISO_on_TCP_DB_Num = 105 }, 500);
            //P7 - DB106 - MOTOR ALARMS (ALLA
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 500, ISO_on_TCP_DB_Num = 106 }, 500);
            //P8 - DB107 - MOTOR STATE (PAROL
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 500, ISO_on_TCP_DB_Num = 107 }, 500);
            //P9 - DB114 - VALVE FILTERS (BYP
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 86, ISO_on_TCP_DB_Num = 114 }, 86);
            //P10 - DB113 - PC-VALVE-COMMANDS
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 86, ISO_on_TCP_DB_Num = 113 }, 86);
            //P11 - DB115 - VALVE STS (STATI 
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 86, ISO_on_TCP_DB_Num = 115 }, 86);
            //P12 - DB116 - VALVE ALARMS (ALL
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 86, ISO_on_TCP_DB_Num = 116 }, 86);
            //P13 - DB117 - VALVE STATE (PARO
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 86, ISO_on_TCP_DB_Num = 117 }, 86);
            //P14 - DB120 - FROM_HMI
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 8, ISO_on_TCP_DB_Num = 120 }, 8);
            //P15 - DB121 - TO_HMI
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 52, ISO_on_TCP_DB_Num = 121 }, 52);
            //P16 - DB122 - VFD (INVERTER)
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 1080, ISO_on_TCP_DB_Num = 122 }, 1080);
            //P17 - DB122 - VFD (INVERTER)
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 1080, ISO_on_TCP_DB_Len = 1076, ISO_on_TCP_DB_Num = 122 }, 1076);
            //P18 - DB186 - TIMERS TCP (solo primo segmento: l'HMI usa tcp[36..60]; i byte 2666-7999 non hanno tag a video)
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 2666, ISO_on_TCP_DB_Num = 186 }, 2666);
            //P19 - DB189 - TIMERS TCC (solo primo segmento, come il DB186)
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 2666, ISO_on_TCP_DB_Num = 189 }, 2666);
            //P20 - DB123 - INT FROM_HMI
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 10, ISO_on_TCP_DB_Num = 123 }, 10);
            //P21 - DB190 - VAR
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 2666, ISO_on_TCP_DB_Num = 190 }, 2666);
            //P22 - DB190 - VAR
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 2666, ISO_on_TCP_DB_Len = 2668, ISO_on_TCP_DB_Num = 190 }, 2668);
            //P23 - DB190 - VAR
            addrSet_S7_1500.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 5334, ISO_on_TCP_DB_Len = 2666, ISO_on_TCP_DB_Num = 190 }, 2666);

            addrSetList.Add(addrSet_S7_1500);

            iso_on_tcp_S7_1500 = new ISO_on_TCPSocket("S7_1500", ipAddress);

            PLC_LIST.Add(iso_on_tcp_S7_1500);

            S7_1500 = new CommunicationPLC("S7_1500", iso_on_tcp_S7_1500, addrSet_S7_1500, _as)
            {
                ENABLE_TAGLIST = true
            };

            tagsList.Add_Tags_P0_P7(addrSet_S7_1500);
            tagsList.Add_Tags_P8_P17(addrSet_S7_1500);
            tagsList.Add_Tags_P18_P23(addrSet_S7_1500);

        }


        public static void initialize (ApplicationState _as)
        {
            PLC_LIST = new List<CommObj>();

            addrSetList = new List<AddrSetInterface>();

            tagsList = new TagsList();

            using (var ctx = ArchivesDbContext.Create(MyApp.ConnectionString))
            {
                foreach (var plc in ctx.Plcs)
                {
                    if (plc.Name.ToLower().Equals(MyApp.PLC_NAME_S7_1500.ToLower())) initialize_S7_1500(_as, plc.Name, plc.IpAddress, plc.Port);

                }
            }

            WatchDog = new PLC_WatchDog(_as, PLC_LIST, tagsList.list);
        }


        public static void destroy()
        {
            //COMMENTATO: 28/10/2016
            //Properties.Settings.Default.IP_PLC1 = modbus_FTV077.HOST_IP;
                        
            WatchDog.destroy();

            S7_1500.destroy();

        }
    }
}
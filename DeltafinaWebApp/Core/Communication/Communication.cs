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


        #region OMRON
        public static AddrSetInterface addrSet_OMRON;
        public static FINS_Socket OMRON_Socket;
        public static CommunicationPLC OMRON;
        #endregion

        #region S7_300
        public static AddrSetInterface addrSet_S7;
        public static ISO_on_TCPSocket iso_on_tcp_S7;
        public static CommunicationPLC S7;
        #endregion


        #region MOXA

        public static AddrSetInterface addrSet_MOXA;
        public static ModbusSocket modbus_MOXA;
        public static CommunicationPLC MOXA;

        #endregion

        public static PLC_WatchDog WatchDog;

        #endregion

        #region Tags
        public static TagsList tagsList;
        #endregion

        //#region Server
        //public static CommunicationServer ServerRiviello;
        //#endregion

        private static void inizialize_OMRON(ApplicationState _as, string plcName, string ipAddress, int port)
        {
            addrSet_OMRON = new AddrSetInterface(plcName);

            //P0-E1_0_179 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 0, FINS_LEN = 360, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 360);
            //P1-E1_490_2444
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 490, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
            //P2-E1_2450_2938  
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 2450, FINS_LEN = 720, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 720);
            //P3-E1_2940_3119 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 2940, FINS_LEN = 360, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 360);
            //P4-E1_3430_3609 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 3430, FINS_LEN = 360, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 360);
            //P5-E1_3920_4242 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 3920, FINS_LEN = 646, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 646);
            //P6-E1_4410_4744 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 4410, FINS_LEN = 670, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 670);
            //P7-E1_4900_4907 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 4900, FINS_LEN = 16, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 16);
            //P8-E1_5390_5399
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 5390, FINS_LEN = 20, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 20);
            //P9-E1_5880_6087 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 5880, FINS_LEN = 416, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 416);
            //P10-E1_6860_7047 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 6860, FINS_LEN = 376, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 376);
            //P11-E1_7840_7874 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 7840, FINS_LEN = 72, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 72);
            //P12-E1_9800_10288 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 9800, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
            //P13-E1_11760_12248 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 11760, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
            //P14-E1_13720_14180
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 13720, FINS_LEN = 924, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 924);
            //P15-E1_15680_15882 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 15680, FINS_LEN = 408, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 408);
            //P16-E1_980_1468 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 980, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
            //P17-E1_1470_1958 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 1470, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
            //P18-E1_1960_2444 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 1960, FINS_LEN = 972, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 972);
            //P19-E1_12290_12294 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 10290, FINS_LEN = 12, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 12);
            //P20-E1_12250_12416 
            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 12250, FINS_LEN = 336, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 336);

            addrSetList.Add(addrSet_OMRON);

            OMRON_Socket = new FINS_Socket(plcName, ipAddress, port);

            PLC_LIST.Add(OMRON_Socket);

            OMRON = new CommunicationPLC(plcName, OMRON_Socket, addrSet_OMRON, _as)
            {
                ENABLE_TAGLIST = true
            };

            tagsList = new TagsList();
            tagsList.Add_AddrSet_0_6(addrSet_OMRON);
            tagsList.Add_AddrSet_7_13(addrSet_OMRON);
            tagsList.Add_AddrSet_14_22(addrSet_OMRON);
        }

        public static void inizialize_RottameInterno(ApplicationState _as, string plcName, string ipAddress, int port)
        {
            addrSet_S7 = new AddrSetInterface(plcName);

            //P0-DB20
            addrSet_S7.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 52, ISO_on_TCP_DB_Num = 20 }, 52);
            //P1-DB22
            addrSet_S7.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 52, ISO_on_TCP_DB_Num = 22 }, 52);
            //P2-DB23
            addrSet_S7.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 26, ISO_on_TCP_DB_Num = 23 }, 26);
            //P3-DB24
            addrSet_S7.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 26, ISO_on_TCP_DB_Num = 24 }, 26);
            //P4-DB25
            addrSet_S7.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 26, ISO_on_TCP_DB_Num = 25 }, 26);
            //P5-DB26
            addrSet_S7.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 26, ISO_on_TCP_DB_Num = 26 }, 26);
            //P6-DB27
            addrSet_S7.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 52, ISO_on_TCP_DB_Num = 27 }, 52);
            //P7-DB28
            addrSet_S7.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 312, ISO_on_TCP_DB_Num = 28 }, 312);
            //P8-DB29
            addrSet_S7.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 52, ISO_on_TCP_DB_Num = 29 }, 52);
            //P9-DB100
            addrSet_S7.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 2, ISO_on_TCP_DB_Num = 100 }, 2);
            //P10-DB101
            addrSet_S7.AddToList(new AddressInterface() { ISO_on_TCP_DB_Addr = 0, ISO_on_TCP_DB_Len = 10, ISO_on_TCP_DB_Num = 101 }, 10);

            addrSetList.Add(addrSet_S7);

            iso_on_tcp_S7 = new ISO_on_TCPSocket(plcName, ipAddress);

            PLC_LIST.Add(iso_on_tcp_S7);

            S7 = new CommunicationPLC(plcName, iso_on_tcp_S7, addrSet_S7, _as)
            {
                ENABLE_TAGLIST = true
            };

            tagsList.Add_AddrSet_RottameInterno_0_5(addrSet_S7);
            tagsList.Add_AddrSet_RottameInterno_6_10(addrSet_S7);
        }

        public static void inizialize_Elettrofiltro(ApplicationState _as, string plcName, string ipAddress, int port)
        {
            addrSet_MOXA = new AddrSetInterface(plcName);

            //P0
            addrSet_MOXA.AddToList(new AddressInterface() { M_ID_SLAVE = 1, M_R_CODE = 3, M_W_CODE = 16, M_ADDRESS = 32, M_BYTE = 2 }, 2);
            //P1
            addrSet_MOXA.AddToList(new AddressInterface() { M_ID_SLAVE = 1, M_R_CODE = 4, M_W_CODE = 16, M_ADDRESS = 48, M_BYTE = 2 }, 2);

            addrSetList.Add(addrSet_MOXA);

            modbus_MOXA = new ModbusSocket(plcName, ipAddress, System.Diagnostics.Debugger.IsAttached ? 502 : port);

            PLC_LIST.Add(modbus_MOXA);

            MOXA = new CommunicationPLC(plcName, modbus_MOXA, addrSet_MOXA, _as)
            {
                ENABLE_TAGLIST = true

            };

            tagsList.Add_AddrSet_RottameInterno_6_10(addrSet_MOXA);
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
                    if (plc.Name.ToLower().Equals(MyApp.PLC_NAME_OMRON.ToLower())) inizialize_OMRON(_as, plc.Name, plc.IpAddress, plc.Port);
                    if (plc.Name.ToLower().Equals(MyApp.PLC_NAME_S7.ToLower())) inizialize_RottameInterno(_as, plc.Name, plc.IpAddress, plc.Port);
                    if (plc.Name.ToLower().Equals(MyApp.PLC_NAME_MOXA.ToLower())) inizialize_Elettrofiltro(_as, plc.Name, plc.IpAddress, plc.Port);

                }
            }

            WatchDog = new PLC_WatchDog(_as, PLC_LIST, tagsList.list);
        }

        //public static void initialize(ApplicationState _as)
        //{
        //    #region  PLC

        //    PLC_LIST = new List<CommObj>();

        //    addrSetList = new List<AddrSetInterface>();


        //    using (var ctx = ArchivesDbContext.Create(MyApp.ConnectionString))
        //    {
        //        foreach (var plc in ctx.Plcs.Where(x => x.Name.Equals(MyApp.PLC_NAME)))
        //        {
        //            addrSet_OMRON = new AddrSetInterface(plc.Name);

        //            //P0-E1_0_489
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 0, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
        //            //P1-E1_490_523
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 490, FINS_LEN = 68, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 68);
        //            //P2-E1_980_1185
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 980, FINS_LEN = 412, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 412);
        //            //P3-E1_1470_1958
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 1470, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
        //            //P4_E1_1960_1992
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 1960, FINS_LEN = 68, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 68);
        //            //P5_E1_2450_2711
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 2450, FINS_LEN = 524, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 524);
        //            //P6_E1_2940_3429
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 2940, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
        //            //P7_E1_3430_3890
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 3430, FINS_LEN = 926, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 926);
        //            //P8_E1_3920_4408
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 3920, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
        //            //P9_E1_4410_4898
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 4410, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
        //            //P10_E1_4900_5388
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 4900, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
        //            //P11_E1_5390_5878
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 5390, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
        //            //P12_E1_5880_6368
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 5880, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
        //            //P13_E1_6370_6390
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 6370, FINS_LEN = 44, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 44);
        //            //P14_E1_6860_6884
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 6860, FINS_LEN = 56, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 56);
        //            //P15_E1_7350_7358
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 7350, FINS_LEN = 16, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 16);
        //            //P16_E1_7840_7847
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 7840, FINS_LEN = 16, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 16);
        //            //P17_E1_8330_8576
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 8330, FINS_LEN = 494, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 494);
        //            //P18_E1_8820_8971
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 8820, FINS_LEN = 186, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 186);
        //            //P19_E1_9310_9798
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 9310, FINS_LEN = 980, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 980);
        //            //P20_E1_9800_9854
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 9800, FINS_LEN = 24, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 24);
        //            //P21_E1_10290_10778
        //            addrSet_OMRON.AddToList(new AddressInterface() { FINS_ADDRESS = 10290, FINS_LEN = 784, FINS_M_ACCESS = 0x51, FINS_MRC_R = 1, FINS_SRC_R = 1, FINS_MRC_W = 1, FINS_SRC_W = 2 }, 784);

        //            addrSetList.Add(addrSet_OMRON);
                    
        //            OMRON_Socket = new FINS_Socket("OMRON", plc.IpAddress, plc.Port);
        //            PLC_LIST.Add(OMRON_Socket);

        //            OMRON = new CommunicationPLC("OMRON", OMRON_Socket, addrSet_OMRON, _as)
        //            {
        //                ENABLE_TAGLIST = true
        //            };
                    

        //            tagsList = new TagsList();
        //            tagsList.Add_AddrSet_0_6(addrSet_OMRON);
        //            tagsList.Add_AddrSet_7_13(addrSet_OMRON);
        //            tagsList.Add_AddrSet_14_22(addrSet_OMRON);

        //            break;
        //        }
        //    }

        //    #endregion


            //#region Tags

            //#endregion

            //#region Server

            //ServerRiviello = new CommunicationServer(Properties.Settings.Default.IP_ComServer,
            //    Properties.Settings.Default.PORT_ComServer, "ServerRiviello", tagsList.list, FIRE_EVENTS.Tag_List_Event, addrSet_FTV077.DataListPLC.Count);

            //#endregion

        //    WatchDog = new PLC_WatchDog(_as, PLC_LIST, tagsList.list);

        //}


        public static void destroy()
        {
            //COMMENTATO: 28/10/2016
            //Properties.Settings.Default.IP_PLC1 = modbus_FTV077.HOST_IP;
                     
           
            WatchDog.destroy();

            OMRON.destroy();

            S7.destroy();

        }

    }
}

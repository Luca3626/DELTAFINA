using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections.ObjectModel;
using System.ServiceModel;
using IMET_2_Server.Devices;
using SQLCommLib;

namespace CommunicationLib
{
    /// <summary>
    /// Classe che implementa IProxy per la comunicazione Client-Server
    /// </summary>
    [ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Multiple, InstanceContextMode = InstanceContextMode.Single, UseSynchronizationContext = true)]
    public class Proxy: IProxy
    {

        public delegate void ChangedEventHandler(object sender, EventArgs e);
        public event ChangedEventHandler RefreshRequest;
        public event ChangedEventHandler StartCommessaRequest;
        private ObservableCollection<Tags> TagsList;

        /// <summary>
        /// Dizionario dei clienti attualmente connessi al server
        /// </summary>
        public Dictionary<IProxyClient, Client> _clients;
        public ObservableCollection<Client> actClients;

        public delegate void workCompleted();
        public workCompleted thisWork;

        private Client clientToDele;

        private int NumOfPackets;

        #region COSTRUTTORE

        public Proxy(ObservableCollection<Tags> TagsList,int NumOfPackets)
        {
            this.TagsList = TagsList;
            this.NumOfPackets = NumOfPackets;
            _clients = new Dictionary<IProxyClient, Client>();
            actClients = new ObservableCollection<Client>();
            thisWork = new workCompleted(workCompletedMethod);

            //COMMENTATO: 25/10/2016
            //IMET_2_Server.GestioneAllarmi.Allarmi.NewAlarm+=new IMET_2_Server.GestioneAllarmi.Allarmi.ChangedEventHandler(Allarmi_NewAlarm);
            //IMET_2_Server.GestioneAllarmi.Allarmi.NewAlarmSound += new IMET_2_Server.GestioneAllarmi.Allarmi.ChangedEventHandler(Allarmi_NewAlarmSound);
           
            //IMET_2_Server.RegThrds.DataLogThrd.NewDataS1 += new IMET_2_Server.RegThrds.DataLogThrd.ChangedEventHandler(_DataLogThrd_NewDataS1);
            //IMET_2_Server.RegThrds.DataLogThrd.NewDataS2 += new IMET_2_Server.RegThrds.DataLogThrd.ChangedEventHandler(_DataLogThrd_NewDataS2);
            //IMET_2_Server.RegThrds.GestioneLottiCasse.NewData += new IMET_2_Server.RegThrds.GestioneLottiCasse.ChangedEventHandler(g_LottiCasse_NewData);
            //IMET_2_Server.RegThrds.GestioneLottiSilos.NewData += new IMET_2_Server.RegThrds.GestioneLottiSilos.ChangedEventHandler(g_LottiSilos_NewData);
        }

        #endregion

        #region eventi da gestire

        void Allarmi_NewAlarmSound(object sender, EventArgs e)
        {
            Client c;
            List<IProxyClient> removeThis = new List<IProxyClient>();
            if (_clients.Count != 0)
            {

                foreach (var connection in _clients.Keys)
                {
                    try
                    {
                        connection.refreshAlarmsSound();
                    }
                    catch (Exception)
                    {
                        //Cliente non piu connesso
                        removeThis.Add(connection);
                    }
                }
                foreach (var rem in removeThis)
                {
                    c = _clients[rem];
                    _clients.Remove(rem);
                    clientToDele = c;
                    thisWork.Invoke();
                }
            }
        }

        public void workCompletedMethod()
        {
            if (clientToDele != null)
            {
                try
                {
                    actClients.Remove(clientToDele);
                    clientToDele = null;
                }
                catch
                {
                }
                if (RefreshRequest != null)
                {
                    RefreshRequest(this, new EventArgs());
                }
            }
            //System.Diagnostics.Debug.WriteLine("Client Rimossi");
        }

        void Allarmi_NewAlarm(object sender, EventArgs e)
        {
            Client c;
            List<IProxyClient> removeThis = new List<IProxyClient>();
            if (_clients.Count != 0)
            {

                foreach (var connection in _clients.Keys)
                {
                    try
                    {
                        connection.refreshAlarms();
                    }
                    catch (Exception)
                    {
                        //Cliente non piu connesso
                        removeThis.Add(connection);
                    }
                }
                foreach (var rem in removeThis)
                {
                    c = _clients[rem];
                    _clients.Remove(rem);
                    clientToDele = c;
                    thisWork.Invoke();
                }
            }
        }

        void DosaggioThrd_NewData(object sender, EventArgs e)
        {
            
            Client c;
            List<IProxyClient> removeThis = new List<IProxyClient>();
            if (_clients.Count != 0)
            {

                foreach (var connection in _clients.Keys)
                {
                    try
                    {
                        connection.refreshDosaggio();
                    }
                    catch (Exception)
                    {
                        //Cliente non piu connesso
                        removeThis.Add(connection);
                    }
                }
                foreach (var rem in removeThis)
                {
                    c = _clients[rem];
                    _clients.Remove(rem);
                    clientToDele = c;
                    thisWork.Invoke();
                }
            }
        }        

        

        #endregion

        public void Login(string ClientID)
        {
            var connection = OperationContext.Current.GetCallbackChannel<IProxyClient>();
            var client = new Client { ClientID=ClientID,FirstConnection=DateTime.Now,FirstConnectionStr=DateTime.Now.ToString(),KeepAlive=0 };
            if (!_clients.ContainsKey(connection) )
            {
                // NEW *******************************************************************************************
                Dictionary<IProxyClient, Client> clientToDeleteList = new Dictionary<IProxyClient, Client>();
                foreach (var c in _clients)
                {
                    if (c.Value.ClientID.Equals(client.ClientID))
                        clientToDeleteList.Add(c.Key, c.Value);
                }
                foreach (var cToDel in clientToDeleteList)
                {
                    Client clientToDelete = _clients[cToDel.Key];
                    _clients.Remove(cToDel.Key);
                    clientToDele = clientToDelete;
                    thisWork.Invoke();
                }
                // END NEW ***************************************************************************************

                _clients[connection] = client;
                actClients.Add(client);
                //autoSendTags(TagsList);
                try
                {
                    connection.refreshAlarms();
                }
                catch
                {
                }
            }
            //System.Diagnostics.Debug.WriteLine("LOGIN "+ClientID+ " "+connection);
        }
        
        public void Logout()
        {
            var connection = OperationContext.Current.GetCallbackChannel<IProxyClient>();
            Client c = _clients[connection];
            _clients.Remove(connection);
            actClients.Remove(c);
            if (RefreshRequest != null)
            {
                RefreshRequest(this, new EventArgs());
            }
            //System.Diagnostics.Debug.WriteLine("LOGOUT " + c.ClientID);
        }
        
        public void KeepAlive(int keepAlive)
        {
            var connection = OperationContext.Current.GetCallbackChannel<IProxyClient>();
            Client client=null;
            if (_clients.ContainsKey(connection))
            {
                try
                {
                    _clients.TryGetValue(connection, out client);
                    client.KeepAlive = keepAlive;
                }
                catch
                {
                }
            }
            /*if (client != null)
            {

                System.Diagnostics.Debug.WriteLine("Keep Alive " + client.ClientID + " " + connection);
            }
            else
                System.Diagnostics.Debug.WriteLine("Keep Alive ERRORE");
        */
        }

        public int GetNumOfPackets()
        {
            return NumOfPackets;
        }

        public ObservableCollection<Client> GetConnectedClients()
        {
            return actClients;
        }

        public List<KeyValuePair<int, object>> GetTagsOfPacket(int NumOfPacket)
        {
            List<KeyValuePair<int, object>> list = new List<KeyValuePair<int, object>>();            
            //ObservableCollection<Tags> listTags = new ObservableCollection<Tags>(TagsList.Where(x => x.SEQUENCE == NumOfPacket));
            //foreach (Tags t in listTags)
            //{
            //    if (t.CLIENT_VISIBLE)
            //        list.Add(new KeyValuePair<int, object>(t.ID, t.VALUE));
            //}
            return list;
        }
      
        public List<KeyValuePair<int, object>> GetTags(List<int> tags)
        {
            List<KeyValuePair<int, object>> list = new List<KeyValuePair<int, object>>();
            Tags tag = null;
            foreach (int i in tags)
            {
                tag = TagsList.FirstOrDefault(x => x.ID == i);
                if (tag != null)
                {
                    if(tag.CLIENT_VISIBLE)
                        list.Add(new KeyValuePair<int, object>(tag.ID, tag.VALUE));
                }
            }
            return list;

        }
       
        public int SetTags(List<KeyValuePair<int, object>> tags)
        {
            List<KeyValuePair<int, object>> list = new List<KeyValuePair<int, object>>();
            var connection = OperationContext.Current.GetCallbackChannel<IProxyClient>();
            Tags sTag;
            foreach (KeyValuePair<int, object> tag in tags)
            {
                sTag = TagsList.FirstOrDefault(z => z.ID == tag.Key);
                if (sTag != null)
                {
                    if (sTag.CLIENT_VISIBLE)
                    {
                        sTag.VALUE = tag.Value;
                        list.Add(new KeyValuePair<int, object>(sTag.ID, sTag.VALUE));
                    }
                }
            }
            connection.ReceiveTags(list);
            return 0;
        }

        public void autoSendTags(ObservableCollection<Tags> _TagsList)
        {
            List<IProxyClient> removeThis = new List<IProxyClient>();
            Client c=null;
            if (_clients.Count != 0)
            {
                List<KeyValuePair<int, object>> list = new List<KeyValuePair<int, object>>();
                foreach (Tags s in _TagsList)
                {

                    if(s.CLIENT_VISIBLE)
                        list.Add(new KeyValuePair<int, object>(s.ID, s.VALUE));
                }
                foreach (var connection in _clients.Keys)
                {

                    try
                    {
                        connection.ReceiveTags(list);
                    }
                    catch(Exception)
                    {
                        //Cliente non piu connesso
                        //_clients.Remove(connection);
                        removeThis.Add(connection);
                    }
                }
                if (clientToDele != null)
                {

                    thisWork.Invoke();

                }
                else
                {
                    foreach (var rem in removeThis)
                    {
                        c = _clients[rem];
                        _clients.Remove(rem);
                        clientToDele = c;
                        thisWork.Invoke();


                    }
                }
            }
            /*if (c != null)
                System.Diagnostics.Debug.WriteLine("Send Tags " + c.ClientID);
            else
                System.Diagnostics.Debug.WriteLine("Send Tags ERRORE");
        */
        }


        //public List<PLC_CommState> getPLCState()
        //{

        //    return IMET_2_Server.Core.CommunicationRiviello.WatchDog.PLC_STATE;
        //}

        public void setAlarmsSettings()
        {
            System.Diagnostics.Debug.WriteLine("Proxy setAlarmsSettings non implementato");
           
        }

        public void clearAlarms()
        {
            Allarmi_NewAlarm(this, new EventArgs());
        }

        public void StartCommessa(int CommessaID, int RicettaID)
        {
            
            if (StartCommessaRequest != null)
            {
                StartCommessaRequest(new StartCommessaOBJ()
                {
                    CommessaID=CommessaID,
                    RicettaID=RicettaID
                }, new EventArgs());
            }
        }

        public void ResetPLC(int plantID)
        {
            switch (plantID)
            {
                //1
                case 1:
                    DevicesInitPlantImpianto1.Impianto1Plant.CMD_RSET_PLC = 1;
                    break;
                //2
                case 2:
                    DevicesInitPlantRiviello.RivielloPlant.CMD_RSET_PLC = 1;
                    break;
                //3
                case 3:
                    DevicesInitPlantRussillo.RussilloPlant.CMD_RSET_PLC = 1;
                    break;
                //4
                case 4:
                    DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.CMD_RSET_PLC = 1;
                    break;
                //5
                case 5:
                    DevicesInitPlantCandile.CandilePlant.CMD_RSET_PLC = 1;
                    break;
                //6
                case 6:
                    DevicesInitPlantChieti.ChietiPlant.CMD_RSET_PLC = 1;
                    break;
                //7
                case 7:
                    DevicesInitPlantCastria.CastriaPlant.CMD_RSET_PLC = 1;
                    break;
                //8
                case 8:
                    DevicesInitPlantFossacesia.FossacesiaPlant.CMD_RSET_PLC = 1;
                    break;
                //9
                case 9:
                    DevicesInitPlantNovoli2.Novoli2Plant.CMD_RSET_PLC = 1;
                    break;
            }
        }

        public string[] returnHalfValuesForStringBoxes(int plantID)
        {
            switch (plantID)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                        return DevicesInitPlantImpianto1.Impianto1Plant.returnHalfStringBoxValue();
                    else
                        return new string[0];
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                        return DevicesInitPlantRiviello.RivielloPlant.returnHalfStringBoxValue();
                    else
                        return new string[0];
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                        return DevicesInitPlantRussillo.RussilloPlant.returnHalfStringBoxValue();
                    else
                        return new string[0];
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                        return DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.returnHalfStringBoxValue();
                    else
                        return new string[0];
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                        return DevicesInitPlantCandile.CandilePlant.returnHalfStringBoxValue();
                    else
                        return new string[0];
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                        return DevicesInitPlantChieti.ChietiPlant.returnHalfStringBoxValue();
                    else
                        return new string[0];
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                        return DevicesInitPlantCastria.CastriaPlant.returnHalfStringBoxValue();
                    else
                        return new string[0];
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                        return DevicesInitPlantFossacesia.FossacesiaPlant.returnHalfStringBoxValue();
                    else
                        return new string[0];
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                        return DevicesInitPlantNovoli2.Novoli2Plant.returnHalfStringBoxValue();
                    else
                        return new string[0];
                ////10
                //case 10:
                //    if (Impianto10.isEnabled == 1)
                //        return Impianto10.returnHalfStringBoxValue(radiceToPLC);
                //    else
                //        return new string[0];
                ////11
                //case 11:
                //    if (Impianto11.isEnabled == 1)
                //        return Impianto11.returnHalfStringBoxValue(radiceToPLC);
                //    else
                //        return new string[0];
                ////12
                //case 12:
                //    if (Impianto12.isEnabled == 1)
                //        return Impianto12.returnHalfStringBoxValue(radiceToPLC);
                //    else
                //        return new string[0];
                default: return new string[0];
            }

        }

        public string[] returnHalfValuesForInverters(int plantID)
        {
            switch (plantID)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                        return DevicesInitPlantImpianto1.Impianto1Plant.returnHalfInverterValue();
                    else
                        return new string[0];
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                        return DevicesInitPlantRiviello.RivielloPlant.returnHalfInverterValue();
                    else
                        return new string[0];
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                        return DevicesInitPlantRussillo.RussilloPlant.returnHalfInverterValue();
                    else
                        return new string[0];
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                        return DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.returnHalfInverterValue();
                    else
                        return new string[0];
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                        return DevicesInitPlantCandile.CandilePlant.returnHalfInverterValue();
                    else
                        return new string[0];
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                        return DevicesInitPlantChieti.ChietiPlant.returnHalfInverterValue();
                    else
                        return new string[0];
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                        return DevicesInitPlantCastria.CastriaPlant.returnHalfInverterValue();
                    else
                        return new string[0];
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                        return DevicesInitPlantFossacesia.FossacesiaPlant.returnHalfInverterValue();
                    else
                        return new string[0];
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                        return DevicesInitPlantNovoli2.Novoli2Plant.returnHalfInverterValue();
                    else
                        return new string[0];
                ////10
                //case 10:
                //    if (Impianto10.isEnabled == 1)
                //        return Impianto10.returnHalfInverterValue(radiceToPLC);
                //    else
                //        return new string[0];
                ////11
                //case 11:
                //    if (Impianto11.isEnabled == 1)
                //        return Impianto11.returnHalfInverterValue(radiceToPLC);
                //    else
                //        return new string[0];
                ////12
                //case 12:
                //    if (Impianto12.isEnabled == 1)
                //        return Impianto12.returnHalfInverterValue(radiceToPLC);
                //    else
                //        return new string[0];

                default: return new string[0];
            }

        }

        public string returnValuesForContatore(int plantID, string cnt_ID, int withKOrNot)
        {
            switch (plantID)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                        return DevicesInitPlantImpianto1.Impianto1Plant.returnContatoreValues(cnt_ID, withKOrNot);
                    else
                        return "";
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                        return DevicesInitPlantRiviello.RivielloPlant.returnContatoreValues(cnt_ID, withKOrNot);
                    else
                        return "";
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                        return DevicesInitPlantRussillo.RussilloPlant.returnContatoreValues(cnt_ID, withKOrNot);
                    else
                        return "";
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                        return DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.returnContatoreValues(cnt_ID, withKOrNot);
                    else
                        return "";
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                        return DevicesInitPlantCandile.CandilePlant.returnContatoreValues(cnt_ID, withKOrNot);
                    else
                        return "";
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                        return DevicesInitPlantChieti.ChietiPlant.returnContatoreValues(cnt_ID, withKOrNot);
                    else
                        return "";
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                        return DevicesInitPlantCastria.CastriaPlant.returnContatoreValues(cnt_ID, withKOrNot);
                    else
                        return "";
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                        return DevicesInitPlantFossacesia.FossacesiaPlant.returnContatoreValues(cnt_ID, withKOrNot);
                    else
                        return "";
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                        return DevicesInitPlantNovoli2.Novoli2Plant.returnContatoreValues(cnt_ID, withKOrNot);
                    else
                        return "";
                ////10
                //case 10:
                //    if (Impianto10.isEnabled == 1)
                //        return Impianto10.returnContatoreValues(cnt_ID, withKOrNot);
                //    else
                //        return "";
                ////11
                //case 11:
                //    if (Impianto11.isEnabled == 1)
                //        return Impianto11.returnContatoreValues(cnt_ID, withKOrNot);
                //    else
                //        return "";
                ////12
                //case 12:
                //    if (Impianto12.isEnabled == 1)
                //        return Impianto12.returnContatoreValues(cnt_ID, withKOrNot);
                //    else
                //        return "";
                default: return "";
            }
        }

        //public object[] getDigitSettingsPLC(int plantID)
        //{
        //    switch (plantID)
        //    {
        //        //1
        //        case 1:
        //            if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
        //                return DevicesInitPlantImpianto1.Impianto1Plant.getDigitSettingsPLC();
        //            else
        //                return null;
        //        //2
        //        case 2:
        //            if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
        //                return DevicesInitPlantRiviello.RivielloPlant.getDigitSettingsPLC();
        //            else
        //                return null;
        //        ////3
        //        //case 3:
        //        //    if (Impianto3.isEnabled == 1)
        //        //        return Impianto3.getDigitSettingsPLC();
        //        //    else
        //        //        return null;
        //        ////4
        //        //case 4:
        //        //    if (Impianto4.isEnabled == 1)
        //        //        return Impianto4.getDigitSettingsPLC();
        //        //    else
        //        //        return null;
        //        ////5
        //        //case 5:
        //        //    if (Impianto5.isEnabled == 1)
        //        //        return Impianto5.getDigitSettingsPLC();
        //        //    else
        //        //        return null;
        //        ////6
        //        //case 6:
        //        //    if (Impianto6.isEnabled == 1)
        //        //        return Impianto6.getDigitSettingsPLC();
        //        //    else
        //        //        return null;
        //        ////7
        //        //case 7:
        //        //    if (Impianto7.isEnabled == 1)
        //        //        return Impianto7.getDigitSettingsPLC();
        //        //    else
        //        //        return null;
        //        ////8
        //        //case 8:
        //        //    if (Impianto8.isEnabled == 1)
        //        //        return Impianto8.getDigitSettingsPLC();
        //        //    else
        //        //        return null;
        //        ////9
        //        //case 9:
        //        //    if (Impianto9.isEnabled == 1)
        //        //        return Impianto9.getDigitSettingsPLC();
        //        //    else
        //        //        return null;
        //        ////10
        //        //case 10:
        //        //    if (Impianto10.isEnabled == 1)
        //        //        return Impianto10.getDigitSettingsPLC();
        //        //    else
        //        //        return null;
        //        ////11
        //        //case 11:
        //        //    if (Impianto11.isEnabled == 1)
        //        //        return Impianto11.getDigitSettingsPLC();
        //        //    else
        //        //        return null;
        //        ////12
        //        //case 12:
        //        //    if (Impianto12.isEnabled == 1)
        //        //        return Impianto12.getDigitSettingsPLC();
        //        //    else
        //        //        return null;
        //        default:
        //            return null;
        //    }
        //}

        public void setDigitSettingsPLC(int plantID, bool[] isPosLogic, bool[] generaAlarm, bool notifyPLC)
        {
            switch (plantID)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                        DevicesInitPlantImpianto1.Impianto1Plant.setDigitSettingsPLC(isPosLogic, generaAlarm, notifyPLC);
                    break;
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                        DevicesInitPlantRiviello.RivielloPlant.setDigitSettingsPLC(isPosLogic, generaAlarm, notifyPLC);
                    break;
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                        DevicesInitPlantRussillo.RussilloPlant.setDigitSettingsPLC(isPosLogic, generaAlarm, notifyPLC);
                    break;
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                        DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.setDigitSettingsPLC(isPosLogic, generaAlarm, notifyPLC);
                    break;
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                        DevicesInitPlantCandile.CandilePlant.setDigitSettingsPLC(isPosLogic, generaAlarm, notifyPLC);
                    break;
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                        DevicesInitPlantChieti.ChietiPlant.setDigitSettingsPLC(isPosLogic, generaAlarm, notifyPLC);
                    break;
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                        DevicesInitPlantCastria.CastriaPlant.setDigitSettingsPLC(isPosLogic, generaAlarm, notifyPLC);
                    break;
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                        DevicesInitPlantFossacesia.FossacesiaPlant.setDigitSettingsPLC(isPosLogic, generaAlarm, notifyPLC);
                    break;
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                        DevicesInitPlantNovoli2.Novoli2Plant.setDigitSettingsPLC(isPosLogic, generaAlarm, notifyPLC);
                    break;
                ////10
                //case 10:
                //    if (Impianto10.isEnabled == 1)
                //        Impianto10.setDigitSettingsPLC(isPosLogic, notifyPLC);
                //    break;
                ////11
                //case 11:
                //    if (Impianto11.isEnabled == 1)
                //        Impianto11.setDigitSettingsPLC(isPosLogic, notifyPLC);
                //    break;
                ////12
                //case 12:
                //    if (Impianto12.isEnabled == 1)
                //        Impianto12.setDigitSettingsPLC(isPosLogic, notifyPLC);
                //    break;
            }
        }

        public void setDigitalOutput(int plantID, int numDigit)
        {
            switch (plantID)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                        DevicesInitPlantImpianto1.Impianto1Plant.setNewDigiOutputVal(numDigit);
                    break;
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                        DevicesInitPlantRiviello.RivielloPlant.setNewDigiOutputVal(numDigit);
                    break;
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                        DevicesInitPlantRussillo.RussilloPlant.setNewDigiOutputVal(numDigit);
                    break;
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                        DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.setNewDigiOutputVal(numDigit);
                    break;
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                        DevicesInitPlantCandile.CandilePlant.setNewDigiOutputVal(numDigit);
                    break;
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                        DevicesInitPlantChieti.ChietiPlant.setNewDigiOutputVal(numDigit);
                    break;
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                        DevicesInitPlantCastria.CastriaPlant.setNewDigiOutputVal(numDigit);
                    break;
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                        DevicesInitPlantFossacesia.FossacesiaPlant.setNewDigiOutputVal(numDigit);
                    break;
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                        DevicesInitPlantNovoli2.Novoli2Plant.setNewDigiOutputVal(numDigit);
                    break;
                ////10
                //case 10:
                //    if (Impianto10.isEnabled == 1)
                //        Impianto10.setNewDigiOutputVal(numDigit);
                //    break;
                ////11
                //case 11:
                //    if (Impianto11.isEnabled == 1)
                //        Impianto11.setNewDigiOutputVal(numDigit);
                //    break;
                ////12
                //case 12:
                //    if (Impianto12.isEnabled == 1)
                //        Impianto12.setNewDigiOutputVal(numDigit);
                //    break;
            }
        }

        public object[] returnPlantValForImpianto(int plantID)
        {
            switch (plantID)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                        return DevicesInitPlantImpianto1.Impianto1Plant.returnValuesForImpianto();
                    else
                        return new object[0];
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                        return DevicesInitPlantRiviello.RivielloPlant.returnValuesForImpianto();
                    else
                        return new object[0];
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                        return DevicesInitPlantRussillo.RussilloPlant.returnValuesForImpianto();
                    else
                        return new object[0];
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                        return DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.returnValuesForImpianto();
                    else
                        return new object[0];
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                        return DevicesInitPlantCandile.CandilePlant.returnValuesForImpianto();
                    else
                        return new object[0];
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                        return DevicesInitPlantChieti.ChietiPlant.returnValuesForImpianto();
                    else
                        return new object[0];
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                        return DevicesInitPlantCastria.CastriaPlant.returnValuesForImpianto();
                    else
                        return new object[0];
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                        return DevicesInitPlantFossacesia.FossacesiaPlant.returnValuesForImpianto();
                    else
                        return new object[0];
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                        return DevicesInitPlantNovoli2.Novoli2Plant.returnValuesForImpianto();
                    else
                        return new object[0];

                default:
                    return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
            }
        }

        public object[] returnPlantValForHome(int plantID)
        {
            switch (plantID)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                        return DevicesInitPlantImpianto1.Impianto1Plant.returnValuesForHome();
                    else
                        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                        return DevicesInitPlantRiviello.RivielloPlant.returnValuesForHome();
                    else
                        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                        return DevicesInitPlantRussillo.RussilloPlant.returnValuesForHome();
                    else
                        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                        return DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.returnValuesForHome();
                    else
                        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                        return DevicesInitPlantCandile.CandilePlant.returnValuesForHome();
                    else
                        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                        return DevicesInitPlantChieti.ChietiPlant.returnValuesForHome();
                    else
                        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                        return DevicesInitPlantCastria.CastriaPlant.returnValuesForHome();
                    else
                        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                        return DevicesInitPlantFossacesia.FossacesiaPlant.returnValuesForHome();
                    else
                        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                        return DevicesInitPlantNovoli2.Novoli2Plant.returnValuesForHome();
                    else
                        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                ////10
                //case 10:
                //    if (Impianto10.isEnabled == 1)
                //        return Impianto10.returnValuesForHome();
                //    else
                //        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                ////11
                //case 11:
                //    if (Impianto11.isEnabled == 1)
                //        return Impianto11.returnValuesForHome();
                //    else
                //        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                ////12
                //case 12:
                //    if (Impianto12.isEnabled == 1)
                //        return Impianto12.returnValuesForHome();
                //    else
                //        return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
                default:
                    return new object[] { 0, "", 0, 0, 0, 0, 0, 0, 0 };
            }
        }

        public void setAnalogSettingsPLC(int plantID, bool existSbIrr1, bool existSbIrr2, bool existSbTemp1, bool existSbTemp2, int idSbIrr1, int idSbIrr2, int idSbTemp1, int idSbTemp2, bool notifyPLC)
        {
            switch (plantID)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                        DevicesInitPlantImpianto1.Impianto1Plant.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                    break;
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                        DevicesInitPlantRiviello.RivielloPlant.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                    break;
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                        DevicesInitPlantRussillo.RussilloPlant.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                    break;
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                        DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                    break;
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                        DevicesInitPlantCandile.CandilePlant.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                    break;
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                        DevicesInitPlantChieti.ChietiPlant.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                    break;
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                        DevicesInitPlantCastria.CastriaPlant.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                    break;
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                        DevicesInitPlantFossacesia.FossacesiaPlant.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                    break;
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                        DevicesInitPlantNovoli2.Novoli2Plant.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                    break;
                ////10
                //case 10:
                //    if (Impianto10.isEnabled == 1)
                //        Impianto10.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                //    break;
                ////11
                //case 11:
                //    if (Impianto11.isEnabled == 1)
                //        Impianto11.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                //    break;
                ////12
                //case 12:
                //    if (Impianto12.isEnabled == 1)
                //        Impianto12.setAnalogSettingsPLC(existSbIrr1, existSbIrr2, existSbTemp1, existSbTemp2, idSbIrr1, idSbIrr2, idSbTemp1, idSbTemp2, notifyPLC);
                //    break;
            }
        }

        public void updateImpiantoVals(int id)
        {
            SQLServerConnection conSql = new SQLServerConnection();
            conSql.open(IMET_2_Server.Properties.Settings.Default.ConStr);
            switch (id)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                    {
                        DevicesInitPlantImpianto1.Impianto1Plant.updateImpiantoVals(conSql);

                    }
                    break;
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                    {

                        DevicesInitPlantRiviello.RivielloPlant.updateImpiantoVals(conSql);
                    }
                    break;
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                    {

                        DevicesInitPlantRussillo.RussilloPlant.updateImpiantoVals(conSql);
                    }
                    break;
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                    {

                        DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.updateImpiantoVals(conSql);
                    }
                    break;
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                    {

                        DevicesInitPlantCandile.CandilePlant.updateImpiantoVals(conSql);
                    }
                    break;
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                    {

                        DevicesInitPlantChieti.ChietiPlant.updateImpiantoVals(conSql);
                    }
                    break;
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                    {

                        DevicesInitPlantCastria.CastriaPlant.updateImpiantoVals(conSql);
                    }
                    break;
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                    {

                        DevicesInitPlantFossacesia.FossacesiaPlant.updateImpiantoVals(conSql);
                    }
                    break;
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                    {

                        DevicesInitPlantNovoli2.Novoli2Plant.updateImpiantoVals(conSql);
                    }
                    break;
                ////10
                //case 10:
                //    if (Impianto10.isEnabled == 1)
                //    {

                //        Impianto10.updateImpiantoVals(conSql);
                //    }
                //    break;
                ////11
                //case 11:
                //    if (Impianto11.isEnabled == 1)
                //    {

                //        Impianto11.updateImpiantoVals(conSql);
                //    }
                //    break;
                ////12
                //case 12:
                //    if (Impianto12.isEnabled == 1)
                //    {

                //        Impianto12.updateImpiantoVals(conSql);
                //    }
                //    break;
            }
            conSql.close();
            conSql = null;
        }


        public string returnValuesForInterfaccia(int plantID)
        {
            switch (plantID)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                        return DevicesInitPlantImpianto1.Impianto1Plant.returnInterfacciaValues();
                    else
                        return "";
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                        return DevicesInitPlantRiviello.RivielloPlant.returnInterfacciaValues();
                    else
                        return "";
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                        return DevicesInitPlantRussillo.RussilloPlant.returnInterfacciaValues();
                    else
                        return "";
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                        return DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.returnInterfacciaValues();
                    else
                        return "";
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                        return DevicesInitPlantCandile.CandilePlant.returnInterfacciaValues();
                    else
                        return "";
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                        return DevicesInitPlantChieti.ChietiPlant.returnInterfacciaValues();
                    else
                        return "";
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                        return DevicesInitPlantCastria.CastriaPlant.returnInterfacciaValues();
                    else
                        return "";
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                        return DevicesInitPlantFossacesia.FossacesiaPlant.returnInterfacciaValues();
                    else
                        return "";
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                        return DevicesInitPlantNovoli2.Novoli2Plant.returnInterfacciaValues();
                    else
                        return "";
                ////10
                //case 10:
                //    if (Impianto10.isEnabled == 1)
                //        return Impianto10.returnInterfacciaValues();
                //    else
                //        return "";
                ////11
                //case 11:
                //    if (Impianto11.isEnabled == 1)
                //        return Impianto11.returnInterfacciaValues();
                //    else
                //        return "";
                ////12
                //case 12:
                //    if (Impianto12.isEnabled == 1)
                //        return Impianto12.returnInterfacciaValues();
                //    else
                //        return "";
                default: return "";
            }
        }
        public object[] returnModuloInverterValues(int plantID, int NumStrBox)
        {
            switch (plantID)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                        return DevicesInitPlantImpianto1.Impianto1Plant.returnInverterValue(NumStrBox);
                    else
                        return new object[0];
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                        return DevicesInitPlantRiviello.RivielloPlant.returnInverterValue(NumStrBox);
                    else
                        return new object[0];
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                        return DevicesInitPlantRussillo.RussilloPlant.returnInverterValue(NumStrBox);
                    else
                        return new object[0];
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                        return DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.returnInverterValue(NumStrBox);
                    else
                        return new object[0];
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                        return DevicesInitPlantCandile.CandilePlant.returnInverterValue(NumStrBox);
                    else
                        return new object[0];
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                        return DevicesInitPlantChieti.ChietiPlant.returnInverterValue(NumStrBox);
                    else
                        return new object[0];
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                        return DevicesInitPlantCastria.CastriaPlant.returnInverterValue(NumStrBox);
                    else
                        return new object[0];
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                        return DevicesInitPlantFossacesia.FossacesiaPlant.returnInverterValue(NumStrBox);
                    else
                        return new object[0];
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                        return DevicesInitPlantNovoli2.Novoli2Plant.returnInverterValue(NumStrBox);
                    else
                        return new object[0];
                ////10
                //case 10:
                //    if (Impianto10.isEnabled == 1)
                //        return Impianto10.returnInverterValue(radiceToPLC, NumStrBox);
                //    else
                //        return new object[0];
                ////11
                //case 11:
                //    if (Impianto11.isEnabled == 1)
                //    {
                //        //if (Impianto11.debugVal)
                //        //{
                //        //    return Impianto11.returnInverterValueDEBUG(radiceToPLC, NumStrBox);
                //        //}
                //        //else
                //        //{
                //        return Impianto11.returnInverterValue(radiceToPLC, NumStrBox);
                //        //}
                //    }
                //    else
                //        return new object[0];
                ////12
                //case 12:
                //    if (Impianto12.isEnabled == 1)
                //    {
                //        return Impianto12.returnInverterValue(radiceToPLC, NumStrBox);
                //    }
                //    else
                //        return new object[0];
                default: return new object[0];
            }
        }

        public string returnValuesForStringBox(int plantID, int NumStrBox)
        {
            switch (plantID)
            {
                //1
                case 1:
                    if (DevicesInitPlantImpianto1.Impianto1Plant.isEnabled == 1)
                        return DevicesInitPlantImpianto1.Impianto1Plant.returnStringBoxValue(NumStrBox);
                    else
                        return "";
                //2
                case 2:
                    if (DevicesInitPlantRiviello.RivielloPlant.isEnabled == 1)
                        return DevicesInitPlantRiviello.RivielloPlant.returnStringBoxValue(NumStrBox);
                    else
                        return "";
                //3
                case 3:
                    if (DevicesInitPlantRussillo.RussilloPlant.isEnabled == 1)
                        return DevicesInitPlantRussillo.RussilloPlant.returnStringBoxValue(NumStrBox);
                    else
                        return "";
                //4
                case 4:
                    if (DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.isEnabled == 1)
                        return DevicesInitPlantCittaDiCastello.CittaDiCastelloPlant.returnStringBoxValue(NumStrBox);
                    else
                        return "";
                //5
                case 5:
                    if (DevicesInitPlantCandile.CandilePlant.isEnabled == 1)
                        return DevicesInitPlantCandile.CandilePlant.returnStringBoxValue(NumStrBox);
                    else
                        return "";
                //6
                case 6:
                    if (DevicesInitPlantChieti.ChietiPlant.isEnabled == 1)
                        return DevicesInitPlantChieti.ChietiPlant.returnStringBoxValue(NumStrBox);
                    else
                        return "";
                //7
                case 7:
                    if (DevicesInitPlantCastria.CastriaPlant.isEnabled == 1)
                        return DevicesInitPlantCastria.CastriaPlant.returnStringBoxValue(NumStrBox);
                    else
                        return "";
                //8
                case 8:
                    if (DevicesInitPlantFossacesia.FossacesiaPlant.isEnabled == 1)
                        return DevicesInitPlantFossacesia.FossacesiaPlant.returnStringBoxValue(NumStrBox);
                    else
                        return "";
                //9
                case 9:
                    if (DevicesInitPlantNovoli2.Novoli2Plant.isEnabled == 1)
                        return DevicesInitPlantNovoli2.Novoli2Plant.returnStringBoxValue(NumStrBox);
                    else
                        return "";
                ////10
                //case 10:
                //    if (Impianto10.isEnabled == 1)
                //        return Impianto10.returnStringBoxValue(radiceToPLC, NumStrBox);
                //    else
                //        return "";
                ////11
                //case 11:
                //    if (Impianto11.isEnabled == 1)
                //        return Impianto11.returnStringBoxValue(radiceToPLC, NumStrBox);
                //    else
                //        return "";
                ////12
                //case 12:
                //    if (Impianto12.isEnabled == 1)
                //        return Impianto12.returnStringBoxValue(radiceToPLC, NumStrBox);
                //    else
                //        return "";
                default: return "";
            }
        }

    }
}

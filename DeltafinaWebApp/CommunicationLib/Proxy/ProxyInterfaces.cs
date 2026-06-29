using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.Runtime.Serialization;
using System.Collections.ObjectModel;

namespace CommunicationLib
{
    /// <summary>
    /// Interfaccia per la comunicazione Client-Server
    /// </summary>
    [ServiceContract(CallbackContract = typeof(IProxyClient))]
    public interface IProxy
    {
        /// <summary>
        /// Il cliente deve effettuare il login altrimenti non verra abilitato l' auto invio dei Tags
        /// </summary>
        /// <param name="ClientID"></param>
        [OperationContract]
        void Login(string clientID);

        /// <summary>
        /// Il cliente deve effettuare il logout dalla Lista dei client connessi(auto invio tags)
        /// </summary>
        [OperationContract]
        void Logout();

        /// <summary>
        /// Strumento per la diagnostica
        /// </summary>
        /// <param name="keepAlive"></param>
        [OperationContract]
        void KeepAlive(int keepAlive);

        /// <summary>
        /// Il cliente richiede il numero di pacchetti
        /// </summary>
        /// <param name="tags"></param>
        /// <returns></returns>
        [OperationContract]
        int GetNumOfPackets();

        /// <summary>
        /// Lista dei client connessi
        /// </summary>
        /// <returns></returns>
        [OperationContract]
        ObservableCollection< Client> GetConnectedClients();

        /// <summary>
        /// Il cliente richiede i tag
        /// </summary>
        /// <param name="tags"></param>
        /// <returns></returns>
        [OperationContract]
        List<KeyValuePair<int, object>> GetTags(List<int> tags);

        /// <summary>
        /// Il cliente richiede i tag del pacchetto
        /// </summary>
        /// <param name="tags"></param>
        /// <returns></returns>
        [OperationContract]
        List<KeyValuePair<int, object>> GetTagsOfPacket(int NumOfPacket);

        /// <summary>
        /// Il cliente scrive i tag
        /// </summary>
        /// <param name="tags"></param>
        /// <returns></returns>
        [OperationContract]
        int SetTags(List<KeyValuePair<int, object>> tags);

        //[OperationContract]
        //List<PLC_CommState> getPLCState();

        [OperationContract]
        void setAlarmsSettings();

        [OperationContract]
        void clearAlarms();

        /// <summary>
        /// Il cliente avvia una nuova commessa
        /// </summary>
        /// <param name="tags"></param>
        /// <returns></returns>
        [OperationContract]
        void StartCommessa(int CommessaID,int RicettaID);

        [OperationContract]
        void ResetPLC(int plantID);

        [OperationContract]
        object[] returnPlantValForHome(int plantID);

        [OperationContract]
        object[] returnPlantValForImpianto(int plantID);

        [OperationContract]
        void setDigitalOutput(int plantID, int numDigit);

        //[OperationContract]
        //object[] getDigitSettingsPLC(int plantID);

        [OperationContract]
        void setDigitSettingsPLC(int plantID, bool[] isPosLogic, bool[] generaAlarm, bool notifyPLC);

        [OperationContract]
        void setAnalogSettingsPLC(int plantID, bool existSbIrr1, bool existSbIrr2, bool existSbTemp1, bool existSbTemp2, int idSbIrr1, int idSbIrr2, int idSbTemp1, int idSbTemp2, bool notifyPLC);

        [OperationContract]
        void updateImpiantoVals(int id);

        [OperationContract]
        string[] returnHalfValuesForInverters(int plantID);

        [OperationContract]
        string[] returnHalfValuesForStringBoxes(int plantID);

        [OperationContract]
        string returnValuesForContatore(int plantID, string cnt_ID, int withKOrNot);

        [OperationContract]
        string returnValuesForInterfaccia(int plantID);

        [OperationContract]
        object[] returnModuloInverterValues(int plantID, int NumInverter);

        [OperationContract]
        string returnValuesForStringBox(int plantID, int NumStrBox);
    }

    /// <summary>
    /// Dati che identificano il Client
    /// </summary>
    [DataContract]
    public class Client : NotificationObject
    {
        [DataMember]
        public string ClientID { get; set; }

        [DataMember]
        public DateTime FirstConnection { get; set; }

        [DataMember]
        public string FirstConnectionStr { get; set; }

        private int keepAlive;
        [DataMember]
        public int KeepAlive
        {
            get { return keepAlive; }
            set
            {
                if (keepAlive != value)
                {
                    keepAlive = value;
                    RaisePropertyChanged(() => KeepAlive);
                }
            }
        }
    }

    /// <summary>
    /// Interfaccia per il metodo di callback del server verso i client
    /// </summary>
    public interface IProxyClient
    {
        /// <summary>
        /// Il cliente riceve i tag su invio del server
        /// </summary>
        /// <param name="tags"></param>
        [OperationContract(IsOneWay = true)]
        void ReceiveTags(List<KeyValuePair<int, object>> tags);

        /// <summary>
        /// Il Client effettua il refresh dei allarmi impianto
        /// </summary>
        [OperationContract(IsOneWay = true)]
        void refreshAlarms();

        /// <summary>
        /// Il Client effettua il refresh dei allarmi impianto
        /// </summary>
        [OperationContract(IsOneWay = true)]
        void refreshDosaggio();

       
        /// <summary>
        /// Il Client effettua il refresh dei allarmi impianto
        /// </summary>
        [OperationContract(IsOneWay = true)]
        void refreshAlarmsSound();
        
    }
}

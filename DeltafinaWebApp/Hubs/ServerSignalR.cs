using CommunicationLib;
using Microsoft.AspNetCore.SignalR;
using Hubs;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Hubs
{

    public enum FIRE_EVENTS
    {
        Tag_Event,
        Broadcast_Event,
        Tag_List_Event
    }

    public class ServerSignalR
    {
        private Task _prodTask;
        CancellationTokenSource canctokenSource;
        CancellationToken ct;

        static IHubContext<NotificationHub> _hubContext;


        static ObservableCollection<Tags> TagsList;



        public ServerSignalR(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;

            TagsList = new ObservableCollection<Tags>(Core.Communication.tagsList.list);//lista completa

            //Collego evento richiesta lista tag Tag_LIst_Event 
            CommunicationPLC.TagListRequest += new CommunicationPLC.ChangedEventHandler(CommunicationPLC_TagListRequest);

            //Collego evento richiesta invio singolo tag
            if (TagsList != null)
            {
                foreach (Tags tag in TagsList)
                {
                    if (tag is TagsServer)
                        tag.SendRequest += new Tags.ChangedEventHandler(Tags_SendRequest);
                }
            }                       

            canctokenSource = new CancellationTokenSource();
            ct = canctokenSource.Token;
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

        public static void ServerSendTags(ObservableCollection<Tags> _TagsList)
        {
            try
            {
                _hubContext.Clients.All.SendAsync("SendMessage",
                    _TagsList.Select(x => new
                    {
                        x.ID,
                        x.NAME,
                        x.VALUE,
                        x.ADDRESS,
                        x.PLC_NAME,
                        x.SEQUENCE,
                        x.NEW_DATA,
                        x.DATE,
                        x.TIME_SPAN,
                        x.CLIENT_VISIBLE,
                        x.RETAIN,
                        x.GET_RETAIN
                    }));

            }
            catch
            {
            }
        }

        void Tags_SendRequest(object sender, EventArgs e)
        {
            ObservableCollection<Tags> _TagsToSend = new ObservableCollection<Tags>();
            KeyValuePair<string, object> req = (KeyValuePair<string, object>)sender;
            Tags tag = TagsList.FirstOrDefault(x => x.NAME == req.Key);
            if (tag != null)
            {
                _TagsToSend.Add(tag);
                ServerSendTags(_TagsToSend);
            }
        }

        public static int GetPacketsCount(string plcName)
        {
            int rValue = 0;

            foreach (var item in Core.Communication.addrSetList)
            {
                if (item.Name.Equals(plcName))
                {
                    rValue = item.AddrList.Count;
                    break;
                }
                //if (item.Name.Equals(plcName))
                //{
                //    rValue = Core.Communication.addrSet_PM583_CT.AddrList.Count;
                //    break;
                //}
            }
            //foreach (var item in Core.Communication.addrSetList)
            //{
            //    if (item.Name.Equals(plcName))
            //    {
            //        rValue = Core.Communication.addrSet_OMRON.AddrList.Count;
            //        break;
            //    }
            //}

            return rValue;
        }

        public static IEnumerable<object> GetTagsOfPacket(string plcName, int NumOfPacket)
        {
            //List<Tags> tagsNull = TagsList.Where(x => x.PLC_NAME == null).ToList();

            ObservableCollection<Tags> _TagsToSend = new ObservableCollection<Tags>(TagsList.Where(x => x.PLC_NAME.Equals(plcName) & x.SEQUENCE == NumOfPacket));

            if (_TagsToSend?.Count > 0)
            {
                return _TagsToSend.Select(x => new
                {
                    x.ID,
                    x.NAME,
                    x.VALUE,
                    x.ADDRESS,
                    x.PLC_NAME,
                    x.SEQUENCE,
                    x.NEW_DATA,
                    x.DATE,
                    x.TIME_SPAN,
                    x.CLIENT_VISIBLE,
                    x.RETAIN,
                    x.GET_RETAIN
                });
            }
            else
                return null;
        }

        public static bool SetTag(string plcName, int id, object value)
        {
            bool rValue = false;
            CommObj plc;

            //if (plcName.ToUpper().Contains(Core.MyApp.PLC_NAME) && Core.Communication.addrSetList != null)
            //{
            //    plc = Core.Communication.PLC_LIST.Where(x => x.NAME.Equals(plcName)).FirstOrDefault();
            //    if (plc != null)
            //    {
            //        if (plc.IS_CONNECTED || System.Diagnostics.Debugger.IsAttached)
            //        {
            //            Tags tag = Core.Communication.tagsList.list.Where(x => x.PLC_NAME.Equals(plcName) & x.ID == id).FirstOrDefault();
            //            if (tag != null)
            //            {
            //                tag.VALUE = value;
            //                rValue = true;
            //            }
            //        }
            //    }
            //}

            plc = Core.Communication.PLC_LIST.Where(x => x.NAME.Equals(plcName)).FirstOrDefault();
            if (plc != null)
            {
                if (plc.IS_CONNECTED || System.Diagnostics.Debugger.IsAttached)
                {
                    Tags tag = Core.Communication.tagsList.list.Where(x => x.PLC_NAME.Equals(plcName) & x.ID == id).FirstOrDefault();
                    if (tag != null)
                    {
                        tag.VALUE = value;
                        rValue = true;
                    }
                }
            }
            else
                throw new Exception("PLC NOT FOUND!");

            return rValue;
        }





        public void CreateTask()
        {
            _prodTask = Task.Factory.StartNew(() => Run(), ct, TaskCreationOptions.LongRunning, TaskScheduler.Default);//.Run(() => Run());
        }

        private void Run()
        {
            while (!canctokenSource.IsCancellationRequested)
            {
                //_hubContext.Clients.All.SendAsync("SendMessage",
                //new
                //{
                //    val1 = getRandomString(),
                //    val2 = getRandomString(),
                //    val3 = getRandomString(),
                //    val4 = getRandomString()
                //});

                Task.Delay(2000).Wait();//2s
            }
        }

        private string getRandomString()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, random.Next(10, 16))
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public void DestroyTask()
        {
            canctokenSource?.Cancel();
        }
    }
}

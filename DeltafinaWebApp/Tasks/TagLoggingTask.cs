using CommunicationLib;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using DeltafinaWebApp.Data.Archives;
using Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace Tasks
{
    public class TagLoggingTask
    {

        //private ArchivesDbContext ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString);
        private readonly ILogger _logger;

        private Task _task;
        CancellationTokenSource canctokenSource;
        CancellationToken ct;

        //Dictionary<DateTime, bool> programming;

        Dictionary<string, bool> _tagLogState = new Dictionary<string, bool>();

        bool _isBusy;


        struct TempTag
        {
            public string TagName { get; set; }
            public string LastLogDate { get; set; }
        }



        public TagLoggingTask(ILogger logger)
        {
            _logger = logger;

            canctokenSource = new CancellationTokenSource();
            ct = canctokenSource.Token;

            _task = Task.Factory.StartNew(() => Run(), ct, TaskCreationOptions.LongRunning, TaskScheduler.Default);//.Run(() => Run());
        }

        //private double? GetValue(TagsToSave tag)
        //{
        //    double? rValue = null;

        //    if (tag.Plcname.ToUpper().Equals(Core.MyApp.PLC_NAME))
        //    {
        //        Tags cTag = Core.Communication.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
        //        if (cTag != null && double.IsFinite(double.Parse(cTag.VALUE.ToString())))
        //            rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
        //        else
        //            return null;
        //    }

        //    return rValue;
        //}


        private double? GetValue(TagsToSave tag)
        {
            double? rValue = null;

            Tags cTag = Core.Communication.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
            if (cTag != null)
            {
                switch (cTag.VALUE.GetType().ToString())
                {
                    case "System.Int16":
                    case "System.Int32":
                    case "System.Int64":
                    case "System.Single":
                    case "System.Byte":
                    case "System.Double":
                    case "System.Decimal":
                        if (double.IsFinite(double.Parse(cTag.VALUE.ToString())))
                            rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
                        break;

                    case "System.Boolean":
                        rValue = (bool)cTag.VALUE ? 1 : 0;
                        break;

                    default:
                        break;
                }
            }

            //if (tag.Plcname.ToUpper().Equals(Core.MyApp.PLC_PM583_CT_NAME))
            //{
            //    Tags cTag = Core.Communication.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
            //    if (cTag != null && double.IsFinite(double.Parse(cTag.VALUE.ToString())))
            //        rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
            //    else
            //        return null;
            //}
            //else if (tag.Plcname.ToUpper().Contains("UTA") || tag.Plcname.ToUpper().Contains("REC"))
            //{
            //    Tags cTag = Core.CommunicationUTA.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
            //    if (cTag != null && double.IsFinite(double.Parse(cTag.VALUE.ToString())))
            //        rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
            //    else
            //        return null;
            //}
            //else if (tag.Plcname.Contains("QDSV"))
            //{
            //    Tags cTag = Core.CommunicationQDSV.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
            //    if (cTag != null && double.IsFinite(double.Parse(cTag.VALUE.ToString())))
            //        rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
            //    else
            //        return null;
            //}
            //else if (tag.Plcname.Contains("QGBT6"))
            //{
            //    Tags cTag = Core.CommunicationQGBT6.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
            //    if (cTag != null && double.IsFinite(double.Parse(cTag.VALUE.ToString())))
            //        rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
            //    else
            //        return null;
            //}
            //else if (tag.Plcname.Contains("QCCT"))
            //{
            //    Tags cTag = Core.CommunicationQCCT.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
            //    if (cTag != null && double.IsFinite(double.Parse(cTag.VALUE.ToString())))
            //        rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
            //    else
            //        return null;
            //}
            //else if (tag.Plcname.Contains("QDPM"))
            //{
            //    Tags cTag = Core.CommunicationQDPM.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
            //    if (cTag != null && double.IsFinite(double.Parse(cTag.VALUE.ToString())))
            //        rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
            //    else
            //        return null;
            //}
            //else if (tag.Plcname.Contains("QDIL"))
            //{
            //    Tags cTag = Core.CommunicationQDIL.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
            //    if (cTag != null && double.IsFinite(double.Parse(cTag.VALUE.ToString())))
            //        rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
            //    else
            //        return null;
            //}
            //else if (tag.Plcname.Contains("QS2AT"))
            //{
            //    Tags cTag = Core.CommunicationQS2AT.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
            //    if (cTag != null && double.IsFinite(double.Parse(cTag.VALUE.ToString())))
            //        rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
            //    else
            //        return null;
            //}
            //else if (tag.Plcname.Contains("QDS1"))
            //{
            //    Tags cTag = Core.CommunicationQDS1.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
            //    if (cTag != null && double.IsFinite(double.Parse(cTag.VALUE.ToString())))
            //        rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
            //    else
            //        return null;
            //}
            //else if (tag.Plcname.Contains("QDS2"))
            //{
            //    Tags cTag = Core.CommunicationQDS2.tagsList.list.Where(x => x.NAME.Equals(tag.TagPlcname.Trim())).FirstOrDefault();
            //    if (cTag != null && double.IsFinite(double.Parse(cTag.VALUE.ToString())))
            //        rValue = tag.RoundDigit.HasValue ? Math.Round(double.Parse(cTag.VALUE.ToString()), tag.RoundDigit.Value) : double.Parse(cTag.VALUE.ToString());
            //    else
            //        return null;
            //}

            return rValue;
        }


        private void Run()
        {
            try
            {
                while (!canctokenSource.IsCancellationRequested)
                {                    
                    try
                    {
                        if(!System.Diagnostics.Debugger.IsAttached)
                        {
                            using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString))
                            {
                                DateTime dt = DateTime.Now;

                                //Creo la lista dei tag da storicizzare
                                List<TagsToSave> tagToSaveList = ctx.TagsToSave.Where(x => x.Enabled).ToList();
                                foreach (var item in tagToSaveList)
                                {
                                    if (!_tagLogState.Keys.Contains(item.TagLogName))
                                        _tagLogState.Add(item.TagLogName, false);//Aggiungo il nuovo tag a quelli in esecuzione
                                }

                                //Task di registrazione
                                //Task[] taskRegList = new Task[_tagLogState.Count];
                                Task[] taskRegList = new Task[tagToSaveList.Count];

                                //Registro i valori
                                int index = 0;
                                foreach (var cTag in tagToSaveList)
                                {
                                    taskRegList[index] = Task.Run(() =>
                                    {
                                        TagsToSave item = cTag;

                                        DateTime? nextLogDate = null;
                                        if (item.LastLog.HasValue)
                                            nextLogDate = item.LastLog.Value.AddMinutes(item.CountCycleForSave);

                                        try
                                        {
                                            //if (!_tagLogState.Keys.Contains(item.TagLogName))
                                            //    _tagLogState.Add(item.TagLogName, false);//Aggiungo il nuovo tag a quelli in esecuzione

                                            if (!_tagLogState[item.TagLogName])
                                            {
                                                _tagLogState[item.TagLogName] = true;//tag in esecuzione

                                                DateTime dateTime = dt;
                                                switch (item.TimeCycleForSave)
                                                {
                                                    case "Second":
                                                        break;

                                                    case "Minute":
                                                        if (!nextLogDate.HasValue //Nessun campione ancora registrato
                                                        || (nextLogDate <= dateTime) //trascorso il tempo impostato per il tag
                                                        || (dt.Hour == 0 && dt.Minute == 0 && dt.Second == 0)) //mezzanotte
                                                        {
                                                            double? cValue = GetValue(item);
                                                            if (cValue.HasValue)
                                                            {
                                                                switch (item.ValueType.Trim())
                                                                {
                                                                    case "Current Value":
                                                                        //Salvo un nuovo campione
                                                                        using (var ctx2 = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString))
                                                                        {
                                                                            TagsToSave tagsToUpdate = ctx2.TagsToSave.Where(x => x.TagLogName.Equals(item.TagLogName)).First();
                                                                            tagsToUpdate.LastLog = dateTime;

                                                                            TagLogging logTag = new TagLogging
                                                                            {
                                                                                LogDate = dateTime,
                                                                                Plcname = item.Plcname,
                                                                                TagLogName = item.TagLogName,
                                                                                TagPlcname = item.TagPlcname,
                                                                                LogValue = cValue.Value
                                                                            };
                                                                            ctx2.TagLogging.Add(logTag);

                                                                            ctx2.SaveChanges();
                                                                        }
                                                                        break;

                                                                    case "Subtract":
                                                                        //Salvo un nuovo campione
                                                                        using (var ctx2 = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString))
                                                                        {
                                                                            TagsToSave tagsToUpdate = ctx2.TagsToSave.Where(x => x.TagLogName.Equals(item.TagLogName)).First();
                                                                            tagsToUpdate.LastLog = dateTime;

                                                                            TagLogging lastLog = ctx2.TagLogging.Where(x => x.TagLogName.Equals(item.TagPlcname)).OrderByDescending(x => x.LogDate).FirstOrDefault();

                                                                            if (lastLog != null)
                                                                            {
                                                                                TagLogging logTag = new TagLogging
                                                                                {
                                                                                    LogDate = dateTime,
                                                                                    Plcname = item.Plcname,
                                                                                    TagLogName = item.TagLogName,
                                                                                    TagPlcname = item.TagPlcname,
                                                                                    LogValue = cValue.Value - lastLog.LogValue
                                                                                };
                                                                                ctx2.TagLogging.Add(logTag);

                                                                                ctx2.SaveChanges();
                                                                            }
                                                                        }
                                                                        break;

                                                                    default:
                                                                        break;
                                                                }


                                                            }
                                                            //else
                                                            //    _logger.LogWarning(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                                                            //        + MethodBase.GetCurrentMethod().DeclaringType.Name + MethodBase.GetCurrentMethod().Name, "Tag non trovato: " + item.TagLogName, new object[0]);
                                                        }
                                                        break;

                                                    default:
                                                        break;
                                                }

                                                _tagLogState[item.TagLogName] = false;//fine esecuzione
                                            }

                                        }
                                        catch (Exception ex)
                                        {
                                            //_tagLogState[item.TagLogName] = false;//fine esecuzione

                                            _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                                                + MethodBase.GetCurrentMethod().DeclaringType.Name + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
                                        }
                                    });

                                    index++;
                                }

                                Task.WaitAll(taskRegList);
                            }
                        }

                    }
                    catch (Exception ex)
                    {

                        _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                                + MethodBase.GetCurrentMethod().DeclaringType.Name + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
                    }                    

                    Task.Delay(1000).Wait();//1s
                }

            }
            catch (OperationCanceledException)
            {
                return;
            }
            catch (Exception ex)
            {

                _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                    + MethodBase.GetCurrentMethod().DeclaringType.Name + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
            }
        }

        public void DestroyTask()
        {
            canctokenSource?.Cancel();
        }
    }
}

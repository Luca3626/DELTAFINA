using System;
using System.Collections.Generic;
using System.Linq;

using DeltafinaWebApp.Data.Archives;
using Models.Archives;
using Models.Archives.Comunication;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace Services
{

    public class AS400ComunicationService
    {

        private string _connectionString;
        private ArchivesDbContext ctx;
        private readonly ILogger _logger;


        public AS400ComunicationService(
            string connectionString, 
            ILogger logger)
        {
            _connectionString = connectionString;
            _logger = logger;
        }

        public IEnumerable<AS400RequestModel> GetRequestsNotCompleted()
        {
            List<AS400RequestModel> rValue = new List<AS400RequestModel>();

            using (var ctx = ArchivesDbContext.Create(_connectionString))
            {
                var requests = from req in ctx.As400Requests
                               where !req.Completed
                               orderby req.LastUpdate ascending
                               select new AS400RequestModel()
                               {
                                   RequestDate = req.RequestDate,
                                   RequestTime = req.RequestTime,
                                   RequestType = new AS400RequestTypeModel(req.RequestTypeId),
                                   SiloCode = req.SiloCode,
                                   Completed = req.Completed,
                                   LastUpdate = req.LastUpdate
                               };

                rValue = requests.ToList(); 
            }

            return rValue.AsEnumerable();
        }

        public IEnumerable<AS400RequestModel> GetRequestsQueue()
        {
            List<AS400RequestModel> rValue = new List<AS400RequestModel>();

            using (var ctx = ArchivesDbContext.Create(_connectionString))
            {
                var requests = from queue in ctx.As400RequestQueue
                               join req in ctx.As400Requests
                               on new { queue.RequestDate, queue.RequestTime, queue.RequestTypeId } equals new { req.RequestDate, req.RequestTime, req.RequestTypeId }
                               where !queue.ResponseDone
                               orderby req.LastUpdate ascending
                               select new AS400RequestModel()
                               {
                                   RequestDate = req.RequestDate,
                                   RequestTime = req.RequestTime,
                                   RequestType = new AS400RequestTypeModel(req.RequestTypeId),
                                   SiloCode = req.SiloCode,
                                   Completed = req.Completed,
                                   LastUpdate = req.LastUpdate
                               };

                rValue = requests.ToList();
            }

            return rValue.AsEnumerable();
        }

        public bool CheckIsNotInQueue(AS400RequestModel request)
        {
            using (var ctx = ArchivesDbContext.Create(_connectionString))
            {
                As400RequestQueue existingRequest = ctx.As400RequestQueue
                .Where(x => x.RequestDate == request.RequestDate && x.RequestTime == request.RequestTime && x.RequestTypeId == request.RequestType.Id).FirstOrDefault();

                if (existingRequest == null)
                    return true;
                else
                    return false;
            }            
        }

        public bool AddRequestInQueue(AS400RequestModel request, DateTime lastUpdate)
        {
            using (var ctx = ArchivesDbContext.Create(_connectionString))
            {
                As400RequestQueue newRequest = new As400RequestQueue
                {
                    RequestDate = request.RequestDate,
                    RequestTime = request.RequestTime,
                    RequestTypeId = request.RequestType.Id,
                    ResponseDone = false,
                    Failed = false,
                    Note = "",
                    LastUpdate = lastUpdate
                };

                ctx.As400RequestQueue.Add(newRequest);

                ctx.SaveChanges();

                return true;
            }            
        }

        public void CloseRequestInQueue(AS400RequestModel request, bool isFailed, string note)
        {
            using (var ctx = ArchivesDbContext.Create(_connectionString))
            {
                As400RequestQueue existingRequest = ctx.As400RequestQueue
                .Where(x => x.RequestDate == request.RequestDate && x.RequestTime == request.RequestTime && x.RequestTypeId == request.RequestType.Id).FirstOrDefault();

                if (existingRequest == null)
                    throw new Exception("Request not found");
                else
                {
                    existingRequest.Failed = isFailed;
                    existingRequest.Note = note;
                    existingRequest.ResponseDone = true;

                    ctx.SaveChanges();
                }
            }            
        }

        public bool WriteResponse(AS400RequestModel request, DateTime lastUpdate)
        {
            using (var ctx = ArchivesDbContext.Create(_connectionString))
            {
                switch (request.RequestType.Type)
                {
                    case AS400RequestTypesEnum.CheckSilos:
                        //Check silos
                        CommunicationLib.Tags tagState = null;
                        CommunicationLib.Tags tagEnable = null;
                        foreach (var silo in ctx.Warehouse.Where(x => x.WarehouseTypeId == 1))// && x.Code.Contains("1V1")))
                        {
                            tagState = Core.Communication.tagsList.list.Where(x => x.NAME.Equals("INT_FDB_STATO_CARICO_" + silo.Name.ToUpper())).FirstOrDefault();
                            tagEnable = Core.Communication.tagsList.list.Where(x => x.NAME.Equals("BOOL_PC_ABILITA_CARICO_SILO_" + silo.Name.ToUpper())).FirstOrDefault();

                            if (tagState != null && tagEnable != null)
                            {
                                using (var ctxInsert = ArchivesDbContext.Create(_connectionString))
                                {
                                    As400Responses resp = new As400Responses
                                    {
                                        Id = Guid.NewGuid(),
                                        RequestDate = request.RequestDate,
                                        RequestTime = request.RequestTime,
                                        RequestTypeId = request.RequestType.Id,
                                        SiloCode = silo.Name,
                                        ActualSiloState = int.Parse(tagState.VALUE.ToString()),
                                        ActualLoadEnabled = bool.Parse(tagEnable.VALUE.ToString()),
                                        ActualPlcState = Core.Communication.WatchDog.PLC_STATE[0].CommState || System.Diagnostics.Debugger.IsAttached,
                                        LastUpdate = lastUpdate
                                    };

                                    ctxInsert.As400Responses.Add(resp);

                                    ctxInsert.SaveChanges();
                                }
                            }
                            //else
                            //    _logger.LogInformation(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                            //        + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ": Tags Not Found For Silo " + silo.Name.ToUpper(), new object[0]);

                        }
                        return true;

                    case AS400RequestTypesEnum.EnableLoadSilo:
                        //Abilitazione carico silo
                        tagState = Core.Communication.tagsList.list.Where(x => x.NAME.Equals("INT_FDB_STATO_CARICO_" + request.SiloCode.ToUpper())).FirstOrDefault();
                        tagEnable = Core.Communication.tagsList.list.Where(x => x.NAME.Equals("BOOL_PC_ABILITA_CARICO_SILO_" + request.SiloCode.ToUpper())).FirstOrDefault();
                        if (tagState != null && tagEnable != null)
                        {
                            tagEnable.VALUE = true;

                            using (var ctxInsert = ArchivesDbContext.Create(_connectionString))
                            {
                                As400Responses resp = new As400Responses
                                {
                                    Id = Guid.NewGuid(),
                                    RequestDate = request.RequestDate,
                                    RequestTime = request.RequestTime,
                                    RequestTypeId = request.RequestType.Id,
                                    SiloCode = request.SiloCode,
                                    ActualSiloState = int.Parse(tagState.VALUE.ToString()),
                                    ActualLoadEnabled = true,// bool.Parse(tagEnable.VALUE.ToString()),
                                    ActualPlcState = Core.Communication.WatchDog.PLC_STATE[0].CommState || System.Diagnostics.Debugger.IsAttached,
                                    LastUpdate = lastUpdate
                                };

                                ctx.As400Responses.Add(resp);

                                ctx.SaveChanges();
                            }                            
                        }
                        //else
                        //    _logger.LogInformation(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                        //        + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ": Tags Not Found For Silo " + silo.Name.ToUpper(), new object[0]);

                        return true;

                    case AS400RequestTypesEnum.DisableAllSilos:
                        //Disable all silos
                        tagState = null;
                        tagEnable = null;
                        foreach (var silo in ctx.Warehouse.Where(x => x.WarehouseTypeId == 1))// && x.Code.Contains("1V1")))
                        {
                            tagState = Core.Communication.tagsList.list.Where(x => x.NAME.Equals("INT_FDB_STATO_CARICO_" + silo.Name.ToUpper())).FirstOrDefault();
                            tagEnable = Core.Communication.tagsList.list.Where(x => x.NAME.Equals("BOOL_PC_ABILITA_CARICO_SILO_" + silo.Name.ToUpper())).FirstOrDefault();

                            if (tagState != null && tagEnable != null)
                            {
                                tagEnable.VALUE = false;

                                using (var ctxInsert = ArchivesDbContext.Create(_connectionString))
                                {
                                    As400Responses resp = new As400Responses
                                    {
                                        Id = Guid.NewGuid(),
                                        RequestDate = request.RequestDate,
                                        RequestTime = request.RequestTime,
                                        RequestTypeId = request.RequestType.Id,
                                        SiloCode = silo.Name,
                                        ActualSiloState = int.Parse(tagState.VALUE.ToString()),
                                        ActualLoadEnabled = false,//bool.Parse(tagEnable.VALUE.ToString()),
                                        ActualPlcState = Core.Communication.WatchDog.PLC_STATE[0].CommState || System.Diagnostics.Debugger.IsAttached,
                                        LastUpdate = lastUpdate
                                    };

                                    ctxInsert.As400Responses.Add(resp);

                                    ctxInsert.SaveChanges();
                                }
                            }
                            //else
                            //    _logger.LogInformation(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                            //        + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ": Tags Not Found For Silo " + silo.Name.ToUpper(), new object[0]);

                        }
                        return true;

                    case AS400RequestTypesEnum.DisableSilo:
                        //Abilitazione carico silo
                        tagState = Core.Communication.tagsList.list.Where(x => x.NAME.Equals("INT_FDB_STATO_CARICO_" + request.SiloCode.ToUpper())).FirstOrDefault();
                        tagEnable = Core.Communication.tagsList.list.Where(x => x.NAME.Equals("BOOL_PC_ABILITA_CARICO_SILO_" + request.SiloCode.ToUpper())).FirstOrDefault();
                        if (tagState != null && tagEnable != null)
                        {
                            tagEnable.VALUE = false;

                            using (var ctxInsert = ArchivesDbContext.Create(_connectionString))
                            {
                                As400Responses resp = new As400Responses
                                {
                                    Id = Guid.NewGuid(),
                                    RequestDate = request.RequestDate,
                                    RequestTime = request.RequestTime,
                                    RequestTypeId = request.RequestType.Id,
                                    SiloCode = request.SiloCode,
                                    ActualSiloState = int.Parse(tagState.VALUE.ToString()),
                                    ActualLoadEnabled = false,// bool.Parse(tagEnable.VALUE.ToString()),
                                    ActualPlcState = Core.Communication.WatchDog.PLC_STATE[0].CommState || System.Diagnostics.Debugger.IsAttached,
                                    LastUpdate = lastUpdate
                                };

                                ctx.As400Responses.Add(resp);

                                ctx.SaveChanges();
                            }
                        }
                        //else
                        //    _logger.LogInformation(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                        //        + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ": Tags Not Found For Silo " + silo.Name.ToUpper(), new object[0]);

                        return true;

                    default:
                        throw new Exception("Request type not found");
                }
            }                     
        }

    }
}

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
using Services;

namespace Tasks
{
    public class ComunicationAS400Task
    {

        //private ArchivesDbContext ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString);
        private readonly ILogger _logger;

        private Task _task;
        CancellationTokenSource canctokenSource;
        CancellationToken ct;

        Dictionary<DateTime, bool> programming;

        int _countSleep;


        public ComunicationAS400Task(ILogger logger)
        {
            _logger = logger;
            _countSleep = 0;

            canctokenSource = new CancellationTokenSource();
            ct = canctokenSource.Token;

            _task = Task.Factory.StartNew(() => Run(), ct, TaskCreationOptions.LongRunning, TaskScheduler.Default);//.Run(() => Run());
        }

        private bool CanWrite(DateTime date, short hour, short minute)
        {
            DateTime tmp = new DateTime(date.Year, date.Month, date.Day, hour, minute, 0);

            return date == tmp;
        }


        private void Run()
        {
            try
            {
                while (!canctokenSource.IsCancellationRequested)
                {
                    try
                    {
                        DateTime lastUpdateDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);

                        AS400ComunicationService serv = new AS400ComunicationService(DeltafinaWebApp.ConStr.ConnectionString, _logger);

                        // Metto le richieste in coda
                        foreach (var request in serv.GetRequestsNotCompleted())
                        {
                            if (serv.CheckIsNotInQueue(request))
                            {
                                bool result = serv.AddRequestInQueue(request, lastUpdateDate);
                            }
                        }

                        // Processo le richieste in coda, per evitare che ripeto la risposta, 
                        // quando è già stata scritta ma non è pervenuto il completed della richiesta, impostato da Sabrina
                        foreach (var request in serv.GetRequestsQueue())
                        {
                            try
                            {
                                serv.WriteResponse(request, lastUpdateDate);

                                serv.CloseRequestInQueue(request, false, "Success");

                            }
                            catch (Exception ex)
                            {

                                serv.CloseRequestInQueue(request, true, ex.Message);
                            }
                        }


                    }
                    catch (Exception ex)
                    {

                        _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": "  + MethodBase.GetCurrentMethod().DeclaringType.Name + ".SubTry" + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
                    }

                    Task.Delay(1000).Wait();
                }
            }
            catch (OperationCanceledException)
            {
                return;
            }
            catch (Exception ex)
            {

                _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": " + MethodBase.GetCurrentMethod().DeclaringType.Name + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
            }
        }

        public void DestroyTask()
        {
            canctokenSource?.Cancel();
        }
    }
}

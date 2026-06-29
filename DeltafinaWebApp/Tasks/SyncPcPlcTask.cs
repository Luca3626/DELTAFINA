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
    public class SyncPcPlcTask
    {

        //private ArchivesDbContext ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString);
        private readonly ILogger _logger;

        private Task _task;
        CancellationTokenSource canctokenSource;
        CancellationToken ct;

        Dictionary<DateTime, bool> programming;


        public SyncPcPlcTask(ILogger logger)
        {
            _logger = logger;

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
                    if ((Core.Communication.WatchDog.PLC_STATE[0].CommState && Core.Communication.WatchDog.PLC_STATE[2].CommState) || System.Diagnostics.Debugger.IsAttached)
                    {
                        Core.Communication.tagsList.MOXA_To_APC.VALUE = Core.Communication.tagsList.FDB_To_APC.VALUE;
                        Core.Communication.tagsList.PC_From_APC.VALUE = Core.Communication.tagsList.MOXA_From_APC.VALUE;
                    }

                    ////Verifico se il minuto 5 o multipli
                    ////NB: le ricette applicano le modifiche ogni 5 minuti quindi nel caso peggiore avrò 5 (recipetask) + 5 (syncpcplctask) = 10 minuti di attesa
                    //if(DateTime.Now.Minute % 5 == 0)
                    //{
                    //    try
                    //    {
                    //        using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString))
                    //        {
                    //            DateTime startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0);

                    //            foreach (var item in ctx.Plcs.OrderBy(x => x.PositionOrder))
                    //            {
                    //                //switch (item.Name)
                    //                //{
                    //                //    case Core.MyApp.PLC_ACOOL1_NAME:
                    //                //        Helpers.ACoolSyncHelper.SetACool1(ctx, item.Id, startDate);
                    //                //        break;

                    //                //    case Core.MyApp.PLC_ACOOL2_NAME:
                    //                //        Helpers.ACoolSyncHelper.SetACool2(ctx, item.Id, startDate);
                    //                //        break;

                    //                //    case Core.MyApp.PLC_ACOOL3_NAME:
                    //                //        Helpers.ACoolSyncHelper.SetACool3(ctx, item.Id, startDate);
                    //                //        break;

                    //                //    case Core.MyApp.PLC_ACOOL4_NAME:
                    //                //        Helpers.ACoolSyncHelper.SetACool4(ctx, item.Id, startDate);
                    //                //        break;

                    //                //    case Core.MyApp.PLC_ACOOL5_NAME:
                    //                //        Helpers.ACoolSyncHelper.SetACool5(ctx, item.Id, startDate);
                    //                //        break;

                    //                //    case Core.MyApp.PLC_ACOOL6_NAME:
                    //                //        Helpers.ACoolSyncHelper.SetACool6(ctx, item.Id, startDate);
                    //                //        break;


                    //                //    default:
                    //                //        break;
                    //                //}

                    //            }
                    //        }

                    //    }
                    //    catch (Exception ex)
                    //    {

                    //        _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": "  + MethodBase.GetCurrentMethod().DeclaringType.Name + ".SubTry" + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
                    //    }
                    //}


                    Task.Delay(2000).Wait();//2s
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

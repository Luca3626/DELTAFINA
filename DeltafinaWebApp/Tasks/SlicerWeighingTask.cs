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
    /// <summary>
    /// Registrazione a database del peso delle casse pesate sui due slicer.
    ///
    /// Quando la pesata di una cassa sul nastro pesatore e' conclusa il PLC alza un bit di
    /// richiesta nel DB121 (TO_HMI) e mette il peso in kg in una variabile del DB190:
    ///
    ///     Virginia Slicer   PLC_VSL_PesoDaRegistrare  DB121.dbx4.3   ->  VAR_V3997  DB190.dbw7994
    ///     Burley Slicer     PLC_BSL_PesoDaRegistrare  DB121.dbx4.4   ->  VAR_V3998  DB190.dbw7996
    ///
    /// Il task legge il bit, registra la pesata in SlicerWeighings e riabbassa il bit.
    /// Fra una cassa e la successiva passano circa 3 secondi, quindi il ciclo da 1 s e'
    /// abbondante.
    /// </summary>
    public class SlicerWeighingTask
    {

        //private ArchivesDbContext ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString);
        private readonly ILogger _logger;

        private Task _task;
        CancellationTokenSource canctokenSource;
        CancellationToken ct;


        public SlicerWeighingTask(ILogger logger)
        {
            _logger = logger;

            canctokenSource = new CancellationTokenSource();
            ct = canctokenSource.Token;

            _task = Task.Factory.StartNew(() => Run(), ct, TaskCreationOptions.LongRunning, TaskScheduler.Default);//.Run(() => Run());
        }


        private void Run()
        {
            try
            {
                while (!canctokenSource.IsCancellationRequested)
                {
                    try
                    {
                        if (Core.Communication.WatchDog.PLC_STATE[0].CommState || System.Diagnostics.Debugger.IsAttached)
                        {
                            try
                            {
                                //REGISTRAZIONE PESO CASSA - VIRGINIA SLICER
                                if ((bool)Core.Communication.tagsList.PLC_VSL_PesoDaRegistrare.VALUE)
                                {
                                    try
                                    {
                                        bool result = false;

                                        using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString))
                                        {
                                            SlicerWeighingServices slicerWeighingService = new SlicerWeighingServices(ctx);

                                            result = slicerWeighingService.AddWeighing_VSL();
                                        }

                                        if (result)
                                        {
                                            _logger.LogInformation(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": "
                                                + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name
                                                + ".PLC_VSL_PesoDaRegistrare: registrata pesata di "
                                                + Core.Communication.tagsList.VAR_V3997.VALUE.ToString() + " kg, scrittura "
                                                + Core.Communication.tagsList.PLC_VSL_PesoDaRegistrare.NAME
                                                + " (" + Core.Communication.tagsList.PLC_VSL_PesoDaRegistrare.ADDRESS + ") = False", new object[0]);

                                            Core.Communication.tagsList.PLC_VSL_PesoDaRegistrare.VALUE = false;
                                        }
                                    }
                                    catch (Microsoft.EntityFrameworkCore.DbUpdateException dbEx)
                                    {

                                        _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": "
                                            + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_1",
                                            dbEx, dbEx.InnerException != null ? dbEx.InnerException.Message : dbEx.Message, new object[0]);
                                    }
                                    catch (Exception ex)
                                    {

                                        _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": "
                                            + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_1",
                                            ex, ex.Message, new object[0]);
                                    }
                                }

                                //REGISTRAZIONE PESO CASSA - BURLEY SLICER
                                if ((bool)Core.Communication.tagsList.PLC_BSL_PesoDaRegistrare.VALUE)
                                {
                                    try
                                    {
                                        bool result = false;

                                        using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString))
                                        {
                                            SlicerWeighingServices slicerWeighingService = new SlicerWeighingServices(ctx);

                                            result = slicerWeighingService.AddWeighing_BSL();
                                        }

                                        if (result)
                                        {
                                            _logger.LogInformation(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": "
                                                + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name
                                                + ".PLC_BSL_PesoDaRegistrare: registrata pesata di "
                                                + Core.Communication.tagsList.VAR_V3998.VALUE.ToString() + " kg, scrittura "
                                                + Core.Communication.tagsList.PLC_BSL_PesoDaRegistrare.NAME
                                                + " (" + Core.Communication.tagsList.PLC_BSL_PesoDaRegistrare.ADDRESS + ") = False", new object[0]);

                                            Core.Communication.tagsList.PLC_BSL_PesoDaRegistrare.VALUE = false;
                                        }
                                    }
                                    catch (Microsoft.EntityFrameworkCore.DbUpdateException dbEx)
                                    {

                                        _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": "
                                            + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_2",
                                            dbEx, dbEx.InnerException != null ? dbEx.InnerException.Message : dbEx.Message, new object[0]);
                                    }
                                    catch (Exception ex)
                                    {

                                        _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": "
                                            + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_2",
                                            ex, ex.Message, new object[0]);
                                    }
                                }

                            }
                            catch (Exception ex)
                            {

                                _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": "
                                    + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
                            }
                        }
                    }
                    catch (Exception ex)
                    {

                        _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": " + MethodBase.GetCurrentMethod().DeclaringType.Name + ".SubTry" + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
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

                _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + ": " + MethodBase.GetCurrentMethod().DeclaringType.Name + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
            }
        }

        public void DestroyTask()
        {
            canctokenSource?.Cancel();
        }
    }
}

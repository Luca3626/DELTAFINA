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
using Models.Archives.Recipes;
using Services;
using CommunicationLib;
using Models.Archives.Contract;
using Models.Archives.Calendar;
using Tasks.Helpers;
using Models.Archives.Recipes.Glassware;

namespace Tasks
{
    
    public class TrackingTask
    {

        //private ArchivesDbContext ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString);
        private readonly ILogger _logger;

        private Task _task;
        CancellationTokenSource canctokenSource;
        CancellationToken ct;

        RecipeModel _ricetta;
        RecipeGlasswareServices _recipeService;
        DosingServices _dosingService;


        private int Loop5_STATO1 = 0, Loop5_STATO3 = 0;

        /// <summary>
        /// Dati dal client
        /// </summary>
        public static Guid Order_ID { get; set; }
        public static Guid Recipe_ID { get; set; }

        public static bool NewOrder { get; set; }
        public static bool NewRecipe { get; set; }

        bool ResetOrder = false, ResetRecipe = false;

        bool _resetCounterDone;


        public TrackingTask(Microsoft.AspNetCore.Hosting.IHostingEnvironment env, ILogger logger)
        {
            _logger = logger;

            //_commessaService = new CalendarOilMillServices(ctx, env, logger);
            //_recipeService = new RecipeGlasswareServices(ctx);
            //_dosingService = new DosingServices(ctx);


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
                                _resetCounterDone = false;

                                _recipeService = new RecipeGlasswareServices(ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString));
                                _dosingService = new DosingServices(ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString));

                                //////HANDSHAKE, SE VALE TRUE GENERO ALLARME PLC IN STOP
                                ////if (!(bool)Core.Communication.tagsList.PC_HANDSHAKE.VALUE)
                                ////    Core.Communication.tagsList.PC_HANDSHAKE.VALUE = true;

                                // Eseguo il reset del contatore giornaliero dei dosaggi
                                if (DateTime.Now.Hour == 6 & DateTime.Now.Minute >= 0)// && !System.Diagnostics.Debugger.IsAttached)
                                {
                                    try
                                    {
                                        if ((bool)Core.Communication.tagsList.ACK_PC_RESET_CONTADOSAGGI.VALUE)
                                        {
                                            Core.Communication.tagsList.PC_RESET_CONTADOSAGGI.VALUE = false;

                                            if (!_dosingService.CheckExistAckDosingCounter(Core.Communication.tagsList.ACK_PC_RESET_CONTADOSAGGI.NAME, DateTime.Now))
                                                _dosingService.InsertAckDosingCounter(Core.Communication.tagsList.ACK_PC_RESET_CONTADOSAGGI.NAME, DateTime.Now);

                                            Core.Communication.tagsList.ACK_PC_RESET_CONTADOSAGGI.VALUE = false;
                                        }

                                        if (!_dosingService.CheckExistAckDosingCounter(Core.Communication.tagsList.ACK_PC_RESET_CONTADOSAGGI.NAME, DateTime.Now))
                                        {
                                            Core.Communication.tagsList.PC_RESET_CONTADOSAGGI.VALUE = true;
                                            _resetCounterDone = true;
                                        }

                                        //if (!_dosingService.CheckExistAckDosingCounter(Core.Communication.tagsList.PC_RESET_CONTADOSAGGI.NAME, DateTime.Now))
                                        //{
                                        //    _dosingService.InsertAckDosingCounter(Core.Communication.tagsList.PC_RESET_CONTADOSAGGI.NAME, DateTime.Now);

                                        //    Core.Communication.tagsList.PC_RESET_CONTADOSAGGI.VALUE = true;
                                        //    _resetCounterDone = true;
                                        //}

                                    }
                                    catch (Exception ex)
                                    {

                                        _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_1", ex, ex.Message, new object[0]);
                                    }
                                }


                                //TRACKING DOSAGGI in TF1
                                if ((bool)Core.Communication.tagsList.PLC_NUOVA_REGISTRAZIONE_IN_TF1.VALUE
                                    && !(bool)Core.Communication.tagsList.ACK_NUOVA_REGISTRAZIONE_IN_TF1.VALUE
                                    //&& !System.Diagnostics.Debugger.IsAttached
                                    && !_resetCounterDone)
                                {
                                    try
                                    {
                                        int ricettaId = int.Parse(Core.Communication.tagsList.PC_RIC_ID.VALUE.ToString());
                                        int progressiveId = int.Parse(Core.Communication.tagsList.FDB_N_DOS_GIORNALIERI_TOTALI_TF1TF2.VALUE.ToString());

                                        if (progressiveId == 0)
                                        {
                                            progressiveId = 1;
                                            Core.Communication.tagsList.FDB_N_DOS_GIORNALIERI_TOTALI_TF1TF2.VALUE = progressiveId;
                                        }

                                        RecipeGlasswareModel recipe = _recipeService.GetRecipeByProgressiveId(ricettaId);

                                        DosingServices dosingServices = new DosingServices(ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString));
                                        bool result = dosingServices.AddDosings_TF1(recipe, progressiveId);

                                        if (result)
                                        {
                                            Core.Communication.tagsList.ACK_NUOVA_REGISTRAZIONE_IN_TF1.VALUE = true;

                                            try
                                            {
                                                _dosingService.InsertAckDosingCounter(Core.Communication.tagsList.ACK_NUOVA_REGISTRAZIONE_IN_TF1.NAME, DateTime.Now);
                                            }
                                            catch (Exception ex)
                                            {

                                                _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_2", ex, ex.Message, new object[0]);
                                            }
                                        }

                                        if (recipe == null)
                                            _logger.LogWarning(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".PLC_NUOVA_REGISTRAZIONE_IN_TF1", "RECIPE ID: " + ricettaId.ToString() + " NOT FOUND");

                                    }
                                    catch (Microsoft.EntityFrameworkCore.DbUpdateException dbEx)
                                    {

                                        _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_2", dbEx, dbEx.InnerException.Message, new object[0]);
                                    }
                                    catch (Exception ex)
                                    {

                                        _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_2", ex, ex.Message, new object[0]);
                                    }
                                }

                                //TRACKING DOSAGGI in TF2
                                if ((bool)Core.Communication.tagsList.PLC_NUOVA_REGISTRAZIONE_IN_TF2.VALUE
                                    && !(bool)Core.Communication.tagsList.ACK_NUOVA_REGISTRAZIONE_IN_TF2.VALUE
                                    //&& !System.Diagnostics.Debugger.IsAttached
                                    &&
                                    !_resetCounterDone)
                                {
                                    try
                                    {
                                        int ricettaId = int.Parse(Core.Communication.tagsList.PC_RIC_ID.VALUE.ToString());
                                        int progressiveId = int.Parse(Core.Communication.tagsList.FDB_N_DOS_GIORNALIERI_TOTALI_TF1TF2.VALUE.ToString());

                                        if (progressiveId == 0)
                                        {
                                            progressiveId = 1;
                                            Core.Communication.tagsList.FDB_N_DOS_GIORNALIERI_TOTALI_TF1TF2.VALUE = progressiveId;
                                        }

                                        RecipeGlasswareModel recipe = _recipeService.GetRecipeByProgressiveId(ricettaId);

                                        DosingServices dosingServices = new DosingServices(ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString));
                                        bool result = dosingServices.AddDosings_TF2(recipe, progressiveId);

                                        if (result)
                                        {
                                            Core.Communication.tagsList.ACK_NUOVA_REGISTRAZIONE_IN_TF2.VALUE = true;

                                            try
                                            {
                                                _dosingService.InsertAckDosingCounter(Core.Communication.tagsList.ACK_NUOVA_REGISTRAZIONE_IN_TF2.NAME, DateTime.Now);
                                            }
                                            catch (Exception ex)
                                            {

                                                _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_2", ex, ex.Message, new object[0]);
                                            }
                                        }

                                        if (recipe == null)
                                            _logger.LogWarning(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".PLC_NUOVA_REGISTRAZIONE_IN_TF2", "RECIPE ID: " + ricettaId.ToString() + " NOT FOUND");

                                    }
                                    catch (Microsoft.EntityFrameworkCore.DbUpdateException dbEx)
                                    {

                                        _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_2", dbEx, dbEx.InnerException.Message, new object[0]);
                                    }
                                    catch (Exception ex)
                                    {

                                        _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_2", ex, ex.Message, new object[0]);
                                    }
                                }


                                try
                                {
                                    // Salvo i totali del giorno precedente per la sabrina
                                    if (DateTime.Now.Hour == 6 & DateTime.Now.Minute > 0)
                                        _dosingService.SaveDayTotalizer();


                                    // Salvo i totali del turno 22:00 / 06:00
                                    if (DateTime.Now.Hour == 6 & DateTime.Now.Minute > 0)
                                    {
                                        DateTime startWorkshift = new DateTime(DateTime.Now.AddDays(-1).Year, DateTime.Now.AddDays(-1).Month, DateTime.Now.AddDays(-1).Day, 22, 0, 0);
                                        DateTime endWorkshift = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 6, 0, 0);
                                        _dosingService.SaveWorkshiftTotalizer(startWorkshift, endWorkshift);
                                    }
                                    // Salvo i totali del turno 06:00 / 14:00
                                    if (DateTime.Now.Hour == 14 & DateTime.Now.Minute > 0)
                                    {
                                        DateTime startWorkshift = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 6, 0, 0);
                                        DateTime endWorkshift = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 14, 0, 0);
                                        _dosingService.SaveWorkshiftTotalizer(startWorkshift, endWorkshift);
                                    }
                                    // Salvo i totali del turno 14:00 / 22:00
                                    if (DateTime.Now.Hour == 22 & DateTime.Now.Minute > 0)
                                    {
                                        DateTime startWorkshift = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 14, 0, 0);
                                        DateTime endWorkshift = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 22, 0, 0);
                                        _dosingService.SaveWorkshiftTotalizer(startWorkshift, endWorkshift);
                                    }
                                }
                                catch (Exception ex)
                                {

                                    _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ".Part_4", ex, ex.Message, new object[0]);
                                }


                            }
                            catch (Exception ex)
                            {

                                _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                                                
                    }

                    Task.Delay(5000).Wait();
                }

            }
            catch (OperationCanceledException)
            {
                return;
            }
            catch (Exception ex)
            {

                _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
            }
        }

        public void DestroyTask()
        {
            canctokenSource?.Cancel();
        }
    }
}

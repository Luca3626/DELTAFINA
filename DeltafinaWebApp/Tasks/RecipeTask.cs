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

    enum EnumRecipe
    {
        Light,
        Service
    }

    public class RecipeTask
    {

        //private ArchivesDbContext ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString);
        private readonly ILogger _logger;

        private Task _task;
        CancellationTokenSource canctokenSource;
        CancellationToken ct;

        RecipeModel _ricetta;
        RecipeGlasswareServices _recipeService;


        private int Loop5_STATO1 = 0, Loop5_STATO3 = 0;

        /// <summary>
        /// Dati dal client
        /// </summary>
        public static Guid Order_ID { get; set; }
        public static Guid Recipe_ID { get; set; }

        public static bool NewOrder { get; set; }
        public static bool NewRecipe { get; set; }

        bool ResetOrder = false, ResetRecipe = false;


        public RecipeTask(Microsoft.AspNetCore.Hosting.IHostingEnvironment env, ILogger logger)
        {
            _logger = logger;

            //_commessaService = new CalendarOilMillServices(ctx, env, logger);
            

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
                    if (Core.Communication.WatchDog.PLC_STATE[0].CommState)// || !System.Diagnostics.Debugger.IsAttached)
                    {
                        if (NewRecipe)
                        {
                            try
                            {
                                _logger.LogInformation(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                                    + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ": RECIPE LOADING...", new object[0]);
                            }
                            catch (Exception ex)
                            {

                            }

                            try
                            {
                                RecipeGlasswareServices recipeService = new RecipeGlasswareServices(ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString));
                                RecipeGlasswareModel recipe = recipeService.GetRecipeById(Recipe_ID);

                                //Core.Communication.tagsList.PC_T_TEMPO_MISCELAZIONE.VALUE = recipe.TimeMixing;
                                //Core.Communication.tagsList.PC_T_SCARICO_H2O.VALUE = recipe.TimeMixWater;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S1.VALUE = recipe.Components[0].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S1.VALUE = recipe.Components[0].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S2.VALUE = recipe.Components[1].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S2.VALUE = recipe.Components[1].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S3.VALUE = recipe.Components[2].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S3.VALUE = recipe.Components[2].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S4.VALUE = recipe.Components[3].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S4.VALUE = recipe.Components[3].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S5.VALUE = recipe.Components[4].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S5.VALUE = recipe.Components[4].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S6.VALUE = recipe.Components[5].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S6.VALUE = recipe.Components[5].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S7.VALUE = recipe.Components[6].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S7.VALUE = recipe.Components[6].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S8.VALUE = recipe.Components[7].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S8.VALUE = recipe.Components[7].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S9.VALUE = recipe.Components[8].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S9.VALUE = recipe.Components[8].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S10.VALUE = recipe.Components[9].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S10.VALUE = recipe.Components[9].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S11.VALUE = recipe.Components[10].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S11.VALUE = recipe.Components[10].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S12.VALUE = recipe.Components[11].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S12.VALUE = recipe.Components[11].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S13.VALUE = recipe.Components[12].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S13.VALUE = recipe.Components[12].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S14.VALUE = recipe.Components[13].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S14.VALUE = recipe.Components[13].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S15.VALUE = recipe.Components[14].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S15.VALUE = recipe.Components[14].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_S16.VALUE = recipe.Components[15].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_S16.VALUE = recipe.Components[15].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_TP6.VALUE = recipe.Components[16].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_TP6.VALUE = recipe.Components[16].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_N_RIP_TP6A.VALUE = recipe.Components[17].Repetition;
                                //Core.Communication.tagsList.PC_RIC_Q_TP6A.VALUE = recipe.Components[17].QuantityMix;

                                //Core.Communication.tagsList.PC_RIC_ID.VALUE = recipe.ProgressiveId;

                                NewRecipe = false;

                            }
                            catch (Exception ex)
                            {
                                _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                                    + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ": RECIPE LOADED FAILED", new object[0]);

                            }

                            NewRecipe = false;

                            try
                            {
                                _logger.LogInformation(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                                    + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ": RECIPE LOADED SUCCESSFULLY", new object[0]);
                            }
                            catch (Exception ex)
                            {

                                
                            }
                        }
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

                _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
            }
        }

        public void DestroyTask()
        {
            canctokenSource?.Cancel();
        }
    }
}

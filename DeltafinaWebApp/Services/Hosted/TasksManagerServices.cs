//using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Hubs;
//using Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Tasks;
//using Tasks;
//using DeltafinaGestCore.Data.Anagrafiche;

namespace Services.Hosted
{
    public class TasksManagerServices : BackgroundService
    {

        private readonly ILogger<TasksManagerServices> _logger;
        private readonly TaskSettings _settings;

        //private readonly IEventBus _eventBus;

        //private AnagraficheDbContext _anaContext;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment _environment;
        private readonly IHubContext<NotificationHub> _hubContext;

        //SignalRTask
        ServerSignalR _signalRTask;
        //RecipeTask
        RecipeTask _recipeTask;
        //TrackingTask
        TrackingTask _trackingTask;
        //Sync pc - plc
        SyncPcPlcTask _syncPcPlcTask;
        //Tag logging long task
        TagLoggingTask _tagLoggingTask;
        //Report Task
        ReportsTask _reportTask;
        //Alarm Notification Task
        AlarmNotificationTask _alarmNotificationTask;
        //Maintenance Notification Task
        MaintenanceToDoNotificationTask _maintenanceNotificationTask;
        //ComunicationAS400 Task
        ComunicationAS400Task _comunicationAS400Task;
        //Registrazione peso casse slicer (Virginia / Burley)
        SlicerWeighingTask _slicerWeighingTask;

        CancellationTokenSource canctokenSource;
        CancellationToken ct;

        int count;


        public TasksManagerServices(Microsoft.AspNetCore.Hosting.IHostingEnvironment env
            , IHubContext<NotificationHub> hubContext
            , ILogger<TasksManagerServices> logger
            , IOptions<TaskSettings> settings)
        {
            _environment = env;
            _settings = settings.Value;
            _hubContext = hubContext;
            _logger = logger;
            //_anaContext = AnagraficheDbContext.Create(Startup.ConnectionStringAnagrafiche);

            try
            {
                //eeLog = new Helper.ErrorEventsLog(_environment.WebRootPath, "DeltafinaGest_Log");

                //eeLog.writeToLog("INFORMATION: ", "FILE DI LOG OK", MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, DateTime.Now);

            }
            catch (Exception ex)
            {
                _logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
            }
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            //_logger.LogDebug($"GracePeriodManagerService is starting.");

            //stoppingToken.Register(() =>
            //_logger.LogDebug($" GracePeriod background task is stopping."));


            //Avvio qui i tasks
            //....

            //Console.Out.WriteLine("INGRESSO");
            try
            {
                _logger.LogInformation(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                    + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ": INGRESSO", new object[0]);

            }
            catch (Exception ex)
            {

            }




            Core.MyApp.onStartApp(DeltafinaWebApp.ConStr.ConnectionString, DeltafinaWebApp.ConStr.AlarmsConnectionString, _settings);





            //_demoTask = new DemoSignalRTask(_hubContext);
            _signalRTask = new ServerSignalR(_hubContext);
            _signalRTask.CreateTask();


            while (!stoppingToken.IsCancellationRequested)
            {
                //_logger.LogDebug($"GracePeriod task doing background work.");

                //// This eShopOnContainers method is querying a database table
                //// and publishing events into the Event Bus (RabbitMQ / ServiceBus)
                //CheckConfirmedGracePeriodOrders();


                await Task.Delay(_settings.CheckUpdateTime, stoppingToken);



                if (count < 30 && !_settings.IsStandAlonePC)
                    count++;


                if (count >= 10 && _recipeTask == null)
                    _recipeTask = new RecipeTask(_environment, _logger);

                if (count >= 10 && _trackingTask == null)
                    _trackingTask = new TrackingTask(_environment, _logger);

                if (count >= 10 && _tagLoggingTask == null)
                    _tagLoggingTask = new TagLoggingTask(_logger);

                if (count >= 10 && _alarmNotificationTask == null)
                    _alarmNotificationTask = new AlarmNotificationTask(_environment, _logger);

                if (count >= 10 && _maintenanceNotificationTask == null)
                    _maintenanceNotificationTask = new MaintenanceToDoNotificationTask(_environment, _logger, DeltafinaWebApp.ConStr.ConnectionString);

                if (count >= 10 && _comunicationAS400Task == null)
                    _comunicationAS400Task = new ComunicationAS400Task(_logger);

                if (count >= 10 && _syncPcPlcTask == null)
                    _syncPcPlcTask = new SyncPcPlcTask(_logger);

                if (count >= 10 && _slicerWeighingTask == null)
                    _slicerWeighingTask = new SlicerWeighingTask(_logger);

                //if (count >= 10 && _reportTask == null)
                //    _reportTask = new ReportsTask(_environment, _logger);
            }

            //_logger.LogDebug($"GracePeriod background task is stopping.");
            try
            {
                _logger.LogInformation(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                        + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ": INIZIO USCITA", new object[0]);
            }
            catch (Exception ex)
            {
                
            }


            try
            {
                try
                {
                    //Cancello qui i tasks
                    //_syncPcPlcTask.DestroyTask();
                    //_tagLoggingTask.DestroyTask();

                    Core.MyApp.onStopApp();

                    _signalRTask.DestroyTask();

                }
                catch (Exception ex)
                {

                    _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                        + MethodBase.GetCurrentMethod().DeclaringType.Name + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
                }

                _logger.LogInformation(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                    + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name + ": FINE USCITA", new object[0]);
            }
            catch (Exception ex)
            {

                
            }


            await Task.CompletedTask;

        }

    }
}

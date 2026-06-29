using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using DeltafinaWebApp.Data.Archives;
using Models.Archives.Maintenances;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace Tasks
{
    public class MaintenanceToDoNotificationTask
    {

        //private ArchivesDbContext ctx = ArchivesDbContext.Create(Startup.ConnectionStringAnagrafiche);
        private readonly ILogger _logger;

        private Task _task;
        CancellationTokenSource canctokenSource;
        CancellationToken ct;

        private IHostingEnvironment _environment;

        private string _connectionString;


        public MaintenanceToDoNotificationTask(IHostingEnvironment env, ILogger logger, string connectionString)
        {
            _environment = env;
            _logger = logger;
            _connectionString = connectionString;

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
                    //if (DateTime.Now.Hour == 6)
                    if (DateTime.Now.Minute % 5 == 0)
                    {
                        try
                        {
                            IEnumerable<MaintenanceActivityDetailModel> activityList =
                                new List<MaintenanceActivityDetailModel>();

                            List<MaintenanceActivityDetailModel> activityToDoList =
                                new List<MaintenanceActivityDetailModel>();

                            //Recupero l'elenco delle attività da fare
                            MaintenanceServices maintenanceServ = new MaintenanceServices(ArchivesDbContext.Create(_connectionString));
                            activityList = maintenanceServ.GetMaintenanceActivityToDoList();

                            foreach (var item in activityList.Where(x => !x.ToDoSended))
                            {
                                if (item.AdviseType.Equals("Nessuno"))
                                    continue;

                                DateTime adviseDate = item.FromDate.ToLocalTime();
                                switch (item.AdviseType)
                                {
                                    case "All'ora dell'evento":
                                        break;
                                    case "5 minuti prima":
                                        adviseDate.AddMinutes(-5);
                                        break;
                                    case "10 minuti prima":
                                        adviseDate.AddMinutes(-10);
                                        break;
                                    case "15 minuti prima":
                                        adviseDate.AddMinutes(-15);
                                        break;
                                    case "30 minuti prima":
                                        adviseDate.AddMinutes(-30);
                                        break;
                                    case "1 ora prima":
                                        adviseDate.AddHours(-1);
                                        break;
                                    case "2 ore prima":
                                        adviseDate.AddHours(-2);
                                        break;
                                    case "1 giorno prima":
                                        adviseDate.AddDays(-1);
                                        break;
                                    case "2 giorni prima":
                                        adviseDate.AddDays(-2);
                                        break;
                                    case "1 settimana prima":
                                        adviseDate.AddDays(-7);
                                        break;

                                    default:
                                        break;
                                }

                                if (DateTime.Now > adviseDate)
                                    // Aggiungo all'elenco delle attività da notificare con il todo
                                    activityToDoList.Add(item);
                            }

                            foreach (var item in activityToDoList.Where(x => !x.ToDoSended))
                            {
                                //invio l'email a tutti
                                bool sendOk = EmailSenderServices.SendNotifyToDo(_environment.WebRootPath, item, ArchivesDbContext.Create(_connectionString), _logger);

                                //aggiorno il campo ToDoSended
                                if (sendOk)
                                {
                                    MaintenanceServices maintenanceServ2 = new MaintenanceServices(ArchivesDbContext.Create(_connectionString));
                                    maintenanceServ2.UpdateToDoSended(item.Id.Value, true);
                                }
                            }

                            //foreach (var item in activityList)
                            //    //invio l'email a tutti
                            //    EmailSenderServices.SendNotifyToDo(_environment.WebRootPath, item, ArchivesDbContext.Create(_connectionString), _logger);

                        }
                        catch (Exception ex)
                        {

                            _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n' 
                                + MethodBase.GetCurrentMethod().DeclaringType.Name + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
                        }
                    }


                    Task.Delay(60000).Wait();//60s
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

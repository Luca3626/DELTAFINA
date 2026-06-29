using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

using DeltafinaWebApp.Data.Archives;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;
using Services;
using Models.Alarm;
//using PAC2000A_Web.Data.Alarms;

namespace Tasks
{
    public class AlarmNotificationTask
    {

        private ArchivesDbContext ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString);
        private readonly ILogger _logger;

        private Task _task;
        CancellationTokenSource canctokenSource;
        CancellationToken ct;

        private IHostingEnvironment _environment;


        public AlarmNotificationTask(IHostingEnvironment env, ILogger logger)
        {
            _environment = env;
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
                    //Verifico ogni 30 secondi
                    if(DateTime.Now.Second % 30 == 0)
                    {
                        try
                        {
                            DateTime dtCurrent = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour, DateTime.Now.Minute, 0);

                            List<AlarmsNotifications> alarmsNotifications = new List<AlarmsNotifications>();
                            using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString))
                                alarmsNotifications = ctx.AlarmsNotifications.Where(x => !x.DateDisactiveEmailSended.HasValue).ToList();

                            AlarmServices alarmServices = new AlarmServices(ctx, null, null);
                            List<AlarmModel> activeAlarmList = alarmServices.GetAllActiveAlarms().ToList();//allarmi attivi
                            List<AlarmSettingDetailModel> settingAlarmList = alarmServices.GetAlarmSettingsWithNotification().ToList();

                            //Notifica allarmi attivi
                            foreach (var alarm in activeAlarmList)
                            {
                                try
                                {
                                    AlarmSettingDetailModel settingAlarm = settingAlarmList.Where(x => x.TagName.Equals(alarm.TagName)).FirstOrDefault();
                                    if (settingAlarm != null)
                                    {
                                        AlarmsNotifications alarmNotification = alarmsNotifications.Where(x => x.IdAlarm == alarm.Id & x.IdSettingAlarm == settingAlarm.Id).FirstOrDefault();

                                        if (alarmNotification == null)// || !alarmNotification.ActiveEmailSended)
                                        {
                                            //Invio notifica
                                            bool result = EmailSenderServices.SendAlarmNotificationOnAlarm(_environment.WebRootPath, settingAlarm, alarm, _logger);

                                            //NB: non verifico result in quanto se sbagliato invio email ogni 30 secondi!!
                                            using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString))
                                            {
                                                alarmNotification = new AlarmsNotifications
                                                {
                                                    ActiveEmailSended = true,
                                                    DateActiveEmailSended = dtCurrent,
                                                    DisactiveEmailSended = false,
                                                    IdAlarm = alarm.Id,
                                                    IdSettingAlarm = settingAlarm.Id
                                                };

                                                ctx.Add(alarmNotification);

                                                ctx.SaveChanges();
                                            }
                                        }
                                    }

                                }
                                catch (Exception ex)
                                {

                                    _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                                        + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[1] { alarm.Id });
                                }
                            }

                            //Notifica allarmi rientrati
                            foreach (var alarm in alarmsNotifications)
                            {
                                try
                                {
                                    AlarmSettingDetailModel settingAlarm = settingAlarmList.Where(x => x.Id.Equals(alarm.IdSettingAlarm)).FirstOrDefault();
                                    if (settingAlarm != null)
                                    {
                                        TblAllarmi allarme = null;
                                        using (var ctxAlarms = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.AlarmsConnectionString))
                                            allarme = ctxAlarms.TblAllarmi.Where(x => x.Num == alarm.IdAlarm).FirstOrDefault();

                                        //AlarmsNotifications alarmNotification = alarmsNotifications.Where(x => x.IdAlarm == alarm.Id & x.IdSettingAlarm == settingAlarm.Id).FirstOrDefault();

                                        if (allarme != null && !allarme.Stato.Equals("I"))// || !alarmNotification.ActiveEmailSended)
                                        {
                                            AlarmModel alarmModel = new AlarmModel
                                            {
                                                DateIN = allarme.DataIn,
                                                DateOUT = allarme.DataOut
                                            };

                                            //Invio notifica
                                            bool result = EmailSenderServices.SendAlarmNotificationOnReset(_environment.WebRootPath, settingAlarm, alarmModel, _logger);

                                            //NB: non verifico result in quanto se sbagliato invio email ogni 30 secondi!!
                                            using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString))
                                            {
                                                AlarmsNotifications almToUpdate = ctx.AlarmsNotifications.Where(x => x.IdAlarm == allarme.Num && x.IdSettingAlarm == settingAlarm.Id).FirstOrDefault();
                                                if (almToUpdate != null)
                                                {
                                                    almToUpdate.DisactiveEmailSended = true;
                                                    almToUpdate.DateDisactiveEmailSended = dtCurrent;
                                                    ctx.SaveChanges();
                                                }
                                            }
                                        }
                                    }

                                }
                                catch (Exception ex)
                                {

                                    _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                                        + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[2] { alarm.IdAlarm, alarm.IdSettingAlarm });
                                }
                            }

                        }
                        catch (Exception ex)
                        {

                            _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n' 
                                + MethodBase.GetCurrentMethod().DeclaringType.Name + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
                        }
                    }


                    Task.Delay(1000).Wait();//2s
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

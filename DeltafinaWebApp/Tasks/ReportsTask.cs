using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

using DeltafinaWebApp.Data.Archives;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;

namespace Tasks
{
    public class ReportsTask
    {

        //private ArchivesDbContext ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString);
        private readonly ILogger _logger;

        private Task _task;
        CancellationTokenSource canctokenSource;
        CancellationToken ct;

        private IHostingEnvironment _environment;


        public ReportsTask(IHostingEnvironment env, ILogger logger)
        {
            _environment = env;
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
                    //Verifico se il minuto 5 o multipli o 0
                    if(DateTime.Now.Minute % 5 == 0)
                    {
                        try
                        {
                            List<Reports> reportList = new List<Reports>();

                            DateTime dtCurrent = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour, DateTime.Now.Minute, 0);

                            using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString))
                                reportList = ctx.Reports.Where(x => !x.IsDeleted && x.IsEnabled).ToList();

                            foreach (var report in reportList)
                            {
                                try
                                {
                                    using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.ConnectionString))
                                    {
                                        var itemList = from ar in ctx.ActivitiesReports
                                                       join a in ctx.Activities on ar.ActivityId equals a.ActivityId
                                                       join p in ctx.Plannings on a.PlanId equals p.PlanId
                                                       where ar.ReportId == report.Id & a.State.Equals("DA FARE") & dtCurrent > p.DateStart
                                                       select new
                                                       {
                                                           ar.ReportId,
                                                           ar.ActivityId,
                                                           p.RepetitionTypeId,
                                                           p.AdviseTypeId,
                                                           p.DateStart,
                                                           p.DateEnd,
                                                           a.Description,
                                                           a.Note,
                                                           a.State
                                                       };


                                        if (itemList?.Count() > 0)
                                        {
                                            //Invio report
                                            bool result = Services.EmailSenderServices.SendMonthlyConsumptionReport(_environment.WebRootPath
                                                , report, ctx, _logger);

                                            if (result)
                                            {
                                                //recupero l'activity corrente
                                                var item = itemList.First();

                                                Activities actv = ctx.Activities.Where(x => x.ActivityId == item.ActivityId).First();
                                                if (item.RepetitionTypeId != 1)
                                                {
                                                    try
                                                    {
                                                        Plannings newPlan = new Plannings()
                                                        {
                                                            AdviseTypeId = item.AdviseTypeId,
                                                            DateEnd = item.DateEnd,
                                                            DateStart = item.DateStart,
                                                            RepetitionTypeId = item.RepetitionTypeId,
                                                            IsDeleted = false,
                                                            PlanId = Guid.NewGuid()
                                                        };

                                                        //Determino le nuove date
                                                        switch (item.RepetitionTypeId)
                                                        {
                                                            case 2://ogni giorno
                                                                newPlan.DateStart = item.DateStart.AddDays(1);
                                                                newPlan.DateEnd = item.DateEnd.AddDays(1);
                                                                break;
                                                            case 3://ogni settimana
                                                                newPlan.DateStart = item.DateStart.AddDays(7);
                                                                newPlan.DateEnd = item.DateEnd.AddDays(7);
                                                                break;
                                                            case 4://ogni 2 settimane
                                                                newPlan.DateStart = item.DateStart.AddDays(14);
                                                                newPlan.DateEnd = item.DateEnd.AddDays(14);
                                                                break;
                                                            case 5://ogni mese
                                                                newPlan.DateStart = item.DateStart.AddMonths(1);
                                                                newPlan.DateEnd = item.DateEnd.AddMonths(1);
                                                                break;
                                                            case 6://ogni anno
                                                                newPlan.DateStart = item.DateStart.AddYears(1);
                                                                newPlan.DateEnd = item.DateEnd.AddYears(1);
                                                                break;
                                                            case 7://ogni 2 anni
                                                                newPlan.DateStart = item.DateStart.AddYears(2);
                                                                newPlan.DateEnd = item.DateEnd.AddYears(2);
                                                                break;
                                                            default:
                                                                break;
                                                        }

                                                        ctx.Plannings.Add(newPlan);

                                                        Activities actvNew = new Activities()
                                                        {
                                                            ActivityId = Guid.NewGuid(),
                                                            PlanId = newPlan.PlanId,
                                                            Description = item.Description,
                                                            IsPlanned = item.RepetitionTypeId != 1 ? true : false,
                                                            RegistrationDate = DateTime.Now,
                                                            State = "DA FARE",
                                                            Note = item.Note,
                                                            CompanyIdMaster = null,
                                                            IsDeleted = false
                                                        };

                                                        ctx.Activities.Add(actvNew);

                                                        //foreach (var e in model.Employees)
                                                        //{
                                                        //    ActivitiesEmployees ae = new ActivitiesEmployees()
                                                        //    {
                                                        //        ActivityId = actvNew.ActivityId,
                                                        //        EmployeeId = e.Id
                                                        //    };
                                                        //    _anaContext.ActivitiesEmployees.Add(ae);
                                                        //}

                                                        ActivitiesReports va = new ActivitiesReports()
                                                        {
                                                            //activityre = Guid.NewGuid(),
                                                            ActivityId = actvNew.ActivityId,
                                                            ReportId = report.Id
                                                        };

                                                        ctx.ActivitiesReports.Add(va);

                                                    }
                                                    catch (Exception ex)
                                                    {

                                                        throw new Exception("Error on create new planned activity, message: " + ex.Message);
                                                    }
                                                }

                                                //Aggiorno l'attività corrente
                                                actv.Description = item.Description;
                                                actv.IsPlanned = item.RepetitionTypeId != 1 ? true : false;
                                                actv.RegistrationDate = DateTime.Now;
                                                actv.State = "ESEGUITO";
                                                actv.Note = item.Note;

                                                Plannings plan = ctx.Plannings.Where(x => x.PlanId == actv.PlanId.Value).First();
                                                plan.AdviseTypeId = item.AdviseTypeId;
                                                plan.DateEnd = item.DateEnd;
                                                plan.DateStart = item.DateStart;
                                                plan.RepetitionTypeId = item.RepetitionTypeId;

                                                ////Recupero l'associazione attività veicolo per aggiornare il cambio di veicolo associato
                                                //ActivitiesReports av = ctx.ActivitiesReports.Where(x => x.ActivityId == item.ActivityId & x.ReportId == item.ReportId).First();
                                                //av.CustomersId = model.CustomerId;

                                                ctx.SaveChanges();

                                                //// elimino preventivamente tutti gli addetti assegnati
                                                //var employeeList = _anaContext.ActivitiesEmployees.Where(x => x.ActivityId == item.ActivityId);
                                                //if (employeeList.Count() > 0)
                                                //{
                                                //    _anaContext.ActivitiesEmployees.RemoveRange(employeeList);

                                                //    _anaContext.SaveChanges();
                                                //}

                                                //// aggiunto tutti i responsabili tecnici
                                                //if (model.Employees != null)
                                                //{
                                                //    foreach (var emp in model.Employees)
                                                //    {
                                                //        ActivitiesEmployees ae = new ActivitiesEmployees()
                                                //        {
                                                //            EmployeeId = emp.Id,
                                                //            ActivityId = item.ActivityId
                                                //        };

                                                //        _anaContext.ActivitiesEmployees.Add(ae);
                                                //    }
                                                //}
                                                //_anaContext.SaveChanges();
                                            }
                                        }


                                    }

                                }
                                catch (Exception ex)
                                {

                                    _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n'
                                        + MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[1] { report.Id });
                                }
                            }

                        }
                        catch (Exception ex)
                        {

                            _logger.LogError(DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString() + '\n' 
                                + MethodBase.GetCurrentMethod().DeclaringType.Name + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);
                        }
                    }


                    Task.Delay(30000).Wait();//2s
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

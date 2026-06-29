using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Models.FileUpload;
using DeltafinaWebApp.Data.Archives;
using Models.Archives;
using Models.Archives.Maintenances;

namespace Services
{
    public class MaintenanceServices
    {

        private ArchivesDbContext _anaContext;

        private class MaintenanceUser
        {
            public Guid MaintenanceId { get; set; }
            public int UserTypeId { get; set; }
            public Guid UserId { get; set; }
            public string Email { get; set; }
            public string FullName { get; set; }
        }


        public MaintenanceServices(
            ArchivesDbContext anaContext)
        {
            _anaContext = anaContext;
        }


        #region Maintenance Activities

        public IEnumerable<MaintenanceActivityModel> GetMaintenanceActivityList()
        {
            //Users user = _anaContext.Users.Where(x => x.UsersId == userId).First();

            var maintenanceUserQuery = from mu in _anaContext.ActivitiesUsers
                                       join u in _anaContext.Users on mu.UsersId equals u.UsersId
                                       select new MaintenanceUser
                                       {
                                           MaintenanceId = mu.ActivityId,
                                           UserTypeId = u.UserTypeId,
                                           FullName = u.FullName
                                       };

            List<MaintenanceUser> maintenanceUsers = maintenanceUserQuery.ToList();

            var maintenanceContactQuery = from mu in _anaContext.ActivitiesNotifyTo
                                          join u in _anaContext.NotifyTo on mu.NotifyToId equals u.Id
                                          select new MaintenanceUser
                                          {
                                              MaintenanceId = mu.ActivityId,
                                              UserTypeId = 0,
                                              FullName = u.NotifyToValue
                                          };

            List<MaintenanceUser> maintenanceContacts = maintenanceContactQuery.ToList();

            var itemList = from va in _anaContext.ActivitiesMaintenances
                           where !va.Activity.IsDeleted
                           select new MaintenanceActivityModel()
                           {
                               Id = va.ActivityId,
                               Description = va.Activity.Description,
                               Planned = va.Activity.IsPlanned,
                               State = va.Activity.State,
                               FromDate = va.Activity.Plan.DateStart.ToLocalTime(),// vpa.DateStart,
                               ToDate = va.Activity.Plan.DateEnd.ToLocalTime(),//vpa.DateEnd,
                               RepetitionType = va.Activity.Plan.RepetitionType.Description,// vpa.RepetitionType.Description,
                               AdviseType = va.Activity.Plan.AdviseType.Description,// vpa.AdviseType.Description
                               Users = string.Join(",", maintenanceUserQuery.Where(x => x.MaintenanceId == va.ActivityId).Select(x => x.FullName).ToList()),
                               Contacts = string.Join(",", maintenanceContacts.Where(x => x.MaintenanceId == va.ActivityId).Select(x => x.FullName).ToList())
                               
                           };

            return itemList.OrderByDescending(x => x.FromDate).AsEnumerable();
        }

        public IEnumerable<MaintenanceActivityDetailModel> GetMaintenanceActivityToDoList()
        {
            var maintenanceUserQuery = from mu in _anaContext.ActivitiesUsers
                                       join u in _anaContext.Users on mu.UsersId equals u.UsersId
                                       select new MaintenanceUser
                                       {
                                           MaintenanceId = mu.ActivityId,
                                           UserTypeId = u.UserTypeId,
                                           FullName = u.FullName
                                       };

            List<MaintenanceUser> maintenanceUsers = maintenanceUserQuery.ToList();

            var maintenanceContactQuery = from mu in _anaContext.ActivitiesNotifyTo
                                          join u in _anaContext.NotifyTo on mu.NotifyToId equals u.Id
                                          select new MaintenanceUser
                                          {
                                              MaintenanceId = mu.ActivityId,
                                              Email = u.NotifyToValue
                                          };

            List<MaintenanceUser> maintenanceContacts = maintenanceContactQuery.ToList();

            //var maintenanceFileQuery = from mu in _anaContext.ActivitiesFileUpload
            //                           join u in _anaContext.FileUpload on mu.FileUploadId equals u.Id
            //                           select new result
            //                           {
            //                               MaintenanceId = mu.ActivityId,
            //                               UserTypeId = 0,
            //                               FullName = u.NotifyToValue
            //                           };

            //List<MaintenanceUser> maintenanceFiles = maintenanceFileQuery.ToList();

            var itemList = from va in _anaContext.ActivitiesMaintenances
                           join a in _anaContext.Activities on va.ActivityId equals a.ActivityId
                           join p in _anaContext.Plannings on a.PlanId equals p.PlanId
                           join r in _anaContext.RepetitionTypes on p.RepetitionTypeId equals r.RepetitionTypeId
                           join ad in _anaContext.AdviseTypes on p.AdviseTypeId equals ad.AdviseTypeId
                           where !va.Activity.IsDeleted & va.Activity.State == "DA FARE"// & !a.ToDoSended
                           select new MaintenanceActivityDetailModel()
                           {
                               Id = va.ActivityId,
                               Description = a.Description,
                               Planned = a.IsPlanned,
                               State = a.State,
                               FromDate = p.DateStart.ToLocalTime(),// vpa.DateStart,
                               ToDate = p.DateEnd.ToLocalTime(),//vpa.DateEnd,
                               RepetitionType = p.RepetitionType.Description,// vpa.RepetitionType.Description,
                               AdviseType = p.AdviseType.Description,// vpa.AdviseType.Description
                               Users = maintenanceUserQuery.Where(x => x.MaintenanceId == va.ActivityId).Select(x => x.UserId).ToList(),
                               Contacts = maintenanceContacts.Where(x => x.MaintenanceId == va.ActivityId).Select(x => x.Email).ToList(),
                               CompletedSended = a.CompletedSended,
                               ToDoSended = a.ToDoSended
                           };

            return itemList.OrderByDescending(x => x.FromDate).AsEnumerable();
        }

        public IEnumerable<MaintenanceActivityDetailModel> GetMaintenanceActivityToDoExpiredList()
        {
            //var maintenanceUserQuery = from mu in _anaContext.ActivitiesUsers
            //                           join u in _anaContext.Users on mu.UsersId equals u.UsersId
            //                           select new MaintenanceUser
            //                           {
            //                               MaintenanceId = mu.ActivityId,
            //                               UserTypeId = u.UserTypeId,
            //                               FullName = u.FullName
            //                           };

            //List<MaintenanceUser> maintenanceUsers = maintenanceUserQuery.ToList();

            //var maintenanceContactQuery = from mu in _anaContext.ActivitiesNotifyTo
            //                              join u in _anaContext.NotifyTo on mu.NotifyToId equals u.Id
            //                              select new MaintenanceUser
            //                              {
            //                                  MaintenanceId = mu.ActivityId,
            //                                  UserTypeId = 0,
            //                                  FullName = u.NotifyToValue
            //                              };

            //List<MaintenanceUser> maintenanceContacts = maintenanceContactQuery.ToList();

            ////var maintenanceFileQuery = from mu in _anaContext.ActivitiesFileUpload
            ////                           join u in _anaContext.FileUpload on mu.FileUploadId equals u.Id
            ////                           select new result
            ////                           {
            ////                               MaintenanceId = mu.ActivityId,
            ////                               UserTypeId = 0,
            ////                               FullName = u.NotifyToValue
            ////                           };

            ////List<MaintenanceUser> maintenanceFiles = maintenanceFileQuery.ToList();

            //var itemList = from va in _anaContext.ActivitiesMaintenances
            //               join a in _anaContext.Activities on va.ActivityId equals a.ActivityId
            //               join p in _anaContext.Plannings on a.PlanId equals p.PlanId
            //               join r in _anaContext.RepetitionTypes on p.RepetitionTypeId equals r.RepetitionTypeId
            //               join ad in _anaContext.AdviseTypes on p.AdviseTypeId equals ad.AdviseTypeId
            //               where !va.Activity.IsDeleted & va.Activity.State == "DA FARE"// & !a.ToDoSended
            //               select new MaintenanceActivityDetailModel()
            //               {
            //                   Id = va.ActivityId,
            //                   Description = a.Description,
            //                   Planned = a.IsPlanned,
            //                   State = a.State,
            //                   FromDate = p.DateStart,// vpa.DateStart,
            //                   ToDate = p.DateEnd,//vpa.DateEnd,
            //                   RepetitionType = p.RepetitionType.Description,// vpa.RepetitionType.Description,
            //                   AdviseType = p.AdviseType.Description,// vpa.AdviseType.Description
            //                   Users = maintenanceUserQuery.Where(x => x.MaintenanceId == va.ActivityId).Select(x => x.UserId).ToList(),
            //                   Contacts = maintenanceContacts.Where(x => x.MaintenanceId == va.ActivityId).Select(x => x.UserId).ToList()
            //               };

            List<MaintenanceActivityDetailModel> rValue = new List<MaintenanceActivityDetailModel>();

            foreach (var item in GetMaintenanceActivityToDoList())
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
                    rValue.Add(item);
            }

            return rValue.OrderByDescending(x => x.FromDate).AsEnumerable();
        }

        public IEnumerable<MaintenanceActivityDetailModel> GetMaintenanceActivityCompletedList()
        {
            var maintenanceUserQuery = from mu in _anaContext.ActivitiesUsers
                                       join u in _anaContext.Users on mu.UsersId equals u.UsersId
                                       select new MaintenanceUser
                                       {
                                           MaintenanceId = mu.ActivityId,
                                           UserTypeId = u.UserTypeId,
                                           FullName = u.FullName
                                       };

            List<MaintenanceUser> maintenanceUsers = maintenanceUserQuery.ToList();

            var maintenanceContactQuery = from mu in _anaContext.ActivitiesNotifyTo
                                          join u in _anaContext.NotifyTo on mu.NotifyToId equals u.Id
                                          select new MaintenanceUser
                                          {
                                              MaintenanceId = mu.ActivityId,
                                              Email = u.NotifyToValue
                                          };

            List<MaintenanceUser> maintenanceContacts = maintenanceContactQuery.ToList();

            //var maintenanceFileQuery = from mu in _anaContext.ActivitiesFileUpload
            //                           join u in _anaContext.FileUpload on mu.FileUploadId equals u.Id
            //                           select new result
            //                           {
            //                               MaintenanceId = mu.ActivityId,
            //                               UserTypeId = 0,
            //                               FullName = u.NotifyToValue
            //                           };

            //List<MaintenanceUser> maintenanceFiles = maintenanceFileQuery.ToList();

            var itemList = from va in _anaContext.ActivitiesMaintenances
                           join a in _anaContext.Activities on va.ActivityId equals a.ActivityId
                           join p in _anaContext.Plannings on a.PlanId equals p.PlanId
                           join r in _anaContext.RepetitionTypes on p.RepetitionTypeId equals r.RepetitionTypeId
                           join ad in _anaContext.AdviseTypes on p.AdviseTypeId equals ad.AdviseTypeId
                           where !va.Activity.IsDeleted & va.Activity.State == "FATTA"// & !a.ToDoSended
                           select new MaintenanceActivityDetailModel()
                           {
                               Id = va.ActivityId,
                               Description = a.Description,
                               Planned = a.IsPlanned,
                               State = a.State,
                               FromDate = p.DateStart.ToLocalTime(),// vpa.DateStart,
                               ToDate = p.DateEnd.ToLocalTime(),//vpa.DateEnd,
                               RepetitionType = p.RepetitionType.Description,// vpa.RepetitionType.Description,
                               AdviseType = p.AdviseType.Description,// vpa.AdviseType.Description
                               Users = maintenanceUserQuery.Where(x => x.MaintenanceId == va.ActivityId).Select(x => x.UserId).ToList(),
                               Contacts = maintenanceContacts.Where(x => x.MaintenanceId == va.ActivityId).Select(x => x.Email).ToList(),
                               ToDoSended = a.ToDoSended
                           };

            return itemList.OrderByDescending(x => x.FromDate).AsEnumerable();
        }

        public IEnumerable<MaintenanceActivityDetailModel> GetMaintenanceActivityToDoNext3Items()
        {
            List<MaintenanceActivityDetailModel> itemList = GetMaintenanceActivityToDoList().ToList();

            if (itemList?.Count() > 0)
                return itemList.OrderBy(x => x.FromDate).Take(3);
            else
                return new List<MaintenanceActivityDetailModel>();
        }

        public MaintenanceActivityDetailModel GetMaintenanceActivityById(Guid id)//[FromHeader] string id)
        {
            var queryFiles = from a in _anaContext.ActivitiesMaintenances
                             join b in _anaContext.ActivitiesFileUpload on a.ActivityId equals b.ActivityId
                             join c in _anaContext.FileUpload on b.FileUploadId equals c.Id
                             where a.ActivityId == id
                             select new FileUploadDetailModel()
                             {
                                 AbsoluteUrl = c.AbsoluteUrl,
                                 ContentType = c.ContentType,
                                 DateUpload = c.DateUpload,
                                 FileLength = c.FileLength,
                                 FileName = c.FileName,
                                 Id = c.Id,
                                 Name = c.Name,
                                 RelativeUrl = c.RelativeUrl,
                                 RewriteUrl = c.RewriteUrl
                             };

            List<FileUploadDetailModel> files = queryFiles.ToList();

            var results = from de in _anaContext.ActivitiesMaintenances
                          where de.ActivityId == id
                          select new MaintenanceActivityDetailModel()
                          {
                              Id = de.ActivityId,
                              Description = de.Activity.Description,
                              Planned = de.Activity.IsPlanned,
                              RegistrationDate = de.Activity.RegistrationDate,
                              State = de.Activity.State,
                              AdviseType = de.Activity.Plan.AdviseType.Description,
                              RepetitionType = de.Activity.Plan.RepetitionType.Description,
                              AdviseTypeId = de.Activity.Plan.AdviseTypeId,
                              RepetitionTypeId = de.Activity.Plan.RepetitionTypeId,
                              FromDate = de.Activity.Plan.DateStart.ToLocalTime(),
                              ToDate = de.Activity.Plan.DateEnd.ToLocalTime(),
                              Note = de.Activity.Note,
                              PlanningId = de.Activity.PlanId,
                              Users = _anaContext.ActivitiesUsers.Where(x => x.ActivityId == de.ActivityId).Select(x => x.Users.UsersId).ToList(),
                              Contacts = _anaContext.ActivitiesNotifyTo.Where(x => x.ActivityId == de.ActivityId).Select(x => x.NotifyTo.NotifyToValue).ToList(),
                              OtherUploadedFiles = files,
                              ToDoSended = de.Activity.ToDoSended
                          };

            MaintenanceActivityDetailModel rValue = results.FirstOrDefault();

            return rValue;
        }

        public MaintenanceActivityDetailModel AddMaintenanceActivity(MaintenanceActivityDetailModel model)
        {
            Plannings plan = new Plannings()
            {
                AdviseTypeId = model.AdviseTypeId,
                DateEnd = model.ToDate,
                DateStart = model.FromDate,
                RepetitionTypeId = model.RepetitionTypeId,
                IsDeleted = false,
                PlanId = Guid.NewGuid()
            };

            _anaContext.Plannings.Add(plan);

            Activities actv = new Activities()
            {
                ActivityId = Guid.NewGuid(),
                PlanId = plan.PlanId,
                Description = model.Description,
                IsPlanned = model.RepetitionTypeId != 1 ? true : false,
                RegistrationDate = DateTime.Now,
                State = model.State,
                Note = model.Note,
                IsDeleted = false
            };

            _anaContext.Activities.Add(actv);

            //foreach (var item in model.Employees)
            //{
            //    ActivitiesEmployees ae = new ActivitiesEmployees()
            //    {
            //        ActivityId = actv.ActivityId,
            //        EmployeeId = item.Id
            //    };
            //    _anaContext.ActivitiesEmployees.Add(ae);
            //}

            ActivitiesMaintenances va = new ActivitiesMaintenances()
            {
                ActivityId = actv.ActivityId
            };

            _anaContext.ActivitiesMaintenances.Add(va);

            // Aggiungo i responsabili tecnici
            if (model.Users != null && model.Users.Count() > 0)
            {
                foreach (var m in model.Users)
                {
                    ActivitiesUsers ctm = new ActivitiesUsers()
                    {
                        UsersId = m,
                        ActivityId = actv.ActivityId
                    };

                    _anaContext.Add(ctm);
                }
            }

            // Aggiungo i contatti
            if (model.Contacts != null && model.Contacts.Count() > 0)
            {
                int newId = 0;
                NotifyTo lastItem = _anaContext.NotifyTo.OrderByDescending(x => x.Id).FirstOrDefault();
                if (lastItem != null)
                    newId = lastItem.Id;

                foreach (var m in model.Contacts)
                {
                    newId++;

                    NotifyTo notifyTo = new NotifyTo
                    {
                        Id = newId,
                        NotifyToTypeId = 1,
                        NotifyToValue = m
                    };

                    _anaContext.Add(notifyTo);

                    ActivitiesNotifyTo ctm = new ActivitiesNotifyTo()
                    {
                        NotifyToId = notifyTo.Id,
                        ActivityId = actv.ActivityId
                    };

                    _anaContext.Add(ctm);
                }
            }

            _anaContext.SaveChanges();

            model.Id = va.ActivityId;
            //model.ActivityId = actv.ActivityId;
            model.PlanningId = plan.PlanId;

            return model;
        }

        public void UpdateMaintenanceActivity(MaintenanceActivityDetailModel model)
        {
            //Recupero l'attività a database
            ActivitiesMaintenances item = _anaContext.ActivitiesMaintenances.Where(x => x.ActivityId.Equals(model.Id)).FirstOrDefault();

            if (item == null)
                throw new Exception("Maintenance activity not found");
            else
            {
                /*
                 * Se l'attività è ripetitiva, lo stato a database è "DA FARE" e il nuovo stato impostato dall'utente è diverso,
                 * creerò una nuova attività con lo stato "DA FARE" e la data del prossimo evento,
                 * mentre salverò il nuovo stato per l'attività corrente
                 * */

                Activities actv = _anaContext.Activities.Where(x => x.ActivityId == item.ActivityId).First();
                if (actv.State.Equals("DA FARE") & !model.State.Equals("DA FARE") & model.RepetitionTypeId != 1)
                {
                    try
                    {
                        Plannings newPlan = new Plannings()
                        {
                            AdviseTypeId = model.AdviseTypeId,
                            DateEnd = model.ToDate,
                            DateStart = model.FromDate,
                            RepetitionTypeId = model.RepetitionTypeId,
                            IsDeleted = false,
                            PlanId = Guid.NewGuid()
                        };

                        //Determino le nuove date
                        switch (model.RepetitionTypeId)
                        {
                            case 2:
                                newPlan.DateStart = model.FromDate.AddDays(1);
                                newPlan.DateEnd = model.ToDate.AddDays(1);
                                break;
                            case 3:
                                newPlan.DateStart = model.FromDate.AddDays(7);
                                newPlan.DateEnd = model.ToDate.AddDays(7);
                                break;
                            case 4:
                                newPlan.DateStart = model.FromDate.AddDays(14);
                                newPlan.DateEnd = model.ToDate.AddDays(14);
                                break;
                            case 5:
                                newPlan.DateStart = model.FromDate.AddMonths(1);
                                newPlan.DateEnd = model.ToDate.AddMonths(1);
                                break;
                            case 6:
                                newPlan.DateStart = model.FromDate.AddYears(1);
                                newPlan.DateEnd = model.ToDate.AddYears(1);
                                break;
                            case 7:
                                newPlan.DateStart = model.FromDate.AddYears(2);
                                newPlan.DateEnd = model.ToDate.AddYears(2);
                                break;
                            default:
                                break;
                        }

                        _anaContext.Plannings.Add(newPlan);

                        Activities actvNew = new Activities()
                        {
                            ActivityId = Guid.NewGuid(),
                            PlanId = newPlan.PlanId,
                            Description = model.Description,
                            IsPlanned = model.RepetitionTypeId != 1 ? true : false,
                            RegistrationDate = DateTime.Now,
                            State = "DA FARE",
                            Note = model.Note,
                            IsDeleted = false
                        };

                        _anaContext.Activities.Add(actvNew);

                        ActivitiesMaintenances va = new ActivitiesMaintenances()
                        {
                            ActivityId = actvNew.ActivityId
                        };

                        _anaContext.ActivitiesMaintenances.Add(va);

                        // Aggiungo i responsabili tecnici
                        if (model.Users != null && model.Users.Count() > 0)
                        {
                            foreach (var m in model.Users)
                            {
                                ActivitiesUsers ctm = new ActivitiesUsers()
                                {
                                    UsersId = m,
                                    ActivityId = actvNew.ActivityId
                                };

                                _anaContext.Add(ctm);
                            }
                        }

                        // Aggiungo i contatti
                        if (model.Contacts != null && model.Contacts.Count() > 0)
                        {
                            int newId = 0;
                            NotifyTo lastItem = _anaContext.NotifyTo.OrderByDescending(x => x.Id).FirstOrDefault();
                            if (lastItem != null)
                                newId = lastItem.Id;

                            foreach (var m in model.Contacts)
                            {
                                newId++;

                                NotifyTo notifyTo = new NotifyTo
                                {
                                    Id = newId,
                                    NotifyToTypeId = 1,
                                    NotifyToValue = m
                                };

                                ActivitiesNotifyTo ctm = new ActivitiesNotifyTo()
                                {
                                    NotifyToId = notifyTo.Id,
                                    ActivityId = actv.ActivityId
                                };

                                _anaContext.Add(ctm);
                            }
                        }

                    }
                    catch (Exception ex)
                    {

                        throw new Exception("Error on create new planned activity, message: " + ex.Message);
                    }
                }

                //Aggiorno l'attività corrente
                actv.Description = model.Description;
                actv.IsPlanned = model.RepetitionTypeId != 1 ? true : false;
                actv.RegistrationDate = DateTime.Now;
                actv.State = model.State;
                actv.Note = model.Note;
                actv.ToDoSended = model.ToDoSended;

                Plannings plan = _anaContext.Plannings.Where(x => x.PlanId == actv.PlanId.Value).First();
                plan.AdviseTypeId = model.AdviseTypeId;
                plan.DateEnd = model.ToDate;
                plan.DateStart = model.FromDate;
                plan.RepetitionTypeId = model.RepetitionTypeId;

                //Recupero l'associazione attività veicolo per aggiornare il cambio di veicolo associato
                ActivitiesMaintenances av = _anaContext.ActivitiesMaintenances.Where(x => x.ActivityId == model.Id).First();
                //av.MaintenancesId = model.MaintenanceId;

                // elimino preventivamente tutti gli utenti assegnati
                var usersList = _anaContext.ActivitiesUsers.Where(x => x.ActivityId == item.ActivityId);
                if (usersList.Count() > 0)
                    _anaContext.ActivitiesUsers.RemoveRange(usersList);

                // elimino preventivamente tutti i contatti assegnati
                var contactList = _anaContext.ActivitiesNotifyTo.Where(x => x.ActivityId == item.ActivityId);
                if (contactList.Count() > 0)
                    _anaContext.ActivitiesNotifyTo.RemoveRange(contactList);

                // Aggiungo i responsabili tecnici
                if (model.Users != null && model.Users.Count() > 0)
                {
                    foreach (var m in model.Users)
                    {
                        ActivitiesUsers ctm = new ActivitiesUsers()
                        {
                            UsersId = m,
                            ActivityId = item.ActivityId
                        };

                        _anaContext.Add(ctm);
                    }
                }

                // Aggiungo i contatti
                if (model.Contacts != null && model.Contacts.Count() > 0)
                {
                    int newId = 0;
                    NotifyTo lastItem = _anaContext.NotifyTo.OrderByDescending(x => x.Id).FirstOrDefault();
                    if (lastItem != null)
                        newId = lastItem.Id;

                    foreach (var m in model.Contacts)
                    {
                        newId++;

                        NotifyTo notifyTo = new NotifyTo
                        {
                            Id = newId,
                            NotifyToTypeId = 1,
                            NotifyToValue = m
                        };

                        _anaContext.Add(notifyTo);

                        ActivitiesNotifyTo ctm = new ActivitiesNotifyTo()
                        {
                            NotifyToId = notifyTo.Id,
                            ActivityId = actv.ActivityId
                        };

                        _anaContext.Add(ctm);
                    }
                }

                _anaContext.SaveChanges();
            }
        }

        public void DeleteMaintenanceActivity(Guid id)
        {
            ActivitiesMaintenances item = _anaContext.ActivitiesMaintenances.Where(x => x.ActivityId == id).FirstOrDefault();
            if (item == null)
                throw new Exception("Maintenance activity not found");
            else
            {
                // elimino preventivamente tutti gli utenti assegnati
                var usersList = _anaContext.ActivitiesUsers.Where(x => x.ActivityId == item.ActivityId);
                if (usersList.Count() > 0)
                    _anaContext.ActivitiesUsers.RemoveRange(usersList);

                // elimino preventivamente tutti i contatti assegnati
                var contactList = _anaContext.ActivitiesNotifyTo.Where(x => x.ActivityId == item.ActivityId);
                if (contactList.Count() > 0)
                    _anaContext.ActivitiesNotifyTo.RemoveRange(contactList);

                ActivitiesMaintenances av = _anaContext.ActivitiesMaintenances.Where(x => x.ActivityId == item.ActivityId).First();

                _anaContext.Remove(av);

                Activities actv = _anaContext.Activities.Where(x => x.ActivityId == item.ActivityId).First();
                Plannings vpa = _anaContext.Plannings.Where(x => x.PlanId == actv.PlanId).First();

                _anaContext.Remove(vpa);

                _anaContext.Remove(actv);

                _anaContext.SaveChanges();
            }
        }

        public void UpdateToDoSended(Guid activityMaintenanceId, bool toDoSendedValue)
        {
            //Recupero l'attività a database
            ActivitiesMaintenances item = _anaContext.ActivitiesMaintenances.Where(x => x.ActivityId.Equals(activityMaintenanceId)).FirstOrDefault();

            if (item == null)
                throw new Exception("Maintenance activity not found");
            else
            {
                Activities actv = _anaContext.Activities.Where(x => x.ActivityId == item.ActivityId).First();
                actv.ToDoSended = toDoSendedValue;

                _anaContext.SaveChanges();
            }
        }

        #endregion


    }
}

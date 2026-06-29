using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DeltafinaWebApp.Data.Archives;
using Models;
using Models.Account;
using Models.Archives;
using Models.Archives.Days;
using Models.Archives.Zone;
using Models.Alarm;

namespace Services
{

    class NotifyToItem
    {
        public int NotifyToId { get; set; }
        public string NotifyTo { get; set; }
        public string NotifyToName { get; set; }
        public int AlarmId { get; set; }
        public bool OnAlarm { get; set; }
        public bool OnReset { get; set; }
        public double? Threshold { get; set; }
        public int? Delay{ get; set; }
        public DateTime LastUpdate { get; set; }
    }

    class UserItem
    {
        public Guid UserId { get; set; }
        public string User { get; set; }
        public string Email { get; set; }
        public int AlarmId { get; set; }
        public bool OnAlarm { get; set; }
        public bool OnReset { get; set; }
        public double? Threshold { get; set; }
        public int? Delay { get; set; }
        public DateTime LastUpdate { get; set; }
    }

    public class AlarmServices
    {

        private ArchivesDbContext _ctx;
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;

        public string ConnectionString { get; set; }


        public AlarmServices(ArchivesDbContext ctx, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _ctx = ctx;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        //public AlarmServices(string connectionString, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        //{
        //    ConnectionString = connectionString;
        //    _userManager = userManager;
        //    _signInManager = signInManager;
        //}



        public IEnumerable<AlarmModel> GetLast3()
        {
            List<AlarmModel> rValue = new List<AlarmModel>();

            try
            {
                foreach (var item in _ctx.TblAllarmi.Where(x => x.Stato == "I").OrderByDescending(x => x.DataIn).Take(3))
                {
                    rValue.Add(new AlarmModel
                    {
                        TextLang1 = item.TestoLang1,
                        TextLang2 = item.TestoLang2,
                        TextLang3 = item.TestoLang3,
                        TagName = item.TagName,
                        Zone = item.Zona,
                        Category = item.Categoria,
                        DateACK = item.DataAck,
                        DateIN = item.DataIn,
                        DateOUT = item.DataOut,
                        PLCName = item.PlcName,
                        State = item.Stato,
                        MachineUser = item.Utenza
                    });
                }

            }
            catch (Exception ex)
            {

                
            }

            return rValue;
        }

        public IEnumerable<AlarmModel> GetAllActiveAlarms()
        {
            List<AlarmModel> rValue = new List<AlarmModel>();

            try
            {
                foreach (var item in _ctx.TblAllarmi.Where(x => x.Stato == "I").OrderByDescending(x => x.DataIn))
                {
                    rValue.Add(new AlarmModel
                    {
                        TextLang1 = item.TestoLang1,
                        TextLang2 = item.TestoLang2,
                        TextLang3 = item.TestoLang3,
                        TagName = item.TagName,
                        Zone = item.Zona,
                        Category = item.Categoria,
                        DateACK = item.DataAck,
                        DateIN = item.DataIn,
                        DateOUT = item.DataOut,
                        PLCName = item.PlcName,
                        State = item.Stato,
                        MachineUser = item.Utenza,
                        Id = item.Num
                    });
                }

            }
            catch (Exception ex)
            {


            }

            return rValue;
        }

        public IEnumerable<AlarmModel> GetAlarmsFiltered(AlarmQueryModel model)
        {
            List<AlarmModel> rValue = new List<AlarmModel>();

            try
            {
                DateTime dateStart = model.From.ToLocalTime();
                DateTime dateEnd = model.To.ToLocalTime();

                dateStart = new DateTime(dateStart.Year, dateStart.Month, dateStart.Day, 0, 0, 0);
                dateEnd = new DateTime(dateEnd.Year, dateEnd.Month, dateEnd.Day, 0, 0, 0);

                foreach (var item in _ctx.TblAllarmi.Where(x => x.DataIn >= dateStart & x.DataIn <= dateEnd).OrderByDescending(x => x.DataIn))
                {
                    rValue.Add(new AlarmModel
                    {
                        TextLang1 = item.TestoLang1,
                        TextLang2 = item.TestoLang2,
                        TextLang3 = item.TestoLang3,
                        TagName = item.TagName,
                        Zone = item.Zona,
                        Category = item.Categoria,
                        DateACK = item.DataAck,
                        DateIN = item.DataIn,
                        DateOUT = item.DataOut,
                        PLCName = item.PlcName,
                        State = item.Stato,
                        MachineUser = item.Utenza,
                        Id = item.Num
                    });
                }

                switch (model.State)
                {
                    case "Tutti":
                        break;
                    case "Attivi":
                        rValue = rValue.Where(x => x.State == "I").ToList();
                        break;
                    case "Rientrati":
                        rValue = rValue.Where(x => x.State == "I_O").ToList();
                        break;
                    case "Riconosciuti":
                        rValue = rValue.Where(x => x.State == "I_O_A").ToList();
                        break;

                    default:
                        break;
                }

                if (model.QueryText?.Length > 0)
                    rValue = rValue.Where(x => x.TextLang1.ToLower().Contains(model.QueryText.ToLower().Trim())).ToList();

            }
            catch (Exception ex)
            {


            }

            return rValue;
        }

        public IEnumerable<AlarmModel> GetListFilteredByPLC(string plcs)
        {
            List<AlarmModel> rValue = new List<AlarmModel>();

            try
            {
                string[] plcArray = plcs.Split(new char[1] { ',' });

                foreach (var plc in plcArray)
                {
                    foreach (var item in _ctx.TblAllarmi.Where(x => x.Stato == "I" & x.PlcName.ToUpper().Trim().Equals(plc)).OrderByDescending(x => x.DataIn))
                    {
                        rValue.Add(new AlarmModel
                        {
                            TextLang1 = item.TestoLang1,
                            TextLang2 = item.TestoLang2,
                            TextLang3 = item.TestoLang3,
                            TagName = item.TagName,
                            Zone = item.Zona,
                            Category = item.Categoria,
                            DateACK = item.DataAck,
                            DateIN = item.DataIn,
                            DateOUT = item.DataOut,
                            PLCName = item.PlcName,
                            State = item.Stato,
                            MachineUser = item.Utenza
                        });
                    }
                }

            }
            catch (Exception ex)
            {


            }

            return rValue.OrderBy(x => x.State).ThenByDescending(x => x.DateIN);
        }

        public IEnumerable<AlarmModel> GetListFilteredByZones(string zone)
        {
            List<AlarmModel> rValue = new List<AlarmModel>();

            try
            {
                foreach (var item in _ctx.TblAllarmi.Where(x => x.Stato == "I" & x.Utenza.ToUpper().Trim().Equals(zone)).OrderByDescending(x => x.DataIn))
                {
                    rValue.Add(new AlarmModel
                    {
                        TextLang1 = item.TestoLang1,
                        TextLang2 = item.TestoLang2,
                        TextLang3 = item.TestoLang3,
                        TagName = item.TagName,
                        Zone = item.Zona,
                        Category = item.Categoria,
                        DateACK = item.DataAck,
                        DateIN = item.DataIn,
                        DateOUT = item.DataOut,
                        PLCName = item.PlcName,
                        State = item.Stato,
                        MachineUser = item.Utenza
                    });
                }

            }
            catch (Exception ex)
            {


            }

            return rValue.OrderBy(x => x.State).ThenByDescending(x => x.DateIN);
        }


        #region Alarm Notification

        public IEnumerable<AlarmSettingModel> GetAlarmSettingListByZone(List<string> zones)
        {
            List<AlarmSettingModel> rValue = new List<AlarmSettingModel>();

            try
            {
                using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.AlarmsConnectionString))
                {
                    var notifyToQuery = from a in _ctx.AlarmsNotifyTo
                                        join b in _ctx.NotifyTo on a.NotifyToId equals b.Id
                                        select new NotifyToItem
                                        {
                                            AlarmId = a.AlarmId,
                                            NotifyTo = b.NotifyToValue,
                                            NotifyToId = b.Id,
                                            NotifyToName = b.Recipient,
                                            OnAlarm = a.OnAlarm,
                                            OnReset = a.OnReset,
                                            Delay = a.DelayOnAlarm,
                                            LastUpdate = a.LastUpdateDate,
                                            Threshold = a.AlarmThreshold
                                        };

                    List<NotifyToItem> notifyToList = notifyToQuery.ToList();

                    var userQuery = from a in _ctx.AlarmsUsers
                                    join b in _ctx.Users on a.UserId equals b.UsersId
                                    select new UserItem
                                    {
                                        AlarmId = a.AlarmId,
                                        UserId = a.UserId,
                                        Email = b.Contact.Email,
                                        User = b.FullName,
                                        OnAlarm = a.OnAlarm,
                                        OnReset = a.OnReset,
                                        Delay = a.DelayOnAlarm,
                                        LastUpdate = a.LastUpdateDate,
                                        Threshold = a.AlarmThreshold
                                    };

                    List<UserItem> userList = userQuery.ToList();

                    foreach (var zone in zones)
                    {
                        foreach (var item in ctx.TblAlarmSettings.Where(x => x.Utenza == zone).OrderBy(x => x.TestoLang1))
                        {
                            rValue.Add(new AlarmSettingModel
                            {
                                TextLang = item.TestoLang1,
                                TagName = item.TagName,
                                Zone = item.Utenza,
                                PLCName = item.Zona,
                                MachineUser = item.Utenza,
                                Id = item.Id,
                                Selected = false,//notifyToList.Where(x => x.AlarmId == item.Id).Count() > 0 | userList.Where(x => x.AlarmId == item.Id).Count() > 0,
                                AlarmNotifyToOnAlarm = string.Join(",", notifyToList.Where(x => x.AlarmId == item.Id & x.OnAlarm).Select(x => x.NotifyTo)),
                                AlarmNotifyToOnReset = string.Join(",", notifyToList.Where(x => x.AlarmId == item.Id & x.OnReset).Select(x => x.NotifyTo)),
                                AlarmNotifyToUserOnAlarm = string.Join(",", userList.Where(x => x.AlarmId == item.Id & x.OnAlarm).Select(x => x.User)),
                                AlarmNotifyToUserOnReset = string.Join(",", userList.Where(x => x.AlarmId == item.Id & x.OnReset).Select(x => x.User)),
                            });
                        }
                    }
                }

            }
            catch (Exception ex)
            {


            }

            return rValue;
        }

        public IEnumerable<AlarmSettingModel> GetAlarmSettingList()
        {
            List<AlarmSettingModel> rValue = new List<AlarmSettingModel>();

            try
            {
                using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.AlarmsConnectionString))
                {
                    var notifyToQuery = from a in _ctx.AlarmsNotifyTo
                                        join b in _ctx.NotifyTo on a.NotifyToId equals b.Id
                                        select new NotifyToItem
                                        {
                                            AlarmId = a.AlarmId,
                                            NotifyTo = b.NotifyToValue,
                                            NotifyToId = b.Id,
                                            NotifyToName = b.Recipient,
                                            OnAlarm = a.OnAlarm,
                                            OnReset = a.OnReset,
                                            Delay = a.DelayOnAlarm,
                                            LastUpdate = a.LastUpdateDate,
                                            Threshold = a.AlarmThreshold
                                        };

                    List<NotifyToItem> notifyToList = notifyToQuery.ToList();

                    var userQuery = from a in _ctx.AlarmsUsers
                                    join b in _ctx.Users on a.UserId equals b.UsersId
                                    select new UserItem
                                    {
                                        AlarmId = a.AlarmId,
                                        UserId = a.UserId,
                                        Email = b.Contact.Email,
                                        User = b.FullName,
                                        OnAlarm = a.OnAlarm,
                                        OnReset = a.OnReset,
                                        Delay = a.DelayOnAlarm,
                                        LastUpdate = a.LastUpdateDate,
                                        Threshold = a.AlarmThreshold
                                    };

                    List<UserItem> userList = userQuery.ToList();

                    foreach (var item in ctx.TblAlarmSettings.OrderBy(x => x.TestoLang1))
                    {
                        rValue.Add(new AlarmSettingModel
                        {
                            TextLang = item.TestoLang1,
                            TagName = item.TagName,
                            Zone = item.Utenza,
                            PLCName = item.Zona,
                            MachineUser = item.Utenza,
                            Id = item.Id,
                            Selected = false,//notifyToList.Where(x => x.AlarmId == item.Id).Count() > 0 | userList.Where(x => x.AlarmId == item.Id).Count() > 0,
                            AlarmNotifyToOnAlarm = string.Join(",", notifyToList.Where(x => x.AlarmId == item.Id & x.OnAlarm).Select(x => x.NotifyTo)),
                            AlarmNotifyToOnReset = string.Join(",", notifyToList.Where(x => x.AlarmId == item.Id & x.OnReset).Select(x => x.NotifyTo)),
                            AlarmNotifyToUserOnAlarm = string.Join(",", userList.Where(x => x.AlarmId == item.Id & x.OnAlarm).Select(x => x.User)),
                            AlarmNotifyToUserOnReset = string.Join(",", userList.Where(x => x.AlarmId == item.Id & x.OnReset).Select(x => x.User)),
                        });
                    }
                }

            }
            catch (Exception ex)
            {


            }

            return rValue;
        }

        public bool UpdateAlarmSettings(AlarmSettingGroupActionModel query)
        {
            try
            {
                using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.AlarmsConnectionString))
                {
                    var notifyToQuery = from a in _ctx.AlarmsNotifyTo
                                        join b in _ctx.NotifyTo on a.NotifyToId equals b.Id
                                        select new NotifyToItem
                                        {
                                            AlarmId = a.AlarmId,
                                            NotifyTo = b.NotifyToValue,
                                            NotifyToId = b.Id,
                                            NotifyToName = b.Recipient,
                                            OnAlarm = a.OnAlarm,
                                            OnReset = a.OnReset,
                                            Delay = a.DelayOnAlarm,
                                            LastUpdate = a.LastUpdateDate,
                                            Threshold = a.AlarmThreshold
                                        };

                    List<NotifyToItem> notifyToList = notifyToQuery.ToList();

                    var userQuery = from a in _ctx.AlarmsUsers
                                    join b in _ctx.Users on a.UserId equals b.UsersId
                                    select new UserItem
                                    {
                                        AlarmId = a.AlarmId,
                                        UserId = a.UserId,
                                        Email = b.Contact.Email,
                                        User = b.FullName,
                                        OnAlarm = a.OnAlarm,
                                        OnReset = a.OnReset,
                                        Delay = a.DelayOnAlarm,
                                        LastUpdate = a.LastUpdateDate,
                                        Threshold = a.AlarmThreshold
                                    };

                    List<UserItem> userList = userQuery.ToList();

                    //List<TblAlarmSettings> alarmSettingList = new List<TblAlarmSettings>();

                    //foreach (var zone in query.Zones)
                    //    alarmSettingList.AddRange(ctx.TblAlarmSettings.Where(x => x.Utenza == zone).OrderBy(x => x.TestoLang1).ToList());

                    int newId = 0;
                    foreach (var alm in query.Alarms.Where(x => x.Selected))
                    {
                        //Rimuovo le notifiche esistenti
                        List<AlarmsNotifyTo> alarmsNotifiesExisting = _ctx.AlarmsNotifyTo.Where(x => x.AlarmId == alm.Id).ToList();
                        _ctx.RemoveRange(alarmsNotifiesExisting);
                        List<AlarmsUsers> alarmsUsersExisting = _ctx.AlarmsUsers.Where(x => x.AlarmId == alm.Id).ToList();
                        _ctx.RemoveRange(alarmsUsersExisting);

                        NotifyTo notifyToLastData = _ctx.NotifyTo.OrderByDescending(x => x.Id).Take(1).FirstOrDefault();
                        newId = notifyToLastData != null ? notifyToLastData.Id : 0;

                        List<AlarmsNotifyTo> newNotifyToAlarmList = new List<AlarmsNotifyTo>();
                        List<AlarmsUsers> newUserAlarmList = new List<AlarmsUsers>();

                        foreach (var notify in query.AlarmNotifyToOnAlarmList)
                        {
                            newId++;

                            NotifyTo notifyToNewData = new NotifyTo
                            {
                                Id = newId,
                                NotifyToTypeId = 1,
                                NotifyToValue = notify,
                                Recipient = ""//notify.NotifyToRecipient
                            };

                            _ctx.Add(notifyToNewData);

                            AlarmsNotifyTo notifyToOnAlarmData = new AlarmsNotifyTo
                            {
                                AlarmId = alm.Id,
                                //AlarmThreshold = notify.AlarmThreshold,
                                //DelayOnAlarm = notify.DelayOnAlarm,
                                LastUpdateDate = DateTime.Now,
                                NotifyToId = notifyToNewData.Id,
                                OnAlarm = true,
                                OnReset = false
                            };

                            _ctx.Add(notifyToOnAlarmData);
                            newNotifyToAlarmList.Add(notifyToOnAlarmData);
                        }
                        foreach (var notify in query.AlarmNotifyToOnResetList)
                        {
                            newId++;

                            NotifyTo notifyToNewData = new NotifyTo
                            {
                                Id = newId,
                                NotifyToTypeId = 1,
                                NotifyToValue = notify,
                                Recipient = ""//notify.NotifyToRecipient
                            };

                            _ctx.Add(notifyToNewData);

                            AlarmsNotifyTo notifyToOnAlarmData = new AlarmsNotifyTo
                            {
                                AlarmId = alm.Id,
                                //AlarmThreshold = notify.AlarmThreshold,
                                //DelayOnAlarm = notify.DelayOnAlarm,
                                LastUpdateDate = DateTime.Now,
                                NotifyToId = notifyToNewData.Id,
                                OnAlarm = false,
                                OnReset = true
                            };

                            _ctx.Add(notifyToOnAlarmData);
                        }

                        foreach (var notify in query.AlarmNotifyToUserOnAlarmList)
                        {
                            AlarmsUsers notifyToOnAlarmData = new AlarmsUsers
                            {
                                AlarmId = alm.Id,
                                //AlarmThreshold = notify.AlarmThreshold,
                                //DelayOnAlarm = notify.DelayOnAlarm,
                                LastUpdateDate = DateTime.Now,
                                UserId = new Guid(notify),
                                OnAlarm = true,
                                OnReset = false
                            };

                            _ctx.Add(notifyToOnAlarmData);
                            newUserAlarmList.Add(notifyToOnAlarmData);
                        }
                        foreach (var notify in query.AlarmNotifyToUserOnResetList)
                        {
                            //Verifico se ho già aggiunto lo stesso utente
                            AlarmsUsers newAlarmUser = newUserAlarmList.Where(x => x.UserId == new Guid(notify)).FirstOrDefault();

                            if (newAlarmUser == null)
                            {
                                AlarmsUsers notifyToOnAlarmData = new AlarmsUsers
                                {
                                    AlarmId = alm.Id,
                                    //AlarmThreshold = notify.AlarmThreshold,
                                    //DelayOnAlarm = notify.DelayOnAlarm,
                                    LastUpdateDate = DateTime.Now,
                                    UserId = new Guid(notify),
                                    OnAlarm = false,
                                    OnReset = true
                                };

                                _ctx.Add(notifyToOnAlarmData);
                            }
                            else
                            {
                                newAlarmUser.OnReset = true;
                            }

                        }

                        _ctx.SaveChanges();
                    }
                }

                return true;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public AlarmSettingDetailModel GetAlarmSettingsWithNotificationByTag(string tag)
        {
            List<AlarmSettingDetailModel> rValue = new List<AlarmSettingDetailModel>();

            try
            {
                using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.AlarmsConnectionString))
                {
                    var notifyToQuery = from a in _ctx.AlarmsNotifyTo
                                        join b in _ctx.NotifyTo on a.NotifyToId equals b.Id
                                        select new NotifyToItem
                                        {
                                            AlarmId = a.AlarmId,
                                            NotifyTo = b.NotifyToValue,
                                            NotifyToId = b.Id,
                                            NotifyToName = b.Recipient,
                                            OnAlarm = a.OnAlarm,
                                            OnReset = a.OnReset,
                                            Delay = a.DelayOnAlarm,
                                            LastUpdate = a.LastUpdateDate,
                                            Threshold = a.AlarmThreshold
                                        };

                    List<NotifyToItem> notifyToList = notifyToQuery.ToList();

                    var userQuery = from a in _ctx.AlarmsUsers
                                    join b in _ctx.Users on a.UserId equals b.UsersId
                                    select new UserItem
                                    {
                                        AlarmId = a.AlarmId,
                                        UserId = a.UserId,
                                        Email = b.Contact.Email,
                                        User = b.FullName,
                                        OnAlarm = a.OnAlarm,
                                        OnReset = a.OnReset,
                                        Delay = a.DelayOnAlarm,
                                        LastUpdate = a.LastUpdateDate,
                                        Threshold = a.AlarmThreshold
                                    };

                    List<UserItem> userList = userQuery.ToList();

                    foreach (var item in ctx.TblAlarmSettings.Where(x => x.TagName.Equals(tag)))
                    {
                        if (notifyToList.Where(x => x.AlarmId == item.Id).Count() == 0 & userList.Where(x => x.AlarmId == item.Id).Count() == 0)
                            continue;

                        rValue.Add(new AlarmSettingDetailModel
                        {
                            TextLang1 = item.TestoLang1,
                            TextLang2 = item.TestoLang2,
                            TextLang3 = item.TestoLang3,
                            TagName = item.TagName,
                            Zone = item.Utenza,
                            PLCName = item.Zona,
                            MachineUser = item.Utenza,
                            Id = item.Id,

                            AlarmNotifyToOnAlarmList = notifyToList.Where(x => x.AlarmId == item.Id & x.OnAlarm).Select(x => new AlarmNotifyToModel
                            {
                                AlarmThreshold = 0,//x.Threshold,
                                DelayOnAlarm = 0,//x.Delay,
                                LastUpdateDate = x.LastUpdate,
                                NotifyToId = x.NotifyToId,
                                NotifyToRecipient = x.NotifyToName,
                                NotifyToValue = x.NotifyTo
                            }).ToList()
                            ,
                            AlarmNotifyToOnResetList = notifyToList.Where(x => x.AlarmId == item.Id & x.OnReset).Select(x => new AlarmNotifyToModel
                            {
                                AlarmThreshold = 0,//x.Threshold,
                                DelayOnAlarm = 0,//x.Delay,
                                LastUpdateDate = x.LastUpdate,
                                NotifyToId = x.NotifyToId,
                                NotifyToRecipient = x.NotifyToName,
                                NotifyToValue = x.NotifyTo
                            }).ToList(),

                            AlarmNotifyToUserOnAlarmList = userList.Where(x => x.AlarmId == item.Id & x.OnAlarm).Select(x => new AlarmUserModel
                            {
                                AlarmThreshold = 0,//x.Threshold,
                                DelayOnAlarm = 0,//x.Delay,
                                LastUpdateDate = x.LastUpdate,
                                UserId = x.UserId,
                                User = x.User,
                                Email = x.Email
                            }).ToList()
                            ,
                            AlarmNotifyToUserOnResetList = userList.Where(x => x.AlarmId == item.Id & x.OnReset).Select(x => new AlarmUserModel
                            {
                                AlarmThreshold = 0,//x.Threshold,
                                DelayOnAlarm = 0,//x.Delay,
                                LastUpdateDate = x.LastUpdate,
                                UserId = x.UserId,
                                User = x.User,
                                Email = x.Email
                            }).ToList()
                        });
                    }
                }

            }
            catch (Exception ex)
            {


            }

            return rValue.FirstOrDefault();
        }

        public IEnumerable<AlarmSettingDetailModel> GetAlarmSettingsWithNotification()
        {
            List<AlarmSettingDetailModel> rValue = new List<AlarmSettingDetailModel>();

            try
            {
                using (var ctx = ArchivesDbContext.Create(DeltafinaWebApp.ConStr.AlarmsConnectionString))
                {
                    var notifyToQuery = from a in _ctx.AlarmsNotifyTo
                                        join b in _ctx.NotifyTo on a.NotifyToId equals b.Id
                                        select new NotifyToItem
                                        {
                                            AlarmId = a.AlarmId,
                                            NotifyTo = b.NotifyToValue,
                                            NotifyToId = b.Id,
                                            NotifyToName = b.Recipient,
                                            OnAlarm = a.OnAlarm,
                                            OnReset = a.OnReset,
                                            Delay = a.DelayOnAlarm,
                                            LastUpdate = a.LastUpdateDate,
                                            Threshold = a.AlarmThreshold
                                        };

                    List<NotifyToItem> notifyToList = notifyToQuery.ToList();

                    var userQuery = from a in _ctx.AlarmsUsers
                                    join b in _ctx.Users on a.UserId equals b.UsersId
                                    select new UserItem
                                    {
                                        AlarmId = a.AlarmId,
                                        UserId = a.UserId,
                                        Email = b.Contact.Email,
                                        User = b.FullName,
                                        OnAlarm = a.OnAlarm,
                                        OnReset = a.OnReset,
                                        Delay = a.DelayOnAlarm,
                                        LastUpdate = a.LastUpdateDate,
                                        Threshold = a.AlarmThreshold
                                    };

                    List<UserItem> userList = userQuery.ToList();

                    foreach (var item in ctx.TblAlarmSettings.OrderBy(x => x.TestoLang1))
                    {
                        if (notifyToList.Where(x => x.AlarmId == item.Id).Count() == 0 & userList.Where(x => x.AlarmId == item.Id).Count() == 0)
                            continue;

                        rValue.Add(new AlarmSettingDetailModel
                        {
                            TextLang1 = item.TestoLang1,
                            TextLang2 = item.TestoLang2,
                            TextLang3 = item.TestoLang3,
                            TagName = item.TagName,
                            Zone = item.Utenza,
                            PLCName = item.Zona,
                            MachineUser = item.Utenza,
                            Id = item.Id,

                            AlarmNotifyToOnAlarmList = notifyToList.Where(x => x.AlarmId == item.Id & x.OnAlarm).Select(x => new AlarmNotifyToModel
                            {
                                AlarmThreshold = 0,//x.Threshold,
                                DelayOnAlarm = 0,//x.Delay,
                                LastUpdateDate = x.LastUpdate,
                                NotifyToId = x.NotifyToId,
                                NotifyToRecipient = x.NotifyToName,
                                NotifyToValue = x.NotifyTo
                            }).ToList()
                            ,
                            AlarmNotifyToOnResetList = notifyToList.Where(x => x.AlarmId == item.Id & x.OnReset).Select(x => new AlarmNotifyToModel
                            {
                                AlarmThreshold = 0,//x.Threshold,
                                DelayOnAlarm = 0,//x.Delay,
                                LastUpdateDate = x.LastUpdate,
                                NotifyToId = x.NotifyToId,
                                NotifyToRecipient = x.NotifyToName,
                                NotifyToValue = x.NotifyTo
                            }).ToList(),

                            AlarmNotifyToUserOnAlarmList = userList.Where(x => x.AlarmId == item.Id & x.OnAlarm).Select(x => new AlarmUserModel
                            {
                                AlarmThreshold = 0,//x.Threshold,
                                DelayOnAlarm = 0,//x.Delay,
                                LastUpdateDate = x.LastUpdate,
                                UserId = x.UserId,
                                User = x.User,
                                Email = x.Email
                            }).ToList()
                            ,
                            AlarmNotifyToUserOnResetList = userList.Where(x => x.AlarmId == item.Id & x.OnReset).Select(x => new AlarmUserModel
                            {
                                AlarmThreshold = 0,//x.Threshold,
                                DelayOnAlarm = 0,//x.Delay,
                                LastUpdateDate = x.LastUpdate,
                                UserId = x.UserId,
                                User = x.User,
                                Email = x.Email
                            }).ToList()
                        });
                    }
                }

            }
            catch (Exception ex)
            {


            }

            return rValue;
        }

        #endregion

    }
}

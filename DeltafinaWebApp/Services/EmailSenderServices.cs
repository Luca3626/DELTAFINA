using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using DeltafinaWebApp.Data.Archives;
using Models.Alarm;
using Models.Archives.Maintenances;
//using Models.Archives.Maintenances;

namespace Services
{

    class NotifyToMaintenance
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }


    public class EmailSenderServices
    {

        public static bool SendNotifyToDo(string envWebRootPath
            , MaintenanceActivityDetailModel maintenanceActivity
            , ArchivesDbContext ctx
            , ILogger logger)
        {
            try
            {
                bool rValue = false;

                //Recupero la lista dei contatti associati
                var contacts = from u in ctx.ActivitiesNotifyTo
                               join c in ctx.NotifyTo on u.NotifyToId equals c.Id
                               where u.ActivityId == maintenanceActivity.Id
                               select new NotifyToMaintenance
                               {
                                   UserId = Guid.Empty,
                                   Name = "",
                                   Email = c.NotifyToValue
                               };

                //Recupero la lista dei tag da inserire nel report
                var users = from a in ctx.ActivitiesUsers
                            join b in ctx.Users on a.UsersId equals b.UsersId
                            join c in ctx.Contacts on b.ContactId equals c.Id
                            where a.ActivityId == maintenanceActivity.Id
                            select new NotifyToMaintenance
                            {
                                UserId = b.UsersId,
                                Name = b.FullName,
                                Email = c.Email
                            };

                List<NotifyToMaintenance> notifyToList = new List<NotifyToMaintenance>();
                notifyToList.AddRange(contacts);
                notifyToList.AddRange(users);

                //Recupero la data di inizio periodo
                DateTime dtStart = DateTime.Now.AddMonths(-1);
                dtStart = new DateTime(dtStart.Year, dtStart.Month, 1, 0, 0, 0);

                //Recupero la data di fine periodo
                DateTime dtEnd = dtStart.AddMonths(1);


                StringBuilder bodyHtml = new StringBuilder();
                var fromAddress = new MailAddress("__SMTP_USER__", "DELTAFINA Control Room");
                const string fromPassword = "__SMTP_PASSWORD__";

                var uploads = Path.Combine(envWebRootPath, "Repository\\Email\\NotifyToDo\\");

                //DateTime dtMax = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59);

                //Scorro la lista degli employee
                foreach (var notifyTo in notifyToList)
                {
                    try
                    {
                        bodyHtml = new StringBuilder();

                        var toAddress = new MailAddress(notifyTo.Email);
                        string subject = maintenanceActivity.Description + " - AVVISO";

                        string filePath = Path.Combine(uploads, "001_header.txt");

                        StreamReader sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "002_body_header_0.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        bodyHtml.Append("<h4>" + maintenanceActivity.Description + "</h4>");
                        bodyHtml.Append("<h3 style=\"color:red\">Data prevista per la manutenzione: " + maintenanceActivity.FromDate.ToLongDateString() + " " + maintenanceActivity.FromDate.ToLongTimeString() + "</h3>");//Dinamicizzare il mese, OK
                        bodyHtml.Append("</p>");
                        bodyHtml.Append("<p style=\"margin: 0; font - size: 14px; line-height: 21px\">Note: " + maintenanceActivity.Note + "</p>");//Dinamicizzare inizio periodo, OK
                        //bodyHtml.Append("Fine periodo: " + dtEnd.AddDays(-1).ToShortDateString() + "<br></p>");//Dinamicizzare fine periodo, OK

                        filePath = Path.Combine(uploads, "003_body_header_1.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "007_body_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "008_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();



                        var smtp = new SmtpClient
                        {
                            Host = "__SMTP_HOST__",
                            Port = 25,
                            EnableSsl = false,
                            DeliveryMethod = SmtpDeliveryMethod.Network,
                            UseDefaultCredentials = false,
                            Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                        };
                        using (var message = new MailMessage(fromAddress, toAddress)
                        {
                            Subject = subject,
                            Body = bodyHtml.ToString(),
                            IsBodyHtml = true
                        })
                        {
                            smtp.Send(message);
                        }

                        rValue = true;

                    }
                    catch (Exception ex)
                    {
                        logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);

                        //rValue = false;
                    }
                }

                return rValue;

            }
            catch (Exception ex)
            {
                logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);

                return false;
            }
        }

        public static bool SendMonthlyConsumptionReport(string envWebRootPath
            , Reports report
            , ArchivesDbContext ctx
            , ILogger logger)
        {
            try
            {
                //Recupero la lista dei contatti associati
                var notifyToList = from n in ctx.NotifyTo
                                   join rn in ctx.ReportsNotifyTo on n.Id equals rn.NotifyToId
                                   where rn.ReportId == report.Id
                                   select n;

                //Recupero la lista dei tag da inserire nel report
                var tagList = from t in ctx.TagsToSave
                              join rt in ctx.ReportsTagsToSave on t.TagLogName equals rt.TagLogName
                              where rt.ReportId == report.Id
                              select new
                              {
                                  t.Descriptions,
                                  t.TagLogName,
                                  rt.Unit,
                                  rt.UnitConverterFactor,
                                  rt.RoundDigit
                              };

                //Recupero la data di inizio periodo
                DateTime dtStart = DateTime.Now.AddMonths(-1);
                dtStart = new DateTime(dtStart.Year, dtStart.Month, 1, 0, 0, 0);

                //Recupero la data di fine periodo
                DateTime dtEnd = dtStart.AddMonths(1);


                StringBuilder bodyHtml = new StringBuilder();
                var fromAddress = new MailAddress("__SMTP_USER__", "DELTAFINA Control Room");
                const string fromPassword = "__SMTP_PASSWORD__";

                var uploads = Path.Combine(envWebRootPath, "Repository\\Email\\MonthlyConsumptionReports\\");

                //DateTime dtMax = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59);

                //Scorro la lista degli employee
                foreach (var notifyTo in notifyToList)
                {
                    try
                    {
                        if (notifyTo.NotifyToValue == null || notifyTo.NotifyToValue.Length == 0 || notifyTo.NotifyToTypeId != 1)
                            continue;

                        bodyHtml = new StringBuilder();

                        var toAddress = new MailAddress(notifyTo.NotifyToValue);
                        string subject = report.Title;

                        string filePath = Path.Combine(uploads, "001_header.txt");

                        StreamReader sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "002_body_header_0.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        bodyHtml.Append("<h4>" + report.Title + "</h4>");
                        bodyHtml.Append("<h3>Mese di riferimento: " + GetMonthStr(dtStart.Month) + "</h3>");//Dinamicizzare il mese, OK
                        bodyHtml.Append("</p>");
                        bodyHtml.Append("<p style=\"margin: 0; font - size: 14px; line-height: 21px\">Inizio periodo: " + dtStart.ToShortDateString() +"<br>");//Dinamicizzare inizio periodo, OK
                        bodyHtml.Append("Fine periodo: " + dtEnd.AddDays(-1).ToShortDateString() + "<br></p>");//Dinamicizzare fine periodo, OK

                        filePath = Path.Combine(uploads, "003_body_header_1.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();


                        foreach (var tag in tagList)
                        {
                            //Recupero il valore del tag ad inizio periodo (primo valore del mese di riferimento)
                            TagLogging firstSampleTag = ctx.TagLogging.Where(x => x.TagLogName == tag.TagLogName && x.LogDate >= dtStart).OrderBy(x => x.LogDate).FirstOrDefault();


                            //Recupero il valore del tag a fine periodo (primmo valore del mese successivo a quello di riferimento)
                            TagLogging lastSampleTag = ctx.TagLogging.Where(x => x.TagLogName == tag.TagLogName && x.LogDate >= dtEnd).OrderBy(x => x.LogDate).FirstOrDefault();

                            double firstValue = firstSampleTag.LogValue;
                            double lastValue = lastSampleTag.LogValue;

                            //Calcolo la differenza
                            double consumption = -9999;
                            if (firstSampleTag != null && lastSampleTag != null)
                            {
                                //Applico il fattore di conversione per l'unità di misura richiesta
                                firstValue = firstValue * tag.UnitConverterFactor;
                                lastValue = lastValue * tag.UnitConverterFactor;

                                //Applico l'arrotondamento richiesto
                                if (tag.RoundDigit.HasValue)
                                {
                                    firstValue = Math.Round(firstValue, tag.RoundDigit.Value);
                                    lastValue = Math.Round(lastValue, tag.RoundDigit.Value);
                                }

                                consumption = lastValue - firstValue;
                            }
                                
                            
                            filePath = Path.Combine(uploads, "004_body_row_0.txt");

                            sr = new StreamReader(filePath, Encoding.UTF8);
                            bodyHtml.Append(sr.ReadToEnd());
                            sr.Close();

                            bodyHtml.Append("<p style=\"margin: 0; font-size: 14px; line-height: 17px\">");
                            bodyHtml.Append(tag.Descriptions);//Dinamicizzare descrizione tag, OK
                            bodyHtml.Append("<br/><ul><li>");
                            bodyHtml.Append("Valore al " + dtStart.ToShortDateString() + ": " + tag.Unit + " " + firstValue);
                            bodyHtml.Append("</li><li>");
                            bodyHtml.Append("Valore al " + dtEnd.AddDays(-1).ToShortDateString() + ": " + tag.Unit + " " + lastValue);
                            bodyHtml.Append("</p>");

                            filePath = Path.Combine(uploads, "005_body_row_1.txt");

                            sr = new StreamReader(filePath, Encoding.UTF8);
                            bodyHtml.Append(sr.ReadToEnd());
                            sr.Close();

                            bodyHtml.Append("<p style=\"margin: 0;font-size: 14px;line-height: 17px;text-align: right\"><strong>" + tag.Unit + " " + consumption + "</strong></p>");//Dinamicizzare unità di misura, OK

                            filePath = Path.Combine(uploads, "006_body_row_2.txt");

                            sr = new StreamReader(filePath, Encoding.UTF8);
                            bodyHtml.Append(sr.ReadToEnd());
                            sr.Close();
                        }





                        filePath = Path.Combine(uploads, "007_body_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "008_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();
                        


                        var smtp = new SmtpClient
                        {
                            Host = "__SMTP_HOST__",
                            Port = 25,
                            EnableSsl = false,
                            DeliveryMethod = SmtpDeliveryMethod.Network,
                            UseDefaultCredentials = false,
                            Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                        };
                        using (var message = new MailMessage(fromAddress, toAddress)
                        {
                            Subject = subject,
                            Body = bodyHtml.ToString(),
                            IsBodyHtml = true
                        })
                        {
                            smtp.Send(message);
                        }

                    }
                    catch (Exception ex)
                    {
                        logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);

                        return false;
                    }
                }

                return true;

            }
            catch (Exception ex)
            {
                logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);

                return false;
            }
        }

        public static bool SendAlarmNotificationOnAlarm(string envWebRootPath
            , AlarmSettingDetailModel alarmSetting
            , AlarmModel alarm
            //, AnagraficheDbContext ctx
            , ILogger logger)
        {
            try
            {
                ////Recupero la lista dei contatti associati
                //var notifyToList = from n in ctx.NotifyTo
                //                   join rn in ctx.ReportsNotifyTo on n.Id equals rn.NotifyToId
                //                   where rn.ReportId == report.Id
                //                   select n;

                ////Recupero la lista dei tag da inserire nel report
                //var tagList = from t in ctx.TagsToSave
                //              join rt in ctx.ReportsTagsToSave on t.TagLogName equals rt.TagLogName
                //              where rt.ReportId == report.Id
                //              select new
                //              {
                //                  t.Descriptions,
                //                  t.TagLogName,
                //                  rt.Unit,
                //                  rt.UnitConverterFactor,
                //                  rt.RoundDigit
                //              };

                //Recupero la data di inizio periodo
                DateTime dtStart = DateTime.Now.AddMonths(-1);
                dtStart = new DateTime(dtStart.Year, dtStart.Month, 1, 0, 0, 0);

                //Recupero la data di fine periodo
                DateTime dtEnd = dtStart.AddMonths(1);


                StringBuilder bodyHtml = new StringBuilder();
                var fromAddress = new MailAddress("__SMTP_USER__", "DELTAFINA Control Room");
                const string fromPassword = "__SMTP_PASSWORD__";

                var uploads = Path.Combine(envWebRootPath, "Repository\\Email\\AlarmNotification\\");

                //DateTime dtMax = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59);

                //Scorro la lista degli employee
                foreach (var notifyTo in alarmSetting.AlarmNotifyToOnAlarmList)
                {
                    try
                    {
                        if (notifyTo.NotifyToValue == null || notifyTo.NotifyToValue.Length == 0)
                            continue;

                        bodyHtml = new StringBuilder();

                        var toAddress = new MailAddress(notifyTo.NotifyToValue);
                        string subject = alarmSetting.TextLang1 + " - NUOVO ALLARME!";

                        string filePath = Path.Combine(uploads, "001_header.txt");

                        StreamReader sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "002_body_header_0.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        bodyHtml.Append("<h4>" + alarmSetting.TextLang1 + "</h4>");
                        bodyHtml.Append("<h3 style=\"color:red\">Notifica nuovo allarme!<h3>");//Dinamicizzare il mese, OK
                        bodyHtml.Append("</p>");
                        bodyHtml.Append("<p style=\"margin: 0; font-size: 14px; line-height: 21px\">");
                        bodyHtml.Append("Attivazione allarme: " + alarm.DateIN.ToShortDateString() + " " + alarm.DateIN.ToShortTimeString() + "<br>");//Dinamicizzare inizio periodo, OK
                        //bodyHtml.Append("Fine periodo: " + dtEnd.AddDays(-1).ToShortDateString() + "<br>");
                        bodyHtml.Append("</p>");//Dinamicizzare fine periodo, OK

                        filePath = Path.Combine(uploads, "003_body_header_1.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();


                        //foreach (var tag in tagList)
                        //{
                        //    //Recupero il valore del tag ad inizio periodo (primo valore del mese di riferimento)
                        //    TagLogging firstSampleTag = ctx.TagLogging.Where(x => x.TagLogName == tag.TagLogName && x.LogDate >= dtStart).OrderBy(x => x.LogDate).FirstOrDefault();


                        //    //Recupero il valore del tag a fine periodo (primmo valore del mese successivo a quello di riferimento)
                        //    TagLogging lastSampleTag = ctx.TagLogging.Where(x => x.TagLogName == tag.TagLogName && x.LogDate >= dtEnd).OrderBy(x => x.LogDate).FirstOrDefault();

                        //    double firstValue = firstSampleTag.LogValue;
                        //    double lastValue = lastSampleTag.LogValue;

                        //    //Calcolo la differenza
                        //    double consumption = -9999;
                        //    if (firstSampleTag != null && lastSampleTag != null)
                        //    {
                        //        //Applico il fattore di conversione per l'unità di misura richiesta
                        //        firstValue = firstValue * tag.UnitConverterFactor;
                        //        lastValue = lastValue * tag.UnitConverterFactor;

                        //        //Applico l'arrotondamento richiesto
                        //        if (tag.RoundDigit.HasValue)
                        //        {
                        //            firstValue = Math.Round(firstValue, tag.RoundDigit.Value);
                        //            lastValue = Math.Round(lastValue, tag.RoundDigit.Value);
                        //        }

                        //        consumption = lastValue - firstValue;
                        //    }


                        //    filePath = Path.Combine(uploads, "004_body_row_0.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();

                        //    bodyHtml.Append("<p style=\"margin: 0; font-size: 14px; line-height: 17px\">");
                        //    bodyHtml.Append(tag.Descriptions);//Dinamicizzare descrizione tag, OK
                        //    bodyHtml.Append("<br/><ul><li>");
                        //    bodyHtml.Append("Valore al " + dtStart.ToShortDateString() + ": " + tag.Unit + " " + firstValue);
                        //    bodyHtml.Append("</li><li>");
                        //    bodyHtml.Append("Valore al " + dtEnd.AddDays(-1).ToShortDateString() + ": " + tag.Unit + " " + lastValue);
                        //    bodyHtml.Append("</p>");

                        //    filePath = Path.Combine(uploads, "005_body_row_1.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();

                        //    bodyHtml.Append("<p style=\"margin: 0;font-size: 14px;line-height: 17px;text-align: right\"><strong>" + tag.Unit + " " + consumption + "</strong></p>");//Dinamicizzare unità di misura, OK

                        //    filePath = Path.Combine(uploads, "006_body_row_2.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();
                        //}





                        filePath = Path.Combine(uploads, "007_body_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "008_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();



                        var smtp = new SmtpClient
                        {
                            Host = "__SMTP_HOST__",
                            Port = 25,
                            EnableSsl = false,
                            DeliveryMethod = SmtpDeliveryMethod.Network,
                            UseDefaultCredentials = false,
                            Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                        };
                        using (var message = new MailMessage(fromAddress, toAddress)
                        {
                            Subject = subject,
                            Body = bodyHtml.ToString(),
                            IsBodyHtml = true
                        })
                        {
                            smtp.Send(message);
                        }

                    }
                    catch (Exception ex)
                    {
                        logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);

                        return false;
                    }
                }

                //Scorro la lista degli employee
                foreach (var notifyTo in alarmSetting.AlarmNotifyToUserOnAlarmList)
                {
                    try
                    {
                        if (notifyTo.Email == null || notifyTo.Email.Length == 0)
                            continue;

                        bodyHtml = new StringBuilder();

                        var toAddress = new MailAddress(notifyTo.Email);
                        string subject = alarmSetting.TextLang1 + " - NUOVO ALLARME!";

                        string filePath = Path.Combine(uploads, "001_header.txt");

                        StreamReader sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "002_body_header_0.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        bodyHtml.Append("<h4>" + alarmSetting.TextLang1 + "</h4>");
                        bodyHtml.Append("<h3 style=\"color:red\">Notifica nuovo allarme!<h3>");//Dinamicizzare il mese, OK
                        bodyHtml.Append("</p>");
                        bodyHtml.Append("<p style=\"margin: 0; font-size: 14px; line-height: 21px\">");
                        bodyHtml.Append("Attivazione allarme: " + alarm.DateIN.ToShortDateString() + " " + alarm.DateIN.ToShortTimeString() + "<br>");//Dinamicizzare inizio periodo, OK
                        //bodyHtml.Append("Fine periodo: " + dtEnd.AddDays(-1).ToShortDateString() + "<br>");
                        bodyHtml.Append("</p>");//Dinamicizzare fine periodo, OK

                        filePath = Path.Combine(uploads, "003_body_header_1.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();


                        //foreach (var tag in tagList)
                        //{
                        //    //Recupero il valore del tag ad inizio periodo (primo valore del mese di riferimento)
                        //    TagLogging firstSampleTag = ctx.TagLogging.Where(x => x.TagLogName == tag.TagLogName && x.LogDate >= dtStart).OrderBy(x => x.LogDate).FirstOrDefault();


                        //    //Recupero il valore del tag a fine periodo (primmo valore del mese successivo a quello di riferimento)
                        //    TagLogging lastSampleTag = ctx.TagLogging.Where(x => x.TagLogName == tag.TagLogName && x.LogDate >= dtEnd).OrderBy(x => x.LogDate).FirstOrDefault();

                        //    double firstValue = firstSampleTag.LogValue;
                        //    double lastValue = lastSampleTag.LogValue;

                        //    //Calcolo la differenza
                        //    double consumption = -9999;
                        //    if (firstSampleTag != null && lastSampleTag != null)
                        //    {
                        //        //Applico il fattore di conversione per l'unità di misura richiesta
                        //        firstValue = firstValue * tag.UnitConverterFactor;
                        //        lastValue = lastValue * tag.UnitConverterFactor;

                        //        //Applico l'arrotondamento richiesto
                        //        if (tag.RoundDigit.HasValue)
                        //        {
                        //            firstValue = Math.Round(firstValue, tag.RoundDigit.Value);
                        //            lastValue = Math.Round(lastValue, tag.RoundDigit.Value);
                        //        }

                        //        consumption = lastValue - firstValue;
                        //    }


                        //    filePath = Path.Combine(uploads, "004_body_row_0.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();

                        //    bodyHtml.Append("<p style=\"margin: 0; font-size: 14px; line-height: 17px\">");
                        //    bodyHtml.Append(tag.Descriptions);//Dinamicizzare descrizione tag, OK
                        //    bodyHtml.Append("<br/><ul><li>");
                        //    bodyHtml.Append("Valore al " + dtStart.ToShortDateString() + ": " + tag.Unit + " " + firstValue);
                        //    bodyHtml.Append("</li><li>");
                        //    bodyHtml.Append("Valore al " + dtEnd.AddDays(-1).ToShortDateString() + ": " + tag.Unit + " " + lastValue);
                        //    bodyHtml.Append("</p>");

                        //    filePath = Path.Combine(uploads, "005_body_row_1.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();

                        //    bodyHtml.Append("<p style=\"margin: 0;font-size: 14px;line-height: 17px;text-align: right\"><strong>" + tag.Unit + " " + consumption + "</strong></p>");//Dinamicizzare unità di misura, OK

                        //    filePath = Path.Combine(uploads, "006_body_row_2.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();
                        //}





                        filePath = Path.Combine(uploads, "007_body_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "008_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();



                        var smtp = new SmtpClient
                        {
                            Host = "__SMTP_HOST__",
                            Port = 25,
                            EnableSsl = false,
                            DeliveryMethod = SmtpDeliveryMethod.Network,
                            UseDefaultCredentials = false,
                            Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                        };
                        using (var message = new MailMessage(fromAddress, toAddress)
                        {
                            Subject = subject,
                            Body = bodyHtml.ToString(),
                            IsBodyHtml = true
                        })
                        {
                            smtp.Send(message);
                        }

                    }
                    catch (Exception ex)
                    {
                        logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);

                        return false;
                    }
                }

                return true;

            }
            catch (Exception ex)
            {
                logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);

                return false;
            }
        }

        public static bool SendAlarmNotificationOnReset(string envWebRootPath
            , AlarmSettingDetailModel alarmSetting
            , AlarmModel alarm
            //, AnagraficheDbContext ctx
            , ILogger logger)
        {
            try
            {
                //Recupero la data di inizio periodo
                DateTime dtStart = DateTime.Now.AddMonths(-1);
                dtStart = new DateTime(dtStart.Year, dtStart.Month, 1, 0, 0, 0);

                //Recupero la data di fine periodo
                DateTime dtEnd = dtStart.AddMonths(1);


                StringBuilder bodyHtml = new StringBuilder();
                var fromAddress = new MailAddress("__SMTP_USER__", "DELTAFINA Control Room");
                const string fromPassword = "__SMTP_PASSWORD__";

                var uploads = Path.Combine(envWebRootPath, "Repository\\Email\\AlarmNotification\\");

                //DateTime dtMax = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59);

                //Scorro la lista degli employee
                foreach (var notifyTo in alarmSetting.AlarmNotifyToOnResetList)
                {
                    try
                    {
                        if (notifyTo.NotifyToValue == null || notifyTo.NotifyToValue.Length == 0)
                            continue;

                        bodyHtml = new StringBuilder();

                        var toAddress = new MailAddress(notifyTo.NotifyToValue);
                        string subject = alarmSetting.TextLang1 + " - ALLARME RIENTRATO!";

                        string filePath = Path.Combine(uploads, "001_header.txt");

                        StreamReader sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "002_body_header_0.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        bodyHtml.Append("<h4>" + alarmSetting.TextLang1 + "</h4>");
                        bodyHtml.Append("<h3 style=\"color:green\">Allarme Rientrato!<h3>");//Dinamicizzare il mese, OK
                        bodyHtml.Append("</p>");
                        bodyHtml.Append("<p style=\"margin: 0; font-size: 14px; line-height: 21px\">");
                        bodyHtml.Append("Attivazione allarme: " + alarm.DateIN.ToShortDateString() + " " + alarm.DateIN.ToShortTimeString() + "<br>");//Dinamicizzare inizio periodo, OK
                        bodyHtml.Append("Allarme rientrato: " + alarm.DateOUT.ToShortDateString() + " " + alarm.DateOUT.ToShortTimeString() + "<br>");//Dinamicizzare inizio periodo, OK
                        bodyHtml.Append("</p>");//Dinamicizzare fine periodo, OK

                        filePath = Path.Combine(uploads, "003_body_header_1.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();


                        //foreach (var tag in tagList)
                        //{
                        //    //Recupero il valore del tag ad inizio periodo (primo valore del mese di riferimento)
                        //    TagLogging firstSampleTag = ctx.TagLogging.Where(x => x.TagLogName == tag.TagLogName && x.LogDate >= dtStart).OrderBy(x => x.LogDate).FirstOrDefault();


                        //    //Recupero il valore del tag a fine periodo (primmo valore del mese successivo a quello di riferimento)
                        //    TagLogging lastSampleTag = ctx.TagLogging.Where(x => x.TagLogName == tag.TagLogName && x.LogDate >= dtEnd).OrderBy(x => x.LogDate).FirstOrDefault();

                        //    double firstValue = firstSampleTag.LogValue;
                        //    double lastValue = lastSampleTag.LogValue;

                        //    //Calcolo la differenza
                        //    double consumption = -9999;
                        //    if (firstSampleTag != null && lastSampleTag != null)
                        //    {
                        //        //Applico il fattore di conversione per l'unità di misura richiesta
                        //        firstValue = firstValue * tag.UnitConverterFactor;
                        //        lastValue = lastValue * tag.UnitConverterFactor;

                        //        //Applico l'arrotondamento richiesto
                        //        if (tag.RoundDigit.HasValue)
                        //        {
                        //            firstValue = Math.Round(firstValue, tag.RoundDigit.Value);
                        //            lastValue = Math.Round(lastValue, tag.RoundDigit.Value);
                        //        }

                        //        consumption = lastValue - firstValue;
                        //    }


                        //    filePath = Path.Combine(uploads, "004_body_row_0.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();

                        //    bodyHtml.Append("<p style=\"margin: 0; font-size: 14px; line-height: 17px\">");
                        //    bodyHtml.Append(tag.Descriptions);//Dinamicizzare descrizione tag, OK
                        //    bodyHtml.Append("<br/><ul><li>");
                        //    bodyHtml.Append("Valore al " + dtStart.ToShortDateString() + ": " + tag.Unit + " " + firstValue);
                        //    bodyHtml.Append("</li><li>");
                        //    bodyHtml.Append("Valore al " + dtEnd.AddDays(-1).ToShortDateString() + ": " + tag.Unit + " " + lastValue);
                        //    bodyHtml.Append("</p>");

                        //    filePath = Path.Combine(uploads, "005_body_row_1.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();

                        //    bodyHtml.Append("<p style=\"margin: 0;font-size: 14px;line-height: 17px;text-align: right\"><strong>" + tag.Unit + " " + consumption + "</strong></p>");//Dinamicizzare unità di misura, OK

                        //    filePath = Path.Combine(uploads, "006_body_row_2.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();
                        //}





                        filePath = Path.Combine(uploads, "007_body_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "008_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();



                        var smtp = new SmtpClient
                        {
                            Host = "__SMTP_HOST__",
                            Port = 25,
                            EnableSsl = false,
                            DeliveryMethod = SmtpDeliveryMethod.Network,
                            UseDefaultCredentials = false,
                            Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                        };
                        using (var message = new MailMessage(fromAddress, toAddress)
                        {
                            Subject = subject,
                            Body = bodyHtml.ToString(),
                            IsBodyHtml = true
                        })
                        {
                            smtp.Send(message);
                        }

                    }
                    catch (Exception ex)
                    {
                        //logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);

                        return false;
                    }
                }

                //Scorro la lista degli employee
                foreach (var notifyTo in alarmSetting.AlarmNotifyToUserOnResetList)
                {
                    try
                    {
                        if (notifyTo.Email == null || notifyTo.Email.Length == 0)
                            continue;

                        bodyHtml = new StringBuilder();

                        var toAddress = new MailAddress(notifyTo.Email);
                        string subject = alarmSetting.TextLang1 + " - ALLARME RIENTRATO!";

                        string filePath = Path.Combine(uploads, "001_header.txt");

                        StreamReader sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "002_body_header_0.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        bodyHtml.Append("<h4>" + alarmSetting.TextLang1 + "</h4>");
                        bodyHtml.Append("<h3 style=\"color:green\">Allarme Rientrato!<h3>");//Dinamicizzare il mese, OK
                        bodyHtml.Append("</p>");
                        bodyHtml.Append("<p style=\"margin: 0; font-size: 14px; line-height: 21px\">");
                        bodyHtml.Append("Attivazione allarme: " + alarm.DateIN.ToShortDateString() + " " + alarm.DateIN.ToShortTimeString() + "<br>");//Dinamicizzare inizio periodo, OK
                        bodyHtml.Append("Allarme rientrato: " + alarm.DateOUT.ToShortDateString() + " " + alarm.DateOUT.ToShortTimeString() + "<br>");//Dinamicizzare inizio periodo, OK
                        bodyHtml.Append("</p>");//Dinamicizzare fine periodo, OK

                        filePath = Path.Combine(uploads, "003_body_header_1.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();


                        //foreach (var tag in tagList)
                        //{
                        //    //Recupero il valore del tag ad inizio periodo (primo valore del mese di riferimento)
                        //    TagLogging firstSampleTag = ctx.TagLogging.Where(x => x.TagLogName == tag.TagLogName && x.LogDate >= dtStart).OrderBy(x => x.LogDate).FirstOrDefault();


                        //    //Recupero il valore del tag a fine periodo (primmo valore del mese successivo a quello di riferimento)
                        //    TagLogging lastSampleTag = ctx.TagLogging.Where(x => x.TagLogName == tag.TagLogName && x.LogDate >= dtEnd).OrderBy(x => x.LogDate).FirstOrDefault();

                        //    double firstValue = firstSampleTag.LogValue;
                        //    double lastValue = lastSampleTag.LogValue;

                        //    //Calcolo la differenza
                        //    double consumption = -9999;
                        //    if (firstSampleTag != null && lastSampleTag != null)
                        //    {
                        //        //Applico il fattore di conversione per l'unità di misura richiesta
                        //        firstValue = firstValue * tag.UnitConverterFactor;
                        //        lastValue = lastValue * tag.UnitConverterFactor;

                        //        //Applico l'arrotondamento richiesto
                        //        if (tag.RoundDigit.HasValue)
                        //        {
                        //            firstValue = Math.Round(firstValue, tag.RoundDigit.Value);
                        //            lastValue = Math.Round(lastValue, tag.RoundDigit.Value);
                        //        }

                        //        consumption = lastValue - firstValue;
                        //    }


                        //    filePath = Path.Combine(uploads, "004_body_row_0.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();

                        //    bodyHtml.Append("<p style=\"margin: 0; font-size: 14px; line-height: 17px\">");
                        //    bodyHtml.Append(tag.Descriptions);//Dinamicizzare descrizione tag, OK
                        //    bodyHtml.Append("<br/><ul><li>");
                        //    bodyHtml.Append("Valore al " + dtStart.ToShortDateString() + ": " + tag.Unit + " " + firstValue);
                        //    bodyHtml.Append("</li><li>");
                        //    bodyHtml.Append("Valore al " + dtEnd.AddDays(-1).ToShortDateString() + ": " + tag.Unit + " " + lastValue);
                        //    bodyHtml.Append("</p>");

                        //    filePath = Path.Combine(uploads, "005_body_row_1.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();

                        //    bodyHtml.Append("<p style=\"margin: 0;font-size: 14px;line-height: 17px;text-align: right\"><strong>" + tag.Unit + " " + consumption + "</strong></p>");//Dinamicizzare unità di misura, OK

                        //    filePath = Path.Combine(uploads, "006_body_row_2.txt");

                        //    sr = new StreamReader(filePath, Encoding.UTF8);
                        //    bodyHtml.Append(sr.ReadToEnd());
                        //    sr.Close();
                        //}





                        filePath = Path.Combine(uploads, "007_body_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();

                        filePath = Path.Combine(uploads, "008_footer.txt");

                        sr = new StreamReader(filePath, Encoding.UTF8);
                        bodyHtml.Append(sr.ReadToEnd());
                        sr.Close();



                        var smtp = new SmtpClient
                        {
                            Host = "__SMTP_HOST__",
                            Port = 25,
                            EnableSsl = false,
                            DeliveryMethod = SmtpDeliveryMethod.Network,
                            UseDefaultCredentials = false,
                            Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                        };
                        using (var message = new MailMessage(fromAddress, toAddress)
                        {
                            Subject = subject,
                            Body = bodyHtml.ToString(),
                            IsBodyHtml = true
                        })
                        {
                            smtp.Send(message);
                        }

                    }
                    catch (Exception ex)
                    {
                        //logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);

                        return false;
                    }
                }


                return true;

            }
            catch (Exception ex)
            {
                //logger.LogError(MethodBase.GetCurrentMethod().DeclaringType.Name + "." + MethodBase.GetCurrentMethod().Name, ex, ex.Message, new object[0]);

                return false;
            }
        }

        private static string GetMonthStr(int month)
        {
            switch (month)
            {
                case 1:
                    return "Gennaio";
                case 2:
                    return "Febbraio";
                case 3:
                    return "Marzo";
                case 4:
                    return "Aprile";
                case 5:
                    return "Maggio";
                case 6:
                    return "Giugno";
                case 7:
                    return "Luglio";
                case 8:
                    return "Agosto";
                case 9:
                    return "Settembre";
                case 10:
                    return "Ottobre";
                case 11:
                    return "Novembre";
                case 12:
                    return "Dicembre";

                default:
                    return "Errore";
            }
        }

    }
}

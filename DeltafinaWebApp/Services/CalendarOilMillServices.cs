using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DeltafinaWebApp.Data.Archives;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Models.Archives;
using Models.Archives.Calendar;
using Models.Archives.Contract;
using Models.FileUpload;
using QRCoder;
using Services.Hosted;

namespace Services
{
    public class CalendarOilMillServices
    {

        private ArchivesDbContext _anaContext;
        private IHostingEnvironment _environment;
        private readonly ILogger _logger;
        private readonly TaskSettings _settings;


        public CalendarOilMillServices(ArchivesDbContext anaContext
            , IHostingEnvironment environment
            , ILogger logger)
        {
            _anaContext = anaContext;
            _environment = environment;
            _logger = logger;
        }

        public IEnumerable<CalendarOilMillContractModel> GetDetailedListCurrentYearByPortalFarmId(Guid portalFarmId)
        {
            //List<Weighing> weighingList = _anaContext.ContractsWeighing.Select(x => new Weighing
            //{
            //    Bin = x.Bins,
            //    ContractId = x.ContractId,
            //    Date = x.WeightDate,
            //    PortalFarmId = x.PortalFarmId,
            //    Weight = x.CurrentWeight
            //}).ToList();

            var calendars = from cal in _anaContext.Calendar
                            join cc in _anaContext.CalendarContracts on cal.Id equals cc.CalendarId
                            join con in _anaContext.Contracts on cc.ContractId equals con.Id
                            join conOil in _anaContext.ContractsOilMill on con.Id equals conOil.ContractId
                            where !con.Deleted & cal.PortalFarmId == portalFarmId & cal.StartDate.Year == DateTime.Now.Year
                            orderby cal.StartDate
                            select new CalendarOilMillContractModel()
                            {
                                Id = cal.Id,
                                AllDay = cal.AllDay,
                                Color = cal.Color,
                                CreationDate = cal.CreationDate.ToLocalTime(),
                                Editable = cal.Editable,
                                End = cal.EndDate.ToLocalTime(),
                                LastUpdate = cal.LastUpdate.ToLocalTime(),
                                Note = cal.Note,
                                PortalFarmId = cal.PortalFarmId,
                                Start = cal.StartDate.ToLocalTime(),
                                Title = cal.Title,
                                UserId = cal.UserId,
                                Invoiced = con.Invoiced,
                                Workable = con.Workable,
                                OilMillContract = new OilMillContractModel
                                {
                                    UserId = con.UserId,
                                    Title = con.Title,
                                    PortalFarmId = con.PortalFarmId,
                                    Barcode = con.Barcode,
                                    Code = con.Code,
                                    CollectionOliveDate = getDateTime(conOil.CollectionOliveDate),
                                    RegionCollectionOlive = conOil.RegionCollectionOlive,
                                    LocationCollectionOlive = conOil.LocationCollectionOlive,
                                    ContractDate = con.ContractDate.ToLocalTime(),
                                    CreationDate = con.CreationDate.ToLocalTime(),
                                    CrusherTypeId = conOil.CrusherTypeId,
                                    CrusherType = conOil.CrusherType.Name,
                                    CultivarId = conOil.CultivarId,
                                    Cultivar = conOil.Cultivar.Name,
                                    CustomerId = con.CustomerId,
                                    Deleted = con.Deleted,
                                    Id = con.Id,
                                    DesideredOilFilteredQuantity = conOil.OilDesideredFilterQuantity,
                                    LastUpdate = con.LastUpdate.ToLocalTime(),
                                    MillDate = getDateTime(conOil.MillDate),
                                    Note = con.Note,
                                    OilAnalysisTypeId = conOil.OilAnalysisTypeId,
                                    OilAnalysisType = conOil.OilAnalysisType.Name,
                                    OilFilterTypeId = conOil.OilFilterTypeId,
                                    OilFilterType = conOil.OilFilterType.Name,
                                    OilWeight = conOil.OilWeight,
                                    OilWeightInDeposit = conOil.OilWeightInDeposit,
                                    OliveWeight = conOil.OliveWeight,
                                    OliveWeightExpected = conOil.OliveWeightExpected,
                                    PurchasedOlives = conOil.PurchasedOlives,
                                    QrCode = con.QrCode,
                                    CustomLabel = conOil.CustomLabel,
                                    Workable = con.Workable,
                                    Invoiced = con.Invoiced,
                                    OilReady = conOil.OilReady,
                                    Packaging = conOil.Packaging,
                                    Tank5L = conOil.Tank5L,
                                    Tank10L = conOil.Tank10L,
                                    Tank15L = conOil.Tank15L,
                                    Tank20L = conOil.Tank20L,
                                    Tank25L = conOil.Tank25L,
                                    Tank30L = conOil.Tank30L,
                                    Tank50L = conOil.Tank50L,
                                    ThirdParties = conOil.ThirdParties,
                                    WorkStateId = con.WorkStateId,
                                    WorkState = con.WorkState.Title,
                                    ReturnPercent = conOil.ReturnPercentage,
                                    BinsTaken = conOil.BinsTaken,
                                    EmailOilReadySended = conOil.EmailOilReadySended,//,
                                    //OliveWeighings = weighingList.Where(x => x.ContractId == con.Id).ToArray()
                                }
                            };

            return calendars.AsEnumerable();
        }


        public IEnumerable<CalendarModel> GetListByPortalFarmId(Guid portalFarmId)
        {
            var calendars = from cal in _anaContext.Calendar
                            join cc in _anaContext.CalendarContracts on cal.Id equals cc.CalendarId
                            join con in _anaContext.Contracts on cc.ContractId equals con.Id
                            where !con.Deleted & cal.PortalFarmId == portalFarmId
                            orderby cal.StartDate
                            select new CalendarModel()
                            {
                                Id = cal.Id,
                                AllDay = cal.AllDay,
                                Color = cal.Color,
                                CreationDate = cal.CreationDate.ToLocalTime(),
                                Editable = cal.Editable,
                                End = cal.EndDate.ToLocalTime(),
                                LastUpdate = cal.LastUpdate.ToLocalTime(),
                                Note = cal.Note,
                                PortalFarmId = cal.PortalFarmId,
                                Start = cal.StartDate.ToLocalTime(),
                                Title = cal.Title,
                                UserId = cal.UserId,
                                Invoiced = con.Invoiced
                            };

            return calendars.AsEnumerable();
        }

        public IEnumerable<CalendarOilMillContractModel> GetDetailedListByPortalFarmId(Guid portalFarmId)
        {
            //List<Weighing> weighingList = _anaContext.ContractsWeighing.Select(x => new Weighing
            //{
            //    Bin = x.Bins,
            //    ContractId = x.ContractId,
            //    Date = x.WeightDate,
            //    PortalFarmId = x.PortalFarmId,
            //    Weight = x.CurrentWeight
            //}).ToList();

            var calendars = from cal in _anaContext.Calendar
                            join cc in _anaContext.CalendarContracts on cal.Id equals cc.CalendarId
                            join con in _anaContext.Contracts on cc.ContractId equals con.Id
                            join conOil in _anaContext.ContractsOilMill on con.Id equals conOil.ContractId
                            where !con.Deleted & cal.PortalFarmId == portalFarmId
                            orderby cal.StartDate
                            select new CalendarOilMillContractModel()
                            {
                                Id = cal.Id,
                                AllDay = cal.AllDay,
                                Color = cal.Color,
                                CreationDate = cal.CreationDate.ToLocalTime(),
                                Editable = cal.Editable,
                                End = cal.EndDate.ToLocalTime(),
                                LastUpdate = cal.LastUpdate.ToLocalTime(),
                                Note = cal.Note,
                                PortalFarmId = cal.PortalFarmId,
                                Start = cal.StartDate.ToLocalTime(),
                                Title = cal.Title,
                                UserId = cal.UserId,
                                Invoiced = con.Invoiced,
                                OilMillContract = new OilMillContractModel
                                {
                                    UserId = con.UserId,
                                    Title = con.Title,
                                    PortalFarmId = con.PortalFarmId,
                                    Barcode = con.Barcode,
                                    Code = con.Code,
                                    CollectionOliveDate = getDateTime(conOil.CollectionOliveDate),
                                    RegionCollectionOlive = conOil.RegionCollectionOlive,
                                    LocationCollectionOlive = conOil.LocationCollectionOlive,
                                    ContractDate = con.ContractDate.ToLocalTime(),
                                    CreationDate = con.CreationDate.ToLocalTime(),
                                    CrusherTypeId = conOil.CrusherTypeId,
                                    CrusherType = conOil.CrusherType.Name,
                                    CultivarId = conOil.CultivarId,
                                    Cultivar = conOil.Cultivar.Name,
                                    CustomerId = con.CustomerId,
                                    Deleted = con.Deleted,
                                    Id = con.Id,
                                    DesideredOilFilteredQuantity = conOil.OilDesideredFilterQuantity,
                                    LastUpdate = con.LastUpdate.ToLocalTime(),
                                    MillDate = getDateTime(conOil.MillDate),
                                    Note = con.Note,
                                    OilAnalysisTypeId = conOil.OilAnalysisTypeId,
                                    OilAnalysisType = conOil.OilAnalysisType.Name,
                                    OilFilterTypeId = conOil.OilFilterTypeId,
                                    OilFilterType = conOil.OilFilterType.Name,
                                    OilWeight = conOil.OilWeight,
                                    OilWeightInDeposit = conOil.OilWeightInDeposit,
                                    OliveWeight = conOil.OliveWeight,
                                    OliveWeightExpected = conOil.OliveWeightExpected,
                                    PurchasedOlives = conOil.PurchasedOlives,
                                    QrCode = con.QrCode,
                                    CustomLabel = conOil.CustomLabel,
                                    Workable = con.Workable,
                                    Invoiced = con.Invoiced,
                                    OilReady = conOil.OilReady,
                                    Packaging = conOil.Packaging,
                                    Tank5L = conOil.Tank5L,
                                    Tank10L = conOil.Tank10L,
                                    Tank15L = conOil.Tank15L,
                                    Tank20L = conOil.Tank20L,
                                    Tank25L = conOil.Tank25L,
                                    Tank30L = conOil.Tank30L,
                                    Tank50L = conOil.Tank50L,
                                    ThirdParties = conOil.ThirdParties,
                                    WorkStateId = con.WorkStateId,
                                    WorkState = con.WorkState.Title,
                                    ReturnPercent = conOil.ReturnPercentage,
                                    BinsTaken = conOil.BinsTaken,
                                    EmailOilReadySended = conOil.EmailOilReadySended//,
                                    //OliveWeighings = weighingList.Where(x => x.ContractId == con.Id).ToArray()
                                }
                            };

            return calendars.AsEnumerable();
        }

        private DateTime? getDateTime(DateTime? value)
        {
            DateTime? rValue = null;

            if (value.HasValue)
                rValue = value.Value.ToLocalTime();

            return rValue;
        }

        public IEnumerable<Weighing> GetWeighingsByCalendarId(Guid calendarId)
        {
            CalendarContracts calCon = _anaContext.CalendarContracts.Where(x => x.CalendarId == calendarId).FirstOrDefault();
            if (calCon == null)
                throw new Exception("Appuntamento non trovato");

            List<Weighing> weighingList = _anaContext.ContractsWeighing.Where(x => x.ContractId == calCon.ContractId).Select(x => new Weighing
            {
                Id = x.ContractWaighingId,
                Bin = x.Bins,
                ContractId = x.ContractId,
                Date = x.WeightDate.ToLocalTime(),
                PortalFarmId = x.PortalFarmId,
                Weight = x.CurrentWeight
            }).ToList();

            return weighingList.AsEnumerable();
        }

        public CalendarOilMillContractModel GetById(Guid id)
        {
            List<Companies> companies = _anaContext.Companies.ToList();

            List<Weighing> weighingList = _anaContext.ContractsWeighing.Select(x => new Weighing
            {
                Id = x.ContractWaighingId,
                Bin = x.Bins,
                ContractId = x.ContractId,
                Date = x.WeightDate.ToLocalTime(),
                PortalFarmId = x.PortalFarmId,
                Weight = x.CurrentWeight
            }).ToList();

            var queryFiles = from a in _anaContext.Calendar
                             join b in _anaContext.CalendarContracts on a.Id equals b.CalendarId
                             join c in _anaContext.ContractsFileUpload on b.ContractId equals c.ContractId
                             join d in _anaContext.FileUpload on c.FileUploadId equals d.Id
                             where a.Id == id
                             select new FileUploadDetailModel()
                             {
                                 AbsoluteUrl = d.AbsoluteUrl,
                                 ContentType = d.ContentType,
                                 DateUpload = d.DateUpload,
                                 FileLength = d.FileLength,
                                 FileName = d.FileName,
                                 Id = d.Id,
                                 Name = d.Name,
                                 RelativeUrl = d.RelativeUrl,
                                 RewriteUrl = d.RewriteUrl
                             };

            List<FileUploadDetailModel> files = queryFiles.ToList();

            var calendars = from cal in _anaContext.Calendar
                            join cc in _anaContext.CalendarContracts on cal.Id equals cc.CalendarId
                            join con in _anaContext.Contracts on cc.ContractId equals con.Id
                            join conOil in _anaContext.ContractsOilMill on con.Id equals conOil.ContractId
                            //join comp in _anaContext.Companies on con.CustomerId equals comp.CompanyId
                            where cal.Id == id
                            select new CalendarOilMillContractModel()
                            {
                                Id = cal.Id,
                                AllDay = cal.AllDay,
                                Color = cal.Color,
                                CreationDate = cal.CreationDate.ToLocalTime(),
                                Editable = cal.Editable,
                                End = cal.EndDate.ToLocalTime(),
                                LastUpdate = cal.LastUpdate.ToLocalTime(),
                                Note = cal.Note,
                                PortalFarmId = cal.PortalFarmId,
                                Start = cal.StartDate.ToLocalTime(),
                                Title = cal.Title,//comp.Name
                                UserId = cal.UserId,
                                Invoiced = con.Invoiced,
                                OilMillContract = new OilMillContractModel
                                {
                                    UserId = con.UserId,
                                    Title = con.Title,
                                    PortalFarmId = con.PortalFarmId,
                                    Barcode = con.Barcode,
                                    Code = con.Code,
                                    CollectionOliveDate = getDateTime(conOil.CollectionOliveDate),
                                    RegionCollectionOlive = conOil.RegionCollectionOlive,
                                    LocationCollectionOlive = conOil.LocationCollectionOlive,
                                    ContractDate = con.ContractDate.ToLocalTime(),
                                    CreationDate = con.CreationDate.ToLocalTime(),
                                    CrusherTypeId = conOil.CrusherTypeId,
                                    CrusherType = conOil.CrusherType.Name,
                                    CultivarId = conOil.CultivarId,
                                    Cultivar = conOil.Cultivar.Name,
                                    CustomerId = con.CustomerId,
                                    Customer = companies.Where(x => x.CompanyId == con.CustomerId).First().Name,
                                    Deleted = con.Deleted,
                                    Id = con.Id,
                                    DesideredOilFilteredQuantity = conOil.OilDesideredFilterQuantity,
                                    LastUpdate = con.LastUpdate.ToLocalTime(),
                                    MillDate = getDateTime(conOil.MillDate),
                                    Note = con.Note,
                                    OilAnalysisTypeId = conOil.OilAnalysisTypeId,
                                    OilAnalysisType = conOil.OilAnalysisType.Name,
                                    OilFilterTypeId = conOil.OilFilterTypeId,
                                    OilFilterType = conOil.OilFilterType.Name,
                                    OilWeight = conOil.OilWeight,
                                    OilWeightInDeposit = conOil.OilWeightInDeposit,
                                    OliveWeight = conOil.OliveWeight,
                                    OliveWeightExpected = conOil.OliveWeightExpected,
                                    PurchasedOlives = conOil.PurchasedOlives,
                                    QrCode = con.QrCode,
                                    CustomLabel = conOil.CustomLabel,
                                    Workable = con.Workable,
                                    Invoiced = con.Invoiced,
                                    OilReady = conOil.OilReady,
                                    Packaging = conOil.Packaging,
                                    Tank5L = conOil.Tank5L,
                                    Tank10L = conOil.Tank10L,
                                    Tank15L = conOil.Tank15L,
                                    Tank20L = conOil.Tank20L,
                                    Tank25L = conOil.Tank25L,
                                    Tank30L = conOil.Tank30L,
                                    Tank50L = conOil.Tank50L,
                                    ThirdParties = conOil.ThirdParties,
                                    WorkStateId = con.WorkStateId,
                                    WorkState = con.WorkState.Description,
                                    OliveWeighings = weighingList.Where(x => x.ContractId == con.Id).ToArray(),
                                    BinsTaken = conOil.BinsTaken,
                                    ReturnPercent = conOil.ReturnPercentage,
                                    BB3 = conOil.Bb3,
                                    BB5 = conOil.Bb5,
                                    Bottle100 = conOil.Bottle100,
                                    Bottle250 = conOil.Bottle250,
                                    Bottle500 = conOil.Bottle500,
                                    Bottle750 = conOil.Bottle750,
                                    PackagingComplete = conOil.PackagingComplete,
                                    OilFilteredWeight = conOil.OilFilteredWeight,
                                    EmailOilReadySended = conOil.EmailOilReadySended,
                                    PlcId = con.PlcId
                                },
                                OtherUploadedFiles = files
                            };

            return calendars.FirstOrDefault();
        }

        public CalendarOilMillContractModel GetByCode(string code)
        {
            List<Companies> companies = _anaContext.Companies.ToList();

            List<Weighing> weighingList = _anaContext.ContractsWeighing.Select(x => new Weighing
            {
                Id = x.ContractWaighingId,
                Bin = x.Bins,
                ContractId = x.ContractId,
                Date = x.WeightDate.ToLocalTime(),
                PortalFarmId = x.PortalFarmId,
                Weight = x.CurrentWeight
            }).ToList();

            var queryFiles = from a in _anaContext.Calendar
                             join b in _anaContext.CalendarContracts on a.Id equals b.CalendarId
                             join con in _anaContext.Contracts on b.ContractId equals con.Id
                             join c in _anaContext.ContractsFileUpload on b.ContractId equals c.ContractId
                             join d in _anaContext.FileUpload on c.FileUploadId equals d.Id
                             where con.Code == code
                             select new FileUploadDetailModel()
                             {
                                 AbsoluteUrl = d.AbsoluteUrl,
                                 ContentType = d.ContentType,
                                 DateUpload = d.DateUpload,
                                 FileLength = d.FileLength,
                                 FileName = d.FileName,
                                 Id = d.Id,
                                 Name = d.Name,
                                 RelativeUrl = d.RelativeUrl,
                                 RewriteUrl = d.RewriteUrl
                             };

            List<FileUploadDetailModel> files = queryFiles.ToList();

            var calendars = from cal in _anaContext.Calendar
                            join cc in _anaContext.CalendarContracts on cal.Id equals cc.CalendarId
                            join con in _anaContext.Contracts on cc.ContractId equals con.Id
                            join conOil in _anaContext.ContractsOilMill on con.Id equals conOil.ContractId
                            //join comp in _anaContext.Companies on con.CustomerId equals comp.CompanyId
                            where con.Code == code
                            select new CalendarOilMillContractModel()
                            {
                                Id = cal.Id,
                                AllDay = cal.AllDay,
                                Color = cal.Color,
                                CreationDate = cal.CreationDate.ToLocalTime(),
                                Editable = cal.Editable,
                                End = cal.EndDate.ToLocalTime(),
                                LastUpdate = cal.LastUpdate.ToLocalTime(),
                                Note = cal.Note,
                                PortalFarmId = cal.PortalFarmId,
                                Start = cal.StartDate.ToLocalTime(),
                                Title = cal.Title,//comp.Name
                                UserId = cal.UserId,
                                Invoiced = con.Invoiced,
                                OilMillContract = new OilMillContractModel
                                {
                                    UserId = con.UserId,
                                    Title = con.Title,
                                    PortalFarmId = con.PortalFarmId,
                                    Barcode = con.Barcode,
                                    Code = con.Code,
                                    CollectionOliveDate = getDateTime(conOil.CollectionOliveDate),
                                    RegionCollectionOlive = conOil.RegionCollectionOlive,
                                    LocationCollectionOlive = conOil.LocationCollectionOlive,
                                    ContractDate = con.ContractDate.ToLocalTime(),
                                    CreationDate = con.CreationDate.ToLocalTime(),
                                    CrusherTypeId = conOil.CrusherTypeId,
                                    CrusherType = conOil.CrusherType.Name,
                                    CultivarId = conOil.CultivarId,
                                    Cultivar = conOil.Cultivar.Name,
                                    CustomerId = con.CustomerId,
                                    Customer = companies.Where(x => x.CompanyId == con.CustomerId).First().Name,
                                    Deleted = con.Deleted,
                                    Id = con.Id,
                                    DesideredOilFilteredQuantity = conOil.OilDesideredFilterQuantity,
                                    LastUpdate = con.LastUpdate.ToLocalTime(),
                                    MillDate = getDateTime(conOil.MillDate),
                                    Note = con.Note,
                                    OilAnalysisTypeId = conOil.OilAnalysisTypeId,
                                    OilAnalysisType = conOil.OilAnalysisType.Name,
                                    OilFilterTypeId = conOil.OilFilterTypeId,
                                    OilFilterType = conOil.OilFilterType.Name,
                                    OilWeight = conOil.OilWeight,
                                    OilWeightInDeposit = conOil.OilWeightInDeposit,
                                    OliveWeight = conOil.OliveWeight,
                                    OliveWeightExpected = conOil.OliveWeightExpected,
                                    PurchasedOlives = conOil.PurchasedOlives,
                                    QrCode = con.QrCode,
                                    CustomLabel = conOil.CustomLabel,
                                    Workable = con.Workable,
                                    Invoiced = con.Invoiced,
                                    OilReady = conOil.OilReady,
                                    Packaging = conOil.Packaging,
                                    Tank5L = conOil.Tank5L,
                                    Tank10L = conOil.Tank10L,
                                    Tank15L = conOil.Tank15L,
                                    Tank20L = conOil.Tank20L,
                                    Tank25L = conOil.Tank25L,
                                    Tank30L = conOil.Tank30L,
                                    Tank50L = conOil.Tank50L,
                                    ThirdParties = conOil.ThirdParties,
                                    WorkStateId = con.WorkStateId,
                                    WorkState = con.WorkState.Description,
                                    OliveWeighings = weighingList.Where(x => x.ContractId == con.Id).ToArray(),
                                    BinsTaken = conOil.BinsTaken,
                                    ReturnPercent = conOil.ReturnPercentage,
                                    BB3 = conOil.Bb3,
                                    BB5 = conOil.Bb5,
                                    Bottle100 = conOil.Bottle100,
                                    Bottle250 = conOil.Bottle250,
                                    Bottle500 = conOil.Bottle500,
                                    Bottle750 = conOil.Bottle750,
                                    PackagingComplete = conOil.PackagingComplete,
                                    OilFilteredWeight = conOil.OilFilteredWeight,
                                    EmailOilReadySended = conOil.EmailOilReadySended,
                                    PlcId = con.PlcId
                                },
                                OtherUploadedFiles = files
                            };

            return calendars.FirstOrDefault();
        }

        public CalendarOilMillContractModel GetByPlcId(int plcId)
        {
            List<Companies> companies = _anaContext.Companies.ToList();

            var calendars = from cal in _anaContext.Calendar
                            join cc in _anaContext.CalendarContracts on cal.Id equals cc.CalendarId
                            join con in _anaContext.Contracts on cc.ContractId equals con.Id
                            join conOil in _anaContext.ContractsOilMill on con.Id equals conOil.ContractId
                            //join comp in _anaContext.Companies on con.CustomerId equals comp.CompanyId
                            where con.PlcId == plcId
                            select new CalendarOilMillContractModel()
                            {
                                Id = cal.Id,
                                AllDay = cal.AllDay,
                                Color = cal.Color,
                                CreationDate = cal.CreationDate.ToLocalTime(),
                                Editable = cal.Editable,
                                End = cal.EndDate.ToLocalTime(),
                                LastUpdate = cal.LastUpdate.ToLocalTime(),
                                Note = cal.Note,
                                PortalFarmId = cal.PortalFarmId,
                                Start = cal.StartDate.ToLocalTime(),
                                Title = cal.Title,//comp.Name
                                UserId = cal.UserId,
                                Invoiced = con.Invoiced,
                                OilMillContract = new OilMillContractModel
                                {
                                    UserId = con.UserId,
                                    Title = con.Title,
                                    PortalFarmId = con.PortalFarmId,
                                    Barcode = con.Barcode,
                                    Code = con.Code,
                                    CollectionOliveDate = getDateTime(conOil.CollectionOliveDate),
                                    RegionCollectionOlive = conOil.RegionCollectionOlive,
                                    LocationCollectionOlive = conOil.LocationCollectionOlive,
                                    ContractDate = con.ContractDate.ToLocalTime(),
                                    CreationDate = con.CreationDate.ToLocalTime(),
                                    CrusherTypeId = conOil.CrusherTypeId,
                                    CrusherType = conOil.CrusherType.Name,
                                    CultivarId = conOil.CultivarId,
                                    Cultivar = conOil.Cultivar.Name,
                                    CustomerId = con.CustomerId,
                                    Customer = companies.Where(x => x.CompanyId == con.CustomerId).First().Name,
                                    Deleted = con.Deleted,
                                    Id = con.Id,
                                    DesideredOilFilteredQuantity = conOil.OilDesideredFilterQuantity,
                                    LastUpdate = con.LastUpdate.ToLocalTime(),
                                    MillDate = getDateTime(conOil.MillDate),
                                    Note = con.Note,
                                    OilAnalysisTypeId = conOil.OilAnalysisTypeId,
                                    OilAnalysisType = conOil.OilAnalysisType.Name,
                                    OilFilterTypeId = conOil.OilFilterTypeId,
                                    OilFilterType = conOil.OilFilterType.Name,
                                    OilWeight = conOil.OilWeight,
                                    OilWeightInDeposit = conOil.OilWeightInDeposit,
                                    OliveWeight = conOil.OliveWeight,
                                    OliveWeightExpected = conOil.OliveWeightExpected,
                                    PurchasedOlives = conOil.PurchasedOlives,
                                    QrCode = con.QrCode,
                                    CustomLabel = conOil.CustomLabel,
                                    Workable = con.Workable,
                                    Invoiced = con.Invoiced,
                                    OilReady = conOil.OilReady,
                                    Packaging = conOil.Packaging,
                                    Tank5L = conOil.Tank5L,
                                    Tank10L = conOil.Tank10L,
                                    Tank15L = conOil.Tank15L,
                                    Tank20L = conOil.Tank20L,
                                    Tank25L = conOil.Tank25L,
                                    Tank30L = conOil.Tank30L,
                                    Tank50L = conOil.Tank50L,
                                    ThirdParties = conOil.ThirdParties,
                                    WorkStateId = con.WorkStateId,
                                    WorkState = con.WorkState.Description,
                                    BinsTaken = conOil.BinsTaken,
                                    ReturnPercent = conOil.ReturnPercentage,
                                    BB3 = conOil.Bb3,
                                    BB5 = conOil.Bb5,
                                    Bottle100 = conOil.Bottle100,
                                    Bottle250 = conOil.Bottle250,
                                    Bottle500 = conOil.Bottle500,
                                    Bottle750 = conOil.Bottle750,
                                    PackagingComplete = conOil.PackagingComplete,
                                    OilFilteredWeight = conOil.OilFilteredWeight,
                                    EmailOilReadySended = conOil.EmailOilReadySended,
                                    PlcId = con.PlcId
                                }
                            };

            return calendars.FirstOrDefault();
        }

        public void AddOliveWeight(Weighing model)
        {
            //Recupero l'ultima riga inserita
            int newId = 1;
            ContractsWeighing contractWeighting = _anaContext.ContractsWeighing.OrderByDescending(x => x.ContractWaighingId).FirstOrDefault();
            if (contractWeighting != null)
                newId = contractWeighting.ContractWaighingId + 1;

            Bins bins = _anaContext.Bins.Where(x => x.Barcode == model.Bin).FirstOrDefault();
            if (bins != null)
            {
                //var contractCalendar = (from cal in _anaContext.Calendar
                //                       join calCon in _anaContext.CalendarContracts on cal.Id equals calCon.CalendarId
                //                       join con in _anaContext.Contracts on calCon.ContractId equals con.Id
                //                       where cal.Id == model.CalendarId
                //                       select new
                //                       {
                //                           CalendarId = cal.Id,
                //                           ContractId = con.Id
                //                       }).First();

                if (!bins.CalendarId.HasValue || bins.CalendarId == model.CalendarId)
                {
                    bins.CurrentNet += model.Weight;

                    ContractsWeighing contractsWeighing = new ContractsWeighing
                    {
                        ContractWaighingId = newId,
                        ContractId = model.ContractId,
                        CurrentWeight = model.Weight,
                        PortalFarmId = model.PortalFarmId,
                        WeightDate = DateTime.Now.ToUniversalTime(),
                        Bins = model.Bin
                    };

                    ContractsOilMill contract = _anaContext.ContractsOilMill.Where(x => x.ContractId == model.ContractId).First();

                    contract.OliveWeight += model.Weight;

                    _anaContext.Add(contractsWeighing);

                    _anaContext.SaveChanges();
                }
                else
                    throw new Exception("Il bins è già occupato con un'altra prenotazione!");
            }
            else
            {
                ContractsWeighing contractsWeighing = new ContractsWeighing
                {
                    ContractWaighingId = newId,
                    ContractId = model.ContractId,
                    CurrentWeight = model.Weight,
                    PortalFarmId = model.PortalFarmId,
                    WeightDate = DateTime.Now.ToUniversalTime()
                };

                ContractsOilMill contract = _anaContext.ContractsOilMill.Where(x => x.ContractId == model.ContractId).First();

                contract.OliveWeight += model.Weight;

                _anaContext.Add(contractsWeighing);

                _anaContext.SaveChanges();
            }
        }

        public void RemoveOliveWeight(Weighing model)
        {
            //var contractCalendar = (from cal in _anaContext.Calendar
            //                        join calCon in _anaContext.CalendarContracts on cal.Id equals calCon.CalendarId
            //                        join con in _anaContext.Contracts on calCon.ContractId equals con.Id
            //                        where cal.Id == model.CalendarId
            //                        select new
            //                        {
            //                            CalendarId = cal.Id,
            //                            ContractId = con.Id
            //                        }).First();

            ContractsWeighing contractsWeighing = _anaContext.ContractsWeighing.Where(x => x.ContractWaighingId == model.Id).FirstOrDefault();

            ContractsOilMill contracts = _anaContext.ContractsOilMill.Where(x => x.ContractId == model.ContractId).First();
            contracts.OliveWeight -= model.Weight;

            _anaContext.Remove(contractsWeighing);

            Bins bins = _anaContext.Bins.Where(x => x.Barcode == model.Bin && x.CalendarId == model.CalendarId).FirstOrDefault();
            if (bins != null)
                bins.CurrentNet -= model.Weight;

            _anaContext.SaveChanges();
        }

        public Guid Update(CalendarOilMillContractModel model, string rootUrl = null)
        {
            Calendar item = _anaContext.Calendar.Where(x => x.Id.Equals(model.Id)).FirstOrDefault();

            if (item == null)
            {
                item = new Calendar
                {
                    AllDay = model.AllDay,
                    Id = Guid.NewGuid(),
                    Color = model.Color,
                    CreationDate = DateTime.Now.ToUniversalTime(),
                    Editable = model.Editable,
                    EndDate = model.End,
                    LastUpdate = DateTime.Now.ToUniversalTime(),
                    Note = model.Note,
                    PortalFarmId = model.PortalFarmId,
                    StartDate = model.Start,
                    Title = model.Title,
                    UserId = model.UserId
                };

                _anaContext.Add(item);


                int plcId = 1;
                Contracts lastContract = _anaContext.Contracts.OrderByDescending(x => x.PlcId).FirstOrDefault();
                if (lastContract != null)
                    plcId = lastContract.PlcId + 1;


                Contracts contract = new Contracts
                {
                    Id = Guid.NewGuid(),
                    UserId = model.UserId,
                    Code = null,
                    ContractDate = DateTime.Now.ToUniversalTime(),
                    CreationDate = DateTime.Now.ToUniversalTime(),
                    CustomerId = model.OilMillContract.CustomerId,
                    Deleted = false,
                    QrCode = model.OilMillContract.QrCode,
                    Barcode = model.OilMillContract.Barcode,
                    LastUpdate = DateTime.Now.ToUniversalTime(),
                    Note = model.Note,
                    PortalFarmId = model.PortalFarmId,
                    Title = model.Title,
                    WorkStateId = model.OilMillContract.WorkStateId,
                    Invoiced = model.OilMillContract.Invoiced,
                    Workable = model.OilMillContract.Workable,
                    PlcId = plcId
                };

                string filePath = null;
                if (model.OilMillContract.QrCode == null || model.OilMillContract.QrCode.Length == 0)
                {
                    string txtQRCode = @"http://olio40.deltaweb.it/booking/" + item.Id.ToString();
                    QRCodeGenerator _qrCode = new QRCodeGenerator();
                    QRCodeData _qrCodeData = _qrCode.CreateQrCode(txtQRCode, QRCodeGenerator.ECCLevel.Q);
                    QRCode qrCode = new QRCode(_qrCodeData);
                    //Bitmap qrCodeImage = qrCode.GetGraphic(20);

                    //a questo punto salvo img su un campo di tipo image nel database
                    //oppure salvo il qrcode nel disco e la path nel database
                    //dipenderà anche da come è più facile poi usarlo, forse conviene salvare nel disco
                    var uploads = Path.Combine(_environment.WebRootPath, "Repository\\" + model.PortalFarmId + "\\Calendar\\" + item.Id);
                    filePath = Path.Combine(uploads, "QrCode.png");

                    bool folderExists = Directory.Exists(uploads);
                    if (!folderExists)
                        Directory.CreateDirectory(uploads);

                    Bitmap bitMap = qrCode.GetGraphic(20);
                    bitMap.Save(filePath, System.Drawing.Imaging.ImageFormat.Png);

                    //// Per salvataggio a database
                    //byte[] img = null;
                    //using (Bitmap bitMap = qrCode.GetGraphic(20))
                    //{
                    //    using (MemoryStream ms = new MemoryStream())
                    //    {
                    //        bitMap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);

                    //        img = new byte[ms.ToArray().Length];
                    //        img = ms.ToArray();
                    //    }
                    //}

                    contract.QrCode = @"http://olio40.deltaweb.it/Repository/" + model.PortalFarmId + "/Calendar/" + item.Id + "/qrcode.png";
                }

                _anaContext.Add(contract);


                ContractsOilMill contractsOilMill = new ContractsOilMill
                {
                    PortalFarmId = model.PortalFarmId,
                    CollectionOliveDate = model.OilMillContract.CollectionOliveDate,
                    ContractId = contract.Id,
                    CrusherTypeId = model.OilMillContract.CrusherTypeId,
                    CultivarId = model.OilMillContract.CultivarId,
                    MillDate = model.OilMillContract.MillDate,
                    OilAnalysisTypeId = model.OilMillContract.OilAnalysisTypeId,
                    OilFilterTypeId = model.OilMillContract.OilFilterTypeId,
                    OilDesideredFilterQuantity = model.OilMillContract.DesideredOilFilteredQuantity,
                    OilWeight = model.OilMillContract.OilWeight,
                    OilWeightInDeposit = model.OilMillContract.OilWeightInDeposit,
                    OliveWeight = model.OilMillContract.OliveWeight,
                    OliveWeightExpected = model.OilMillContract.OliveWeightExpected,
                    PurchasedOlives = model.OilMillContract.PurchasedOlives,
                    Tank10L = model.OilMillContract.Tank10L,
                    Tank15L = model.OilMillContract.Tank15L,
                    Tank20L = model.OilMillContract.Tank20L,
                    Tank25L = model.OilMillContract.Tank25L,
                    Tank30L = model.OilMillContract.Tank30L,
                    Tank5L = model.OilMillContract.Tank5L,
                    ThirdParties = model.OilMillContract.ThirdParties,
                    CustomLabel = model.OilMillContract.CustomLabel,
                    Packaging = model.OilMillContract.Packaging,
                    OilReady = model.OilMillContract.OilReady,
                    BinsTaken = model.OilMillContract.BinsTaken,
                    RegionCollectionOlive = model.OilMillContract.RegionCollectionOlive,
                    LocationCollectionOlive = model.OilMillContract.LocationCollectionOlive,
                    ReturnPercentage = 0,
                    Bb3 = model.OilMillContract.BB3,
                    Bb5 = model.OilMillContract.BB5,
                    Bottle100 = model.OilMillContract.Bottle100,
                    Bottle250 = model.OilMillContract.Bottle250,
                    Bottle500 = model.OilMillContract.Bottle500,
                    Bottle750 = model.OilMillContract.Bottle750,
                    PackagingComplete = model.OilMillContract.PackagingComplete,
                    OilFilteredWeight = model.OilMillContract.OilFilteredWeight

                };

                _anaContext.Add(contractsOilMill);

                CalendarContracts calendarContracts = new CalendarContracts
                {
                    CalendarId = item.Id,
                    ContractId = contract.Id,
                    PortalFarmId = model.PortalFarmId
                };

                _anaContext.Add(calendarContracts);

                _anaContext.SaveChanges();

                model = GetById(item.Id);

                //bool result = EmailSenderServices.SendConfirmBooking(_environment.WebRootPath, model, _anaContext, _logger);
                //if (!result)
                //    throw new Exception("Errore in invio dell'email di conferma della prenotazione!");
            }
            else
            {

                item.AllDay = model.AllDay;
                item.Color = model.Color;
                item.Editable = model.Editable;
                item.EndDate = model.End;
                item.LastUpdate = model.LastUpdate;
                item.Note = model.Note;
                item.PortalFarmId = model.PortalFarmId;
                item.StartDate = model.Start;
                item.Title = model.Title;
                item.UserId = model.UserId;

                Contracts contract = _anaContext.CalendarContracts.Where(x => x.CalendarId == item.Id).Select(x => x.Contract).FirstOrDefault();
                if (contract != null)
                {
                    contract.UserId = model.UserId;
                    contract.Code = model.OilMillContract.Code;
                    contract.CustomerId = model.OilMillContract.CustomerId;
                    contract.LastUpdate = model.LastUpdate;
                    contract.Note = model.Note;
                    contract.PortalFarmId = model.PortalFarmId;
                    contract.Title = model.Title;
                    contract.Barcode = model.OilMillContract.Barcode;
                    contract.QrCode = model.OilMillContract.QrCode;
                    contract.WorkStateId = model.OilMillContract.WorkStateId;
                    contract.Invoiced = model.OilMillContract.Invoiced;
                    //contract.Workable = model.OilMillContract.Workable;//Viene impostato con il metodo SetWorkable()
                    contract.LastUpdate = model.LastUpdate;
                    contract.StartWorkDate = model.Start;

                    string filePath = null;
                    if (model.OilMillContract.QrCode == null || model.OilMillContract.QrCode.Length == 0)
                    {
                        string txtQRCode = @"http://olio40.deltaweb.it/booking/" + item.Id.ToString();
                        QRCodeGenerator _qrCode = new QRCodeGenerator();
                        QRCodeData _qrCodeData = _qrCode.CreateQrCode(txtQRCode, QRCodeGenerator.ECCLevel.Q);
                        QRCode qrCode = new QRCode(_qrCodeData);
                        //Bitmap qrCodeImage = qrCode.GetGraphic(20);

                        //a questo punto salvo img su un campo di tipo image nel database
                        //oppure salvo il qrcode nel disco e la path nel database
                        //dipenderà anche da come è più facile poi usarlo, forse conviene salvare nel disco
                        var uploads = Path.Combine(_environment.WebRootPath, "Repository\\" + model.PortalFarmId + "\\Calendar\\" + item.Id);
                        filePath = Path.Combine(uploads, "QrCode.png");

                        bool folderExists = Directory.Exists(uploads);
                        if (!folderExists)
                            Directory.CreateDirectory(uploads);

                        Bitmap bitMap = qrCode.GetGraphic(20);
                        bitMap.Save(filePath, System.Drawing.Imaging.ImageFormat.Png);

                        //// Per salvataggio a database
                        //byte[] img = null;
                        //using (Bitmap bitMap = qrCode.GetGraphic(20))
                        //{
                        //    using (MemoryStream ms = new MemoryStream())
                        //    {
                        //        bitMap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);

                        //        img = new byte[ms.ToArray().Length];
                        //        img = ms.ToArray();
                        //    }
                        //}

                        contract.QrCode = @"http://olio40.deltaweb.it/Repository/" + model.PortalFarmId + "/Calendar/" + item.Id + "/qrcode.png";
                    }
                }

                ContractsOilMill contractsOilMill = _anaContext.ContractsOilMill.Where(x => x.ContractId == contract.Id).FirstOrDefault();
                if (contractsOilMill != null)
                {
                    contractsOilMill.PortalFarmId = model.PortalFarmId;
                    contractsOilMill.CollectionOliveDate = model.OilMillContract.CollectionOliveDate;
                    contractsOilMill.CrusherTypeId = model.OilMillContract.CrusherTypeId;
                    contractsOilMill.CultivarId = model.OilMillContract.CultivarId;
                    contractsOilMill.MillDate = model.OilMillContract.MillDate;
                    contractsOilMill.OilAnalysisTypeId = model.OilMillContract.OilAnalysisTypeId;
                    contractsOilMill.OilFilterTypeId = model.OilMillContract.OilFilterTypeId;
                    contractsOilMill.OilDesideredFilterQuantity = model.OilMillContract.DesideredOilFilteredQuantity;
                    contractsOilMill.OilWeight = model.OilMillContract.OilWeight;
                    contractsOilMill.OilWeightInDeposit = model.OilMillContract.OilWeightInDeposit;
                    //contractsOilMill.OliveWeight = model.OilMillContract.OliveWeight;
                    contractsOilMill.OliveWeightExpected = model.OilMillContract.OliveWeightExpected;
                    contractsOilMill.PurchasedOlives = model.OilMillContract.PurchasedOlives;
                    contractsOilMill.Tank10L = model.OilMillContract.Tank10L;
                    contractsOilMill.Tank15L = model.OilMillContract.Tank15L;
                    contractsOilMill.Tank20L = model.OilMillContract.Tank20L;
                    contractsOilMill.Tank25L = model.OilMillContract.Tank25L;
                    contractsOilMill.Tank30L = model.OilMillContract.Tank30L;
                    contractsOilMill.Tank5L = model.OilMillContract.Tank5L;
                    contractsOilMill.ThirdParties = model.OilMillContract.ThirdParties;
                    contractsOilMill.CustomLabel = model.OilMillContract.CustomLabel;
                    contractsOilMill.Packaging = model.OilMillContract.Packaging;
                    contractsOilMill.OilReady = model.OilMillContract.OilReady;
                    contractsOilMill.BinsTaken = model.OilMillContract.BinsTaken;
                    contractsOilMill.RegionCollectionOlive = model.OilMillContract.RegionCollectionOlive;
                    contractsOilMill.LocationCollectionOlive = model.OilMillContract.LocationCollectionOlive;

                    contractsOilMill.ReturnPercentage = model.OilMillContract.ReturnPercent;
                    contractsOilMill.Bb3 = model.OilMillContract.BB3;
                    contractsOilMill.Bb5 = model.OilMillContract.BB5;
                    contractsOilMill.Bottle100 = model.OilMillContract.Bottle100;
                    contractsOilMill.Bottle250 = model.OilMillContract.Bottle250;
                    contractsOilMill.Bottle500 = model.OilMillContract.Bottle500;
                    contractsOilMill.Bottle750 = model.OilMillContract.Bottle750;
                    contractsOilMill.PackagingComplete = model.OilMillContract.PackagingComplete;
                    contractsOilMill.OilFilteredWeight = model.OilMillContract.OilFilteredWeight;
                }

                _anaContext.SaveChanges();
            }

            return item.Id;
        }

        public void SendConfirmBooking(CalendarOilMillContractModel model, string rootUrl = null)
        {
            //model = GetById(model.Id.Value);
            //bool result = EmailSenderServices.SendConfirmBooking(_environment.WebRootPath, model, _anaContext, _logger);
            //if (!result)
            //    throw new Exception("Errore in invio dell'email di conferma della prenotazione!");
        }

        public void Delete(Guid id)
        {
            Calendar calendar = _anaContext.Calendar.Where(x => x.Id ==id).FirstOrDefault();
            if (calendar != null)
            {
                List<CalendarContracts> calendarContracts = _anaContext.CalendarContracts.Where(x => x.CalendarId == id).ToList();
                _anaContext.CalendarContracts.RemoveRange(calendarContracts);

                foreach (var item in calendarContracts)
                {
                    List<ContractsWeighing> contractsWeighings = _anaContext.ContractsWeighing.Where(x => x.ContractId == item.ContractId).ToList();
                    _anaContext.ContractsWeighing.RemoveRange(contractsWeighings);

                    List<ContractsOilMill> contractsOilMills = _anaContext.ContractsOilMill.Where(x => x.ContractId == item.ContractId).ToList();
                    _anaContext.ContractsOilMill.RemoveRange(contractsOilMills);

                    Contracts contract = _anaContext.Contracts.Where(x => x.Id == item.ContractId).First();
                    _anaContext.Contracts.Remove(contract);
                }

                _anaContext.Remove(calendar);

                _anaContext.SaveChanges();
            }
            else
                throw new Exception("Event not found");
        }

        public void SetWorkable(Guid id)
        {
            Calendar calendar = _anaContext.Calendar.Where(x => x.Id == id).FirstOrDefault();
            if (calendar != null)
            {
                foreach (var item in _anaContext.CalendarContracts.Where(x => x.CalendarId == id))
                {
                    foreach (var contract in _anaContext.Contracts.Where(x => x.Id == item.ContractId))
                    {
                        contract.LastUpdate = DateTime.Now.ToUniversalTime();
                        contract.Workable = true;
                    }
                }

                _anaContext.SaveChanges();
            }
            else
                throw new Exception("Event not found");
        }

        public void SetEmailOilReadySended(Guid contractId, bool value)
        {
            ContractsOilMill contract = _anaContext.ContractsOilMill.Where(x => x.ContractId == contractId).FirstOrDefault();
            if (contract != null)
            {
                contract.EmailOilReadySended = value;

                _anaContext.SaveChanges();
            }
            else
                throw new Exception("Event not found");

            //Calendar calendar = _anaContext.Calendar.Where(x => x.Id == id).FirstOrDefault();
            //if (calendar != null)
            //{
            //    foreach (var item in _anaContext.CalendarContracts.Where(x => x.CalendarId == id))
            //    {
            //        foreach (var contract in _anaContext.Contracts.Where(x => x.Id == item.ContractId))
            //        {
            //            contract.LastUpdate = DateTime.Now.ToUniversalTime();
            //            contract.ema = value;
            //        }
            //    }

            //    _anaContext.SaveChanges();
            //}
            //else
            //    throw new Exception("Event not found");
        }

    }
}

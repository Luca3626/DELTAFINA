using System;
using System.Collections.Generic;
using System.Linq;

using DeltafinaWebApp.Data.Archives;
using Models.Archives;
using Models.Archives.Warehouse.Silo;

namespace Services
{

    public class SiloServices
    {

        private ArchivesDbContext _anaContext;


        public SiloServices(
            ArchivesDbContext anaContext)
        {
            _anaContext = anaContext;
        }

        public IEnumerable<SiloModel> GetList()
        {
            var results = from w in _anaContext.Warehouse
                          join m in _anaContext.Materials on w.MaterialId equals m.Id
                          where !w.IsDeleted & w.WarehouseTypeId == 1
                          orderby w.OrderPosition
                          select new SiloModel()
                          {
                              Id = w.Id,
                              Code = w.Code,
                              Name = w.Name,
                              Capacity = w.Capacity,
                              MaterialId = w.MaterialId,
                              IsDeleted = w.IsDeleted,
                              IsLoadEnabled = w.EnableLoad,
                              IsUnloadEnabled = w.EnableUnload,
                              Material = m.Name,
                              MaterialCode = m.Code,
                              ProgressiveId = w.ProgressiveId,
                              Volume = w.Volume,
                              WarehouseTypeId = w.WarehouseTypeId
                          };

            return results.AsEnumerable();
        }

        //public IEnumerable<SiloModel> GetListByPortalFarmId(Guid portalFarmId)
        //{
        //    var results = from w in _anaContext.Warehouse
        //                    join m in _anaContext.Materials on w.MaterialId equals m.Id
        //                    where !w.IsDeleted
        //                    select new SiloModel()
        //                    {
        //                        Id = w.Id,
        //                        Code = w.Code,
        //                        Name = w.Name,
        //                        Capacity = w.Capacity,
        //                        MaterialId = w.MaterialId,
        //                        IsDeleted = w.IsDeleted,
        //                        IsLoadEnabled = w.EnableLoad,
        //                        IsUnloadEnabled = w.EnableUnload,
        //                        Material = m.Name,
        //                        MaterialCode = m.Code,
        //                        ProgressiveId = w.ProgressiveId,
        //                        Volume = w.Volume,
        //                        WarehouseTypeId = w.WarehouseTypeId
        //                    };

        //    return results.AsEnumerable();
        //}

        public SiloModel GetById(Guid id)
        {
            var Companies = from w in _anaContext.Warehouse
                            join m in _anaContext.Materials on w.MaterialId equals m.Id
                            where w.Id == id & w.WarehouseTypeId == 1
                            select new SiloModel()
                            {
                                Id = w.Id,
                                Code = w.Code,
                                Name = w.Name,
                                Capacity = w.Capacity,
                                MaterialId = w.MaterialId,
                                IsDeleted = w.IsDeleted,
                                IsLoadEnabled = w.EnableLoad,
                                IsUnloadEnabled = w.EnableUnload,
                                Material = m.Name,
                                MaterialCode = m.Code,
                                ProgressiveId = w.ProgressiveId,
                                Volume = w.Volume,
                                WarehouseTypeId = w.WarehouseTypeId
                            };

            return Companies.FirstOrDefault();
        }

        public SiloModel GetByProgressiveId(int id)
        {
            var Companies = from w in _anaContext.Warehouse
                            join m in _anaContext.Materials on w.MaterialId equals m.Id
                            where w.ProgressiveId == id & w.WarehouseTypeId == 1
                            select new SiloModel()
                            {
                                Id = w.Id,
                                Code = w.Code,
                                Name = w.Name,
                                Capacity = w.Capacity,
                                MaterialId = w.MaterialId,
                                IsDeleted = w.IsDeleted,
                                IsLoadEnabled = w.EnableLoad,
                                IsUnloadEnabled = w.EnableUnload,
                                Material = m.Name,
                                MaterialCode = m.Code,
                                ProgressiveId = w.ProgressiveId,
                                Volume = w.Volume,
                                WarehouseTypeId = w.WarehouseTypeId
                            };

            return Companies.FirstOrDefault();
        }

        public SiloModel GetByCode(string code)
        {
            var Companies = from w in _anaContext.Warehouse
                            join m in _anaContext.Materials on w.MaterialId equals m.Id
                            where w.Code.Equals(code) & w.WarehouseTypeId == 1
                            select new SiloModel()
                            {
                                Id = w.Id,
                                Code = w.Code,
                                Name = w.Name,
                                Capacity = w.Capacity,
                                MaterialId = w.MaterialId,
                                IsDeleted = w.IsDeleted,
                                IsLoadEnabled = w.EnableLoad,
                                IsUnloadEnabled = w.EnableUnload,
                                Material = m.Name,
                                MaterialCode = m.Code,
                                ProgressiveId = w.ProgressiveId,
                                Volume = w.Volume,
                                WarehouseTypeId = w.WarehouseTypeId
                            };

            return Companies.FirstOrDefault();
        }

        public SiloModel GetByName(string name)
        {
            var Companies = from w in _anaContext.Warehouse
                            join m in _anaContext.Materials on w.MaterialId equals m.Id
                            where w.Name.Equals(name) & w.WarehouseTypeId == 1
                            select new SiloModel()
                            {
                                Id = w.Id,
                                Code = w.Code,
                                Name = w.Name,
                                Capacity = w.Capacity,
                                MaterialId = w.MaterialId,
                                IsDeleted = w.IsDeleted,
                                IsLoadEnabled = w.EnableLoad,
                                IsUnloadEnabled = w.EnableUnload,
                                Material = m.Name,
                                MaterialCode = m.Code,
                                ProgressiveId = w.ProgressiveId,
                                Volume = w.Volume,
                                WarehouseTypeId = w.WarehouseTypeId
                            };

            return Companies.FirstOrDefault();
        }

        public Guid Update(SiloModel model)
        {
            Warehouse item = _anaContext.Warehouse.Where(x => x.Id.Equals(model.Id) & x.WarehouseTypeId == 1).FirstOrDefault();

            if (item == null)
            {
                Warehouse warehouse = new Warehouse
                {
                    Capacity = model.Capacity,
                    Id = Guid.NewGuid(),
                    WarehouseTypeId = model.WarehouseTypeId,
                    Volume = model.Volume,
                    Code = model.Code,
                    EnableLoad = model.IsLoadEnabled,
                    EnableUnload = model.IsUnloadEnabled,
                    IsDeleted = model.IsDeleted,
                    MaterialId = model.MaterialId,
                    Name = model.Name,
                    ProgressiveId = model.ProgressiveId
                };

                _anaContext.Add(warehouse);

                _anaContext.SaveChanges();
            }
            else
            {
                item.Capacity = model.Capacity;
                item.Volume = model.Volume;
                item.Code = model.Code;
                item.EnableLoad = model.IsLoadEnabled;
                item.EnableUnload = model.IsUnloadEnabled;
                item.MaterialId = model.MaterialId;
                item.Name = model.Name;
                item.ProgressiveId = model.ProgressiveId;

                _anaContext.SaveChanges();
            }

            return item.Id;
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetResultValueLabelDisabledList()
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            var results = from w in _anaContext.Warehouse
                          join m in _anaContext.Materials on w.MaterialId equals m.Id
                          where !w.IsDeleted & w.WarehouseTypeId == 1
                          orderby w.OrderPosition
                          select w;

            foreach (var item in results)
            {
                rValue.Add(new ResultValueLabelDisabledModel
                {
                    Value = item.Id.ToString(),
                    Label = item.Code.ToUpper(),
                    Disabled = false
                });
            }

            return rValue.AsEnumerable();
        }

        //public IEnumerable<ResultValueLabelDisabledModel> GetResultValueLabelDisabledListByPortalFarmId(Guid portalFarmId)
        //{
        //    List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

        //    var companies = from cust in _anaContext.Customers
        //                    join comp in _anaContext.Companies on cust.CustomerId equals comp.CompanyId
        //                    where !comp.IsDeleted & comp.PortalFarmId == portalFarmId
        //                    orderby comp.Name
        //                    select comp;

        //    foreach (var item in companies)
        //    {
        //        rValue.Add(new ResultValueLabelDisabledModel
        //        {
        //            Value = item.CompanyId.ToString(),
        //            Label = item.Name.ToUpper(),
        //            Disabled = false
        //        });
        //    }

        //    return rValue.AsEnumerable();
        //}

        public void DeleteSilo(Guid id)
        {
            Warehouse result = _anaContext.Warehouse.Where(x => x.Id == id & x.WarehouseTypeId == 1).FirstOrDefault();
            if (result != null)
            {
                result.IsDeleted = true;

                _anaContext.SaveChanges();
            }
            else
                throw new Exception("Silo not found");
        }

    }
}

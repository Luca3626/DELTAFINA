using System;
using System.Collections.Generic;
using System.Linq;

using DeltafinaWebApp.Data.Archives;
using Models.Archives;
using Models.Archives.Materials;

namespace Services
{

    public class MaterialServices
    {

        private ArchivesDbContext _anaContext;


        public MaterialServices(ArchivesDbContext anaContext)
        {
            _anaContext = anaContext;
        }

        public IEnumerable<MaterialModel> GetList()
        {
            var results = from m in _anaContext.Materials
                          where !m.IsDeleted
                          orderby m.Name
                          select new MaterialModel()
                          {
                              Code = m.Code.ToUpper(),
                              Id = m.Id,
                              Name = m.Name.ToUpper(),
                              OutTotalPercentageRecipe = m.OutTotalPercentageRecipe,
                              MaterialTypeId = m.MaterialTypeId
                          };

            return results.AsEnumerable();
        }

        public MaterialDetailModel GetById(Guid id)
        {
            var results = from m in _anaContext.Materials
                          where m.Id == id
                          select new MaterialDetailModel()
                          {
                              Code = m.Code.ToUpper(),
                              MaterialTypeId = m.MaterialTypeId,
                              OutTotalPercentageRecipe = m.OutTotalPercentageRecipe,
                              Name = m.Name.ToUpper(),
                              Id = m.Id,
                              Description = m.Description,
                              IsDeleted = m.IsDeleted,
                              IsEnabled = m.IsEnabled,
                              SpecificWeight = m.SpecificWeight,
                              SpecificWeight_UdM = m.SpecificWeightUdM,
                              ThresholdAlarmTemp = m.ThresholdAlarmTemp,
                              ThresholdWarningTemp = m.ThresholdWarningTemp,
                              UnityOfMeasure = m.UnityOfMeasure
                            };

            return results.FirstOrDefault();
        }

        public Guid Update(MaterialDetailModel model)
        {
            Materials item = _anaContext.Materials.Where(x => x.Id.Equals(model.Id)).FirstOrDefault();

            if (item == null)
            {
                Materials material = new Materials
                {
                    Code = model.Code,
                    UnityOfMeasure = model.UnityOfMeasure,
                    ThresholdWarningTemp = model.ThresholdWarningTemp,
                    Description = model.Description,
                    Id = Guid.NewGuid(),
                    IsDeleted = false,
                    IsEnabled = model.IsEnabled,
                    MaterialTypeId = model.MaterialTypeId,
                    Name = model.Name,
                    OutTotalPercentageRecipe = model.OutTotalPercentageRecipe,
                    SpecificWeight = model.SpecificWeight,
                    SpecificWeightUdM = model.SpecificWeight_UdM,
                    ThresholdAlarmTemp = model.ThresholdAlarmTemp
                };

                _anaContext.Add(material);

                _anaContext.SaveChanges();

                model.Id = material.Id;
            }
            else
            {
                item.Code = model.Code;
                item.UnityOfMeasure = model.UnityOfMeasure;
                item.ThresholdWarningTemp = model.ThresholdWarningTemp;
                item.Description = model.Description;
                item.IsEnabled = model.IsEnabled;
                item.Name = model.Name;
                item.OutTotalPercentageRecipe = model.OutTotalPercentageRecipe;
                item.SpecificWeight = model.SpecificWeight;
                item.SpecificWeightUdM = model.SpecificWeight_UdM;
                item.ThresholdAlarmTemp = model.ThresholdAlarmTemp;

                _anaContext.SaveChanges();
            }

            return model.Id;
        }

        public IEnumerable<ResultValueLabelDisabledModel> GetResultValueLabelDisabledList()
        {
            List<ResultValueLabelDisabledModel> rValue = new List<ResultValueLabelDisabledModel>();

            var results = from m in _anaContext.Materials
                          where !m.IsDeleted
                          orderby m.Name
                          select m;

            foreach (var item in results)
            {
                rValue.Add(new ResultValueLabelDisabledModel
                {
                    Value = item.Id.ToString(),
                    Label = item.Name.ToUpper(),
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

        public void DeleteMaterial(Guid id)
        {
            Materials result = _anaContext.Materials.Where(x => x.Id == id).FirstOrDefault();
            if (result != null)
            {
                result.IsDeleted = true;

                _anaContext.SaveChanges();
            }
            else
                throw new Exception("Material not found");
        }

    }
}
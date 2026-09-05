using System;
using System.Collections.Generic;
using System.Linq;

using DeltafinaWebApp.Data.Archives;
using Models.Archives;
using Models.Archives.Dosing;
using Models.Archives.Recipes.Glassware;

namespace Services
{

    public class DosingServices
    {

        private ArchivesDbContext _anaContext;


        public DosingServices(ArchivesDbContext anaContext)
        {
            _anaContext = anaContext;
        }

        private double GetActualSiloQuantity(string name)
        {
            double rValue = -9999;

            switch (name)
            {
                //case "S1":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S1_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S2":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S2_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S3":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S3_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S4":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S4_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S5":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S5_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S6":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S6_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S7":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S7_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S8":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S8_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S9":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S9_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S10":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S10_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S11":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S11_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S12":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S12_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S13":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S13_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S14":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S14_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S15":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S15_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "S16":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S16_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "TP6":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_TP6_P_ACT.VALUE.ToString()), 0);
                //    break;
                //case "TP6A":
                //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_TP6A_P_ACT.VALUE.ToString()), 0);
                //    break;

                default:
                    break;
            }

            return rValue;
        }

        private double GetActualSiloDensity(string name)
        {
            double rValue = -9999;

            //switch (name)
            //{
            //    case "S1":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S1_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S2":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S2_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S3":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S3_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S4":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S4_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S5":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S5_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S6":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S6_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S7":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S7_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S8":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S8_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S9":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S9_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S10":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S10_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S11":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S11_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S12":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S12_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S13":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S13_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S14":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S14_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S15":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S15_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    case "S16":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.S16_DENSITA.VALUE.ToString()), 0);
            //        break;
            //    //case "TP6":
            //    //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.TP6_DENSITA.VALUE.ToString()), 0);
            //    //    break;
            //    //case "TP6A":
            //    //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.TP6A_DENSITA.VALUE.ToString()), 0);
            //    //    break;

            //    default:
            //        break;
            //}

            return rValue;
        }

        private double GetActualSiloVolume(string name)
        {
            double rValue = -9999;

            //switch (name)
            //{
            //    case "S1":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S1_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S2":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S2_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S3":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S3_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S4":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S4_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S5":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S5_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S6":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S6_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S7":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S7_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S8":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S8_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S9":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S9_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S10":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S10_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S11":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S11_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S12":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S12_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S13":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S13_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S14":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S14_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S15":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S15_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    case "S16":
            //        rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_S16_V_ACT.VALUE.ToString()), 0);
            //        break;
            //    //case "TP6":
            //    //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_TP6_V_ACT.VALUE.ToString()), 0);
            //    //    break;
            //    //case "TP6A":
            //    //    rValue = Math.Round(double.Parse(Core.Communication.tagsList.FDB_TP6A_V_ACT.VALUE.ToString()), 0);
            //    //    break;

            //    default:
            //        break;
            //}

            return rValue;
        }

        public bool AddDosings_TF1(RecipeGlasswareModel recipe, int number)
        {
            DateTime registrationDate = DateTime.Now;

            if (registrationDate.Hour < 6)
            {
                DateTime checkDate = new DateTime(registrationDate.Year, registrationDate.Month, registrationDate.Day, 0, 0, 0);
                DosingOrdersCompleted exist = _anaContext.DosingOrdersCompleted.Where(x => x.EndDate >= checkDate && x.Number == number).FirstOrDefault();
                if (exist != null)
                    return true;
            }
            else
            {
                DateTime checkDate = new DateTime(registrationDate.Year, registrationDate.Month, registrationDate.Day, 6, 0, 0);
                DosingOrdersCompleted exist = _anaContext.DosingOrdersCompleted.Where(x => x.EndDate >= checkDate && x.Number == number).FirstOrDefault();
                if (exist != null)
                    return true;
            }

            List<Warehouse> silos = _anaContext.Warehouse.Where(x => x.WarehouseTypeId == 1).ToList();
            List<Warehouse> scales = _anaContext.Warehouse.Where(x => x.WarehouseTypeId == 2).ToList();
            List<Warehouse> destinations = _anaContext.Warehouse.Where(x => x.WarehouseTypeId == 3).ToList();
            List<Materials> materials = _anaContext.Materials.Where(x => x.MaterialTypeId == 1).ToList();
            List<WarehouseLinks> warehouseLinks = _anaContext.WarehouseLinks.ToList();

            Guid? recipeId = null;
            int? recipeProgressiveId = null;
            if (recipe != null)
            {
                recipeId = recipe.Id;
                recipeProgressiveId = recipe.ProgressiveId;
            }

            //SILO S1
            Guid siloId = new Guid("41a02340-b306-4d20-abc5-eb48a2b99ee1");
            Warehouse silo = silos.Where(x => x.Id == siloId).First();
            Materials material = materials.Where(x => x.Id == silo.MaterialId).First();
            WarehouseLinks warehouseLink = warehouseLinks.Where(x => x.WarehouseIdFrom == silo.Id).First();
            Warehouse scale = scales.Where(x => x.Id == warehouseLink.WarehouseIdTo).First();
            _anaContext.Add(new DosingOrdersCompleted
            {
                Id = Guid.NewGuid(),
                DosedQuantity = Double.MinValue, //double.Parse(Core.Communication.tagsList.FDB_N16_B1_S1_Q_ESTRATTA.VALUE.ToString()),
                EndDate = registrationDate,//.ToUniversalTime(),
                Material = material.Name,
                MaterialDensity = GetActualSiloDensity(silo.Name),
                MaterialCode = material.Code,
                SiloCode = silo.Code,
                MaterialId = material.Id,
                Unity = material.UnityOfMeasure,
                ActualSiloVolume = GetActualSiloVolume(silo.Name),
                Note = null,
                Number = number,
                Recipe = recipe?.Name,
                RecipeId = recipeId,
                RecipeProgressiveId = recipeProgressiveId,
                RepetitionInMix = int.Parse("0"),//Core.Communication.tagsList.INT_PLC_RIC_N_STD_1V101_TF1.VALUE.ToString()),
                RequestedQuantityInMix = double.Parse("0"),//Core.Communication.tagsList.REAL_PLC_RIC_Q_STD_1V101_TF1.VALUE.ToString()),
                Scale = scale.Name,
                Silo = silo.Name,
                ActualSiloQuantity = GetActualSiloQuantity(silo.Name),
                WarehouseDestionation = destinations.Where(x => x.Code == "TF1").First().Code,
                WarehouseScaleId = scale.Id,
                WarehouseScaleProgressiveId = scale.ProgressiveId,
                WarehouseSiloId = silo.Id,
                WarehouseDestionationId = destinations.Where(x => x.Code == "TF1").First().Id,
                WarehouseSiloProgressiveId = silo.ProgressiveId,
                WarehouseDestionationProgressiveId = destinations.Where(x => x.Code == "TF1").First().ProgressiveId,
                RepetitionNoMix = 1,//int.Parse(Core.Communication.tagsList.FDB_N16_B1_S1_N_RIP_REPLICA.VALUE.ToString()),
                RequestedQuantityNoMix = double.MinValue //double.Parse(Core.Communication.tagsList.FDB_N16_B1_S1_Q_REPLICA.VALUE.ToString())
            });

            //SILO S2
            siloId = new Guid("071340fa-0e1f-4401-8c16-1ce983a9642a");
            silo = silos.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            warehouseLink = warehouseLinks.Where(x => x.WarehouseIdFrom == silo.Id).First();
            scale = scales.Where(x => x.Id == warehouseLink.WarehouseIdTo).First();
            _anaContext.Add(new DosingOrdersCompleted
            {
                Id = Guid.NewGuid(),
                DosedQuantity = double.MinValue, //double.Parse(Core.Communication.tagsList.FDB_N16_B1_S2_Q_ESTRATTA.VALUE.ToString()),
                EndDate = registrationDate,//.ToUniversalTime(),
                Material = material.Name,
                MaterialDensity = GetActualSiloDensity(silo.Name),
                MaterialCode = material.Code,
                SiloCode = silo.Code,
                MaterialId = material.Id,
                Unity = material.UnityOfMeasure,
                ActualSiloVolume = GetActualSiloVolume(silo.Name),
                Note = null,
                Number = number,
                Recipe = recipe?.Name,
                RecipeId = recipeId,
                RecipeProgressiveId = recipeProgressiveId,
                RepetitionInMix = int.Parse("0"),//Core.Communication.tagsList.INT_PLC_RIC_N_STD_1V101_TF1.VALUE.ToString()),
                RequestedQuantityInMix = double.Parse("0"),//Core.Communication.tagsList.REAL_PLC_RIC_Q_STD_1V101_TF1.VALUE.ToString()),
                Scale = scale.Name,
                Silo = silo.Name,
                ActualSiloQuantity = GetActualSiloQuantity(silo.Name),
                WarehouseDestionation = destinations.Where(x => x.Code == "TF1").First().Code,
                WarehouseScaleId = scale.Id,
                WarehouseScaleProgressiveId = scale.ProgressiveId,
                WarehouseSiloId = silo.Id,
                WarehouseDestionationId = destinations.Where(x => x.Code == "TF1").First().Id,
                WarehouseSiloProgressiveId = silo.ProgressiveId,
                WarehouseDestionationProgressiveId = destinations.Where(x => x.Code == "TF1").First().ProgressiveId,
                RepetitionNoMix = 1,//int.Parse(Core.Communication.tagsList.FDB_N16_B1_S2_N_RIP_REPLICA.VALUE.ToString()),
                RequestedQuantityNoMix = double.MinValue //double.Parse(Core.Communication.tagsList.FDB_N16_B1_S2_Q_REPLICA.VALUE.ToString())
            });

            //SILO S3
            siloId = new Guid("3517ff67-af2f-482e-a1e8-74740b9596d4");
            silo = silos.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            warehouseLink = warehouseLinks.Where(x => x.WarehouseIdFrom == silo.Id).First();
            scale = scales.Where(x => x.Id == warehouseLink.WarehouseIdTo).First();
            _anaContext.Add(new DosingOrdersCompleted
            {
                Id = Guid.NewGuid(),
                DosedQuantity = double.MinValue, //double.Parse(Core.Communication.tagsList.FDB_N16_B2_S3_Q_ESTRATTA.VALUE.ToString()),
                EndDate = registrationDate,//.ToUniversalTime(),
                Material = material.Name,
                MaterialDensity = GetActualSiloDensity(silo.Name),
                MaterialCode = material.Code,
                SiloCode = silo.Code,
                MaterialId = material.Id,
                Unity = material.UnityOfMeasure,
                ActualSiloVolume = GetActualSiloVolume(silo.Name),
                Note = null,
                Number = number,
                Recipe = recipe?.Name,
                RecipeId = recipeId,
                RecipeProgressiveId = recipeProgressiveId,
                RepetitionInMix = int.Parse("0"),//Core.Communication.tagsList.INT_PLC_RIC_N_STD_1V101_TF1.VALUE.ToString()),
                RequestedQuantityInMix = double.Parse("0"),//Core.Communication.tagsList.REAL_PLC_RIC_Q_STD_1V101_TF1.VALUE.ToString()),
                Scale = scale.Name,
                Silo = silo.Name,
                ActualSiloQuantity = GetActualSiloQuantity(silo.Name),
                WarehouseDestionation = destinations.Where(x => x.Code == "TF1").First().Code,
                WarehouseScaleId = scale.Id,
                WarehouseScaleProgressiveId = scale.ProgressiveId,
                WarehouseSiloId = silo.Id,
                WarehouseDestionationId = destinations.Where(x => x.Code == "TF1").First().Id,
                WarehouseSiloProgressiveId = silo.ProgressiveId,
                WarehouseDestionationProgressiveId = destinations.Where(x => x.Code == "TF1").First().ProgressiveId,
                RepetitionNoMix = 1,//int.Parse(Core.Communication.tagsList.FDB_N16_B2_S3_N_RIP_REPLICA.VALUE.ToString()),
                RequestedQuantityNoMix = double.MinValue //double.Parse(Core.Communication.tagsList.FDB_N16_B2_S3_Q_REPLICA.VALUE.ToString())
            });

            //SILO S4
            siloId = new Guid("88d84208-d633-4122-a3b5-013e8432a4e6");
            silo = silos.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            warehouseLink = warehouseLinks.Where(x => x.WarehouseIdFrom == silo.Id).First();
            scale = scales.Where(x => x.Id == warehouseLink.WarehouseIdTo).First();
            _anaContext.Add(new DosingOrdersCompleted
            {
                Id = Guid.NewGuid(),
                DosedQuantity = double.MinValue, //double.Parse(Core.Communication.tagsList.FDB_N16_B2_S4_Q_ESTRATTA.VALUE.ToString()),
                EndDate = registrationDate,//.ToUniversalTime(),
                Material = material.Name,
                MaterialDensity = GetActualSiloDensity(silo.Name),
                MaterialCode = material.Code,
                SiloCode = silo.Code,
                MaterialId = material.Id,
                Unity = material.UnityOfMeasure,
                ActualSiloVolume = GetActualSiloVolume(silo.Name),
                Note = null,
                Number = number,
                Recipe = recipe?.Name,
                RecipeId = recipeId,
                RecipeProgressiveId = recipeProgressiveId,
                RepetitionInMix = int.Parse("0"),//Core.Communication.tagsList.INT_PLC_RIC_N_STD_1V101_TF1.VALUE.ToString()),
                RequestedQuantityInMix = double.Parse("0"),//Core.Communication.tagsList.REAL_PLC_RIC_Q_STD_1V101_TF1.VALUE.ToString()),
                Scale = scale.Name,
                Silo = silo.Name,
                ActualSiloQuantity = GetActualSiloQuantity(silo.Name),
                WarehouseDestionation = destinations.Where(x => x.Code == "TF1").First().Code,
                WarehouseScaleId = scale.Id,
                WarehouseScaleProgressiveId = scale.ProgressiveId,
                WarehouseSiloId = silo.Id,
                WarehouseDestionationId = destinations.Where(x => x.Code == "TF1").First().Id,
                WarehouseSiloProgressiveId = silo.ProgressiveId,
                WarehouseDestionationProgressiveId = destinations.Where(x => x.Code == "TF1").First().ProgressiveId,
                RepetitionNoMix = 1,//int.Parse(Core.Communication.tagsList.FDB_N16_B2_S4_N_RIP_REPLICA.VALUE.ToString()),
                RequestedQuantityNoMix = double.MinValue //double.Parse(Core.Communication.tagsList.FDB_N16_B2_S4_Q_REPLICA.VALUE.ToString())
            });

            _anaContext.SaveChanges();

            return true;
        }

        public bool AddDosings_TF2(RecipeGlasswareModel recipe, int number)
        {
            DateTime registrationDate = DateTime.Now;

            if (registrationDate.Hour < 6)
            {
                DateTime checkDate = new DateTime(registrationDate.Year, registrationDate.Month, registrationDate.Day, 0, 0, 0);
                DosingOrdersCompleted exist = _anaContext.DosingOrdersCompleted.Where(x => x.EndDate >= checkDate && x.Number == number).FirstOrDefault();
                if (exist != null)
                    return true;
            }
            else
            {
                DateTime checkDate = new DateTime(registrationDate.Year, registrationDate.Month, registrationDate.Day, 6, 0, 0);
                DosingOrdersCompleted exist = _anaContext.DosingOrdersCompleted.Where(x => x.EndDate >= checkDate && x.Number == number).FirstOrDefault();
                if (exist != null)
                    return true;
            }

            List<Warehouse> silos = _anaContext.Warehouse.Where(x => x.WarehouseTypeId == 1).ToList();
            List<Warehouse> scales = _anaContext.Warehouse.Where(x => x.WarehouseTypeId == 2).ToList();
            List<Warehouse> destinations = _anaContext.Warehouse.Where(x => x.WarehouseTypeId == 3).ToList();
            List<Materials> materials = _anaContext.Materials.Where(x => x.MaterialTypeId == 1).ToList();
            List<WarehouseLinks> warehouseLinks = _anaContext.WarehouseLinks.ToList();

            Guid? recipeId = null;
            int? recipeProgressiveId = null;
            if (recipe != null)
            {
                recipeId = recipe.Id;
                recipeProgressiveId = recipe.ProgressiveId;
            }

            //SILO S1
            Guid siloId = new Guid("41a02340-b306-4d20-abc5-eb48a2b99ee1");
            Warehouse silo = silos.Where(x => x.Id == siloId).First();
            Materials material = materials.Where(x => x.Id == silo.MaterialId).First();
            WarehouseLinks warehouseLink = warehouseLinks.Where(x => x.WarehouseIdFrom == silo.Id).First();
            Warehouse scale = scales.Where(x => x.Id == warehouseLink.WarehouseIdTo).First();
            _anaContext.Add(new DosingOrdersCompleted
            {
                Id = Guid.NewGuid(),
                DosedQuantity = double.MinValue, //double.Parse(Core.Communication.tagsList.FDB_N15_B1_S1_Q_ESTRATTA.VALUE.ToString()),
                EndDate = registrationDate,//.ToUniversalTime(),
                Material = material.Name,
                MaterialDensity = GetActualSiloDensity(silo.Name),
                MaterialCode = material.Code,
                SiloCode = silo.Code,
                MaterialId = material.Id,
                Unity = material.UnityOfMeasure,
                ActualSiloVolume = GetActualSiloVolume(silo.Name),
                Note = null,
                Number = number,
                Recipe = recipe?.Name,
                RecipeId = recipeId,
                RecipeProgressiveId = recipeProgressiveId,
                RepetitionInMix = int.Parse("0"),//Core.Communication.tagsList.INT_PLC_RIC_N_STD_1V101_TF2.VALUE.ToString()),
                RequestedQuantityInMix = double.Parse("0"),//Core.Communication.tagsList.REAL_PLC_RIC_Q_STD_1V101_TF2.VALUE.ToString()),
                Scale = scale.Name,
                Silo = silo.Name,
                ActualSiloQuantity = GetActualSiloQuantity(silo.Name),
                WarehouseDestionation = destinations.Where(x => x.Code == "TF2").First().Code,
                WarehouseScaleId = scale.Id,
                WarehouseScaleProgressiveId = scale.ProgressiveId,
                WarehouseSiloId = silo.Id,
                WarehouseDestionationId = destinations.Where(x => x.Code == "TF2").First().Id,
                WarehouseSiloProgressiveId = silo.ProgressiveId,
                WarehouseDestionationProgressiveId = destinations.Where(x => x.Code == "TF2").First().ProgressiveId,
                RepetitionNoMix = 1,//int.Parse(Core.Communication.tagsList.FDB_N15_B1_S1_N_RIP_REPLICA.VALUE.ToString()),
                RequestedQuantityNoMix = double.MinValue //double.Parse(Core.Communication.tagsList.FDB_N15_B1_S1_Q_REPLICA.VALUE.ToString())
            });

            //SILO S2
            siloId = new Guid("071340fa-0e1f-4401-8c16-1ce983a9642a");
            silo = silos.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            warehouseLink = warehouseLinks.Where(x => x.WarehouseIdFrom == silo.Id).First();
            scale = scales.Where(x => x.Id == warehouseLink.WarehouseIdTo).First();
            _anaContext.Add(new DosingOrdersCompleted
            {
                Id = Guid.NewGuid(),
                DosedQuantity = double.MinValue, //double.Parse(Core.Communication.tagsList.FDB_N15_B1_S2_Q_ESTRATTA.VALUE.ToString()),
                EndDate = registrationDate,//.ToUniversalTime(),
                Material = material.Name,
                MaterialDensity = GetActualSiloDensity(silo.Name),
                MaterialCode = material.Code,
                SiloCode = silo.Code,
                MaterialId = material.Id,
                Unity = material.UnityOfMeasure,
                ActualSiloVolume = GetActualSiloVolume(silo.Name),
                Note = null,
                Number = number,
                Recipe = recipe?.Name,
                RecipeId = recipeId,
                RecipeProgressiveId = recipeProgressiveId,
                RepetitionInMix = int.Parse("0"),//Core.Communication.tagsList.INT_PLC_RIC_N_STD_1V101_TF2.VALUE.ToString()),
                RequestedQuantityInMix = double.Parse("0"),//Core.Communication.tagsList.REAL_PLC_RIC_Q_STD_1V101_TF2.VALUE.ToString()),
                Scale = scale.Name,
                Silo = silo.Name,
                ActualSiloQuantity = GetActualSiloQuantity(silo.Name),
                WarehouseDestionation = destinations.Where(x => x.Code == "TF2").First().Code,
                WarehouseScaleId = scale.Id,
                WarehouseScaleProgressiveId = scale.ProgressiveId,
                WarehouseSiloId = silo.Id,
                WarehouseDestionationId = destinations.Where(x => x.Code == "TF2").First().Id,
                WarehouseSiloProgressiveId = silo.ProgressiveId,
                WarehouseDestionationProgressiveId = destinations.Where(x => x.Code == "TF2").First().ProgressiveId,
                RepetitionNoMix = 1,//int.Parse(Core.Communication.tagsList.FDB_N15_B1_S2_N_RIP_REPLICA.VALUE.ToString()),
                RequestedQuantityNoMix = double.MinValue //double.Parse(Core.Communication.tagsList.FDB_N15_B1_S2_Q_REPLICA.VALUE.ToString())
            });

            //SILO S3
            siloId = new Guid("3517ff67-af2f-482e-a1e8-74740b9596d4");
            silo = silos.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            warehouseLink = warehouseLinks.Where(x => x.WarehouseIdFrom == silo.Id).First();
            scale = scales.Where(x => x.Id == warehouseLink.WarehouseIdTo).First();
            _anaContext.Add(new DosingOrdersCompleted
            {
                Id = Guid.NewGuid(),
                DosedQuantity = double.MinValue, //double.Parse(Core.Communication.tagsList.FDB_N15_B2_S3_Q_ESTRATTA.VALUE.ToString()),
                EndDate = registrationDate,//.ToUniversalTime(),
                Material = material.Name,
                MaterialDensity = GetActualSiloDensity(silo.Name),
                MaterialCode = material.Code,
                SiloCode = silo.Code,
                MaterialId = material.Id,
                Unity = material.UnityOfMeasure,
                ActualSiloVolume = GetActualSiloVolume(silo.Name),
                Note = null,
                Number = number,
                Recipe = recipe?.Name,
                RecipeId = recipeId,
                RecipeProgressiveId = recipeProgressiveId,
                RepetitionInMix = int.Parse("0"),//Core.Communication.tagsList.INT_PLC_RIC_N_STD_1V101_TF2.VALUE.ToString()),
                RequestedQuantityInMix = double.Parse("0"),//Core.Communication.tagsList.REAL_PLC_RIC_Q_STD_1V101_TF2.VALUE.ToString()),
                Scale = scale.Name,
                Silo = silo.Name,
                ActualSiloQuantity = GetActualSiloQuantity(silo.Name),
                WarehouseDestionation = destinations.Where(x => x.Code == "TF2").First().Code,
                WarehouseScaleId = scale.Id,
                WarehouseScaleProgressiveId = scale.ProgressiveId,
                WarehouseSiloId = silo.Id,
                WarehouseDestionationId = destinations.Where(x => x.Code == "TF2").First().Id,
                WarehouseSiloProgressiveId = silo.ProgressiveId,
                WarehouseDestionationProgressiveId = destinations.Where(x => x.Code == "TF2").First().ProgressiveId,
                RepetitionNoMix = 1,//int.Parse(Core.Communication.tagsList.FDB_N15_B2_S3_N_RIP_REPLICA.VALUE.ToString()),
                RequestedQuantityNoMix = double.MinValue //double.Parse(Core.Communication.tagsList.FDB_N15_B2_S3_Q_REPLICA.VALUE.ToString())
            });

            //SILO S4
            siloId = new Guid("88d84208-d633-4122-a3b5-013e8432a4e6");
            silo = silos.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            warehouseLink = warehouseLinks.Where(x => x.WarehouseIdFrom == silo.Id).First();
            scale = scales.Where(x => x.Id == warehouseLink.WarehouseIdTo).First();
            _anaContext.Add(new DosingOrdersCompleted
            {
                Id = Guid.NewGuid(),
                DosedQuantity = double.MinValue, //double.Parse(Core.Communication.tagsList.FDB_N15_B2_S4_Q_ESTRATTA.VALUE.ToString()),
                EndDate = registrationDate,//.ToUniversalTime(),
                Material = material.Name,
                MaterialDensity = GetActualSiloDensity(silo.Name),
                MaterialCode = material.Code,
                SiloCode = silo.Code,
                MaterialId = material.Id,
                Unity = material.UnityOfMeasure,
                ActualSiloVolume = GetActualSiloVolume(silo.Name),
                Note = null,
                Number = number,
                Recipe = recipe?.Name,
                RecipeId = recipeId,
                RecipeProgressiveId = recipeProgressiveId,
                RepetitionInMix = int.Parse("0"),//Core.Communication.tagsList.INT_PLC_RIC_N_STD_1V101_TF2.VALUE.ToString()),
                RequestedQuantityInMix = double.Parse("0"),//Core.Communication.tagsList.REAL_PLC_RIC_Q_STD_1V101_TF2.VALUE.ToString()),
                Scale = scale.Name,
                Silo = silo.Name,
                ActualSiloQuantity = GetActualSiloQuantity(silo.Name),
                WarehouseDestionation = destinations.Where(x => x.Code == "TF2").First().Code,
                WarehouseScaleId = scale.Id,
                WarehouseScaleProgressiveId = scale.ProgressiveId,
                WarehouseSiloId = silo.Id,
                WarehouseDestionationId = destinations.Where(x => x.Code == "TF2").First().Id,
                WarehouseSiloProgressiveId = silo.ProgressiveId,
                WarehouseDestionationProgressiveId = destinations.Where(x => x.Code == "TF2").First().ProgressiveId,
                RepetitionNoMix = 1,//int.Parse(Core.Communication.tagsList.FDB_N15_B2_S4_N_RIP_REPLICA.VALUE.ToString()),
                RequestedQuantityNoMix = double.MinValue //double.Parse(Core.Communication.tagsList.FDB_N15_B2_S4_Q_REPLICA.VALUE.ToString())
            });

            _anaContext.SaveChanges();

            return true;
        }

        public bool SaveDayTotalizer()
        {
            DateTime registrationDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 6, 0, 0);

            DosingTotalizer lastTotal = _anaContext.DosingTotalizer.OrderByDescending(x => x.RegistrationDate).FirstOrDefault();
            if (lastTotal == null || lastTotal.RegistrationDate.Date != registrationDate.Date)
            {
                DateTime fromDate = DateTime.Now.AddDays(-1);
                fromDate = new DateTime(fromDate.Year, fromDate.Month, fromDate.Day, 6, 0, 0);
                DateTime toDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 5, 59, 59);
                List<DosingOrdersCompleted> dosingList = _anaContext.DosingOrdersCompleted.Where(x => x.EndDate >= fromDate & x.EndDate <= toDate).ToList();

                List<DosingTotalizer> dosingTotalizersNew = new List<DosingTotalizer>();

                foreach (var dosing in dosingList)
                {
                    DosingTotalizer existingDosSilo = dosingTotalizersNew.Where(x => x.WarehouseSiloId == dosing.WarehouseSiloId & x.MaterialId == dosing.MaterialId & x.RegistrationDate == registrationDate).FirstOrDefault();

                    if (existingDosSilo == null)
                    {
                        existingDosSilo = new DosingTotalizer
                        {
                            Id = Guid.NewGuid(),
                            Material = dosing.Material,
                            MaterialCode = dosing.MaterialCode,
                            MaterialId = dosing.MaterialId,
                            Unity = dosing.Unity,
                            RegistrationDate = registrationDate,
                            Silo = dosing.Silo,
                            SiloCode = dosing.SiloCode,
                            TotalDosedQuantity = dosing.DosedQuantity,
                            TotalRequestedQuantity = dosing.RequestedQuantityInMix * dosing.RepetitionInMix + dosing.RequestedQuantityNoMix * dosing.RepetitionNoMix,
                            TotalNumber = 1,
                            WarehouseSilo = dosing.WarehouseSilo,
                            WarehouseSiloId = dosing.WarehouseSiloId,
                            WarehouseSiloProgressiveId = dosing.WarehouseSiloProgressiveId
                        };

                        dosingTotalizersNew.Add(existingDosSilo);
                    }
                    else
                    {
                        existingDosSilo.TotalDosedQuantity += dosing.DosedQuantity;
                        existingDosSilo.TotalRequestedQuantity += dosing.RequestedQuantityInMix * dosing.RepetitionInMix + dosing.RequestedQuantityNoMix * dosing.RepetitionNoMix;
                        existingDosSilo.TotalNumber++;
                    }
                }

                _anaContext.AddRange(dosingTotalizersNew);

                _anaContext.SaveChanges();
            }

            return true;
        }

        public bool SaveWorkshiftTotalizer(DateTime start, DateTime end)
        {
            DateTime registrationDate = DateTime.Now;// new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0);

            DosingWorkshiftTotalizer lastTotal = _anaContext.DosingWorkshiftTotalizer.OrderByDescending(x => x.RegistrationDate).FirstOrDefault();

            string workshift = "Dalle " + start.ToShortDateString() + " " + start.ToShortTimeString() + " alle " + end.ToShortDateString() + " " + end.ToShortTimeString();

            if (lastTotal == null || !lastTotal.Workshift.Equals(workshift))
            {
                List<DosingOrdersCompleted> dosingList = _anaContext.DosingOrdersCompleted.Where(x => x.EndDate >= start & x.EndDate < end).ToList();

                List<DosingWorkshiftTotalizer> dosingTotalizersNew = new List<DosingWorkshiftTotalizer>();

                foreach (var dosing in dosingList)
                {
                    DosingWorkshiftTotalizer existingDosSilo = dosingTotalizersNew.Where(x => x.WarehouseSiloId == dosing.WarehouseSiloId & x.MaterialId == dosing.MaterialId & x.RegistrationDate == registrationDate).FirstOrDefault();

                    if (existingDosSilo == null)
                    {
                        existingDosSilo = new DosingWorkshiftTotalizer
                        {
                            Id = Guid.NewGuid(),
                            Workshift = "Dalle " + start.ToShortDateString() + " " + start.ToShortTimeString() + " alle " + end.ToShortDateString() + " " + end.ToShortTimeString(),
                            Material = dosing.Material,
                            MaterialCode = dosing.MaterialCode,
                            MaterialId = dosing.MaterialId,
                            Unity = dosing.Unity,
                            RegistrationDate = registrationDate,
                            Silo = dosing.Silo,
                            SiloCode = dosing.SiloCode,
                            TotalDosedQuantity = dosing.DosedQuantity,
                            TotalRequestedQuantity = dosing.RequestedQuantityInMix * dosing.RepetitionInMix + dosing.RequestedQuantityNoMix * dosing.RepetitionNoMix,
                            TotalNumber = 1,
                            WarehouseSilo = dosing.WarehouseSilo,
                            WarehouseSiloId = dosing.WarehouseSiloId,
                            WarehouseSiloProgressiveId = dosing.WarehouseSiloProgressiveId
                        };

                        dosingTotalizersNew.Add(existingDosSilo);
                    }
                    else
                    {
                        existingDosSilo.TotalDosedQuantity += dosing.DosedQuantity;
                        existingDosSilo.TotalRequestedQuantity += dosing.RequestedQuantityInMix * dosing.RepetitionInMix + dosing.RequestedQuantityNoMix * dosing.RepetitionNoMix;
                        existingDosSilo.TotalNumber++;
                    }
                }

                if (dosingTotalizersNew?.Count > 0)
                {
                    _anaContext.AddRange(dosingTotalizersNew);

                    _anaContext.SaveChanges();
                }
            }

            return true;
        }

        public bool CheckExistAckDosingCounter(string tagName, DateTime date)
        {
            bool rValue = false;

            Acks ack = _anaContext.Acks.Where(x => x.TagName.ToUpper().Equals(tagName.ToUpper()) && x.AckDate.Date == date.Date).FirstOrDefault();
            if (ack != null)
                return true;

            return rValue;
        }

        public bool InsertAckDosingCounter(string tagName, DateTime date)
        {
            bool rValue = false;

            Acks newAck = new Acks
            {
                TagName = tagName,
                AckDate = DateTime.Now.ToUniversalTime(),
                Id = Guid.NewGuid()
            };

            _anaContext.Add(newAck);

            _anaContext.SaveChanges();

            return rValue;
        }

        public IEnumerable<DosingDetailModel> GetLastDetail(int take)
        {
            var results = (from m in _anaContext.DosingOrdersCompleted
                           join w in _anaContext.Warehouse on m.WarehouseSiloId equals w.Id
                           orderby m.EndDate descending, w.OrderPosition ascending
                           select new DosingDetailModel()
                           {
                               ActualSiloQuantity = m.ActualSiloQuantity,
                               EndDate = m.EndDate,
                               Destionation = m.WarehouseDestionation,
                               DestionationId = m.WarehouseDestionationId,
                               DestionationProgressiveId = m.WarehouseDestionationProgressiveId,
                               DosedQuantity = m.DosedQuantity,
                               Id = m.Id,
                               Material = m.Material,
                               MaterialCode = m.MaterialCode,
                               MaterialId = m.MaterialId,
                               Note = m.Note,
                               Number = m.Number,
                               Recipe = m.Recipe,
                               RecipeId = m.RecipeId,
                               RecipeProgressiveId = m.RecipeProgressiveId,
                               RepetitionInMix = m.RepetitionInMix,
                               RepetitionNoMix = m.RepetitionNoMix,
                               RequestedQuantityInMix = m.RequestedQuantityInMix,
                               RequestedQuantityNoMix = m.RequestedQuantityNoMix,
                               Scale = m.Scale,
                               ScaleId = m.WarehouseScaleId,
                               ScaleProgressiveId = m.WarehouseScaleProgressiveId,
                               Silo = m.Silo,
                               SiloId = m.WarehouseSiloId,
                               SiloProgressiveId = m.WarehouseSiloProgressiveId,
                               Unity = m.Unity,
                               ActualSiloVolume = m.ActualSiloVolume,
                               MaterialDensity = m.MaterialDensity,
                               SiloCode = m.SiloCode
                           }).Take(take * 17);

            return results.AsEnumerable();
        }

        public IEnumerable<DosingDetailModel> GetDetailListByYear(int year)
        {
            var results = from m in _anaContext.DosingOrdersCompleted
                          join w in _anaContext.Warehouse on m.WarehouseSiloId equals w.Id
                          where m.EndDate.Year == year
                          orderby m.EndDate descending, m.Number descending, w.OrderPosition ascending
                          select new DosingDetailModel()
                          {
                              ActualSiloQuantity = m.ActualSiloQuantity,
                              EndDate = m.EndDate,
                              Destionation = m.WarehouseDestionation,
                              DestionationId = m.WarehouseDestionationId,
                              DestionationProgressiveId = m.WarehouseDestionationProgressiveId,
                              DosedQuantity = m.DosedQuantity,
                              Id = m.Id,
                              Material = m.Material,
                              MaterialCode = m.MaterialCode,
                              MaterialId = m.MaterialId,
                              Note = m.Note,
                              Number = m.Number,
                              Recipe = m.Recipe,
                              RecipeId = m.RecipeId,
                              RecipeProgressiveId = m.RecipeProgressiveId,
                              RepetitionInMix = m.RepetitionInMix,
                              RepetitionNoMix = m.RepetitionNoMix,
                              RequestedQuantityInMix = m.RequestedQuantityInMix,
                              RequestedQuantityNoMix = m.RequestedQuantityNoMix,
                              Scale = m.Scale,
                              ScaleId = m.WarehouseScaleId,
                              ScaleProgressiveId = m.WarehouseScaleProgressiveId,
                              Silo = m.Silo,
                              SiloId = m.WarehouseSiloId,
                              SiloProgressiveId = m.WarehouseSiloProgressiveId,
                              Unity = m.Unity,
                              ActualSiloVolume = m.ActualSiloVolume,
                              MaterialDensity = m.MaterialDensity,
                              SiloCode = m.SiloCode
                          };

            return results.AsEnumerable();
        }

        public IEnumerable<DosingDetailModel> GetDetailListByDate(DateTime date)
        {
            var results = from m in _anaContext.DosingOrdersCompleted
                          join w in _anaContext.Warehouse on m.WarehouseSiloId equals w.Id
                          where m.EndDate.Date == date.Date
                          orderby m.EndDate descending, m.Number descending, w.OrderPosition ascending
                          select new DosingDetailModel()
                          {
                              ActualSiloQuantity = m.ActualSiloQuantity,
                              EndDate = m.EndDate,
                              Destionation = m.WarehouseDestionation,
                              DestionationId = m.WarehouseDestionationId,
                              DestionationProgressiveId = m.WarehouseDestionationProgressiveId,
                              DosedQuantity = m.DosedQuantity,
                              Id = m.Id,
                              Material = m.Material,
                              MaterialCode = m.MaterialCode,
                              MaterialId = m.MaterialId,
                              Note = m.Note,
                              Number = m.Number,
                              Recipe = m.Recipe,
                              RecipeId = m.RecipeId,
                              RecipeProgressiveId = m.RecipeProgressiveId,
                              RepetitionInMix = m.RepetitionInMix,
                              RepetitionNoMix = m.RepetitionNoMix,
                              RequestedQuantityInMix = m.RequestedQuantityInMix,
                              RequestedQuantityNoMix = m.RequestedQuantityNoMix,
                              Scale = m.Scale,
                              ScaleId = m.WarehouseScaleId,
                              ScaleProgressiveId = m.WarehouseScaleProgressiveId,
                              Silo = m.Silo,
                              SiloId = m.WarehouseSiloId,
                              SiloProgressiveId = m.WarehouseSiloProgressiveId,
                              Unity = m.Unity,
                              ActualSiloVolume = m.ActualSiloVolume,
                              MaterialDensity = m.MaterialDensity,
                              SiloCode = m.SiloCode
                          };

            return results.AsEnumerable();
        }

        public IEnumerable<DosingDetailModel> GetDetailListByRange(DateTime dateFrom, DateTime dateTo)
        {
            var results = from m in _anaContext.DosingOrdersCompleted
                          join w in _anaContext.Warehouse on m.WarehouseSiloId equals w.Id
                          where m.EndDate >= dateFrom & m.EndDate <= dateTo
                          orderby m.EndDate descending, m.Number descending, w.OrderPosition ascending
                          select new DosingDetailModel()
                          {
                              ActualSiloQuantity = m.ActualSiloQuantity,
                              EndDate = m.EndDate,
                              Destionation = m.WarehouseDestionation,
                              DestionationId = m.WarehouseDestionationId,
                              DestionationProgressiveId = m.WarehouseDestionationProgressiveId,
                              DosedQuantity = m.DosedQuantity,
                              Id = m.Id,
                              Material = m.Material,
                              MaterialCode = m.MaterialCode,
                              MaterialId = m.MaterialId,
                              Note = m.Note,
                              Number = m.Number,
                              Recipe = m.Recipe,
                              RecipeId = m.RecipeId,
                              RecipeProgressiveId = m.RecipeProgressiveId,
                              RepetitionInMix = m.RepetitionInMix,
                              RepetitionNoMix = m.RepetitionNoMix,
                              RequestedQuantityInMix = m.RequestedQuantityInMix,
                              RequestedQuantityNoMix = m.RequestedQuantityNoMix,
                              Scale = m.Scale,
                              ScaleId = m.WarehouseScaleId,
                              ScaleProgressiveId = m.WarehouseScaleProgressiveId,
                              Silo = m.Silo,
                              SiloId = m.WarehouseSiloId,
                              SiloProgressiveId = m.WarehouseSiloProgressiveId,
                              Unity = m.Unity,
                              ActualSiloVolume = m.ActualSiloVolume,
                              MaterialDensity = m.MaterialDensity,
                              SiloCode = m.SiloCode
                          };

            return results.AsEnumerable();
        }

        public IEnumerable<DosingTotalizerModel> GetLastTotalizer(int take)
        {
            var results = (from m in _anaContext.DosingTotalizer
                           orderby m.RegistrationDate descending
                           select new DosingTotalizerModel()
                           {

                               Id = m.Id,
                               Material = m.Material,
                               MaterialCode = m.MaterialCode,
                               MaterialId = m.MaterialId,
                               Silo = m.Silo,
                               SiloId = m.WarehouseSiloId,
                               SiloProgressiveId = m.WarehouseSiloProgressiveId,
                               Unity = m.Unity,
                               RegistrationDate = m.RegistrationDate,
                               TotalDosedQuantity = m.TotalDosedQuantity,
                               TotalNumber = m.TotalNumber,
                               TotalRequestedQuantity = m.TotalRequestedQuantity
                           }).Take(take);

            return results.AsEnumerable();
        }

        public IEnumerable<DosingTotalizerModel> GetTotalizerListByYear(int year)
        {
            var results = from m in _anaContext.DosingTotalizer
                          where m.RegistrationDate.Year == year
                          select new DosingTotalizerModel()
                          {

                              Id = m.Id,
                              Material = m.Material,
                              MaterialCode = m.MaterialCode,
                              MaterialId = m.MaterialId,
                              Silo = m.Silo,
                              SiloId = m.WarehouseSiloId,
                              SiloProgressiveId = m.WarehouseSiloProgressiveId,
                              Unity = m.Unity,
                              RegistrationDate = m.RegistrationDate,
                              TotalDosedQuantity = m.TotalDosedQuantity,
                              TotalNumber = m.TotalNumber,
                              TotalRequestedQuantity = m.TotalRequestedQuantity
                          };

            return results.AsEnumerable();
        }

        public IEnumerable<DosingTotalizerModel> GetTotalizerListByDate(DateTime date)
        {
            var results = from m in _anaContext.DosingTotalizer
                          where m.RegistrationDate.Date == date.Date
                          select new DosingTotalizerModel()
                          {

                              Id = m.Id,
                              Material = m.Material,
                              MaterialCode = m.MaterialCode,
                              MaterialId = m.MaterialId,
                              Silo = m.Silo,
                              SiloId = m.WarehouseSiloId,
                              SiloProgressiveId = m.WarehouseSiloProgressiveId,
                              Unity = m.Unity,
                              RegistrationDate = m.RegistrationDate,
                              TotalDosedQuantity = m.TotalDosedQuantity,
                              TotalNumber = m.TotalNumber,
                              TotalRequestedQuantity = m.TotalRequestedQuantity
                          };

            return results.AsEnumerable();
        }

        public IEnumerable<DosingTotalizerModel> GetTotalizerListByRange(DateTime dateFrom, DateTime dateTo)
        {
            var results = from m in _anaContext.DosingTotalizer
                          where m.RegistrationDate >= dateFrom & m.RegistrationDate <= dateTo
                          select new DosingTotalizerModel()
                          {
                              Id = m.Id,
                              Material = m.Material,
                              MaterialCode = m.MaterialCode,
                              MaterialId = m.MaterialId,
                              Silo = m.Silo,
                              SiloId = m.WarehouseSiloId,
                              SiloProgressiveId = m.WarehouseSiloProgressiveId,
                              Unity = m.Unity,
                              RegistrationDate = m.RegistrationDate,
                              TotalDosedQuantity = m.TotalDosedQuantity,
                              TotalNumber = m.TotalNumber,
                              TotalRequestedQuantity = m.TotalRequestedQuantity
                          };

            return results.AsEnumerable();
        }

        public IEnumerable<DosingWorkshiftTotalizerModel> GetLastWorkshiftTotalizer(int take)
        {
            var results = (from m in _anaContext.DosingWorkshiftTotalizer
                           orderby m.RegistrationDate descending
                           select new DosingWorkshiftTotalizerModel()
                           {
                               Id = m.Id,
                               Material = m.Material,
                               MaterialCode = m.MaterialCode,
                               MaterialId = m.MaterialId,
                               Silo = m.Silo,
                               SiloId = m.WarehouseSiloId,
                               SiloProgressiveId = m.WarehouseSiloProgressiveId,
                               Unity = m.Unity,
                               RegistrationDate = m.RegistrationDate,
                               TotalDosedQuantity = m.TotalDosedQuantity,
                               TotalNumber = m.TotalNumber,
                               TotalRequestedQuantity = m.TotalRequestedQuantity,
                               Workshift = m.Workshift
                           }).Take(take);

            return results.AsEnumerable();
        }

        public IEnumerable<DosingWorkshiftTotalizerModel> GetWorkshiftTotalizerListByYear(int year)
        {
            var results = from m in _anaContext.DosingWorkshiftTotalizer
                          where m.RegistrationDate.Year == year
                          select new DosingWorkshiftTotalizerModel()
                          {
                              Id = m.Id,
                              Material = m.Material,
                              MaterialCode = m.MaterialCode,
                              MaterialId = m.MaterialId,
                              Silo = m.Silo,
                              SiloId = m.WarehouseSiloId,
                              SiloProgressiveId = m.WarehouseSiloProgressiveId,
                              Unity = m.Unity,
                              RegistrationDate = m.RegistrationDate,
                              TotalDosedQuantity = m.TotalDosedQuantity,
                              TotalNumber = m.TotalNumber,
                              TotalRequestedQuantity = m.TotalRequestedQuantity,
                              Workshift = m.Workshift
                          };

            return results.AsEnumerable();
        }

        public IEnumerable<DosingWorkshiftTotalizerModel> GetWorkshiftTotalizerListByDate(DateTime date)
        {
            var results = from m in _anaContext.DosingWorkshiftTotalizer
                          where m.RegistrationDate.Date == date.Date
                          select new DosingWorkshiftTotalizerModel()
                          {
                              Id = m.Id,
                              Material = m.Material,
                              MaterialCode = m.MaterialCode,
                              MaterialId = m.MaterialId,
                              Silo = m.Silo,
                              SiloId = m.WarehouseSiloId,
                              SiloProgressiveId = m.WarehouseSiloProgressiveId,
                              Unity = m.Unity,
                              RegistrationDate = m.RegistrationDate,
                              TotalDosedQuantity = m.TotalDosedQuantity,
                              TotalNumber = m.TotalNumber,
                              TotalRequestedQuantity = m.TotalRequestedQuantity,
                              Workshift = m.Workshift
                          };

            return results.AsEnumerable();
        }

        public IEnumerable<DosingWorkshiftTotalizerModel> GetWorkshiftTotalizerListByRange(DateTime dateFrom, DateTime dateTo)
        {
            var results = from m in _anaContext.DosingWorkshiftTotalizer
                          where m.RegistrationDate >= dateFrom & m.RegistrationDate <= dateTo
                          select new DosingWorkshiftTotalizerModel()
                          {
                              Id = m.Id,
                              Material = m.Material,
                              MaterialCode = m.MaterialCode,
                              MaterialId = m.MaterialId,
                              Silo = m.Silo,
                              SiloId = m.WarehouseSiloId,
                              SiloProgressiveId = m.WarehouseSiloProgressiveId,
                              Unity = m.Unity,
                              RegistrationDate = m.RegistrationDate,
                              TotalDosedQuantity = m.TotalDosedQuantity,
                              TotalNumber = m.TotalNumber,
                              TotalRequestedQuantity = m.TotalRequestedQuantity,
                              Workshift = m.Workshift
                          };

            return results.AsEnumerable();
        }

    }
}
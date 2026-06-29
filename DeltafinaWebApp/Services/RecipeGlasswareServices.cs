using DeltafinaWebApp.Data.Archives;
using Models.Archives.Recipes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using Models.Archives.Recipes.Glassware;

namespace Services
{
    public class RecipeGlasswareServices
    {

        private ArchivesDbContext _anaContext;
        public bool IsBusy { get; set; }

        UserServices _userServices;


        public RecipeGlasswareServices(
            ArchivesDbContext anaContext)
        {
            _anaContext = anaContext;
        }

        public RecipeGlasswareModel CreateRecipe(RecipeGlasswareModel model)
        {
            if (!IsBusy)
            {
                IsBusy = true;

                model.Id = Guid.NewGuid();

                Recipes lastData = _anaContext.Recipes.OrderByDescending(x => x.ProgressiveId).Take(1).FirstOrDefault();
                int newId = lastData != null ? lastData.ProgressiveId + 1 : 1;

                //string code = Helpers.RecipeHelper.GetCode(true, newId, 3);

                Recipes recipe = new Recipes
                {
                    Id = model.Id.Value,
                    IsDeleted = false,
                    IsEnabled = true,
                    Name = model.Name,
                    Note = model.Note,
                    ProgressiveId = newId,
                    Code = model.Code,
                    MaterialId = model.MaterialId,
                    RecipeTypeId = model.RecipeTypeId,
                    CreationDate = DateTime.Now.ToUniversalTime(),
                    LastUpdateDate = DateTime.Now.ToUniversalTime(),
                    UserId = model.UserId
                };

                _anaContext.Recipes.Add(recipe);

                RecipeGlasswares recipeGlasswares = new RecipeGlasswares
                {
                    RecipeId = recipe.Id,
                    TimeMixing = model.TimeMixing,
                    TimeMixWater = model.TimeMixWater
                };

                _anaContext.RecipeGlasswares.Add(recipeGlasswares);

                foreach (var item in model.Components)
                {
                    RecipesWarehouses recipesWarehouses = new RecipesWarehouses
                    {
                        Id = Guid.NewGuid(),
                        RecipeId = recipe.Id,
                        IsDeleted = item.IsDeleted,
                        IsEnabled = item.IsEnabled,
                        WarehouseId = item.SiloId,
                        CreationDate = DateTime.Now.ToUniversalTime(),
                        LastUpdateDate = DateTime.Now.ToUniversalTime(),
                        UserId = model.UserId,
                        RowIndex = item.RowIndex
                    };

                    _anaContext.RecipesWarehouses.Add(recipesWarehouses);

                    RecipesWarehousesGlasswares recipesWarehousesGlassware = new RecipesWarehousesGlasswares
                    {
                        RecipeWarehouseId = recipesWarehouses.Id,
                        QuantityMix = item.QuantityMix,
                        QuantityNotMix = item.QuantityNotMix,
                        Repetition = item.Repetition,
                        RepetitionNotMix = item.RepetitionNotMix
                    };

                    _anaContext.RecipesWarehousesGlasswares.Add(recipesWarehousesGlassware);
                }

                _anaContext.SaveChanges();

                IsBusy = false;

                //log parametri
                _userServices = new UserServices(_anaContext);
                _userServices.LogRecipeParams(null, model);

                return model;
            }
            else
                return null;
        }

        public bool UpdateRecipe(RecipeGlasswareModel model)
        {
            Recipes recipeData = _anaContext.Recipes.Where(x => x.Id == model.Id).FirstOrDefault();
            if (recipeData != null)
            {
                //log parametri
                RecipeGlasswareModel oldRecipe = this.GetRecipeById(model.Id.Value);
                _userServices = new UserServices(_anaContext);
                _userServices.LogRecipeParams(oldRecipe, model);


                recipeData.IsDeleted = false;
                recipeData.IsEnabled = model.IsEnabled;
                recipeData.Name = model.Name;
                recipeData.Note = model.Note;
                recipeData.ProgressiveId = model.ProgressiveId;
                recipeData.Code = model.Code;
                recipeData.MaterialId = model.MaterialId;
                recipeData.RecipeTypeId = model.RecipeTypeId;
                recipeData.LastUpdateDate = DateTime.Now.ToUniversalTime();
                recipeData.UserId = model.UserId;

                RecipeGlasswares recipeGlasswaresData = _anaContext.RecipeGlasswares.Where(x => x.RecipeId == model.Id).FirstOrDefault();
                recipeGlasswaresData.TimeMixing = model.TimeMixing;
                recipeGlasswaresData.TimeMixWater = model.TimeMixWater;

                // elimino preventivamente tutti gli addetti assegnati
                var items2 = from rwg in _anaContext.RecipesWarehousesGlasswares
                             join rw in _anaContext.RecipesWarehouses on rwg.RecipeWarehouseId equals rw.Id
                             where rw.RecipeId == model.Id
                             select rwg;
                if (items2?.Count() > 0)
                    _anaContext.RecipesWarehousesGlasswares.RemoveRange(items2);

                // elimino preventivamente tutti gli addetti assegnati
                var items = _anaContext.RecipesWarehouses.Where(x => x.RecipeId == recipeData.Id);
                if (items?.Count() > 0)
                    _anaContext.RecipesWarehouses.RemoveRange(items);

                // aggiunto tutti i responsabili tecnici
                if (model.Components != null)
                {
                    foreach (var item in model.Components)
                    {
                        RecipesWarehouses recipesWarehouses = new RecipesWarehouses
                        {
                            Id = Guid.NewGuid(),
                            RecipeId = recipeData.Id,
                            IsDeleted = item.IsDeleted,
                            WarehouseId = item.SiloId,
                            IsEnabled = true,                            
                            CreationDate = DateTime.Now.ToUniversalTime(),
                            LastUpdateDate = DateTime.Now.ToUniversalTime(),
                            UserId = model.UserId,
                            RowIndex = item.RowIndex
                        };

                        _anaContext.RecipesWarehouses.Add(recipesWarehouses);

                        RecipesWarehousesGlasswares recipesWarehousesGlasswares = new RecipesWarehousesGlasswares
                        {
                            RecipeWarehouseId = recipesWarehouses.Id,
                            QuantityMix = item.QuantityMix,
                            QuantityNotMix = item.QuantityNotMix,
                            Repetition = item.Repetition,
                            RepetitionNotMix = item.RepetitionNotMix
                        };

                        _anaContext.RecipesWarehousesGlasswares.Add(recipesWarehousesGlasswares);
                    }
                }

                _anaContext.SaveChanges();

                return true;
            }
            else
                throw new Exception("Recipe not found");
        }        

        public bool DeleteRecipe(RecipeGlasswareModel model)
        {
            Recipes recipeData = _anaContext.Recipes.Where(x => x.Id == model.Id).FirstOrDefault();
            if (recipeData != null)
            {
                recipeData.IsDeleted = true;

                _anaContext.SaveChanges();

                return true;
            }
            else
                throw new Exception("Recipe not found");
        }

        public RecipeGlasswareModel GetForNew()
        {
            List<Warehouse> warehouses = _anaContext.Warehouse.Where(x => x.WarehouseTypeId == 1).ToList();
            List<Materials> materials = _anaContext.Materials.Where(x => x.MaterialTypeId == 1).ToList();

            RecipeGlasswareModel rValue = new RecipeGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                RecipeTypeId = 2,
                TimeMixing = 300,
                TimeMixWater = 10,
                Components = new List<RecipeWarehouseGlasswareModel>()
            };
           
            //S1
            Guid siloId = new Guid("41a02340-b306-4d20-abc5-eb48a2b99ee1");
            Warehouse silo = warehouses.Where(x => x.Id == siloId).First();
            Materials material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 0                
            });

            //S2
            siloId = new Guid("071340fa-0e1f-4401-8c16-1ce983a9642a");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 1
            });

            //S3
            siloId = new Guid("3517ff67-af2f-482e-a1e8-74740b9596d4");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 2
            });

            //S4
            siloId = new Guid("88d84208-d633-4122-a3b5-013e8432a4e6");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 3
            });

            //S5
            siloId = new Guid("98179ff9-082b-4627-b112-9952420f4dce");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 4
            });

            //S6
            siloId = new Guid("036127f9-2083-44b7-a010-27678f7ee22d");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 5
            });

            //S7
            siloId = new Guid("a6b1a75a-daff-485a-88da-69c590550a95");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 6
            });

            //S8
            siloId = new Guid("768a6094-5c9a-4b24-a2fb-ecba5d1b89d0");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 7
            });

            //S9
            siloId = new Guid("306df402-5116-45c6-b214-aa89072f5be3");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 8
            });

            //S10
            siloId = new Guid("c30c988f-3968-4392-a035-c6586ed52a3c");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 9
            });

            //S11
            siloId = new Guid("6803dd0d-f2c7-4456-aacd-dfa6bb91a37b");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 10
            });

            //S12
            siloId = new Guid("2975aa4c-716e-4732-916b-0923a7f27b19");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 11
            });

            //S13
            siloId = new Guid("d18e99d7-be78-4175-b981-3b68e9bca95d");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 12
            });

            //S14
            siloId = new Guid("cd18b432-a1a8-490b-a775-697bc1dcb2a3");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 13
            });

            //S15
            siloId = new Guid("2b03e37f-86f2-4a88-97ca-ecfee42c0a8c");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 14
            });

            //S16
            siloId = new Guid("ecc36998-f01a-4bc1-846a-48c8b070ae07");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 15
            });

            //TP6
            siloId = new Guid("34b82a80-0eee-4460-9f56-53b7500af10a");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 15
            });

            //TP6A
            siloId = new Guid("20bd440e-d4ba-4d8e-bbc1-f64d86eaa46f");
            silo = warehouses.Where(x => x.Id == siloId).First();
            material = materials.Where(x => x.Id == silo.MaterialId).First();
            rValue.Components.Add(new RecipeWarehouseGlasswareModel
            {
                IsDeleted = false,
                IsEnabled = true,
                QuantityMix = 0,
                QuantityNotMix = 0,
                Repetition = 1,
                RepetitionNotMix = 1,
                SiloId = siloId,
                Silo = silo.Code,
                MaterialId = silo.MaterialId,
                Material = materials.Where(x => x.Id == silo.MaterialId).First().Name,
                UnityOfMeasure = material.UnityOfMeasure,
                RowIndex = 15
            });

            return rValue;
        }

        public RecipeGlasswareModel GetRecipeById(Guid id)
        {
            Recipes recipe = _anaContext.Recipes.Where(x => x.Id == id).FirstOrDefault();
            if (recipe != null)
            {
                RecipeGlasswareModel rValue = new RecipeGlasswareModel
                {
                    Id = recipe.Id,
                    Code = recipe.Code,
                    ProgressiveId = recipe.ProgressiveId,
                    IsDeleted = recipe.IsDeleted,
                    IsEnabled = recipe.IsEnabled,
                    Name = recipe.Name,
                    Note = recipe.Note,
                    MaterialId = recipe.MaterialId,
                    //Material = recipe.MaterialId.HasValue ? recipe.Material.Name : null,
                    RecipeTypeId = recipe.RecipeTypeId,
                    //RecipeType = recipe.RecipeType.Name,
                    //TimeMixing = recipe.RecipeGlasswares.TimeMixing,
                    //TimeMixWater = recipe.RecipeGlasswares.TimeMixWater,
                    Components = new List<RecipeWarehouseGlasswareModel>(),
                    UserId = recipe.UserId,
                    CreationDate = recipe.CreationDate.ToLocalTime(),
                    LastUpdateDate = recipe.LastUpdateDate.ToLocalTime()
                };

                RecipeGlasswares recipeGlasswares = _anaContext.RecipeGlasswares.Where(x => x.RecipeId == id).FirstOrDefault();
                //RecipeType = recipe.RecipeType.Name,
                rValue.TimeMixing = recipeGlasswares.TimeMixing;
                rValue.TimeMixWater = recipeGlasswares.TimeMixWater;

                if (recipe.MaterialId.HasValue)
                {
                    Materials material = _anaContext.Materials.Where(x => x.Id == recipe.MaterialId.Value).FirstOrDefault();
                    rValue.TimeMixing = recipeGlasswares.TimeMixing;
                    rValue.TimeMixWater = recipeGlasswares.TimeMixWater;
                }

                List<RecipesWarehouses> recipesWarehousesGlasswares = _anaContext.RecipesWarehouses.Where(x => x.RecipeId == id).OrderBy(x => x.RowIndex).ToList();
                if (recipesWarehousesGlasswares?.Count > 0)
                {
                    foreach (var item in recipesWarehousesGlasswares)
                    {
                        RecipeWarehouseGlasswareModel newItem = new RecipeWarehouseGlasswareModel
                        {
                            Id = item.Id,
                            IsDeleted = item.IsDeleted,
                            IsEnabled = item.IsEnabled,
                            //QuantityMix = item.RecipesWarehousesGlasswares.QuantityMix,
                            //QuantityNotMix = item.RecipesWarehousesGlasswares.QuantityNotMix,
                            //Repetition = item.RecipesWarehousesGlasswares.Repetition,
                            //RepetitionNotMix = item.RecipesWarehousesGlasswares.RepetitionNotMix,
                            Recipe = rValue.Name,
                            RecipeId = rValue.Id.Value,
                            SiloId = item.WarehouseId,
                            //Silo = item.Warehouse.Name,
                            //MaterialId = item.Warehouse.MaterialId,
                            //Material = item.Warehouse.MaterialId.HasValue ? item.Warehouse.Material.Name : null,
                            //UnityOfMeasure = item.Warehouse.MaterialId.HasValue ? item.Warehouse.Material.UnityOfMeasure : null,
                            UserId = item.UserId,
                            CreationDate = recipe.CreationDate.ToLocalTime(),
                            LastUpdateDate = recipe.LastUpdateDate.ToLocalTime(),
                            RowIndex = item.RowIndex
                        };

                        RecipesWarehousesGlasswares rwgItem = _anaContext.RecipesWarehousesGlasswares.Where(x => x.RecipeWarehouseId == item.Id).FirstOrDefault();
                        newItem.QuantityMix = rwgItem.QuantityMix;
                        newItem.QuantityNotMix = rwgItem.QuantityNotMix;
                        newItem.Repetition = rwgItem.Repetition;
                        newItem.RepetitionNotMix = rwgItem.RepetitionNotMix;

                        Warehouse wItem = _anaContext.Warehouse.Where(x => x.Id == item.WarehouseId).FirstOrDefault();
                        newItem.MaterialId = wItem.MaterialId;
                        newItem.Silo = wItem.Name;

                        if (wItem.MaterialId.HasValue)
                        {
                            Materials material = _anaContext.Materials.Where(x => x.Id == wItem.MaterialId.Value).FirstOrDefault();
                            newItem.Material = material.Name;
                            newItem.UnityOfMeasure = material.UnityOfMeasure;
                        }

                        rValue.Components.Add(newItem);

                        //rValue.Components.Add(new RecipeWarehouseGlasswareModel
                        //{
                        //    Id = item.Id,
                        //    IsDeleted = item.IsDeleted,
                        //    IsEnabled = item.IsEnabled,
                        //    QuantityMix = item.RecipesWarehousesGlasswares.QuantityMix,
                        //    QuantityNotMix = item.RecipesWarehousesGlasswares.QuantityNotMix,
                        //    Recipe = rValue.Name,
                        //    RecipeId = rValue.Id.Value,
                        //    Repetition = item.RecipesWarehousesGlasswares.Repetition,
                        //    RepetitionNotMix = item.RecipesWarehousesGlasswares.RepetitionNotMix,
                        //    SiloId = item.WarehouseId,
                        //    Silo = item.Warehouse.Name,
                        //    MaterialId = item.Warehouse.MaterialId,
                        //    Material = item.Warehouse.MaterialId.HasValue ? item.Warehouse.Material.Name : null,
                        //    UnityOfMeasure = item.Warehouse.MaterialId.HasValue ? item.Warehouse.Material.UnityOfMeasure : null,
                        //    UserId = item.UserId,
                        //    CreationDate = recipe.CreationDate,
                        //    LastUpdateDate = recipe.LastUpdateDate
                        //});
                    }
                }


                return rValue;
            }
            else
                return null;// throw new Exception("Recipe not found");
        }

        public RecipeGlasswareModel GetRecipeByProgressiveId(int id)
        {
            Recipes recipe = _anaContext.Recipes.Where(x => x.ProgressiveId == id).FirstOrDefault();
            if (recipe != null)
            {
                RecipeGlasswareModel rValue = new RecipeGlasswareModel
                {
                    Id = recipe.Id,
                    Code = recipe.Code,
                    ProgressiveId = recipe.ProgressiveId,
                    IsDeleted = recipe.IsDeleted,
                    IsEnabled = recipe.IsEnabled,
                    Name = recipe.Name,
                    Note = recipe.Note,
                    MaterialId = recipe.MaterialId,
                    //Material = recipe.MaterialId.HasValue ? recipe.Material.Name : null,
                    RecipeTypeId = recipe.RecipeTypeId,
                    //RecipeType = recipe.RecipeType.Name,
                    //TimeMixing = recipe.RecipeGlasswares.TimeMixing,
                    //TimeMixWater = recipe.RecipeGlasswares.TimeMixWater,
                    Components = new List<RecipeWarehouseGlasswareModel>(),
                    UserId = recipe.UserId,
                    CreationDate = recipe.CreationDate.ToLocalTime(),
                    LastUpdateDate = recipe.LastUpdateDate.ToLocalTime()
                };

                RecipeGlasswares recipeGlasswares = _anaContext.RecipeGlasswares.Where(x => x.RecipeId == recipe.Id).FirstOrDefault();
                //RecipeType = recipe.RecipeType.Name,
                rValue.TimeMixing = recipeGlasswares.TimeMixing;
                rValue.TimeMixWater = recipeGlasswares.TimeMixWater;

                if (recipe.MaterialId.HasValue)
                {
                    Materials material = _anaContext.Materials.Where(x => x.Id == recipe.MaterialId.Value).FirstOrDefault();
                    rValue.TimeMixing = recipeGlasswares.TimeMixing;
                    rValue.TimeMixWater = recipeGlasswares.TimeMixWater;
                }

                List<RecipesWarehouses> recipesWarehousesGlasswares = _anaContext.RecipesWarehouses.Where(x => x.RecipeId == recipe.Id).OrderBy(x => x.RowIndex).ToList();
                if (recipesWarehousesGlasswares?.Count > 0)
                {
                    foreach (var item in recipesWarehousesGlasswares)
                    {
                        RecipeWarehouseGlasswareModel newItem = new RecipeWarehouseGlasswareModel
                        {
                            Id = item.Id,
                            IsDeleted = item.IsDeleted,
                            IsEnabled = item.IsEnabled,
                            //QuantityMix = item.RecipesWarehousesGlasswares.QuantityMix,
                            //QuantityNotMix = item.RecipesWarehousesGlasswares.QuantityNotMix,
                            //Repetition = item.RecipesWarehousesGlasswares.Repetition,
                            //RepetitionNotMix = item.RecipesWarehousesGlasswares.RepetitionNotMix,
                            Recipe = rValue.Name,
                            RecipeId = rValue.Id.Value,
                            SiloId = item.WarehouseId,
                            //Silo = item.Warehouse.Name,
                            //MaterialId = item.Warehouse.MaterialId,
                            //Material = item.Warehouse.MaterialId.HasValue ? item.Warehouse.Material.Name : null,
                            //UnityOfMeasure = item.Warehouse.MaterialId.HasValue ? item.Warehouse.Material.UnityOfMeasure : null,
                            UserId = item.UserId,
                            CreationDate = recipe.CreationDate.ToLocalTime(),
                            LastUpdateDate = recipe.LastUpdateDate.ToLocalTime(),
                            RowIndex = item.RowIndex
                        };

                        RecipesWarehousesGlasswares rwgItem = _anaContext.RecipesWarehousesGlasswares.Where(x => x.RecipeWarehouseId == item.Id).FirstOrDefault();
                        newItem.QuantityMix = rwgItem.QuantityMix;
                        newItem.QuantityNotMix = rwgItem.QuantityNotMix;
                        newItem.Repetition = rwgItem.Repetition;
                        newItem.RepetitionNotMix = rwgItem.RepetitionNotMix;

                        Warehouse wItem = _anaContext.Warehouse.Where(x => x.Id == item.WarehouseId).FirstOrDefault();
                        newItem.MaterialId = wItem.MaterialId;
                        newItem.Silo = wItem.Name;

                        if (wItem.MaterialId.HasValue)
                        {
                            Materials material = _anaContext.Materials.Where(x => x.Id == wItem.MaterialId.Value).FirstOrDefault();
                            newItem.Material = material.Name;
                            newItem.UnityOfMeasure = material.UnityOfMeasure;
                        }

                        rValue.Components.Add(newItem);

                        //rValue.Components.Add(new RecipeWarehouseGlasswareModel
                        //{
                        //    Id = item.Id,
                        //    IsDeleted = item.IsDeleted,
                        //    IsEnabled = item.IsEnabled,
                        //    QuantityMix = item.RecipesWarehousesGlasswares.QuantityMix,
                        //    QuantityNotMix = item.RecipesWarehousesGlasswares.QuantityNotMix,
                        //    Recipe = rValue.Name,
                        //    RecipeId = rValue.Id.Value,
                        //    Repetition = item.RecipesWarehousesGlasswares.Repetition,
                        //    RepetitionNotMix = item.RecipesWarehousesGlasswares.RepetitionNotMix,
                        //    SiloId = item.WarehouseId,
                        //    Silo = item.Warehouse.Name,
                        //    MaterialId = item.Warehouse.MaterialId,
                        //    Material = item.Warehouse.MaterialId.HasValue ? item.Warehouse.Material.Name : null,
                        //    UnityOfMeasure = item.Warehouse.MaterialId.HasValue ? item.Warehouse.Material.UnityOfMeasure : null,
                        //    UserId = item.UserId,
                        //    CreationDate = recipe.CreationDate,
                        //    LastUpdateDate = recipe.LastUpdateDate
                        //});
                    }
                }


                return rValue;
            }
            else
                return null;// throw new Exception("Recipe not found");
        }

        public IList<RecipeGlasswareModel> GetRecipes()
        {
            //IList<RecipeGlasswareModel> rValue = new List<RecipeGlasswareModel>();
            
            var results = from r in _anaContext.Recipes
                          join rg in _anaContext.RecipeGlasswares on r.Id equals rg.RecipeId
                          where !r.IsDeleted
                          select new RecipeGlasswareModel
                          {
                              Id = r.Id,
                              Code = r.Code,
                              ProgressiveId = r.ProgressiveId,
                              IsDeleted = r.IsDeleted,
                              IsEnabled = r.IsEnabled,
                              Name = r.Name,
                              Note = r.Note,
                              MaterialId = r.MaterialId,
                              Material = r.MaterialId.HasValue ? r.Material.Name : null,
                              RecipeTypeId = r.RecipeTypeId,
                              RecipeType = r.RecipeType.Name,
                              TimeMixing = rg.TimeMixing,
                              TimeMixWater = rg.TimeMixWater,
                              UserId = r.UserId,
                              CreationDate = r.CreationDate.ToLocalTime(),
                              LastUpdateDate = r.LastUpdateDate.ToLocalTime()
                          };

            return results.ToList();
        }

    }
}
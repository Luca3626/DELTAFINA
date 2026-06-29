import { Injectable } from '@angular/core';
import * as fModels from 'src/app/models/filter.models';

@Injectable()
export class FilterService {

  dateAct: Date = new Date(Date.now());

  public userFilters: fModels.UserFilterModel = new fModels.UserFilterModel("", "", "", "", "", "", "");
  public carrierFilters: fModels.CarrierFilterModel = new fModels.CarrierFilterModel("", "", "", "", "", "", "", "");
  public customerFilters: fModels.CustomerFilterModel = new fModels.CustomerFilterModel("", "", "", "", "", "", "", "");
  public supplierFilters: fModels.SupplierFilterModel = new fModels.SupplierFilterModel("", "", "", "", "", "", "", "");
  public portalFarmFilters: fModels.PortalFarmFilterModel = new fModels.PortalFarmFilterModel("", "", "", "", "", "", "", "");
  public contactFilters: fModels.ContactFilterModel = new fModels.ContactFilterModel("", "", "", "", "", "", "");
  public locationFilters: fModels.LocationFilterModel = new fModels.LocationFilterModel("", "");
  public maintenanceFilters: fModels.MaintenanceFilterModel = new fModels.MaintenanceFilterModel("", "", "", "", "", "");
  public maintenanceActivityFilters: fModels.MaintenanceActivityFilterModel = new fModels.MaintenanceActivityFilterModel("", "", "", "", "", "", "", "");
  public tagClientFilters: fModels.TagClientFilterModel = new fModels.TagClientFilterModel("", "", "", "", "", "", "", "");
  public materialFilters: fModels.MaterialFilterModel = new fModels.MaterialFilterModel("", "", "", "");
  public acceptanceFilters: fModels.AcceptanceFilterModel = new fModels.AcceptanceFilterModel();
  public recycleFilters: fModels.RecycleFilterModel = new fModels.RecycleFilterModel();
  public luxPPRecipeFilters: fModels.LuxPPRecipeFilterModel = new fModels.LuxPPRecipeFilterModel("", "", "", "");
  public luxPLRecipeFilters: fModels.LuxPLRecipeFilterModel = new fModels.LuxPLRecipeFilterModel("", "", "", "");
  public logTrendFilters: fModels.LogTrendFilterModel = new fModels.LogTrendFilterModel("", "", "", "", "", "", "");
  public trendFilters: fModels.TrendFilterModel = new fModels.TrendFilterModel("", "", "", "", "", "", "", "", "", "", "");
  public alarmSettingFilters: fModels.AlarmSettingFilterModel = new fModels.AlarmSettingFilterModel("", "", "", "", "", "", "", "");
  public calendarContractOilMillFilters: fModels.CalendarContractOilMillFilterModel = new fModels.CalendarContractOilMillFilterModel("", "", "", "", "", "", "", "", "", "", "", "false", "");
  public recipeFilters: fModels.RecipeFilterModel = new fModels.RecipeFilterModel("", "", "");
  public siloFilters: fModels.SiloFilterModel = new fModels.SiloFilterModel("", "", "", "");

  constructor() { }

  public resetUserFilters() {
    this.userFilters = new fModels.UserFilterModel("", "", "", "", "", "", "");
  }

  public resetCarrierFilters() {
    this.carrierFilters = new fModels.CarrierFilterModel("", "", "", "", "", "", "", "");
  }

  public resetCustomerFilters() {
    this.customerFilters = new fModels.CustomerFilterModel("", "", "", "", "", "", "", "");
  }

  public resetSupplierFilters() {
    this.customerFilters = new fModels.CustomerFilterModel("", "", "", "", "", "", "", "");
  }

  public resetPortalFarmFilters() {
    this.portalFarmFilters = new fModels.PortalFarmFilterModel("", "", "", "", "", "", "", "");
  }

  public resetContactFilters() {
    this.contactFilters = new fModels.ContactFilterModel("", "", "", "", "", "", "");
  }

  public resetLocationFilters() {
    this.locationFilters = new fModels.LocationFilterModel("", "");
  }

  public resetMaintenanceFilters() {
    this.maintenanceFilters = new fModels.MaintenanceFilterModel("", "", "", "", "", "");
  }

  public resetMaintenanceActivityFilters() {
    this.maintenanceActivityFilters = new fModels.MaintenanceActivityFilterModel("", "", "", "", "", "", "", "");
  }

  public resetTagClientFilters() {
    this.tagClientFilters = new fModels.TagClientFilterModel("", "", "", "", "", "", "", "");
  }

  public resetMaterialFilters() {
    this.materialFilters = new fModels.MaterialFilterModel("", "", "", "");
  }

  public resetAcceptanceFilters() {
    this.acceptanceFilters = new fModels.AcceptanceFilterModel();
  }

  public resetRecycleFilters() {
    this.recycleFilters = new fModels.RecycleFilterModel();
  }

  public resetLuxPPRecipeFilters() {
    this.luxPPRecipeFilters = new fModels.LuxPPRecipeFilterModel("", "", "", "");
  }

  public resetLuxPLRecipeFilters() {
    this.luxPLRecipeFilters = new fModels.LuxPLRecipeFilterModel("", "", "", "");
  }

  public resetLogTrendFilters() {
    this.logTrendFilters = new fModels.LogTrendFilterModel("", "", "", "", "", "", "");
  }

  public resetTrendFilters() {
    this.trendFilters = new fModels.TrendFilterModel("", "", "", "", "", "", "", "", "", "", "");
  }

  public resetAlarmSettingFilters() {
    this.alarmSettingFilters = new fModels.AlarmSettingFilterModel("", "", "", "", "", "", "", "");
  }

  public resetCalendarContractOilMillFilters() {
    this.calendarContractOilMillFilters = new fModels.CalendarContractOilMillFilterModel("", "", "", "", "", "", "", "", "", "", "", "false", "");
  }

  public resetRecipeFilters() {
    this.recipeFilters = new fModels.RecipeFilterModel("", "", "");
  }

  public resetSiloFilters() {
    this.siloFilters = new fModels.SiloFilterModel("", "", "", "");
  }

}





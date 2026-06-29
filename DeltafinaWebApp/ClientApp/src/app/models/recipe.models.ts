//import { v4 as uuidv4 } from 'uuid';
import { ZoneSelectedModel } from './zone.models';
import { DaysSelectedModel, TimeModel } from './help.models';

export class RecipeCrusherModel {
  public crusherId: number;
  public speedScrew: number = 1000;
  public speedCrusher: number = 3000;
  public feedback: boolean = false;
  public setpointPowerCrusher: number = 10;
  public linearSystem: boolean = false;
  public timeToChangeLinearSystem: number = 0;
  public insufflation: boolean = false;
  public preCrusher: boolean = false;
  public gridDiameter: number = 500;
  public gridHoles: number = 6
  public maxTemperaturePaste: number = 35;
  public maxPower: number = 15;
  public isUsed: boolean = true;
  public isExchangedEnabled: boolean = true;
  public setpointExchanged: number = 25;
  constructor(id) {
    this.crusherId = id;
  }
}

export class RecipeDecanterModel {
  public decanterId: number;
  public isSpeedVariable: boolean = true;
  public hertzScrew: number = 45;
  public hertzDrum: number = 45;
  public speedControl: boolean = true;
  public differentialSetpoint: number = 18;
  public maxDecreaseRpmDiff: number = 3;
  public flowmeter: boolean = true;
  public hourlyProduction: number = 1000;
  public quantityWater: number = 0;
  public cycleReports: number = 59;
  public nozzleAdjustment: number = 1;
  public maxTemperaturePaste: number = 35;
  public maxTemperatureOil: number = 30;
  public isUsed: boolean = true;
  constructor(id) {
    this.decanterId = id;
  }
}

export class RecipeMalaxerModel {
  public malaxerId: number 
  public temperatureControl: boolean = true;
  public setpointTemperature: number = 25;
  public setpointTemperatureWater: number = 30;
  public timeOfKneading: number = 10;
  public agitatorInContinuos: boolean = true;
  public agitatorTimeWork: number = 0;
  public agitatorTimePause: number = 0;
  public rpmPump: number = 1000;
  public maxTemperature: number = 35;
  public controlTemperature: boolean = true;
  public controlVacuumLinearSystemSl: boolean = false;
  public controlVacuumFilling: boolean = false;
  public controlVacuumKneading: boolean = false;
  public controlVacuumPasteReady: boolean = false;
  public controlVacuumExtraction: boolean = false;
  public controlVacuumEmptyDirty: boolean = false;
  public controlVacuumEmptyClean: boolean = false;
  public agitatorRpm: number = 0;
  public setpointVacuum: number = 0;
  public isUsed: boolean = true;
  constructor(id) {
    this.malaxerId = id;
  }
}

export class RecipeModel {
  public id: string;
  public progressiveId: number = 0;
  public code: string;
  public name: string;
  public note: string;
  public isEnabled: boolean = true;
  public isDeleted: boolean = false;
  public crusher1: RecipeCrusherModel;
  public crusher2: RecipeCrusherModel;
  public malaxer1: RecipeMalaxerModel;
  public malaxer2: RecipeMalaxerModel;
  public malaxer3: RecipeMalaxerModel;
  public malaxer4: RecipeMalaxerModel;
  public decanter1: RecipeDecanterModel;
  public decanter2: RecipeDecanterModel;
  constructor() {
    this.crusher1 = new RecipeCrusherModel(1);
    this.crusher2 = new RecipeCrusherModel(2);

    this.malaxer1 = new RecipeMalaxerModel(1);
    this.malaxer2 = new RecipeMalaxerModel(2);
    this.malaxer3 = new RecipeMalaxerModel(3);
    this.malaxer4 = new RecipeMalaxerModel(4);

    this.decanter1 = new RecipeDecanterModel(1);
    this.decanter2 = new RecipeDecanterModel(2);
  }
}

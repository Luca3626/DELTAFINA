import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../app.service';

import { Router, ActivatedRoute } from '@angular/router';//AGGGIUNTO
import { DatePipe } from '@angular/common';
import * as recipe from '../../models/recipe/recipe-glassware.models';
import { RecipeService } from '../../services/recipe.service';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { GenericResponse } from 'src/app/models/help.models';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsList } from '../../tags/tags-list';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
  ]
})
export class RecipesEditComponent {
  isRTL: boolean;

  myTitle = "Nuova Ricetta";
  recipeData: recipe.RecipeGlasswareModel = new recipe.RecipeGlasswareModel();
  private sub: any;
  recipeId: string = "";


  // TOASTER
  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true//,
      //timeout: 0
    });

  disabled = false;

  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  getClass(silo): string {
    if (!this.appService.isStandAlonePc) {
      switch (silo) {
        case "S1":
          if (this.TagList.PC_RIC_Q_S1.value != this._S1_B1
            || this.TagList.PC_RIC_N_RIP_S1.value != this.recipeData.components[0].repetition)
            return "bg-warning";
          else
            return "";
        case "S2":
          if (this.TagList.PC_RIC_Q_S2.value != this._S2_B1
            || this.TagList.PC_RIC_N_RIP_S2.value != this.recipeData.components[1].repetition)
            return "bg-warning";
          else
            return "";
        case "S3":
          if (this.TagList.PC_RIC_Q_S3.value != this._S3_B2
            || this.TagList.PC_RIC_N_RIP_S3.value != this.recipeData.components[2].repetition)
            return "bg-warning";
          else
            return "";
        case "S4":
          if (this.TagList.PC_RIC_Q_S4.value != this._S4_B2
            || this.TagList.PC_RIC_N_RIP_S4.value != this.recipeData.components[3].repetition)
            return "bg-warning";
          else
            return "";
        case "S5":
          if (this.TagList.PC_RIC_Q_S5.value != this._S5_B3
            || this.TagList.PC_RIC_N_RIP_S5.value != this.recipeData.components[4].repetition)
            return "bg-warning";
          else
            return "";
        case "S6":
          if (this.TagList.PC_RIC_Q_S6.value != this._S6_B3A
            || this.TagList.PC_RIC_N_RIP_S6.value != this.recipeData.components[5].repetition)
            return "bg-warning";
          else
            return "";
        case "S7":
          if (this.TagList.PC_RIC_Q_S7.value != this._S7_B4
            || this.TagList.PC_RIC_N_RIP_S7.value != this.recipeData.components[6].repetition)
            return "bg-warning";
          else
            return "";
        case "S8":
          if (this.TagList.PC_RIC_Q_S8.value != this._S8_B4
            || this.TagList.PC_RIC_N_RIP_S8.value != this.recipeData.components[7].repetition)
            return "bg-warning";
          else
            return "";
        case "S9":
          if (this.TagList.PC_RIC_Q_S9.value != this._S9_B4
            || this.TagList.PC_RIC_N_RIP_S9.value != this.recipeData.components[8].repetition)
            return "bg-warning";
          else
            return "";
        case "S10":
          if (this.TagList.PC_RIC_Q_S10.value != this._S10_B4
            || this.TagList.PC_RIC_N_RIP_S10.value != this.recipeData.components[9].repetition)
            return "bg-warning";
          else
            return "";
        case "S11":
          if (this.TagList.PC_RIC_Q_S11.value != this._S11_B5A
            || this.TagList.PC_RIC_N_RIP_S11.value != this.recipeData.components[10].repetition)
            return "bg-warning";
          else
            return "";
        case "S12":
          if (this.TagList.PC_RIC_Q_S12.value != this._S12_B5
            || this.TagList.PC_RIC_N_RIP_S12.value != this.recipeData.components[11].repetition)
            return "bg-warning";
          else
            return "";
        case "S13":
          if (this.TagList.PC_RIC_Q_S13.value != this._S13_B7
            || this.TagList.PC_RIC_N_RIP_S13.value != this.recipeData.components[12].repetition)
            return "bg-warning";
          else
            return "";
        case "S14":
          if (this.TagList.PC_RIC_Q_S14.value != this._S14_B7
            || this.TagList.PC_RIC_N_RIP_S14.value != this.recipeData.components[13].repetition)
            return "bg-warning";
          else
            return "";
        case "S15":
          if (this.TagList.PC_RIC_Q_S15.value != this._S15_B7
            || this.TagList.PC_RIC_N_RIP_S15.value != this.recipeData.components[14].repetition)
            return "bg-warning";
          else
            return "";
        case "S16":
          if (this.TagList.PC_RIC_Q_S16.value != this._S16_B7
            || this.TagList.PC_RIC_N_RIP_S16.value != this.recipeData.components[15].repetition)
            return "bg-warning";
          else
            return "";
        case "TP6":
          if (this.TagList.PC_RIC_Q_TP6.value != this._TP6_B6
            || this.TagList.PC_RIC_N_RIP_TP6.value != this.recipeData.components[16].repetition)
            return "bg-warning";
          else
            return "";
        case "TP6A":
          if (this.TagList.PC_RIC_Q_TP6A.value != this._TP6A_B6
            || this.TagList.PC_RIC_N_RIP_TP6A.value != this.recipeData.components[17].repetition)
            return "bg-warning";
          else
            return "";

        default:
      }
    }
    else
      return "";
  }

  get WeightMax_S1(): number {
    return +SignalRService.tagList.CAP_MAX_B1.value - this._S2_B1;
  }
  get WeightMax_S2(): number {
    return +SignalRService.tagList.CAP_MAX_B1.value - this._S1_B1;
  }
  get WeightMax_S3(): number {
    return +SignalRService.tagList.CAP_MAX_B2.value - this._S4_B2;
  }
  get WeightMax_S4(): number {
    return +SignalRService.tagList.CAP_MAX_B2.value - this._S3_B2;
  }
  get WeightMax_S5(): number {
    return +SignalRService.tagList.CAP_MAX_B3.value;
  }
  get WeightMax_S6(): number {
    return +SignalRService.tagList.CAP_MAX_B3A.value;
  }
  get WeightMax_S7(): number {
    return +SignalRService.tagList.CAP_MAX_B4.value - this._S8_B4 - this._S9_B4 - this._S10_B4;
  }
  get WeightMax_S8(): number {
    return +SignalRService.tagList.CAP_MAX_B4.value - this._S7_B4 - this._S9_B4 - this._S10_B4;
  }
  get WeightMax_S9(): number {
    return +SignalRService.tagList.CAP_MAX_B4.value - this._S7_B4 - this._S8_B4 - this._S10_B4;
  }
  get WeightMax_S10(): number {
    return +SignalRService.tagList.CAP_MAX_B4.value - this._S7_B4 - this._S8_B4 - this._S9_B4;
  }
  get WeightMax_S11(): number {
    return +SignalRService.tagList.CAP_MAX_B5A.value;
  }
  get WeightMax_S12(): number {
    return +SignalRService.tagList.CAP_MAX_B5.value;
  }
  get WeightMax_S13(): number {
    return +SignalRService.tagList.CAP_MAX_B7.value - this._S14_B7 - this._S15_B7 - this._S16_B7;
  }
  get WeightMax_S14(): number {
    return +SignalRService.tagList.CAP_MAX_B7.value - this._S13_B7 - this._S15_B7 - this._S16_B7;
  }
  get WeightMax_S15(): number {
    return +SignalRService.tagList.CAP_MAX_B7.value - this._S13_B7 - this._S14_B7 - this._S16_B7;
  }
  get WeightMax_S16(): number {
    return +SignalRService.tagList.CAP_MAX_B7.value - this._S13_B7 - this._S14_B7 - this._S15_B7;
  }
  get WeightMax_TP6(): number {
    return +SignalRService.tagList.CAP_MAX_B6.value - this._TP6A_B6;
  }
  get WeightMax_TP6A(): number {
    return +SignalRService.tagList.CAP_MAX_B6.value - this._TP6_B6;
  }

  // #region B1
  //S1
  get _S1_B1(): number {
    return this.recipeData.components[0].quantityMix;
  }
  set _S1_B1(value: number) {
    if (value + this._S2_B1 > SignalRService.tagList.CAP_MAX_B1.value)
      this.recipeData.components[0].quantityMix = SignalRService.tagList.CAP_MAX_B1.value - this._S2_B1;
    else
      this.recipeData.components[0].quantityMix = value;
  }
  //S2
  get _S2_B1(): number {
    return this.recipeData.components[1].quantityMix;
  }
  set _S2_B1(value: number) {
    if (value + this._S1_B1 > SignalRService.tagList.CAP_MAX_B1.value)
      this.recipeData.components[1].quantityMix = SignalRService.tagList.CAP_MAX_B1.value - this._S1_B1;
    else
      this.recipeData.components[1].quantityMix = value;
  }
  // #endregion

  // #region B2
  //S3
  get _S3_B2(): number {
    return this.recipeData.components[2].quantityMix;
  }
  set _S3_B2(value: number) {
    if (value + this._S4_B2 > SignalRService.tagList.CAP_MAX_B2.value)
      this.recipeData.components[2].quantityMix = SignalRService.tagList.CAP_MAX_B2.value - this._S4_B2;
    else
      this.recipeData.components[2].quantityMix = value;
  }
  //S4
  get _S4_B2(): number {
    return this.recipeData.components[3].quantityMix;
  }
  set _S4_B2(value: number) {
    if (value + this._S3_B2 > SignalRService.tagList.CAP_MAX_B2.value)
      this.recipeData.components[3].quantityMix = SignalRService.tagList.CAP_MAX_B2.value - this._S3_B2;
    else
      this.recipeData.components[3].quantityMix = value;
  }
  // #endregion

  // #region B3
  //S5
  get _S5_B3(): number {
    return this.recipeData.components[4].quantityMix;
  }
  set _S5_B3(value: number) {
    if (value > SignalRService.tagList.CAP_MAX_B3.value)
      this.recipeData.components[4].quantityMix = SignalRService.tagList.CAP_MAX_B3.value;
    else
      this.recipeData.components[4].quantityMix = value;
  }
  // #endregion

  // #region B3A
  //S6
  get _S6_B3A(): number {
    return this.recipeData.components[5].quantityMix;
  }
  set _S6_B3A(value: number) {
    if (value > SignalRService.tagList.CAP_MAX_B3A.value)
      this.recipeData.components[5].quantityMix = SignalRService.tagList.CAP_MAX_B3A.value;
    else
      this.recipeData.components[5].quantityMix = value;
  }
  // #endregion

  // #region B4
  //S7
  get _S7_B4(): number {
    return this.recipeData.components[6].quantityMix;
  }
  set _S7_B4(value: number) {
    if (value + this._S8_B4 + this._S9_B4 + this._S10_B4 > SignalRService.tagList.CAP_MAX_B4.value)
      this.recipeData.components[6].quantityMix = SignalRService.tagList.CAP_MAX_B4.value - this._S8_B4 - this._S9_B4 - this._S10_B4;
    else
      this.recipeData.components[6].quantityMix = value;
  }
  //S8
  get _S8_B4(): number {
    return this.recipeData.components[7].quantityMix;
  }
  set _S8_B4(value: number) {
    if (value + this._S7_B4 + this._S9_B4 + this._S10_B4 > SignalRService.tagList.CAP_MAX_B4.value)
      this.recipeData.components[7].quantityMix = SignalRService.tagList.CAP_MAX_B4.value - this._S7_B4 - this._S9_B4 - this._S10_B4;
    else
      this.recipeData.components[7].quantityMix = value;
  }
  //S9
  get _S9_B4(): number {
    return this.recipeData.components[8].quantityMix;
  }
  set _S9_B4(value: number) {
    if (value + this._S7_B4 + this._S8_B4 + this._S10_B4 > SignalRService.tagList.CAP_MAX_B4.value)
      this.recipeData.components[8].quantityMix = SignalRService.tagList.CAP_MAX_B4.value - this._S7_B4 - this._S8_B4 - this._S10_B4;
    else
      this.recipeData.components[8].quantityMix = value;
  }
  //S10
  get _S10_B4(): number {
    return this.recipeData.components[9].quantityMix;
  }
  set _S10_B4(value: number) {
    if (value + this._S7_B4 + this._S8_B4 + this._S9_B4 > SignalRService.tagList.CAP_MAX_B4.value)
      this.recipeData.components[9].quantityMix = SignalRService.tagList.CAP_MAX_B4.value - this._S7_B4 - this._S8_B4 - this._S9_B4;
    else
      this.recipeData.components[9].quantityMix = value;
  }
  // #endregion

  // #region B5A
  //S11
  get _S11_B5A(): number {
    return this.recipeData.components[10].quantityMix;
  }
  set _S11_B5A(value: number) {
    if (value > SignalRService.tagList.CAP_MAX_B5A.value)
      this.recipeData.components[10].quantityMix = SignalRService.tagList.CAP_MAX_B5A.value;
    else
      this.recipeData.components[10].quantityMix = value;
  }
  // #endregion

  // #region B5
  //S12
  get _S12_B5(): number {
    return this.recipeData.components[11].quantityMix;
  }
  set _S12_B5(value: number) {
    if (value > SignalRService.tagList.CAP_MAX_B5.value)
      this.recipeData.components[11].quantityMix = SignalRService.tagList.CAP_MAX_B5.value;
    else
      this.recipeData.components[11].quantityMix = value;
  }
  // #endregion

  // #region B7
  //S13
  get _S13_B7(): number {
    return this.recipeData.components[12].quantityMix;
  }
  set _S13_B7(value: number) {
    if (value + this._S14_B7 + this._S15_B7 + this._S16_B7 > SignalRService.tagList.CAP_MAX_B7.value)
      this.recipeData.components[12].quantityMix = SignalRService.tagList.CAP_MAX_B7.value - this._S14_B7 - this._S15_B7 - this._S16_B7;
    else
      this.recipeData.components[12].quantityMix = value;
  }
  //S14
  get _S14_B7(): number {
    return this.recipeData.components[13].quantityMix;
  }
  set _S14_B7(value: number) {
    if (value + this._S13_B7 + this._S15_B7 + this._S16_B7 > SignalRService.tagList.CAP_MAX_B7.value)
      this.recipeData.components[13].quantityMix = SignalRService.tagList.CAP_MAX_B7.value - this._S13_B7 - this._S15_B7 - this._S16_B7;
    else
      this.recipeData.components[13].quantityMix = value;
  }
  //S15
  get _S15_B7(): number {
    return this.recipeData.components[14].quantityMix;
  }
  set _S15_B7(value: number) {
    if (value + this._S13_B7 + this._S14_B7 + this._S16_B7 > SignalRService.tagList.CAP_MAX_B7.value)
      this.recipeData.components[14].quantityMix = SignalRService.tagList.CAP_MAX_B7.value - this._S13_B7 - this._S14_B7 - this._S16_B7;
    else
      this.recipeData.components[14].quantityMix = value;
  }
  //S16
  get _S16_B7(): number {
    return this.recipeData.components[15].quantityMix;
  }
  set _S16_B7(value: number) {
    if (value + this._S13_B7 + this._S14_B7 + this._S15_B7 > SignalRService.tagList.CAP_MAX_B7.value)
      this.recipeData.components[15].quantityMix = SignalRService.tagList.CAP_MAX_B7.value - this._S13_B7 - this._S14_B7 - this._S15_B7;
    else
      this.recipeData.components[15].quantityMix = value;
  }
  // #endregion

  // #region B6
  //TP6
  get _TP6_B6(): number {
    return this.recipeData.components[16].quantityMix;
  }
  set _TP6_B6(value: number) {
    if (value + this._TP6A_B6 > SignalRService.tagList.CAP_MAX_B6.value)
      this.recipeData.components[16].quantityMix = SignalRService.tagList.CAP_MAX_B6.value - this._TP6A_B6;
    else
      this.recipeData.components[16].quantityMix = value;
  }
  //TP6a
  get _TP6A_B6(): number {
    return this.recipeData.components[17].quantityMix;
  }
  set _TP6A_B6(value: number) {
    if (value + this._TP6_B6 > SignalRService.tagList.CAP_MAX_B6.value)
      this.recipeData.components[17].quantityMix = SignalRService.tagList.CAP_MAX_B6.value - this._TP6_B6;
    else
      this.recipeData.components[17].quantityMix = value;
  }
  // #endregion


  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute,
    private toasterService: ToasterService, private recipeService: RecipeService) {
    this.appService.pageTitle = 'Editazione Ricetta';
    this.isRTL = appService.isRTL;

    this.recipeData = new recipe.RecipeGlasswareModel();
    this.recipeData.timeMixing = 300;
    this.recipeData.timeMixWater = 10;
    this.recipeData.userId = this.appService.user.userId;

    this.recipeData.components = new Array<recipe.RecipeWarehouseGlasswareModel>(18);

    //S1
    this.recipeData.components[0] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[0].isEnabled = true;
    this.recipeData.components[0].quantityMix = 0;
    this.recipeData.components[0].quantityNotMix = 0;
    this.recipeData.components[0].repetition = 1;
    this.recipeData.components[0].repetitionNotMix = 1;
    this.recipeData.components[0].materialId = "3ad97664-20c5-47ce-b6d7-9d7b1259fdc4";
    this.recipeData.components[0].material = "ROTTAME";
    this.recipeData.components[0].siloId = "41a02340-b306-4d20-abc5-eb48a2b99ee1";
    this.recipeData.components[0].unityOfMeasure = "KG";
    this.recipeData.components[0].rowIndex = 0;

    //S2
    this.recipeData.components[1] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[1].isEnabled = true;
    this.recipeData.components[1].quantityMix = 0;
    this.recipeData.components[1].quantityNotMix = 0;
    this.recipeData.components[1].repetition = 1;
    this.recipeData.components[1].repetitionNotMix = 1;
    this.recipeData.components[1].materialId = "3ad97664-20c5-47ce-b6d7-9d7b1259fdc4";
    this.recipeData.components[1].material = "ROTTAME";
    this.recipeData.components[1].siloId = "071340fa-0e1f-4401-8c16-1ce983a9642a";
    this.recipeData.components[1].unityOfMeasure = "KG";
    this.recipeData.components[1].rowIndex = 1;

    //S3
    this.recipeData.components[2] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[2].isEnabled = true;
    this.recipeData.components[2].quantityMix = 0;
    this.recipeData.components[2].quantityNotMix = 0;
    this.recipeData.components[2].repetition = 1;
    this.recipeData.components[2].repetitionNotMix = 1;
    this.recipeData.components[2].materialId = "d9e267bb-2bdc-4be1-b778-4f403abac2f3";
    this.recipeData.components[2].material = "SODA";
    this.recipeData.components[2].siloId = "3517ff67-af2f-482e-a1e8-74740b9596d4";
    this.recipeData.components[2].unityOfMeasure = "KG";
    this.recipeData.components[2].rowIndex = 2;

    //S4
    this.recipeData.components[3] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[3].isEnabled = true;
    this.recipeData.components[3].quantityMix = 0;
    this.recipeData.components[3].quantityNotMix = 0;
    this.recipeData.components[3].repetition = 1;
    this.recipeData.components[3].repetitionNotMix = 1;
    this.recipeData.components[3].materialId = "d9e267bb-2bdc-4be1-b778-4f403abac2f3";
    this.recipeData.components[3].material = "SODA";
    this.recipeData.components[3].siloId = "88d84208-d633-4122-a3b5-013e8432a4e6";
    this.recipeData.components[3].unityOfMeasure = "KG";
    this.recipeData.components[3].rowIndex = 3;

    //S5
    this.recipeData.components[4] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[4].isEnabled = true;
    this.recipeData.components[4].quantityMix = 0;
    this.recipeData.components[4].quantityNotMix = 0;
    this.recipeData.components[4].repetition = 1;
    this.recipeData.components[4].repetitionNotMix = 1;
    this.recipeData.components[4].materialId = "d9e267bb-2bdc-4be1-b778-4f403abac2f3";
    this.recipeData.components[4].material = "SODA";
    this.recipeData.components[4].siloId = "98179ff9-082b-4627-b112-9952420f4dce";
    this.recipeData.components[4].unityOfMeasure = "KG";
    this.recipeData.components[4].rowIndex = 4;

    //S6
    this.recipeData.components[5] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[5].isEnabled = true;
    this.recipeData.components[5].quantityMix = 0;
    this.recipeData.components[5].quantityNotMix = 0;
    this.recipeData.components[5].repetition = 1;
    this.recipeData.components[5].repetitionNotMix = 1;
    this.recipeData.components[5].materialId = "8b16d2f0-c364-4cd2-b805-c84a6b7bb279";
    this.recipeData.components[5].material = "FONDENTE";
    this.recipeData.components[5].siloId = "036127f9-2083-44b7-a010-27678f7ee22d";
    this.recipeData.components[5].unityOfMeasure = "KG";
    this.recipeData.components[5].rowIndex = 5;

    //S7
    this.recipeData.components[6] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[6].isEnabled = true;
    this.recipeData.components[6].quantityMix = 0;
    this.recipeData.components[6].quantityNotMix = 0;
    this.recipeData.components[6].repetition = 1;
    this.recipeData.components[6].repetitionNotMix = 1;
    this.recipeData.components[6].materialId = "5db16e69-0d6f-4176-a06d-b7ff203a2e71";
    this.recipeData.components[6].material = "FERROX";
    this.recipeData.components[6].siloId = "a6b1a75a-daff-485a-88da-69c590550a95";
    this.recipeData.components[6].unityOfMeasure = "KG";
    this.recipeData.components[6].rowIndex = 6;

    //S8
    this.recipeData.components[7] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[7].isEnabled = true;
    this.recipeData.components[7].quantityMix = 0;
    this.recipeData.components[7].quantityNotMix = 0;
    this.recipeData.components[7].repetition = 1;
    this.recipeData.components[7].repetitionNotMix = 1;
    this.recipeData.components[7].materialId = "1d1da579-cdf8-4b56-8597-b018037c569d";
    this.recipeData.components[7].material = "POLVERI ELETTROFILTRO";
    this.recipeData.components[7].siloId = "768a6094-5c9a-4b24-a2fb-ecba5d1b89d0";
    this.recipeData.components[7].unityOfMeasure = "KG";
    this.recipeData.components[7].rowIndex = 7;

    //S9
    this.recipeData.components[8] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[8].isEnabled = true;
    this.recipeData.components[8].quantityMix = 0;
    this.recipeData.components[8].quantityNotMix = 0;
    this.recipeData.components[8].repetition = 1;
    this.recipeData.components[8].repetitionNotMix = 1;
    this.recipeData.components[8].materialId = "782d9fe0-f013-4ab0-8346-bdae89ce196c";
    this.recipeData.components[8].material = "SOLFATO";
    this.recipeData.components[8].siloId = "306df402-5116-45c6-b214-aa89072f5be3";
    this.recipeData.components[8].unityOfMeasure = "KG";
    this.recipeData.components[8].rowIndex = 8;

    //S10
    this.recipeData.components[9] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[9].isEnabled = true;
    this.recipeData.components[9].quantityMix = 0;
    this.recipeData.components[9].quantityNotMix = 0;
    this.recipeData.components[9].repetition = 1;
    this.recipeData.components[9].repetitionNotMix = 1;
    this.recipeData.components[9].materialId = "74b42ba3-89cb-42e3-971a-692b29147702";
    this.recipeData.components[9].material = "CROMITE";
    this.recipeData.components[9].siloId = "c30c988f-3968-4392-a035-c6586ed52a3c";
    this.recipeData.components[9].unityOfMeasure = "KG";
    this.recipeData.components[9].rowIndex = 9;

    //S11
    this.recipeData.components[10] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[10].isEnabled = true;
    this.recipeData.components[10].quantityMix = 0;
    this.recipeData.components[10].quantityNotMix = 0;
    this.recipeData.components[10].repetition = 1;
    this.recipeData.components[10].repetitionNotMix = 1;
    this.recipeData.components[10].materialId = "06bfdfa1-f8a0-451e-85d3-33eb81909994";
    this.recipeData.components[10].material = "FELDSPATO";
    this.recipeData.components[10].siloId = "6803dd0d-f2c7-4456-aacd-dfa6bb91a37b";
    this.recipeData.components[10].unityOfMeasure = "KG";
    this.recipeData.components[10].rowIndex = 10;

    //S12
    this.recipeData.components[11] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[11].isEnabled = true;
    this.recipeData.components[11].quantityMix = 0;
    this.recipeData.components[11].quantityNotMix = 0;
    this.recipeData.components[11].repetition = 1;
    this.recipeData.components[11].repetitionNotMix = 1;
    this.recipeData.components[11].materialId = "fcbbd13a-7a7c-4c40-8627-2e19b90d163a";
    this.recipeData.components[11].material = "MARMO";
    this.recipeData.components[11].siloId = "2975aa4c-716e-4732-916b-0923a7f27b19";
    this.recipeData.components[11].unityOfMeasure = "KG";
    this.recipeData.components[11].rowIndex = 11;

    //S13
    this.recipeData.components[12] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[12].isEnabled = true;
    this.recipeData.components[12].quantityMix = 0;
    this.recipeData.components[12].quantityNotMix = 0;
    this.recipeData.components[12].repetition = 1;
    this.recipeData.components[12].repetitionNotMix = 1;
    this.recipeData.components[12].materialId = "b7976c76-88ee-4819-abca-5934d6818d59";
    this.recipeData.components[12].material = "SABBIA";
    this.recipeData.components[12].siloId = "d18e99d7-be78-4175-b981-3b68e9bca95d";
    this.recipeData.components[12].unityOfMeasure = "KG";
    this.recipeData.components[12].rowIndex = 12;

    //S14
    this.recipeData.components[13] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[13].isEnabled = true;
    this.recipeData.components[13].quantityMix = 0;
    this.recipeData.components[13].quantityNotMix = 0;
    this.recipeData.components[13].repetition = 1;
    this.recipeData.components[13].repetitionNotMix = 1;
    this.recipeData.components[13].materialId = "b7976c76-88ee-4819-abca-5934d6818d59";
    this.recipeData.components[13].material = "SABBIA";
    this.recipeData.components[13].siloId = "cd18b432-a1a8-490b-a775-697bc1dcb2a3";
    this.recipeData.components[13].unityOfMeasure = "KG";
    this.recipeData.components[13].rowIndex = 13;

    //S15
    this.recipeData.components[14] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[14].isEnabled = true;
    this.recipeData.components[14].quantityMix = 0;
    this.recipeData.components[14].quantityNotMix = 0;
    this.recipeData.components[14].repetition = 1;
    this.recipeData.components[14].repetitionNotMix = 1;
    this.recipeData.components[14].materialId = "b7976c76-88ee-4819-abca-5934d6818d59";
    this.recipeData.components[14].material = "SABBIA";
    this.recipeData.components[14].siloId = "2b03e37f-86f2-4a88-97ca-ecfee42c0a8c";
    this.recipeData.components[14].unityOfMeasure = "KG";
    this.recipeData.components[14].rowIndex = 14;

    //S16
    this.recipeData.components[15] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[15].isEnabled = true;
    this.recipeData.components[15].quantityMix = 0;
    this.recipeData.components[15].quantityNotMix = 0;
    this.recipeData.components[15].repetition = 1;
    this.recipeData.components[15].repetitionNotMix = 1;
    this.recipeData.components[15].materialId = "b7976c76-88ee-4819-abca-5934d6818d59";
    this.recipeData.components[15].material = "SABBIA";
    this.recipeData.components[15].siloId = "ecc36998-f01a-4bc1-846a-48c8b070ae07";
    this.recipeData.components[15].unityOfMeasure = "KG";
    this.recipeData.components[15].rowIndex = 15;

    //TP6
    this.recipeData.components[16] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[16].isEnabled = true;
    this.recipeData.components[16].quantityMix = 0;
    this.recipeData.components[16].quantityNotMix = 0;
    this.recipeData.components[16].repetition = 1;
    this.recipeData.components[16].repetitionNotMix = 1;
    this.recipeData.components[16].materialId = "560b860b-9f21-4943-9ec6-7c2066ae0b03";
    this.recipeData.components[16].material = "MIX SELENIO COBALTO";
    this.recipeData.components[16].siloId = "34b82a80-0eee-4460-9f56-53b7500af10a";
    this.recipeData.components[16].unityOfMeasure = "KG";
    this.recipeData.components[16].rowIndex = 16;

    //TP6A
    this.recipeData.components[17] = new recipe.RecipeWarehouseGlasswareModel();
    this.recipeData.components[17].isEnabled = true;
    this.recipeData.components[17].quantityMix = 0;
    this.recipeData.components[17].quantityNotMix = 0;
    this.recipeData.components[17].repetition = 1;
    this.recipeData.components[17].repetitionNotMix = 1;
    this.recipeData.components[17].materialId = "560b860b-9f21-4943-9ec6-7c2066ae0b03";
    this.recipeData.components[17].material = "MIX SELENIO COBALTO";
    this.recipeData.components[17].siloId = "20bd440e-d4ba-4d8e-bbc1-f64d86eaa46f";
    this.recipeData.components[17].unityOfMeasure = "KG";
    this.recipeData.components[17].rowIndex = 17;
  }  

  totalMixedQuantity: number = 0;
  totalMixedQuantityWithRipetition: number = 0;
  totalQuantity: number = 0;
  totalQuantityWithRipetition: number = 0;
  onInputChange(event) {

    this.totalMixedQuantity = 0;
    this.totalMixedQuantityWithRipetition = 0;
    this.totalQuantity = 0;
    this.totalQuantityWithRipetition = 0;

    //this.totalMixedQuantity += this.recipeData.components[0].quantityMix;
    //this.totalMixedQuantity += this.recipeData.components[1].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[2].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[3].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[4].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[5].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[6].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[7].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[8].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[9].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[10].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[11].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[12].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[13].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[14].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[15].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[16].quantityMix;
    this.totalMixedQuantity += this.recipeData.components[17].quantityMix;

    //this.totalMixedQuantityWithRipetition += this.recipeData.components[0].quantityMix * this.recipeData.components[0].repetition;
    //this.totalMixedQuantityWithRipetition += this.recipeData.components[1].quantityMix * this.recipeData.components[1].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[2].quantityMix * this.recipeData.components[2].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[3].quantityMix * this.recipeData.components[3].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[4].quantityMix * this.recipeData.components[4].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[5].quantityMix * this.recipeData.components[5].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[6].quantityMix * this.recipeData.components[6].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[7].quantityMix * this.recipeData.components[7].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[8].quantityMix * this.recipeData.components[8].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[9].quantityMix * this.recipeData.components[9].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[10].quantityMix * this.recipeData.components[10].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[11].quantityMix * this.recipeData.components[11].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[12].quantityMix * this.recipeData.components[12].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[13].quantityMix * this.recipeData.components[13].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[14].quantityMix * this.recipeData.components[14].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[15].quantityMix * this.recipeData.components[15].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[16].quantityMix * this.recipeData.components[16].repetition;
    this.totalMixedQuantityWithRipetition += this.recipeData.components[17].quantityMix * this.recipeData.components[17].repetition;

    this.totalQuantity += this.recipeData.components[0].quantityMix;
    this.totalQuantity += this.recipeData.components[1].quantityMix;
    //this.totalQuantity += this.recipeData.components[2].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[3].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[4].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[5].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[6].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[7].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[8].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[9].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[10].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[11].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[12].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[13].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[14].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[15].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[16].quantityNotMix;
    //this.totalQuantity += this.recipeData.components[17].quantityNotMix;

    this.totalQuantityWithRipetition += this.recipeData.components[0].quantityMix * this.recipeData.components[0].repetition;
    this.totalQuantityWithRipetition += this.recipeData.components[1].quantityMix * this.recipeData.components[1].repetition;
    //this.totalQuantityWithRipetition += this.recipeData.components[2].quantityNotMix * this.recipeData.components[2].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[3].quantityNotMix * this.recipeData.components[3].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[4].quantityNotMix * this.recipeData.components[4].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[5].quantityNotMix * this.recipeData.components[5].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[6].quantityNotMix * this.recipeData.components[6].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[7].quantityNotMix * this.recipeData.components[7].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[8].quantityNotMix * this.recipeData.components[8].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[9].quantityNotMix * this.recipeData.components[9].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[10].quantityNotMix * this.recipeData.components[10].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[11].quantityNotMix * this.recipeData.components[11].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[12].quantityNotMix * this.recipeData.components[12].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[13].quantityNotMix * this.recipeData.components[13].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[14].quantityNotMix * this.recipeData.components[14].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[15].quantityNotMix * this.recipeData.components[15].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[16].quantityNotMix * this.recipeData.components[16].repetitionNotMix;
    //this.totalQuantityWithRipetition += this.recipeData.components[17].quantityNotMix * this.recipeData.components[17].repetitionNotMix;

  }

  async onRun() {
    setTimeout(async () => {
      var response = await this.recipeService.run(this.recipeData.id);
      if (response.status == "Success")
        this.router.navigate(['/dashboard']);
      else
        this.toasterService.pop("error", response.value.toString(), "Avvio Ricetta");
    }, 1000);    
  }

  async onSubmit() {
    this.recipeData.userId = this.appService.user.userId;
    let response: any = await this.recipeService.update(this.recipeData);
    if (response.status == "Success")
      this.router.navigate(['/recipes/recipes-list']);
    else
      this.toasterService.pop("error", response.value, "Editazione Ricetta");
  }

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      if (this.recipeId != null)
        this.getById(this.recipeId);
      else
        this.getForNew();
    });
  }

  public async onDelete() {

    let response: GenericResponse = await this.recipeService.delete(this.recipeData);
    if (response.status == "Success")
      this.goToList();
    else
      this.toasterService.pop("error", "Errore in eliminazione", response.value.toString());
  }

  async getForNew() {

    this.recipeData = await this.recipeService.getForNew();
    this.recipeData.userId = this.appService.user.userId;

    this.onInputChange(null);
    this.myTitle = "Nuova Ricetta";
  }

  async getById(id: any) {

    this.recipeData = await this.recipeService.getById(id);
    this.onInputChange(null);
    this.myTitle = this.recipeData.name;
  }

  goToList() {
    this.router.navigate(['/recipes']);
  }

}

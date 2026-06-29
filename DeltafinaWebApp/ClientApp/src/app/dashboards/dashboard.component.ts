import { Component, ElementRef, OnInit } from '@angular/core';

import { AppService } from '../app.service';
import { LayoutService } from '../layout/layout.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, TickOptions, ChartLegendOptions } from 'chart.js';
import { ThemeSettingsService } from '../../vendor/libs/theme-settings/theme-settings.service';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MotorPlateComponent } from '../device-plate/motor-plate/motor-plate.component';
import { MotorModel } from '../models/device/motor.models';
import { ValvePlateComponent } from '../device-plate/valve-plate/valve-plate.component';
import { ValveModel } from '../models/device/valve.models';
//import { CustomItemPlateComponent } from '../device-plate/custom-item-plate/custom-item-plate.component';
import { SiloPlateComponent } from '../device-plate/silo-plate/silo-plate.component';
import { ScalePlateComponent } from '../device-plate/scale-plate/scale-plate.component';
import { HopperPlateComponent } from '../device-plate/hopper-plate/hopper-plate.component';
import { MotorRevPlateComponent } from '../device-plate/motor-rev-plate/motor-rev-plate.component';
import { SettingRComponent } from '../device-plate/settingR-plate/settingR-plate.component';
import { MixerPlateComponent } from '../device-plate/mixer-plate/mixer-plate.component';
import { DeviceService } from '../services/device.service';
import { HelpService } from '../services/help.service';
import { SignalRService } from '../signalr-client/signalr.service';
import { TagsList } from '../tags/tags-list';
import { UserService } from '../services/user.service';
import { timer } from 'rxjs';
import { AlarmService } from '../services/alarm.service';
import { AlarmModel, AlarmQueryModel } from '../models/alarm.models';


@Component({
  selector: 'dashboard', // tslint:disable-line
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.css'],
})
export class Dashboard implements OnInit {// implements AfterViewInit, OnDestroy {
  isRTL: boolean;

  lightOn: true;
  cmdVisible: boolean = true;
  numberVisible: boolean;
  alarmsData: AlarmModel[] = [];

  getFill(silo): string {
    //34,395832(y1): silo vuoto
    //11,377084(y2): silo pieno
    //34,395832(y1) - 11,377084(y2) = 23,018748
    let rValue: number = 34.395832;
    switch (silo) {

      case "S1":
        rValue = (DeviceService.siloList.S1.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S2":
        rValue = (DeviceService.siloList.S2.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S3":
        rValue = (DeviceService.siloList.S3.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S4":
        rValue = (DeviceService.siloList.S4.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S5":
        rValue = (DeviceService.siloList.S5.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S6":
        rValue = (DeviceService.siloList.S6.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S7":
        rValue = (DeviceService.siloList.S7.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S8":
        rValue = (DeviceService.siloList.S8.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S9":
        rValue = (DeviceService.siloList.S9.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S10":
        rValue = (DeviceService.siloList.S10.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S11":
        rValue = (DeviceService.siloList.S11.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S12":
        rValue = (DeviceService.siloList.S12.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S13":
        rValue = (DeviceService.siloList.S13.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S14":
        rValue = (DeviceService.siloList.S14.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S15":
        rValue = (DeviceService.siloList.S15.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S16":
        rValue = (DeviceService.siloList.S16.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      //case "TP6":
      //  rValue = (DeviceService.siloList.TP6.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
      //  rValue = 34.395832 - +(rValue.toFixed(2));
      //  break;
      //case "TP6A":
      //  rValue = (DeviceService.siloList.TP6A.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
      //  rValue = 34.395832 - +(rValue.toFixed(2));
      //  break;

      case "TF1":
        //44.714607(y1): silo vuoto
        //21.695856(y2): silo pieno
        //44.714607(y1) - 21.695856(y2) = 23.018751
        rValue = DeviceService.hopperList.TF1.FDB_PERC_ACT.value >= 0 ? (DeviceService.hopperList.TF1.FDB_PERC_ACT.value * 23.018751) / 100 : 0;
        rValue = 44.714607 - +(rValue.toFixed(2));
        break;
      case "TF2":
        rValue = DeviceService.hopperList.TF2.FDB_PERC_ACT.value >= 0 ? (DeviceService.hopperList.TF2.FDB_PERC_ACT.value * 23.018751) / 100 : 0;
        rValue = 44.714607 - +(rValue.toFixed(2));
        break
      case "TM1":
        // 37.041718 (y1) = silo vuoto
        // 21.695856 (y2) = silo pieno
        // 37.041718(y1) - 21.695856(y2) = 15,345862
        rValue = DeviceService.hopperList.TM1.FDB_PERC_ACT.value >= 0 ? (DeviceService.hopperList.TM1.FDB_PERC_ACT.value * 15.345862) / 100 : 0;
        rValue = 36.541718 - +(rValue.toFixed(2));
        break;
      case "S100":
        rValue = DeviceService.hopperList.S100.FDB_PERC_ACT.value >= 0 ? (DeviceService.hopperList.S100.FDB_PERC_ACT.value * 23.018749) / 100 : 0;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break

      default:
        break;
    }
    return rValue.toString();
  }

  getScaleInAlm(name) {
    var rValue = false;//"../../assets/svg/groov/tank_conetop_wgradient.svg";
    switch (name) {

      case "B1":
        if (DeviceService.scaleList.B1.InAlarm)
          rValue = true;
        break;
      case "B2":
        if (DeviceService.scaleList.B2.InAlarm)
          rValue = true;
        break;
      case "B3":
        if (DeviceService.scaleList.B3.InAlarm)
          rValue = true;
        break;
      case "B3A":
        if (DeviceService.scaleList.B3A.InAlarm)
          rValue = true;
        break;
      case "B4":
        if (DeviceService.scaleList.B4.InAlarm)
          rValue = true;
        break;
      case "B5":
        if (DeviceService.scaleList.B5.InAlarm)
          rValue = true;
        break;
      case "B5A":
        if (DeviceService.scaleList.B5A.InAlarm)
          rValue = true;
        break;
      case "B6":
        if (DeviceService.scaleList.B6.InAlarm)
          rValue = true;
        break;
      //case "TR1":
      //  if (DeviceService.scaleList.TR1.InAlarm)
      //    rValue = true;
      //  break;
      case "B7":
        if (DeviceService.scaleList.B7.InAlarm)
          rValue = true;
        break;
      case "TM1":
        if (DeviceService.hopperList.TM1.InAlarm)
          rValue = true;
        break;
      case "TF1":
        if (DeviceService.hopperList.TF1.InAlarm)
          rValue = true;
        break;
      case "TF2":
        if (DeviceService.hopperList.TF2.InAlarm)
          rValue = true;
        break;
      case "S100":
        if (DeviceService.hopperList.S100.InAlarm)
          rValue = true;
        break;

      //case "3V282":
      //  if (SignalRService.tagList.FDB_ALM_COMM_QA_BH_3V282.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_TEMPO_CARICO_3V282.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_3V282.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_UNDER_LOAD_3V282.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_OVER_LOAD_3V282.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_ERRORE_PESO_3V282.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_3V282.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_3V282.value)
      //    return true;
      //  else
      //    return false;
      //  break;

      //case "3V287":
      //  if (SignalRService.tagList.FDB_ALM_COMM_QA_BH_3V287.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_TEMPO_CARICO_3V287.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_3V287.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_UNDER_LOAD_3V287.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_OVER_LOAD_3V287.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_ERRORE_PESO_3V287.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_3V287.value)
      //    return true;
      //  else if (SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_3V287.value)
      //    return true;
      //  else
      //    return false;
      //  break;

      default:
    }

    return rValue;
  }

  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  async ngOnInit() {
    //DeviceService.motorList.loadMotors();
  }

  showName: boolean = true;

  setRottameLento() {
    //SignalRService.tagList.BOOL_PC_PULS_ROTT_INTERNO_ALTA_VELOCITA.value = false;
    //SignalRService.tagList.BOOL_PC_ALTA_VELOCITA_CATENA_BC400M1.value = false;
    //SignalRService.tagList.BOOL_PC_ALTA_VELOCITA_CATENA_BC401M1.value = false;
    //SignalRService.tagList.BOOL_PC_ALTA_VELOCITA_CATENA_BC402M1.value = false;
  }

  setRottameVeloce() {
    //SignalRService.tagList.BOOL_PC_PULS_ROTT_INTERNO_ALTA_VELOCITA.value = true;
  }

  onActualDosing() {
    this.router.navigate(['/recipes/recipe-actual']); 
  }

  getEstrattoreImg(name): string {
    switch (name) {
      case "VS51":
        if (DeviceService.motorList.VS51.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS52":
        if (DeviceService.motorList.VS52.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS54":
        if (DeviceService.motorList.VS54.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS55":
        if (DeviceService.motorList.VS55.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS57":
        if (DeviceService.motorList.VS57.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS58":
        if (DeviceService.motorList.VS58.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS60":
        if (DeviceService.motorList.VS60.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS62":
        if (DeviceService.motorList.VS62.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS62":
        if (DeviceService.motorList.VS62.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS63":
        if (DeviceService.motorList.VS63.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS66":
        if (DeviceService.motorList.VS66.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS67":
        if (DeviceService.motorList.VS67.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "C69B":
        if (DeviceService.motorList.C69B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "C69B_A":
        if (DeviceService.motorList.C69B_A.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS71":
        if (DeviceService.motorList.VS71.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS72":
        if (DeviceService.motorList.VS72.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS73":
        if (DeviceService.motorList.VS73.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS74":
        if (DeviceService.motorList.VS74.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      //case "AE60M1":
        //if (DeviceService.motorList.VS53.RUNNING)
        //  return "../../assets/svg/custom/my_extractor_big_green.svg";
        //else
        //  return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS75":
        if (DeviceService.motorList.VS75.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "C65":
        if (DeviceService.motorList.C65.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS24A":
        if (DeviceService.motorList.VS24A.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS24B":
        if (DeviceService.motorList.VS24B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "AE4A":
        if (DeviceService.motorList.AE4A.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "AE4B":
        if (DeviceService.motorList.AE4B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";

      default:
        return "../../assets/svg/custom/my_extractor_big.svg";
    }
  }

  get IsAlarmRottameInterno(): boolean {
    let rValue: boolean = false;
    // Alm010 - Almeno un motore del recupero rottami interno non è avviato
    if (SignalRService.tagList.FDB_Alm010.value)
      rValue = true;
    return rValue;
  }

  get motorList() {
    return DeviceService.motorList;
  }

  get valveList() {
    return DeviceService.valveList;
  }

  get siloList() {
    return DeviceService.siloList;
  }

  get hopperList() {
    return DeviceService.hopperList;
  }

  get scaleList() {
    return DeviceService.scaleList;
  }

  get DosaggioState(): string {
    switch (SignalRService.tagList.FDB_STATO_MISCELATORE.value) {

      case 0:
        return "NESSUNA OPERAZIONE";
      case 1:
        return "AVVIAMENTO MOTORI E NASTRI";
      case 2:
        return "CONSENSI A BILANCE ED ACQUA";
      case 3:
        return "COMPLETAMENTO TMIX" + SignalRService.tagList.FDB_CD_TEMPO_MISCELAZIONE.value + " s";
      case 4:
        return "ATTESA SCARICO SU TM1";
      case 5:
        return "SCARICO SU TM1: " + SignalRService.tagList.FDB_CD_TEMPO_AperturaBotolaMix.value + " s";
      default:
        return "ERRORE PLC";
    }
  }

  get TramoggeFinaliState(): string {
    switch (SignalRService.tagList.FDB_STATO_SCARICO.value) {  //( SignalRService.tagList.INT_PLC_STATO_TRASPORTI_FINALI.value ) {
      case 0:
        return "NESSUNA OPERAZIONE";
      case 1:
        return "CARICO TF1";
      case 2:
        return "CARICO TF2";
      case 3:
        return "PULIZIA SU TF1" + ": " + SignalRService.tagList.FDB_CD_PUL_TRASPORTI_FINALI.value + " s";
      case 4:
        return "PULIZIA SU TF2" + ": " + SignalRService.tagList.FDB_CD_PUL_TRASPORTI_FINALI.value + " s";

      default:
        return "ERRORE PLC";
    }
  }

  get CaricoRottameEsternoState(): string {
    switch (SignalRService.tagList.FDB_STATO_C_R.value) {
      case 0:
        return "NESSUNA OPERAZIONE";
      case 1:
        return "MIS";
      case 2:
        return "CARICO S1";
      case 3:
        return "CARICO S2";
      case 4:
        return "PULIZIA S1: " + SignalRService.tagList.FDB_CD_PUL_C_R.value + " s";
      case 5:
        return "PULIZIA S2: " + SignalRService.tagList.FDB_CD_PUL_C_R.value + " s";
      default:
        return "ERRORE PLC";
    }
  }

  get CaricoSabbiaState(): string {
    switch (SignalRService.tagList.FDB_STATO_C_S.value) {
      case 0:
        return "NESSUN CARICO";
      case 1:
        return "AVVISO MESSA IN SERVIZIO";
      case 2:
        return "CARICO S13";
      case 3:
        return "CARICO S14";
      case 4:
        return "CARICO S15";
      case 5:
        return "CARICO S16";
      case 6:
        return "PULIZIA VERSO S13: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
      case 7:
        return "PULIZIA VERSO S14: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
      case 8:
        return "PULIZIA VERSO S15: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
      case 9:
        return "PULIZIA VERSO S16: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
      default:
        return "ERRORE PLC";
    }
  }

  //get RecuperoRottameState(): string {
    //switch (SignalRService.tagList.INT_PLC_STATO_FRANTUMAZIONE_ROTTAME_INTERNO.value) {
    //  case 0:
    //    return "NESSUNA OPERAZIONE";
    //  case 1:
    //    return "AVVISO MESSA IN SERVIZIO";
    //  case 2:
    //    return "CARICAMENTO R1";
    //  case 3:
    //    return "CARICAMENTO R2";
    //  case 4:
    //    return "PULIZIA SU R1: " + SignalRService.tagList.INT_FDB_CD_PULIZ_TRASPORTI_FINALI.value + " s";
    //  case 5:
    //    return "PULIZIA SU R2: " + SignalRService.tagList.INT_FDB_CD_PULIZ_TRASPORTI_FINALI.value + " s";
    //
    //  default:
    //    return "ERRORE PLC";
    //}
  //}

  get FiltriSilosState(): string {
    return "STATO DOSAGGIO";
  }

  onMAN(value) {
    switch (value) {

      case "DOSAGGIO":
        try {
          this.userService.logParameterTagValues("Dosaggio: tutto in manuale", SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_MANREM, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_MANREM.value = true;
        break;

      case "TRAMOGGE FINALI":
        try {
          this.userService.logParameterTagValues("Tramogge finali: tutto in manuale", SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_MANREM, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_MANREM.value = true;
        break;

      //case "RECUPERO ROTTAME":
      //  try {
      //    this.userService.logParameterTagValues("Recupero rottame: tutto in manuale", SignalRService.tagList.PC_CmdTuttoManRem, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoManRem.value = true;
      //  break;

      case "ROTTAME INTERNO":
        try {
          this.userService.logParameterTagValues("Rottame interno: tutto in manuale", SignalRService.tagList.PC_CmdTuttoManRem, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_CmdTuttoManRem.value = true;
        break;

      case "CARICO ROTTAME":
        try {
          this.userService.logParameterTagValues("Rottame esterno: tutto in manuale", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_MANREM, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_MANREM.value = true;
        break;

      case "CARICO SABBIA":
        try {
          this.userService.logParameterTagValues("Carico sabbia: tutto in manuale", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_MANREM, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_SABBIA_MANREM.value = true;
        break;

      //case "FILTRI SILOS":
      //  try { this.userService.logParameterTagValues("Filtri silos: tutto in manuale", SignalRService.tagList.PC_FILTRI_SILOS_MANUALE, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_FILTRI_SILOS_MANUALE.value = true;
      //  break;

      default:
    }
  }

  onLOC(value) {
    switch (value) {

      case "DOSAGGIO":
        try {
          this.userService.logParameterTagValues("Dosaggio: tutto in locale", SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_LOC, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_LOC.value = true;
        break;

      case "TRAMOGGE FINALI":
        try {
          this.userService.logParameterTagValues("Tramogge finali: tutto locale", SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_LOC, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_LOC.value = true;
        break;

      //case "RECUPERO ROTTAME":
      //  try {
      //    this.userService.logParameterTagValues("Recupero rottame: tutto in locale", SignalRService.tagList.PC_CmdTuttoLoc, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoLoc.value = true;
      //  break;

      case "ROTTAME INTERNO":
        try {
          this.userService.logParameterTagValues("Rottame interno: tutto in locale", SignalRService.tagList.PC_CmdTuttoLoc, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_CmdTuttoLoc.value = true;
        break;

      case "CARICO ROTTAME":
        try {
          this.userService.logParameterTagValues("Rottame esterno: tutto in locale", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_LOC, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_LOC.value = true;
        break;

      case "CARICO SABBIA":
        try {
          this.userService.logParameterTagValues("Carico sabbia: tutto in locale", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_LOC, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_SABBIA_LOC.value = true;
        break;

      //case "FILTRI SILOS":
      //  try { this.userService.logParameterTagValues("Filtri silos: tutto in semiautomatico", SignalRService.tagList.PC_FILTRI_SILOS_SEMIAUT, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_FILTRI_SILOS_SEMIAUT.value = true;
      //  break;

      default:
    }
  }

  onAUT(value) {
    switch (value) {

      case "DOSAGGIO":
        try { this.userService.logParameterTagValues("Dosaggio: tutto in automatico", SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_AUTREM, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_AUTREM.value = true;
        break;

      case "TRAMOGGE FINALI":
        try { this.userService.logParameterTagValues("Tramogge finali: tutto in automatico", SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_AUTREM, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_AUTREM.value = true;
        break;

      //case "RECUPERO ROTTAME":
      //  try { this.userService.logParameterTagValues("Recupero rottame: tutto in automatico", SignalRService.tagList.PC_CmdTuttoAutRem, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoAutRem.value = true;
      //  break;

      case "ROTTAME INTERNO":
        try {
          this.userService.logParameterTagValues("Rottame interno: tutto in automatico", SignalRService.tagList.PC_CmdTuttoAutRem, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_CmdTuttoAutRem.value = true;
        break;

      case "CARICO ROTTAME":
        try {
          this.userService.logParameterTagValues("Rottame esterno: tutto in automatico", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_AUTREM, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_AUTREM.value = true;
        break;

      case "CARICO SABBIA":
        try {
          this.userService.logParameterTagValues("Carico sabbia: tutto in automatico", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_AUTREM, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_SABBIA_AUTREM.value = true;
        break;

      //case "FILTRI SILOS":
      //  try { this.userService.logParameterTagValues("Filtri silos: tutto in automatico", SignalRService.tagList.PC_FILTRI_SILOS_AUTOMATICO, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_FILTRI_SILOS_AUTOMATICO.value = true;
      //  break;

      default:
    }
  }

  onSTART(value) {
    switch (value) {

      case "DOSAGGIO":
        try { this.userService.logParameterTagValues("Dosaggio: start utenze", SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_START_AUT, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_START_AUT.value = true;
        break;

      case "TRAMOGGE FINALI":
        try { this.userService.logParameterTagValues("Tramogge finali: start utenze", SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_START_AUT, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_START_AUT.value = true;
        break;

      //case "RECUPERO ROTTAME":
      //  try { this.userService.logParameterTagValues("Recupero rottame: start utenze", SignalRService.tagList.PC_CmdTuttoInReadyAutRem, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoInReadyAutRem.value = true;
      //  break;

      case "ROTTAME INTERNO":
        try {
          this.userService.logParameterTagValues("Rottame interno: start utenze", SignalRService.tagList.PC_CmdTuttoInReadyAutRem, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_CmdTuttoInReadyAutRem.value = true;
        break;

      case "CARICO ROTTAME":
        try {
          this.userService.logParameterTagValues("Rottame esterno: start utenze", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_START_AUT, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_START_AUT.value = true;
        break;

      case "CARICO SABBIA":
        try {
          this.userService.logParameterTagValues("Carico sabbia: start utenze", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_START_AUT, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_SABBIA_START_AUT.value = true;
        break;

      //case "FILTRI SILOS":
      //  try { this.userService.logParameterTagValues("Filtri silos: start utenze", SignalRService.tagList.PC_FILTRI_SILOS_START, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_FILTRI_SILOS_START.value = true;
      //  break;

      default:
    }
  }

  onSTOP(value) {
    switch (value) {

      case "DOSAGGIO":
        try { this.userService.logParameterTagValues("Dosaggio: stop  utenze", SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_STOP, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_STOP.value = true;
        break;

      case "TRAMOGGE FINALI":
        try { this.userService.logParameterTagValues("Tramogge finali: stop  utenze", SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_STOP, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_STOP.value = true;
        break;

      //case "RECUPERO ROTTAME":
      //  try { this.userService.logParameterTagValues("Recupero rottame: stop  utenze", SignalRService.tagList.PC_CmdTuttoInStop, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoInStop.value = true;
      //  break;

      case "ROTTAME INTERNO":
        try {
          this.userService.logParameterTagValues("Rottame interno: stop  utenze", SignalRService.tagList.PC_CmdTuttoInStop, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_CmdTuttoInStop.value = true;
        break;

      case "CARICO ROTTAME":
        try {
          this.userService.logParameterTagValues("Rottame esterno: stop utenze", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_STOP, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_STOP.value = true;
        break;

      case "CARICO SABBIA":
        try {
          this.userService.logParameterTagValues("Carico sabbia: stop utenze", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_STOP, "true", "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_ZONA_CARICO_SABBIA_STOP.value = true;
        break;

      //case "FILTRI SILOS":
      //  try { this.userService.logParameterTagValues("Filtri silos: stop  utenze", SignalRService.tagList.PC_FILTRI_SILOS_STOP, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_FILTRI_SILOS_STOP.value = true;
      //  break;

      default:
    }
  }

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService,
    private router: Router, private alarmService: AlarmService)
  {
    let mytimer = timer(1000, 2000);//300000 (5 minuti), 60000(1 minuto), 1000 (1 secondo)
    mytimer.subscribe(t => {
      this.oberserableTimer(t);
    });

    DeviceService.motorList.N14.FWD_TEXT = "N16";
    DeviceService.motorList.N14.REV_TEXT = "N15";
    //DeviceService.motorList.BC93M1.FWD_TEXT = "TF2";
    //DeviceService.motorList.BC93M1.REV_TEXT = "TF1";
  }

  goToRottameInterno() {
    this.router.navigate(['/rottame-interno']);
  }

  goToCaricoRottame() {
    this.router.navigate(['/carico-rottame']);
  }

  goToCaricoSabbia() {
    this.router.navigate(['/carico-sabbia']);
  }

  async oberserableTimer(t) {
    this.alarmsData = await this.alarmService.getAllActiveAlarms();
  }

  openDialog(event): void {

  }

  openMotorDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_MOTOR", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var motorDev = DeviceService.motorList.motors.filter(x => x.name == name)[0];
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 400, 330);
      const dialogRef = this.dialog.open(MotorPlateComponent, {
        id: name,
        width: '400px',
        data: { motor: motorDev },
        hasBackdrop: false,
        position: {
          top: position.top.toString() + 'px', left: position.left.toString() + 'px'
        }
      });
    }
  }

  openValveDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_VALVE", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var valveDev = DeviceService.valveList.valves.filter(x => x.name == name.toString())[0];
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 350, 330);
      const dialogRef = this.dialog.open(ValvePlateComponent, {
        id: name,
        width: '350px!important',
        data: { valve: valveDev },
        hasBackdrop: false,
        position: {
          top: position.top.toString() + 'px', left: position.left.toString() + 'px'
        }
      });
    }
  }

  openSiloDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("FILL_", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var siloDev = DeviceService.siloList.silos.filter(x => x.description == name.toString())[0];
      if (name.toString() == "4V395")
        siloDev = DeviceService.siloList.silos.filter(x => x.name == name.toString())[0];
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 350, 330);
      const dialogRef = this.dialog.open(SiloPlateComponent, {
        id: name,
        width: '350px!important',
        data: { silo: siloDev },
        hasBackdrop: false,
        position: {
          top: position.top.toString() + 'px', left: position.left.toString() + 'px'
        }
      });
    }
  }

  openScaleDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_Unity", "").replace("_Weight", "").replace("_PERC", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var scaleDev = DeviceService.scaleList.scales.filter(x => x.name == name.toString())[0];
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 400, 330);
      const dialogRef = this.dialog.open(ScalePlateComponent, {
        id: name,
        width: '350px!important',
        data: { scale: scaleDev },
        hasBackdrop: false,
        position: {
          top: position.top.toString() + 'px', left: position.left.toString() + 'px'
        }
      });
    }
  }

  openHopperDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_PERC", "").replace("FILL_", "").replace("_Weight", "").replace("_Unity", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var hopperDev = DeviceService.hopperList.hoppers.filter(x => x.name == name.toString())[0];
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 400, 330);
      if (hopperDev.name == "T24" || hopperDev.name == "T25") {
        const dialogRef = this.dialog.open(HopperPlateComponent, {
          id: name,
          width: '500px!important',
          data: { hopper: hopperDev },
          hasBackdrop: false,
          position: {
            top: position.top.toString() + 'px', left: position.left.toString() + 'px'
          }
        });
      }
      else {
        const dialogRef = this.dialog.open(HopperPlateComponent, {
          id: name,
          width: '350px!important',
          data: { hopper: hopperDev },
          hasBackdrop: false,
          position: {
            top: position.top.toString() + 'px', left: position.left.toString() + 'px'
          }
        });
      }
      
    }
  }

  openMotorRevDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_MOTOR", "").replace("_REV", "").replace("_FWD", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var motorDev = DeviceService.motorList.motors.filter(x => x.name == name)[0];
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 400, 330);
      const dialogRef = this.dialog.open(MotorRevPlateComponent, {
        id: name,
        width: '400px',
        data: { motor: motorDev },
        hasBackdrop: false,
        position: {
          top: position.top.toString() + 'px', left: position.left.toString() + 'px'
        }
      });
    }
  }

  openMixerDialogBySVG(event): void {
    var position = HelpService.getPositionBySvgElement(event, 400, 330);
    const dialogRef = this.dialog.open(MixerPlateComponent, {
      width: '350px!important',
      data: { title: 'IMPOSTAZIONI ASSORBIMENTO MISCELATORE' },
      hasBackdrop: false,
      position: {
        top: position.top.toString() + 'px', left: position.left.toString() + 'px'
      }
    });
  }

  openSettingsDialog() {
    this.dialog.open(SettingRComponent, {
      width: '1200px',
      height: '900px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'wide-dialog',
      data: { title: 'IMPOSTAZIONI IMPIANTO ASPIRAZIONE' },
      hasBackdrop: true,
      disableClose: false,
    });
  }

  get cDate(): Date {
    return new Date();
  }

  get dayOfWeek() {
    switch (new Date().getDay()) {
      case 0: return "Domenica";
      case 1: return "Lunedì";
      case 2: return "Martedì";
      case 3: return "Mercoledì";
      case 4: return "Giovedì";
      case 5: return "Venerdì";
      case 6: return "Sabato";
      default: return "";
    }
  }

  get month() {
    switch (new Date().getMonth()) {
      case 0: return "Gennaio";
      case 1: return "Febbraio";
      case 2: return "Marzo";
      case 3: return "Aprile";
      case 4: return "Maggio";
      case 5: return "Giugno";
      case 6: return "Luglio";
      case 7: return "Agosto";
      case 8: return "Settembre";
      case 9: return "Ottobre";
      case 10: return "Novembre";
      case 11: return "Dicembre";
      default: return "";
    }
  }

  isTrue(value: any): boolean {
    return value === true || value === 'true';
  }


}

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
import { MotorRevPlateComponent } from '../device-plate/motor-rev-plate/motor-rev-plate.component';
import { DeviceService } from '../services/device.service';
import { HelpService } from '../services/help.service';
import { SignalRService } from '../signalr-client/signalr.service';
import { TagsList } from '../tags/tags-list';
import { TagsClient } from '../tags/tags-client';
import { UserService } from '../services/user.service';
import { ZoneAlarmService } from '../services/zone-alarm.service';
import { SettingRow, SettingGroup, SETUP_AREA_SYSTEM, SETUP_GROUP_PATHS,
         settingByCode, settingTag, isSettingOn, settingStateTxt } from '../settings/setup-settings';
import { timer } from 'rxjs';
import { AlarmService } from '../services/alarm.service';
import { AlarmModel, AlarmQueryModel } from '../models/alarm.models';
import { ZoneCmdPlateComponent } from '../device-plate/zone-cmd-plate/zone-cmd-plate.component';
import { zoneCmdByZone, isZoneCmdOn } from '../services/zone-commands';


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

      //case "S1":
      //  rValue = (DeviceService.siloList.S1.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
      //  rValue = 34.395832 - +(rValue.toFixed(2));
      //  break;
      //case "S2":
      //  rValue = (DeviceService.siloList.S2.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
      //  rValue = 34.395832 - +(rValue.toFixed(2));
      //  break;
      //case "S3":
      //  rValue = (DeviceService.siloList.S3.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
      //  rValue = 34.395832 - +(rValue.toFixed(2));
      //  break;
      //case "S4":
      //  rValue = (DeviceService.siloList.S4.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
      //  rValue = 34.395832 - +(rValue.toFixed(2));
      //  break;
      default:
        break;
    }
    return rValue.toString();
  }

  getScaleInAlm(name) {
    var rValue = false;//"../../assets/svg/groov/tank_conetop_wgradient.svg";
    switch (name) {

      //case "B1":
      //  if (DeviceService.scaleList.B1.InAlarm)
      //    rValue = true;
      //  break;
      //case "B2":
      //  if (DeviceService.scaleList.B2.InAlarm)
      //    rValue = true;
      //  break;
      //case "B3":
      //  if (DeviceService.scaleList.B3.InAlarm)
      //    rValue = true;
      //  break;
      //case "B3A":
      //  if (DeviceService.scaleList.B3A.InAlarm)
      //    rValue = true;
      //  break;
      //case "B4":
      //  if (DeviceService.scaleList.B4.InAlarm)
      //    rValue = true;
      //  break;
      //case "B5":
      //  if (DeviceService.scaleList.B5.InAlarm)
      //    rValue = true;
      //  break;
      //case "B5A":
      //  if (DeviceService.scaleList.B5A.InAlarm)
      //    rValue = true;
      //  break;
      //case "B6":
      //  if (DeviceService.scaleList.B6.InAlarm)
      //    rValue = true;
      //  break;
      //case "TR1":
      //  if (DeviceService.scaleList.TR1.InAlarm)
      //    rValue = true;
      //  break;
      //case "B7":
      //  if (DeviceService.scaleList.B7.InAlarm)
      //    rValue = true;
      //  break;
      //case "TM1":
      //  if (DeviceService.hopperList.TM1.InAlarm)
      //    rValue = true;
      //  break;
      //case "TF1":
      //  if (DeviceService.hopperList.TF1.InAlarm)
      //    rValue = true;
      //  break;
      //case "TF2":
      //  if (DeviceService.hopperList.TF2.InAlarm)
      //    rValue = true;
      //  break;
      //case "S100":
      //  if (DeviceService.hopperList.S100.InAlarm)
      //    rValue = true;
      //  break;

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

  // Switcher della testata: mostra o nasconde la tabella degli allarmi. Prima era
  // "Mostra nomi utenze", copiato dalle pagine di zona, ma qui non c'erano utenze
  // disegnate da etichettare.
  alarmsVisible: boolean = true;

  setRottameLento() {
    //SignalRService.tagList.BOOL_PC_PULS_ROTT_INTERNO_ALTA_VELOCITA.value = false;
    //SignalRService.tagList.BOOL_PC_ALTA_VELOCITA_CATENA_BC400M1.value = false;
    //SignalRService.tagList.BOOL_PC_ALTA_VELOCITA_CATENA_BC401M1.value = false;
    //SignalRService.tagList.BOOL_PC_ALTA_VELOCITA_CATENA_BC402M1.value = false;
  }

  setRottameVeloce() {
    //SignalRService.tagList.BOOL_PC_PULS_ROTT_INTERNO_ALTA_VELOCITA.value = true;
  }

  getEstrattoreImg(name): string {
    switch (name) {
      //case "VS51":
      //  if (DeviceService.motorList.VS51.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS52":
      //  if (DeviceService.motorList.VS52.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS54":
      //  if (DeviceService.motorList.VS54.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS55":
      //  if (DeviceService.motorList.VS55.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS57":
      //  if (DeviceService.motorList.VS57.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS58":
      //  if (DeviceService.motorList.VS58.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS60":
      //  if (DeviceService.motorList.VS60.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS62":
      //  if (DeviceService.motorList.VS62.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS62":
      //  if (DeviceService.motorList.VS62.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS63":
      //  if (DeviceService.motorList.VS63.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS66":
      //  if (DeviceService.motorList.VS66.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS67":
      //  if (DeviceService.motorList.VS67.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "C69B":
      //  if (DeviceService.motorList.C69B.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "C69B_A":
      //  if (DeviceService.motorList.C69B_A.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS71":
      //  if (DeviceService.motorList.VS71.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS72":
      //  if (DeviceService.motorList.VS72.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS73":
      //  if (DeviceService.motorList.VS73.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS74":
      //  if (DeviceService.motorList.VS74.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "AE60M1":
        //if (DeviceService.motorList.VS53.RUNNING)
        //  return "../../assets/svg/custom/my_extractor_big_green.svg";
        //else
        //  return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS75":
      //  if (DeviceService.motorList.VS75.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "C65":
      //  if (DeviceService.motorList.C65.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS24A":
      //  if (DeviceService.motorList.VS24A.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "VS24B":
      //  if (DeviceService.motorList.VS24B.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "AE4A":
      //  if (DeviceService.motorList.AE4A.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";
      //case "AE4B":
      //  if (DeviceService.motorList.AE4B.RUNNING)
      //    return "../../assets/svg/custom/my_extractor_big_green.svg";
      //  else
      //    return "../../assets/svg/custom/my_extractor_big.svg";

      default:
        return "../../assets/svg/custom/my_extractor_big.svg";
    }
  }

  //get IsAlarmRottameInterno(): boolean {
  //  let rValue: boolean = false;
  //  // Alm010 - Almeno un motore del recupero rottami interno non è avviato
  //  if (SignalRService.tagList.FDB_Alm010.value)
  //    rValue = true;
  //  return rValue;
  //}

  get motorList() {
    return DeviceService.motorList;
  }

  get valveList() {
    return DeviceService.valveList;
  }

  get siloList() {
    return DeviceService.siloList;
  }

  get scaleList() {
    return DeviceService.scaleList;
  }

  //get DosaggioState(): string {
  //  switch (SignalRService.tagList.FDB_STATO_MISCELATORE.value) {

  //    case 0:
  //      return "NESSUNA OPERAZIONE";
  //    case 1:
  //      return "AVVIAMENTO MOTORI E NASTRI";
  //    case 2:
  //      return "CONSENSI A BILANCE ED ACQUA";
  //    case 3:
  //      return "COMPLETAMENTO TMIX" + SignalRService.tagList.FDB_CD_TEMPO_MISCELAZIONE.value + " s";
  //    case 4:
  //      return "ATTESA SCARICO SU TM1";
  //    case 5:
  //      return "SCARICO SU TM1: " + SignalRService.tagList.FDB_CD_TEMPO_AperturaBotolaMix.value + " s";
  //    default:
  //      return "ERRORE PLC";
  //  }
  //}

  //get TramoggeFinaliState(): string {
  //  switch (SignalRService.tagList.FDB_STATO_SCARICO.value) {  //( SignalRService.tagList.INT_PLC_STATO_TRASPORTI_FINALI.value ) {
  //    case 0:
  //      return "NESSUNA OPERAZIONE";
  //    case 1:
  //      return "CARICO TF1";
  //    case 2:
  //      return "CARICO TF2";
  //    case 3:
  //      return "PULIZIA SU TF1" + ": " + SignalRService.tagList.FDB_CD_PUL_TRASPORTI_FINALI.value + " s";
  //    case 4:
  //      return "PULIZIA SU TF2" + ": " + SignalRService.tagList.FDB_CD_PUL_TRASPORTI_FINALI.value + " s";

  //    default:
  //      return "ERRORE PLC";
  //  }
  //}

  //get CaricoRottameEsternoState(): string {
  //  switch (SignalRService.tagList.FDB_STATO_C_R.value) {
  //    case 0:
  //      return "NESSUNA OPERAZIONE";
  //    case 1:
  //      return "MIS";
  //    case 2:
  //      return "CARICO S1";
  //    case 3:
  //      return "CARICO S2";
  //    case 4:
  //      return "PULIZIA S1: " + SignalRService.tagList.FDB_CD_PUL_C_R.value + " s";
  //    case 5:
  //      return "PULIZIA S2: " + SignalRService.tagList.FDB_CD_PUL_C_R.value + " s";
  //    default:
  //      return "ERRORE PLC";
  //  }
  //}

  //get CaricoSabbiaState(): string {
  //  switch (SignalRService.tagList.FDB_STATO_C_S.value) {
  //    case 0:
  //      return "NESSUN CARICO";
  //    case 1:
  //      return "AVVISO MESSA IN SERVIZIO";
  //    case 2:
  //      return "CARICO S13";
  //    case 3:
  //      return "CARICO S14";
  //    case 4:
  //      return "CARICO S15";
  //    case 5:
  //      return "CARICO S16";
  //    case 6:
  //      return "PULIZIA VERSO S13: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
  //    case 7:
  //      return "PULIZIA VERSO S14: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
  //    case 8:
  //      return "PULIZIA VERSO S15: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
  //    case 9:
  //      return "PULIZIA VERSO S16: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
  //    default:
  //      return "ERRORE PLC";
  //  }
  //}

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

      //case "DOSAGGIO":
      //  try {
      //    this.userService.logParameterTagValues("Dosaggio: tutto in manuale", SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_MANREM, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_MANREM.value = true;
      //  break;

      //case "TRAMOGGE FINALI":
      //  try {
      //    this.userService.logParameterTagValues("Tramogge finali: tutto in manuale", SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_MANREM, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_MANREM.value = true;
      //  break;

      //case "RECUPERO ROTTAME":
      //  try {
      //    this.userService.logParameterTagValues("Recupero rottame: tutto in manuale", SignalRService.tagList.PC_CmdTuttoManRem, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoManRem.value = true;
      //  break;

      //case "ROTTAME INTERNO":
      //  try {
      //    this.userService.logParameterTagValues("Rottame interno: tutto in manuale", SignalRService.tagList.PC_CmdTuttoManRem, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoManRem.value = true;
      //  break;

      //case "CARICO ROTTAME":
      //  try {
      //    this.userService.logParameterTagValues("Rottame esterno: tutto in manuale", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_MANREM, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_MANREM.value = true;
      //  break;

      //case "CARICO SABBIA":
      //  try {
      //    this.userService.logParameterTagValues("Carico sabbia: tutto in manuale", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_MANREM, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_SABBIA_MANREM.value = true;
      //  break;

      //case "FILTRI SILOS":
      //  try { this.userService.logParameterTagValues("Filtri silos: tutto in manuale", SignalRService.tagList.PC_FILTRI_SILOS_MANUALE, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_FILTRI_SILOS_MANUALE.value = true;
      //  break;

      default:
    }
  }

  onLOC(value) {
    switch (value) {

      //case "DOSAGGIO":
      //  try {
      //    this.userService.logParameterTagValues("Dosaggio: tutto in locale", SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_LOC, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_LOC.value = true;
      //  break;

      //case "TRAMOGGE FINALI":
      //  try {
      //    this.userService.logParameterTagValues("Tramogge finali: tutto locale", SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_LOC, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_LOC.value = true;
      //  break;

      //case "RECUPERO ROTTAME":
      //  try {
      //    this.userService.logParameterTagValues("Recupero rottame: tutto in locale", SignalRService.tagList.PC_CmdTuttoLoc, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoLoc.value = true;
      //  break;

      //case "ROTTAME INTERNO":
      //  try {
      //    this.userService.logParameterTagValues("Rottame interno: tutto in locale", SignalRService.tagList.PC_CmdTuttoLoc, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoLoc.value = true;
      //  break;

      //case "CARICO ROTTAME":
      //  try {
      //    this.userService.logParameterTagValues("Rottame esterno: tutto in locale", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_LOC, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_LOC.value = true;
      //  break;

      //case "CARICO SABBIA":
      //  try {
      //    this.userService.logParameterTagValues("Carico sabbia: tutto in locale", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_LOC, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_SABBIA_LOC.value = true;
      //  break;

      //case "FILTRI SILOS":
      //  try { this.userService.logParameterTagValues("Filtri silos: tutto in semiautomatico", SignalRService.tagList.PC_FILTRI_SILOS_SEMIAUT, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_FILTRI_SILOS_SEMIAUT.value = true;
      //  break;

      default:
    }
  }

  onAUT(value) {
    switch (value) {

      //case "DOSAGGIO":
      //  try { this.userService.logParameterTagValues("Dosaggio: tutto in automatico", SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_AUTREM, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_AUTREM.value = true;
      //  break;

      //case "TRAMOGGE FINALI":
      //  try { this.userService.logParameterTagValues("Tramogge finali: tutto in automatico", SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_AUTREM, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_AUTREM.value = true;
      //  break;

      //case "RECUPERO ROTTAME":
      //  try { this.userService.logParameterTagValues("Recupero rottame: tutto in automatico", SignalRService.tagList.PC_CmdTuttoAutRem, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoAutRem.value = true;
      //  break;

      //case "ROTTAME INTERNO":
      //  try {
      //    this.userService.logParameterTagValues("Rottame interno: tutto in automatico", SignalRService.tagList.PC_CmdTuttoAutRem, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoAutRem.value = true;
      //  break;

      //case "CARICO ROTTAME":
      //  try {
      //    this.userService.logParameterTagValues("Rottame esterno: tutto in automatico", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_AUTREM, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_AUTREM.value = true;
      //  break;

      //case "CARICO SABBIA":
      //  try {
      //    this.userService.logParameterTagValues("Carico sabbia: tutto in automatico", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_AUTREM, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_SABBIA_AUTREM.value = true;
      //  break;

      //case "FILTRI SILOS":
      //  try { this.userService.logParameterTagValues("Filtri silos: tutto in automatico", SignalRService.tagList.PC_FILTRI_SILOS_AUTOMATICO, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_FILTRI_SILOS_AUTOMATICO.value = true;
      //  break;

      default:
    }
  }

  onSTART(value) {
    switch (value) {

      //case "DOSAGGIO":
      //  try { this.userService.logParameterTagValues("Dosaggio: start utenze", SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_START_AUT, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_START_AUT.value = true;
      //  break;

      //case "TRAMOGGE FINALI":
      //  try { this.userService.logParameterTagValues("Tramogge finali: start utenze", SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_START_AUT, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_START_AUT.value = true;
      //  break;

      //case "RECUPERO ROTTAME":
      //  try { this.userService.logParameterTagValues("Recupero rottame: start utenze", SignalRService.tagList.PC_CmdTuttoInReadyAutRem, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoInReadyAutRem.value = true;
      //  break;

      //case "ROTTAME INTERNO":
      //  try {
      //    this.userService.logParameterTagValues("Rottame interno: start utenze", SignalRService.tagList.PC_CmdTuttoInReadyAutRem, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoInReadyAutRem.value = true;
      //  break;

      //case "CARICO ROTTAME":
      //  try {
      //    this.userService.logParameterTagValues("Rottame esterno: start utenze", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_START_AUT, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_START_AUT.value = true;
      //  break;

      //case "CARICO SABBIA":
      //  try {
      //    this.userService.logParameterTagValues("Carico sabbia: start utenze", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_START_AUT, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_SABBIA_START_AUT.value = true;
      //  break;

      //case "FILTRI SILOS":
      //  try { this.userService.logParameterTagValues("Filtri silos: start utenze", SignalRService.tagList.PC_FILTRI_SILOS_START, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_FILTRI_SILOS_START.value = true;
      //  break;

      default:
    }
  }

  onSTOP(value) {
    switch (value) {

      //case "DOSAGGIO":
      //  try { this.userService.logParameterTagValues("Dosaggio: stop  utenze", SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_STOP, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_DOSAGGIO_STOP.value = true;
      //  break;

      //case "TRAMOGGE FINALI":
      //  try { this.userService.logParameterTagValues("Tramogge finali: stop  utenze", SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_STOP, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_MISCELAZIONE_E_TRASPORTI_FINALI_STOP.value = true;
      //  break;

      //case "RECUPERO ROTTAME":
      //  try { this.userService.logParameterTagValues("Recupero rottame: stop  utenze", SignalRService.tagList.PC_CmdTuttoInStop, "true", "", this.appService.user); } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoInStop.value = true;
      //  break;

      //case "ROTTAME INTERNO":
      //  try {
      //    this.userService.logParameterTagValues("Rottame interno: stop  utenze", SignalRService.tagList.PC_CmdTuttoInStop, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_CmdTuttoInStop.value = true;
      //  break;

      //case "CARICO ROTTAME":
      //  try {
      //    this.userService.logParameterTagValues("Rottame esterno: stop utenze", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_STOP, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_STOP.value = true;
      //  break;

      //case "CARICO SABBIA":
      //  try {
      //    this.userService.logParameterTagValues("Carico sabbia: stop utenze", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_STOP, "true", "", this.appService.user);
      //  } catch (e) { }
      //  SignalRService.tagList.PC_ZONA_CARICO_SABBIA_STOP.value = true;
      //  break;

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

    //DeviceService.motorList.N14.FWD_TEXT = "N16";
    //DeviceService.motorList.N14.REV_TEXT = "N15";
    //DeviceService.motorList.BC93M1.FWD_TEXT = "TF2";
    //DeviceService.motorList.BC93M1.REV_TEXT = "TF1";
  }

  async oberserableTimer(t) {
    this.initSetupSprayIn();
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

  // #region Comandi di zona (DB120 - FROM_HMI)
  // Ogni zona ha due bit toggle: State_off_ON (0=stop, 1=start) e Mode_mn_AUT (0=man, 1=AUT).
  // Il tag arriva dal template, come nel popup delle valvole: log del parametro e poi scrittura.
  private setZoneBool(tag: TagsClient, descrizione: string, valore: boolean): void {
    if (tag == null) return;
    try { this.userService.logParameterTagValues(descrizione, tag, valore, "", this.appService.user); } catch (e) { }
    tag.value = valore;
  }

  onZoneMode(tag: TagsClient, zona: string, aut: boolean): void {
    this.setZoneBool(tag, zona + ": modo " + (aut ? "automatico" : "manuale"), aut);
  }

  onZoneState(tag: TagsClient, zona: string, start: boolean): void {
    this.setZoneBool(tag, zona + ": " + (start ? "start" : "stop"), start);
  }
  // #endregion

  // #region Link di navigazione del sinottico
  // Le scritte del disegno che portano a un'altra pagina (layer "Label_Link" piu' la
  // scritta CASING ROOM) sono blu sottolineate e chiamano tutte questo metodo: la rotta
  // si ricava dall'inkscape:label, come per i popup dei device. Tenere la mappa qui e non
  // nel template significa che sopravvive ai ri-export Inkscape del disegno.
  private static readonly LINK_ROUTES = {
    "LBL_DCC_BURLEY": "/dcc-burley",
    "LBL_DCC_VIRGIN": "/dcc-virginia",
    "LBL_SLICER_BURLEY": "/slicer-burley",
    "LBL_SLICER_VIRGIN": "/slicer-virginia",
    "LBL_CASING_ROOM": "/casing-tanks",
    "LBL_BURLEY_DRYER": "/burley-dryer",
    "LBL_FINAL_DRYER": "/final-dryer",
    // Zone e silos: nel disegno vecchio erano LBL_ORIENTAL_FEEDERS e
    // LBL_METAL_DETECTOR, il ri-export di agosto le ha rinominate col numero di zona
    // e ne ha aggiunte quattro.
    "LBL_ZONA_1_0": "/zona-1-0",           // "ZONA 1.0 ORIENTAL FEEDERS"
    "LBL_ZONA_2_1": "/zona-2-1",           // "ZONA 2.1 BURLEY LINE"
    "LBL_ZONA_2_3": "/zona-2-3",           // "ZONA 2.3 - BURLEY INFEED"
    "LBL_ZONA_3_4": "/zona-3-4",           // "ZONA 3.4 METAL DETECTOR"
    "LBL_SILO_FILL": "/silo-fill",
    "LBL_SILO_DISCHARGE": "/silo-discharge",
  };

  goToPageBySVG(event): void {
    var label = event.currentTarget.attributes["inkscape:label"].value;
    var route = Dashboard.LINK_ROUTES[label];
    if (route == null) return; // scritta non associata a nessuna pagina
    this.router.navigate([route]);
  }
  // #endregion

  isTrue(value: any): boolean {
    return value === true || value === 'true';
  }



  // #region Pannello "Configurazione percorsi e linee" (cornice rect1 del layer SETTINGS)
  // Sono gli stessi bit della pagina Parametri, prima voce del System setup: la lista
  // sta in settings/setup-settings.ts e non e' ricopiata qui, cosi' le due viste non
  // possono comandare bit diversi. Lettura e scrittura come nella pagina Parametri:
  // log del parametro e poi scrittura del bit.

  readonly setupGroup: SettingGroup = SETUP_GROUP_PATHS;

  // Sul sinottico sta solo la manciata di percorsi che si cambiano in produzione: gli
  // altri bit del gruppo restano sulla pagina Parametri, che il pannello linka in fondo.
  // L'ordine e' quello voluto a video e non quello dello scambio dati, quindi le righe
  // si pescano per sigla dalla lista condivisa invece di essere ricopiate qui.
  private static readonly SETUP_CODES_SINOTTICO: string[] = ["C80", "C71", "C54", "C115", "C114"];

  readonly setupRows: SettingRow[] = Dashboard.SETUP_CODES_SINOTTICO
    .map(code => SETUP_GROUP_PATHS.rows.filter(row => row.code === code)[0])
    .filter(row => row != null);

  isSetupOn(row: SettingRow): boolean {
    return isSettingOn(row);
  }

  setupStateTxt(row: SettingRow): string {
    return settingStateTxt(row);
  }

  onSetupToggle(row: SettingRow, newValue: any): void {

    const tag = settingTag(row);
    if (tag == null) return; // bit non (ancora) presente in TagsList

    const value: boolean = this.isTrue(newValue);
    const description: string = SETUP_AREA_SYSTEM.logPrefix + " " + row.code + ": " + row.text;

    try {
      this.userService.logParameterTagValues(description, tag, value ? row.on : row.off, "", this.appService.user);
    } catch (e) { }

    tag.value = value;
  }

  // C114 (BCAC casing spray: ingresso / uscita) parte da IN: il bit va messo a true
  // all'avvio. Non si puo' fare in ngOnInit perche' li' la TagsList non e' ancora stata
  // costruita da SignalRService, quindi ci si appoggia al timer del componente e si
  // scrive al primo giro in cui il tag esiste.
  //
  // Il flag e' static apposta: la scrittura e' l'inizializzazione all'avvio della web
  // app, non una cosa che rifa' la pagina. Se fosse per istanza, ogni volta che si torna
  // sulla dashboard il bit tornerebbe a IN e all'operatore non resterebbe il comando.
  private static setupSprayInDone: boolean = false;

  private initSetupSprayIn(): void {
    if (Dashboard.setupSprayInDone) return;

    const row: SettingRow = this.setupRows.filter(r => r.code === "C114")[0];
    if (row == null) { Dashboard.setupSprayInDone = true; return; } // sigla non piu' in lista

    if (settingTag(row) == null) return; // TagsList non pronta: si riprova al giro dopo

    Dashboard.setupSprayInDone = true;
    if (isSettingOn(row)) return;        // gia' su IN, niente da scrivere
    this.onSetupToggle(row, true);
  }

  // Il pannello e' una scorciatoia: il resto dei parametri sta sulla pagina Parametri.
  // Non si usa routerLink perche' il link vive dentro un <foreignObject>; si naviga a
  // mano come gia' fa goToPageBySVG.
  goToSettings(): void {
    this.router.navigate(['/settings/general']);
  }

  // #endregion


  // #region Percorsi di produzione disegnati (layer Production_Path del sinottico)
  // Nel disegno ogni percorso e' un gruppo PATH_<sigla>, dove la sigla e' quella del
  // bit di setup che lo abilita (PATH_C80 = "Burley verso Silos dopo il Separatore").
  // Il *ngIf del template chiama isPathOn con la sigla: cosi' per aggiungere un
  // percorso basta disegnarlo e mettere il *ngIf, senza toccare niente qui.
  // La riga si pesca per sigla dalla lista condivisa (settings/setup-settings.ts), la
  // stessa che alimenta la pagina Parametri e il pannello dei percorsi qui sopra: il
  // percorso disegnato e l'interruttore che lo comanda non possono divergere.
  isPathOn(code: string): boolean {
    const row: SettingRow = settingByCode(SETUP_GROUP_PATHS, code);
    return row != null && isSettingOn(row);
  }

  // #endregion


  // #region Comandi di zona (pulsante BUTTON_ZONES sul sinottico)
  // Il pulsante e' un <button> HTML sovrapposto al disegno, come i bottoni PID delle
  // altre pagine: nel disegno c'e' solo il rettangolo che ne da' posizione e misura.
  // Apre il popup con tutte le zone; la lista sta in services/zone-commands.ts.
  openZonesDialog(): void {
    const id: string = "ZONE_COMMANDS";
    if (this.dialog.getDialogById(id) != null) return;

    this.dialog.open(ZoneCmdPlateComponent, {
      id: id,
      width: '1100px',
      maxWidth: '95vw',
      panelClass: 'plate-dialog',
      data: {},
      hasBackdrop: false
    });
  }

  // Zona avviata (bit State_off_ON del DB120): lo usa il sinottico per accendere le
  // aree che si devono vedere solo a zona in marcia, come CASING_ROOM_AREA_ON.
  isZoneStarted(zona: string): boolean {
    const row = zoneCmdByZone(zona);
    return row != null && isZoneCmdOn(row.stateTag);
  }

  // #endregion


  // #region Allarmi di zona sul sinottico (DB121 - TO_HMI)
  // Ogni zona del disegno ha il suo riquadro colorato nel layer Label_Link: quando la
  // zona va in allarme (scatto termico cumulativo oppure un sezionatore aperto) il
  // riquadro lampeggia di rosso. La condizione sta in services/zone-alarm.service.ts, cosi' e'
  // la stessa che usano le pagine di zona.

  isZoneInAlarm(zona: string): boolean {
    return ZoneAlarmService.inAlarm(zona);
  }

  // #endregion

}

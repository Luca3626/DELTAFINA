import { Component, OnInit } from '@angular/core';

import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

import { MatDialog } from '@angular/material/dialog';
import { MotorPlateComponent } from '../../device-plate/motor-plate/motor-plate.component';
import { ValvePlateComponent } from '../../device-plate/valve-plate/valve-plate.component';
import { PidPlateComponent } from '../../device-plate/pid-plate/pid-plate.component';
import { AnalogPlateComponent } from '../../device-plate/analog-plate/analog-plate.component';
import { ScalePlateComponent } from '../../device-plate/scale-plate/scale-plate.component';
import { SettingCasingComponent } from '../../device-plate/settingCasing/settingCasing.component';

import { DeviceService } from '../../services/device.service';
import { HelpService } from '../../services/help.service';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsList } from '../../tags/tags-list';
import { TagsClient } from '../../tags/tags-client';
import { AnalogModel } from '../../models/device/analog.models';
import { UserService } from '../../services/user.service';
import { ZoneAlarmService } from '../../services/zone-alarm.service';


@Component({
  selector: 'casing-tanks', // tslint:disable-line
  templateUrl: './casing-tanks.component.html',
  styleUrls: ['casing-tanks.css'],
})
export class CasingTanksComponent implements OnInit {
  // Stato dello switcher "Mostra Nomi" nel titolo (mostra/nasconde le etichette dei device nel sinottico).
  showName: boolean = true;

  cmdVisible: boolean = true;

  // Apertura del menu "Comandi" nella testata (comandi di zona).
  cmdOpen: boolean = false;

  //#region SETPOINT

  // Setpoint riempimento tank BCT 1
  newTankSetpoint_1: number;
  // Setpoint riempimento tank BCT 2
  newTankSetpoint_2: number;
  // Setpoint riempimento tank CAT 3
  newTankSetpoint_3: number;
  // Setpoint riempimento tank CAT 4
  newTankSetpoint_4: number;
  // Setpoint riempimento tank BTFC 5
  newTankSetpoint_5: number;

  //#endregion

  //#region IMPULSE SOLENOID VALVE

  // Impulso elettrovalvola tank BTC 1
  newSolenoidImpulseTank_1: boolean;
  // Impulso elettrovalvola tank BTC 2
  newSolenoidImpulseTank_2: boolean;
  // Impulso elettrovalvola tank CAT 3
  newSolenoidImpulseTank_3: boolean;
  // Impulso elettrovalvola tank CAT 4
  newSolenoidImpulseTank_4: boolean;
  // Impulso elettrovalvola tank BTFC 5
  newSolenoidImpulseTank_5: boolean;

  //#endregion

  //#region CASING ALL'UGELLO
  newCasingMerkerBCAC: boolean;
  newCasingMerkerCAC:  boolean;
  newCasingMerkerBTFC: boolean;
  //#endregion

  //#region TIMER C05

  // Il PLC tiene i temporizzatori del DB186 (preset) e del DB189 (residuo) in decimi di
  // secondo - e' la stessa convenzione della scheda "Temporizzatori" del popup
  // SettingCasingComponent, che li mostra grezzi con i secondi fra parentesi. Il tempo
  // del miscelatore C05 a video e' pero' in minuti, quindi 600 decimi = 60 s = 1 minuto:
  // la pagina divide in lettura e moltiplica in scrittura.
  static readonly TIMER_C05_DECIMI_PER_MINUTO = 600;

  // Tempo miscelatore digitato nella cornice "Timers_BTFC5" del sinottico, in minuti.
  newTimerBTFC: number;

  //#endregion
  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService) { }

  async ngOnInit() {
    this.newTankSetpoint_1 = this.TagList.FROM_HMIBTC1_H2O_SP.value;
    this.newTankSetpoint_2 = this.TagList.FROM_HMIBTC2_H2O_SP.value
    this.newTankSetpoint_3 = this.TagList.FROM_HMICAT3_H2O_SP.value
    this.newTankSetpoint_4 = this.TagList.FROM_HMICAT4_H2O_SP.value
    this.newTankSetpoint_5 = this.TagList.FROM_HMIBTFT5_H2O_SP.value

    // La casella del tempo miscelatore parte dal valore gia' scritto sul PLC (decimi di
    // secondo -> minuti), cosi' un OK dato senza digitare nulla non manda un valore vuoto:
    // il setter di TagsClient blocca undefined e null ma lascia passare NaN.
    this.newTimerBTFC = Number(this.TagList.TIMERS_tcp_208.value) / CasingTanksComponent.TIMER_C05_DECIMI_PER_MINUTO;
  }

  // #region Liste device (alimentate in tempo reale da SignalR)

  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  get motorList() {
    return DeviceService.motorList;
  }

  get valveList() {
    return DeviceService.valveList;
  }

  get scaleList() {
    return DeviceService.scaleList;
  }

  get siloList() {
    return DeviceService.siloList;
  }

  get pidList() {
    return DeviceService.pidList;
  }

  get analogList() {
    return DeviceService.analogList;
  }

  // #endregion

  // #region Popup device (click sugli elementi SVG, identificati da inkscape:label)

  openMotorDialogBySVG(event): void {
    // Nota: le pompe C06/C07/C08 hanno label C0x_ON / C0x_OFF -> strip _ON/_OFF per risalire al nome motore.
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_MOTOR", "").replace("_ON", "").replace("_OFF", "");
    if (name != null) {
      var motorDev = DeviceService.motorList.motors.filter(x => x.name == name)[0];
      if (motorDev == null) return; // device non (ancora) registrato in MotorList
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 350, 330);
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
    if (name != null) {
      var valveDev = DeviceService.valveList.valves.filter(x => x.name == name.toString())[0];
      if (valveDev == null) return; // device non (ancora) registrato in ValveList
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

  openScaleDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_Unity", "").replace("_Weight", "").replace("_PERC", "");
    if (name != null) {
      var scaleDev = DeviceService.scaleList.scales.filter(x => x.name == name.toString())[0];
      if (scaleDev == null) return; // device non (ancora) registrato in ScaleList
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

  // Bottoni PID del sinottico: sono pulsanti HTML, quindi il nome del loop arriva come
  // parametro invece di essere letto dall'inkscape:label come fa il resto del disegno.
  openPidDialog(name: string, event): void {
    if (name != null) {
      var pidDev = DeviceService.pidList.pids.filter(x => x.name == name.toString())[0];
      if (pidDev == null) return; // loop non (ancora) registrato in PidList
      if (this.dialog.getDialogById(name) != null) return;
      // Popup largo: si apre centrato invece che sul punto di click, che a questa
      // larghezza lo manderebbe fuori schermo. Resta trascinabile dal titolo.
      const dialogRef = this.dialog.open(PidPlateComponent, {
        id: name,
        width: '1000px',
        maxWidth: '95vw',
        panelClass: 'plate-dialog',
        data: { pid: pidDev },
        hasBackdrop: false
      });
    }
  }

  // Ingressi analogici (DB101): l'inkscape:label dell'icona e' ICON_<nome AI>,
  // quello dell'etichetta LBL_<nome AI>.
  openAnalogDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace("ICON_", "").replace("LBL_", "");
    if (name != null) {
      var analogDev = DeviceService.analogList.analogs.filter(x => x.name == name.toString())[0];
      if (analogDev == null) return; // AI non (ancora) registrata in AnalogList
      if (this.dialog.getDialogById(name) != null) return;
      // Popup largo come quello dei PID (ospita il grafico storico): si apre centrato
      // invece che sul punto di click, che a questa larghezza lo manderebbe fuori schermo.
      const dialogRef = this.dialog.open(AnalogPlateComponent, {
        id: name,
        width: '1000px',
        maxWidth: '95vw',
        panelClass: 'plate-dialog',
        data: { analog: analogDev },
        hasBackdrop: false
      });
    }
  }

  openSettingsDialog() {
    this.dialog.open(SettingCasingComponent, {
      width: '1200px',
      height: '900px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'wide-dialog',
      data: { title: 'IMPOSTAZIONI CASING TANKS' },
      hasBackdrop: true,
      disableClose: false,
    });
  }

  // #endregion

  // #region Riempimento tank (FILL_TANK_1..5)
  // I cinque gruppi FILL_TANK_n del disegno condividono la stessa geometria
  // locale (corpo del liquido + ellisse area superiore): sono le matrici dei
  // gruppi ad adattarla a ogni tank, quindi la corsa e' unica per tutti.
  // Il disegno rappresenta il livello al 100% della scala Y0..Y1 dell'analogica
  // di pesatura (PERCENT): il livello si rende traslando il contenuto verso il
  // basso e tagliandolo sulla sagoma FILL_TANK_CLIP nei defs, cosi' l'ellisse
  // scende senza deformarsi.
  //   94.911  y locale del pelo libero a tank pieno (centro ellisse)
  //   141.944 y locale del fondo -> corsa verticale 47.033
  private static readonly FILL_TANK_TRAVEL: number = 47.033;

  fillTankTransform(analog: AnalogModel): string {
    const percent = analog != null ? analog.PERCENT : 0; // null-safe come i modelli
    const dy = CasingTanksComponent.FILL_TANK_TRAVEL * (100 - percent) / 100;
    return "translate(0," + dy.toFixed(3) + ")";
  }

  // #endregion

  // #region Comandi di zona (DB120 - FROM_HMI)
  // Due bit toggle come le altre zone: State_off_ON (0=stop, 1=start) e Mode_mn_AUT
  // (0=man, 1=AUT). Quello di modo della zona 2.0 non sta con gli altri in testa al
  // DB ma piu' avanti, a DB120.dbx3.7. I tag arrivano dal template:
  // log del parametro e poi scrittura.
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

  // #region Allarmi e feedback di zona (DB121 - TO_HMI)
  // Stessi bit che fanno lampeggiare il riquadro della zona sulla dashboard: la
  // condizione sta in services/zone-alarm.service.ts, qui ci sono solo le scorciatoie per il
  // template. MOL_nok = scatto termico cumulativo, DAC_ok a 0 = sezionatore aperto.
  readonly ZONA: string = "2_0";

  dacAlarm(): boolean {
    return ZoneAlarmService.dacAlarm(this.ZONA);
  }

  // Quadro MCC della zona senza tensione (bit mCC*_SS_ok del DB121, logica invertita).
  mccAlarm(): boolean {
    return ZoneAlarmService.mccAlarm(this.ZONA);
  }

  // #endregion

  // #region Eventi setpoint e impulso dosaggio acqua elettrovalvola

  onSetpointConfirm(tagName) {

    switch (tagName) {

      case 'TANK_1':
        try { this.userService.logParameterTagValues("Conferma Setpoin TANK BCT 1", SignalRService.tagList.FROM_HMIBTC1_H2O_SP, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMIBTC1_H2O_SP.value = this.newTankSetpoint_1;
        break;

      case 'TANK_2':
        try { this.userService.logParameterTagValues("Conferma Setpoint TANK BCT 2", SignalRService.tagList.FROM_HMIBTC2_H2O_SP, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMIBTC2_H2O_SP.value = this.newTankSetpoint_2;
        break;

      case 'TANK_3':
        try { this.userService.logParameterTagValues("Conferma Setpoint TANK CAT 3", SignalRService.tagList.FROM_HMICAT3_H2O_SP, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMICAT3_H2O_SP.value = this.newTankSetpoint_3;
        break;

      case 'TANK_4':
        try { this.userService.logParameterTagValues("Conferma Setpoint TANK CAT 4", SignalRService.tagList.FROM_HMICAT4_H2O_SP, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMICAT4_H2O_SP.value = this.newTankSetpoint_4;
        break;

      case 'TANK_5':
        try { this.userService.logParameterTagValues("Conferma Setpoint TANK BTFC 5", SignalRService.tagList.FROM_HMIBTFT5_H2O_SP, "true", "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMIBTFT5_H2O_SP.value = this.newTankSetpoint_5;
        break;

    }
  }

  // Lo stato arriva dallo switcher: scrivere sempre true lo renderebbe un pulsante di
  // accensione, non un comando che si puo' anche togliere.
  onImpulseConfirm(tagName, attivo: boolean) {

    switch (tagName) {

      case 'TANK_1':
        try { this.userService.logParameterTagValues("Comando elettrovalvola dosaggio TANK BCT 1", SignalRService.tagList.FROM_HMI_BCT1_H2O_XYCOM, attivo, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMI_BCT1_H2O_XYCOM.value = attivo;
        break;

      case 'TANK_2':
        try { this.userService.logParameterTagValues("Comando elettrovalvola dosaggio TANK BCT 2", SignalRService.tagList.FROM_HMI_BCT2_H2O_XYCOM, attivo, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMI_BCT2_H2O_XYCOM.value = attivo;
        break;

      case 'TANK_3':
        try { this.userService.logParameterTagValues("Comando elettrovalvola dosaggio TANK CAT 3", SignalRService.tagList.FROM_HMI_CAT3_H2O_XYCOM, attivo, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMI_CAT3_H2O_XYCOM.value = attivo;
        break;

      case 'TANK_4':
        try { this.userService.logParameterTagValues("Comando elettrovalvola dosaggio TANK CAT 4", SignalRService.tagList.FROM_HMI_CAT4_H2O_XYCOM, attivo, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMI_CAT4_H2O_XYCOM.value = attivo;
        break;

      case 'TANK_5':
        try { this.userService.logParameterTagValues("Comando elettrovalvola dosaggio TANK BTFC 5", SignalRService.tagList.FROM_HMI_BTFT5_H2O_XYCOM, attivo, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMI_BTFT5_H2O_XYCOM.value = attivo;
        break;

    }
  }
  // #endregion

  //#region Eventi Casing all'ugello
  onMerkerConfirm(tagName, attivo: boolean) {

    switch (tagName) {

      case 'BCAC':
        try { this.userService.logParameterTagValues("Burley Cylinder: valvola casing all'ugello", SignalRService.tagList.FROM_HMI_BCAC_Casng_SV_MERKER, attivo, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMI_BCAC_Casng_SV_MERKER.value = attivo;
        break;

      case 'CAC':
        try { this.userService.logParameterTagValues("Casing Cylinder: valvola casing all'ugello", SignalRService.tagList.FROM_HMI_CAC_Casng_SV_MERKER, attivo, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMI_CAC_Casng_SV_MERKER.value = attivo;
        break;

      case 'BTFC':
        try { this.userService.logParameterTagValues("Top Flavor Cylinder: valvola casing all'ugello", SignalRService.tagList.FROM_HMI_BTFC_Casng_SV_MERKER, attivo, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.FROM_HMI_BTFC_Casng_SV_MERKER.value = attivo;
        break;

    }
  }
  //#endregion

  //#region Timer miscelatore C05 BTFC

  // Preset (TIMERS_tcp_208) e conto alla rovescia (TIMERS_tcc_208) arrivano dal PLC in
  // decimi di secondo: a video vanno in minuti con un decimale. Null-safe come daDecimi()
  // di casing-spray, cosi' un tag mancante o un null dal server non fa morire il binding.
  minuti(tag: TagsClient): string {
    if (tag == null || tag.value == null) return "0.0";
    return (Number(tag.value) / CasingTanksComponent.TIMER_C05_DECIMI_PER_MINUTO).toFixed(1);
  }

  // Tempo miscelatore: si digita in minuti, sul tag vanno i decimi di secondo. La guardia
  // sul null e' la stessa di onTimerPresetConfirm() nel popup: senza, un campo svuotato
  // scriverebbe 0 e un campo mai toccato scriverebbe NaN.
  onTimerConfirm() {
    if (this.newTimerBTFC == null) return;

    try { this.userService.logParameterTagValues("Timer miscelatore C05 BTFC", SignalRService.tagList.TIMERS_tcp_208, this.newTimerBTFC, "min", this.appService.user); } catch (e) { }

    // Math.round perche' il tag e' un INT16 e i minuti si digitano con la virgola:
    // 12,34 min farebbe 7404 decimi tondi, ma 0,105 min farebbe 63,0000001 e sul PLC
    // finirebbe un numero non intero.
    SignalRService.tagList.TIMERS_tcp_208.value = Math.round(this.newTimerBTFC * CasingTanksComponent.TIMER_C05_DECIMI_PER_MINUTO);
  }

  // Avvio del miscelatore: e' un impulso, il bit lo rimette a false il PLC. Per questo si
  // scrive solo true e non c'e' uno switcher che lo riporti indietro.
  onStartC05() {
    try { this.userService.logParameterTagValues("Avvio miscelatore C05 BTFC", SignalRService.tagList.FROM_HMI_START_C05, true, "", this.appService.user); } catch (e) { }

    SignalRService.tagList.FROM_HMI_START_C05.value = true;
  }
  //#endregion
}

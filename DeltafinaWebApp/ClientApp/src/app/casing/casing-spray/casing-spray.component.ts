import { Component, OnInit } from '@angular/core';

import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

import { MatDialog } from '@angular/material/dialog';
import { MotorPlateComponent } from '../../device-plate/motor-plate/motor-plate.component';
import { ValvePlateComponent } from '../../device-plate/valve-plate/valve-plate.component';
import { PidPlateComponent } from '../../device-plate/pid-plate/pid-plate.component';
import { ScalePlateComponent } from '../../device-plate/scale-plate/scale-plate.component';
import { SettingCasingComponent } from '../../device-plate/settingCasing/settingCasing.component';

import { DeviceService } from '../../services/device.service';
import { HelpService } from '../../services/help.service';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsList } from '../../tags/tags-list';
import { TagsClient } from '../../tags/tags-client';
import { UserService } from '../../services/user.service';
import { ZoneAlarmService } from '../../services/zone-alarm.service';


@Component({
  selector: 'casing-spray', // tslint:disable-line
  templateUrl: './casing-spray.component.html',
  styleUrls: ['casing-spray.css'],
})
export class CasingSprayComponent implements OnInit {

  showName: boolean = true;

  cmdVisible: boolean = true;

  // Apertura del menu "Comandi" nella testata (comandi di zona).
  cmdOpen: boolean = false;

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService) { }

  async ngOnInit() {
  }


  // I tre cilindri non sono piu' un <image> che punta a un file diverso a seconda
  // dello stato: il disegno di Cylinder.svg e' incollato nel template (come nei DCC)
  // e la rotazione la fa il CSS quando il gruppo prende la classe .running. Qui non
  // serve piu' niente, il template legge motorList.<motore>.RUNNING da solo.

  // #region Liste device

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

  // #region Formattazione dei valori del sinottico

  // Le nove parole V505..V513 del DB190 arrivano dal PLC moltiplicate per dieci: i sei
  // totalizzatori in decimi di kg, i tre spray rate medi in decimi di punto percentuale.
  // A video vanno divise per dieci; l'unita' la mette il template, che e' l'unico posto
  // dove si sa se quel numero sono kg o percento.
  daDecimi(tag: TagsClient): string {
    if (tag == null || tag.value == null) return "0.0";
    return (Number(tag.value) / 10).toFixed(1);
  }

  // #endregion

  // #region Popup device

  openMotorDialogBySVG(event): void {
    // Nota: le pompe C06/C07/C08 hanno label C0x_ON / C0x_OFF -> replace _ON/_OFF per risalire al nome motore.
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

  // Bottone "Impostazioni" sovrapposto alla cornice blu in fondo al sinottico.
  // E' lo stesso popup della pagina Casing Tanks: il titolo decide quale pannello
  // mostra settingCasing, quindi qui va lo stesso identico titolo.
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


  // #region Reset dei totalizzatori
  // Questi RESET non azzerano una parola come quelli di Silos Discharge: dal PC si alza e
  // basta un bit di comando, l'azzeramento vero lo fa il PLC. E ne azzera DUE per cilindro,
  // il totalizzatore del casing e quello del tabacco (il nastro pesa che lo alimenta):
  //   FROM_HMI_RESET_BCAC -> V505 (casing) e V506 (tabacco, nastro B46)
  //   FROM_HMI_RESET_CAC  -> V508 (casing) e V509 (tabacco, nastro F34)
  //   FROM_HMI_RESET_BTFC -> V511 (casing) e V512 (tabacco, nastro BTFC)
  // I pulsanti nel sinottico non chiamano questi metodi di suo: passano dalla finestra di
  // conferma swal del template (stesso schema dei comandi globali della navbar), perche' i
  // valori azzerati non si recuperano. Il log del parametro precede la scrittura, come per
  // tutti gli altri comandi della pagina.
  private resetTotalizzatori(tag: TagsClient, cilindro: string): void {
    if (tag == null) return;
    var descrizione = "CASING SPRAY: reset totalizzatori casing e tabacco " + cilindro;
    try { this.userService.logParameterTagValues(descrizione, tag, true, "", this.appService.user); } catch (e) { }
    tag.value = true;
  }

  onResetTotalizzatoriBCAC(): void {
    this.resetTotalizzatori(this.TagList.FROM_HMI_RESET_BCAC, "BCAC");
  }

  onResetTotalizzatoriCAC(): void {
    this.resetTotalizzatori(this.TagList.FROM_HMI_RESET_CAC, "CAC");
  }

  onResetTotalizzatoriBTFC(): void {
    this.resetTotalizzatori(this.TagList.FROM_HMI_RESET_BTFC, "BTFC");
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

}

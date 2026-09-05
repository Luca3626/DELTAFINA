import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MotorPlateComponent } from '../../device-plate/motor-plate/motor-plate.component';
import { MotorRevPlateComponent } from '../../device-plate/motor-rev-plate/motor-rev-plate.component';
import { ValvePlateComponent } from '../../device-plate/valve-plate/valve-plate.component';
import { PidPlateComponent } from '../../device-plate/pid-plate/pid-plate.component';
import { AnalogPlateComponent } from '../../device-plate/analog-plate/analog-plate.component';

import { DeviceService } from '../../services/device.service';
import { HelpService } from '../../services/help.service';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsList } from '../../tags/tags-list';
import { TagsClient } from '../../tags/tags-client';
import { AppService } from '../../app.service';
import { UserService } from '../../services/user.service';
import { ZoneAlarmService } from '../../services/zone-alarm.service';

@Component({
  selector: 'dcc-burley', // tslint:disable-line
  templateUrl: './dcc-burley.component.html',
  styleUrls: ['dcc-burley.css'],
})
export class DccBurleyComponent implements OnInit {

  // Apertura del menu "Comandi" nella testata (comandi di zona).
  cmdOpen: boolean = false;

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog) { }

  async ngOnInit() {
  }

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

  get pidList() {
    return DeviceService.pidList;
  }

  get analogList() {
    return DeviceService.analogList;
  }

  // #endregion

  // #region Popup device

  openMotorDialogBySVG(event): void {
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


  openMotorRevDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_MOTOR", "").replace("_ON", "").replace("_OFF", "");
    if (name != null) {
      var motorDev = DeviceService.motorList.motors.filter(x => x.name == name)[0];
      if (motorDev == null) return; // device non (ancora) registrato in MotorList
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 350, 330);
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

  // #endregion

  // #region Comandi di zona (DB120 - FROM_HMI)
  // I motori di questa pagina (B14..B20) stanno nella zona 2.1 - Burley Line:
  // sono gli stessi due bit toggle della pagina di zona, State_off_ON (0=stop,
  // 1=start) e Mode_mn_AUT (0=man, 1=AUT). Il tag arriva dal template: log del
  // parametro e poi scrittura.
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
  readonly ZONA: string = "2_1";

  molAlarm(): boolean {
    return ZoneAlarmService.molAlarm(this.ZONA);
  }

  dacAlarm(): boolean {
    return ZoneAlarmService.dacAlarm(this.ZONA);
  }

  allOn(): boolean {
    return ZoneAlarmService.allOn(this.ZONA);
  }

  // Quadro MCC della zona senza tensione (bit mCC*_SS_ok del DB121, logica invertita).
  mccAlarm(): boolean {
    return ZoneAlarmService.mccAlarm(this.ZONA);
  }

  // #endregion

  // #region Finecorsa del cilindro BDCC (DB121 - TO_HMI)
  // Tre spie di stato in testata: rotazione del tamburo (B14_LS, X0287: impulsi a
  // tamburo in moto, la spia pulsa con il finecorsa), martinetto idraulico in basso
  // (B16_LS_Dwn, X0247) e tendicinghia del nastro lasco (B16a_LS, X0288). Il tag si
  // prende per nome perche' la TagsList esiste solo dopo che SignalRService l'ha
  // costruita; il valore puo' arrivare come booleano o stringa/numero, stesso
  // criterio di isTrue della dashboard.
  private lsOn(nome: string): boolean {
    const list: any = SignalRService.tagList;
    if (list == null || list[nome] == null) return false;
    const value = list[nome].value;
    return value === true || value === 'true' || value === 1 || value === '1';
  }

  get drumRotationPulse(): boolean { return this.lsOn('PLC_BDCC_B14_LS'); }
  get jackDown(): boolean { return this.lsOn('PLC_BDCC_B16_LS_Dwn'); }
  get tensionerLoose(): boolean { return this.lsOn('PLC_BDCC_B16a_LS'); }
  // #endregion

}

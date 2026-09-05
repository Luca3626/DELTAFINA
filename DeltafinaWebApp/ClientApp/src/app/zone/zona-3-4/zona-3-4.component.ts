import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

import { MatDialog } from '@angular/material/dialog';
import { MotorPlateComponent } from '../../device-plate/motor-plate/motor-plate.component';
import { MotorRevPlateComponent } from '../../device-plate/motor-rev-plate/motor-rev-plate.component';
import { ValvePlateComponent } from '../../device-plate/valve-plate/valve-plate.component';
import { ScalePlateComponent } from '../../device-plate/scale-plate/scale-plate.component';

import { MotorModel } from '../../models/device/motor.models';
import { DeviceService } from '../../services/device.service';
import { HelpService } from '../../services/help.service';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsList } from '../../tags/tags-list';
import { TagsClient } from '../../tags/tags-client';
import { UserService } from '../../services/user.service';
import { ZoneAlarmService } from '../../services/zone-alarm.service';


@Component({
  selector: 'zona-3-4', // tslint:disable-line
  templateUrl: './zona-3-4.component.html',
  styleUrls: ['zona-3-4.css'],
})
export class Zona34Component implements OnInit {
  // Stato dello switcher "Mostra Nomi" nel titolo (mostra/nasconde le etichette dei device nel sinottico).
  showName: boolean = true;

  cmdVisible: boolean = true;

  // Apertura del menu "Comandi" nella testata (comandi di zona).
  cmdOpen: boolean = false;

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService, private router: Router) { }

  async ngOnInit() {
    // Precarica gli SVG animati per evitare flicker al primo cambio di xlink:href
    [Zona34Component.CONVEYOR_ANIM,
     Zona34Component.CONVEYOR_ANIM_REV,
     Zona34Component.CYLINDER_ANIM].forEach(u => { var i = new Image(); i.src = u; });
  }

  // #region Immagini animate conveyor / cilindri

  private static readonly CONVEYOR_OFF = "assets/svg/custom/conveyor3.svg";
  private static readonly CONVEYOR_ANIM = "assets/svg/custom/conveyor3_green_anim.svg";
  private static readonly CONVEYOR_ANIM_REV = "assets/svg/custom/conveyor3_green_anim_rev.svg";
  private static readonly CYLINDER_STATIC = "assets/svg/custom/Cylinder.svg";
  private static readonly CYLINDER_ANIM = "assets/svg/custom/Cylinder_Anim.svg";
  private static readonly CONVEYOR_ON = "../../assets/svg/custom/my_belt_conveyor_green.svg";
  private static readonly CONVEYOR_ALARM = "../../assets/svg/custom/my_belt_conveyor_red.svg";

  private findMotor(name: string): MotorModel {
    if (name == null || name == "") return null;
    return DeviceService.motorList.motors.filter(x => x.name == name)[0];
  }

  getConveyorImg(name: string): string {
    var motor = this.findMotor(name);
    if (motor == null || motor.STATE == null || !motor.RUNNING)
      return Zona34Component.CONVEYOR_OFF;
    if (motor.FDB_REVERSE != null && motor.FDB_REVERSE.value)
      return Zona34Component.CONVEYOR_ANIM_REV;
    if (motor.OUT_ALARM != null && motor.OUT_ALARM)
      return Zona34Component.CONVEYOR_ALARM;
    return Zona34Component.CONVEYOR_ON; // default: avanti (FDB_FORWARD o nessun feedback di verso)
  }

  getCylinderImg(motorName: string): string {
    var motor = this.findMotor(motorName);
    if (motor != null && motor.STATE != null && motor.RUNNING)
      return Zona34Component.CYLINDER_ANIM;
    return Zona34Component.CYLINDER_STATIC;
  }

  // #endregion

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

  // #endregion

  // #region Popup device (click sugli elementi SVG, identificati da inkscape:label)

  openMotorDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_MOTOR", "");
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

  // Motori bidirezionali (IOList, colonna "Bidirezionale"): stesso contratto
  // dell'altro popup, cambia solo il plate aperto (marcia FWD e REV separate).
  openMotorRevDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_MOTOR", "");
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

  // #endregion

  // #region Navigazione verso le pagine collegate (label-link nel sinottico)

  goToBurleyDryer(): void {
    this.router.navigate(['/burley-dryer']);
  }

  goToFinalDryer(): void {
    this.router.navigate(['/final-dryer']);
  }

  // "ZONA 2.3 BURLEY INFEED", la zona a monte
  goToZone2_3(): void {
    this.router.navigate(['/zona-2-3']);
  }

  // #endregion

  // #region Comandi di zona (DB120 - FROM_HMI)
  // Due bit toggle: State_off_ON (0=stop, 1=start) e Mode_mn_AUT (0=man, 1=AUT).
  // Il tag arriva dal template: log del parametro e poi scrittura.
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
  readonly ZONA: string = "3_4";

  molAlarm(): boolean {
    return ZoneAlarmService.molAlarm(this.ZONA);
  }

  dacAlarm(): boolean {
    return ZoneAlarmService.dacAlarm(this.ZONA);
  }

  allOn(): boolean {
    return ZoneAlarmService.allOn(this.ZONA);
  }

  // #endregion

}

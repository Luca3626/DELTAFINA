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
  selector: 'zona-1-0', // tslint:disable-line
  templateUrl: './zona-1-0.component.html',
  styleUrls: ['zona-1-0.css'],
})
export class Zona10Component implements OnInit {
  // Stato dello switcher "Mostra Nomi" nel titolo (mostra/nasconde le etichette dei device nel sinottico).
  showName: boolean = true;

  cmdVisible: boolean = true;

  // Apertura del menu "Comandi" nella testata (comandi di zona).
  cmdOpen: boolean = false;

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService, private router: Router) { }

  async ngOnInit() {

  }

  private findMotor(name: string): MotorModel {
    if (name == null || name == "") return null;
    return DeviceService.motorList.motors.filter(x => x.name == name)[0];
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

  // #region Navigazione dalle scritte del disegno (layer LBL_OTHERS)

  // Le scritte del sinottico che portano a un'altra pagina sono blu sottolineate e
  // chiamano tutte questo metodo: la rotta si ricava dall'inkscape:label, come per i
  // popup dei device. Tenere la mappa qui e non nel template significa che sopravvive
  // ai ri-export Inkscape del disegno.
  private static readonly LINK_ROUTES = {
    "LBL_SLICER_VIRGINIA": "/slicer-virginia",
    "LBL_SILO_INFEED": "/silo-fill",
    "LBL_SILO_DISCHARGE": "/silo-discharge",
    "LBL_VDCC": "/dcc-virginia",
  };

  goToPageBySVG(event): void {
    var label = event.currentTarget.attributes["inkscape:label"].value;
    var route = Zona10Component.LINK_ROUTES[label];
    if (route == null) return; // scritta non associata a nessuna pagina
    this.router.navigate([route]);
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
  readonly ZONA: string = "1_0";

  molAlarm(): boolean {
    return ZoneAlarmService.molAlarm(this.ZONA);
  }

  dacAlarm(): boolean {
    return ZoneAlarmService.dacAlarm(this.ZONA);
  }

  // Quadro MCC della zona senza tensione (bit mCC*_SS_ok del DB121, logica invertita).
  mccAlarm(): boolean {
    return ZoneAlarmService.mccAlarm(this.ZONA);
  }

  allOn(): boolean {
    return ZoneAlarmService.allOn(this.ZONA);
  }

  // #endregion

}

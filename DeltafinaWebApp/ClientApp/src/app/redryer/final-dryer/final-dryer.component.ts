import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

import { MatDialog } from '@angular/material/dialog';
import { MotorPlateComponent } from '../../device-plate/motor-plate/motor-plate.component';
import { ValvePlateComponent } from '../../device-plate/valve-plate/valve-plate.component';
import { PidPlateComponent } from '../../device-plate/pid-plate/pid-plate.component';
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
  selector: 'final-dryer', // tslint:disable-line
  templateUrl: './final-dryer.component.html',
  styleUrls: ['final-dryer.css'],
})
export class FinalDryerComponent implements OnInit {
  // Stato dello switcher "Mostra Nomi" nel titolo (mostra/nasconde le etichette dei device nel sinottico).
  showName: boolean = true;

  cmdVisible: boolean = true;

  // Apertura del menu "Comandi" nella testata (comandi di zona).
  cmdOpen: boolean = false;

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService, private router: Router) { }

  // Navigazione al sinottico Zona 3.4 (click su label-link "ZONA 3.4" nel sinottico)
  goToZone3_4(): void {
    this.router.navigate(['/zona-3-4']);
  }

  // Navigazione al sinottico Silo Discharge (click su label-link "SILOS DISCHARGE")
  goToSiloDischarge(): void {
    this.router.navigate(['/silo-discharge']);
  }

  async ngOnInit() {
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

  get pidList() {
    return DeviceService.pidList;
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

  // #region Barre grafiche SP / PV delle zone
  // Nel disegno ogni zona ha due cornici bianche affiancate (rect_sp_N e rect_pv_N),
  // larghe 5 e alte 26 unita', con bordo di 0,3. Il riempimento non e' nel disegno: e' un
  // secondo rect messo solo in pagina sopra la cornice, che cresce dal basso verso l'alto
  // in proporzione al valore. Il colore non dipende dal valore: la barra del setpoint e'
  // sempre celeste e quella del process value sempre rossa, come le scritte SP e PV.
  // Stesso schema del burley dryer.

  // Fondo scala delle barre, in °C: 0 = barra vuota, barFullScale = barra piena.
  // Setpoint e process value delle zone arrivano al massimo a 150.
  barFullScale: number = 150;

  // Geometria della cornice nel disegno.
  private static readonly BAR_FRAME_HEIGHT: number = 26;
  private static readonly BAR_STROKE: number = 0.3;

  // Altezza utile: dentro il bordo della cornice.
  private static readonly BAR_INNER_HEIGHT: number =
    FinalDryerComponent.BAR_FRAME_HEIGHT - FinalDryerComponent.BAR_STROKE;

  // Altezza del riempimento in unita' del disegno, tagliata agli estremi del fondo scala.
  barHeight(value: number): number {
    const ratio = Number(value) / this.barFullScale;
    if (!isFinite(ratio) || ratio <= 0)
      return 0;
    return FinalDryerComponent.BAR_INNER_HEIGHT * (ratio > 1 ? 1 : ratio);
  }

  // y del riempimento: la barra cresce dal basso, quindi parte dal fondo interno della
  // cornice (top = y della cornice) e sale di barHeight.
  barY(value: number, top: number): number {
    const bottom = top + FinalDryerComponent.BAR_FRAME_HEIGHT - FinalDryerComponent.BAR_STROKE / 2;
    return bottom - this.barHeight(value);
  }

  // #endregion

  // Valvole regolate da PID: l'inkscape:label dell'icona e' <nome loop>_OFF,
  // quello dell'etichetta e' LBL_<nome loop>.
  openPidDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_OFF", "");
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

  // Bottoni PID del sinottico: sono pulsanti HTML, quindi il nome del loop arriva come
  // parametro invece di essere letto dall'inkscape:label come fa il resto del disegno.
  // Apre lo stesso popup di openPidDialogBySVG.
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

  // #region Comandi di zona (DB120 - FROM_HMI)
  // Stessa logica della dashboard: la zona 3.3 ha due bit toggle,
  // State_off_ON (DB120.dbx1.6, 0=stop, 1=start) e Mode_mn_AUT (DB120.dbx1.7, 0=man, 1=AUT).
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


  // #endregion

  // #region Allarmi e feedback di zona (DB121 - TO_HMI)
  // Stessi bit che fanno lampeggiare il riquadro della zona sulla dashboard: la
  // condizione sta in services/zone-alarm.service.ts, qui ci sono solo le scorciatoie per il
  // template. MOL_nok = scatto termico cumulativo, DAC_ok a 0 = sezionatore aperto.
  readonly ZONA: string = "3_3";

  molAlarm(): boolean {
    return ZoneAlarmService.molAlarm(this.ZONA);
  }

  dacAlarm(): boolean {
    return ZoneAlarmService.dacAlarm(this.ZONA);
  }

  // Quadri MCC della zona senza tensione (bit mCC*_SS_ok del DB121, logica invertita):
  // la 3.3 ne ha due, Final (mCCf) e Dryers (mCCd).
  mccAlarm(): boolean {
    return ZoneAlarmService.mccAlarm(this.ZONA);
  }

  allOn(): boolean {
    return ZoneAlarmService.allOn(this.ZONA);
  }

  // #endregion

}

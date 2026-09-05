import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

import { MatDialog } from '@angular/material/dialog';
import { MotorPlateComponent } from '../../device-plate/motor-plate/motor-plate.component';
import { MotorRevPlateComponent } from '../../device-plate/motor-rev-plate/motor-rev-plate.component';
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
  selector: 'silo-discharge', // tslint:disable-line
  templateUrl: './silo-discharge.component.html',
  styleUrls: ['silo-discharge.css'],
})
export class SiloDischargeComponent implements OnInit {
  // Stato dello switcher "Mostra Nomi" nel titolo (mostra/nasconde le etichette dei device nel sinottico).
  showName: boolean = true;

  cmdVisible: boolean = true;

  // Apertura del menu "Comandi" nella testata (comandi di zona).
  cmdOpen: boolean = false;

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService, private router: Router) { }

  async ngOnInit() {
    // Le checkbox dei sili da scaricare partono dal valore gia' scritto sul PLC.
    this.loadDischargeSelection();
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

  get pidList() {
    return DeviceService.pidList;
  }

  get scaleList() {
    return DeviceService.scaleList;
  }

  get siloList() {
    return DeviceService.siloList;
  }

  get analogList() {
    return DeviceService.analogList;
  }

  // #endregion

  // #region Formattazione dei valori del sinottico

  // Le parole V505..V513 del DB190 arrivano dal PLC moltiplicate per dieci. Qui serve solo
  // per V509 (Totalizzatore_tabacco_CAC, il totalizzatore del nastro pesa F34), che a video
  // va diviso per dieci. Stessa formattazione di Casing Spray, che mostra lo stesso dato.
  daDecimi(tag: TagsClient): string {
    if (tag == null || tag.value == null) return "0.0";
    return (Number(tag.value) / 10).toFixed(1);
  }

  // #endregion

  // #region Popup device (click sugli elementi SVG, identificati da inkscape:label)

  openMotorDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("MOTOR_", "").replace("_MOTOR", "");
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
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("MOTOR_", "").replace("_MOTOR", "");
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

  // #region Comandi di zona (DB120 - FROM_HMI)
  // Stessa logica della dashboard: la zona 3.2 ha due bit toggle,
  // State_off_ON (0=stop, 1=start) e Mode_mn_AUT (0=man, 1=AUT).
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

  // #region Pannello impostazioni dentro il sinottico (layer Produzione)
  // Sili da scaricare (DB190 - V318): un intero le cui cifre sono le sorgenti abilitate,
  // sempre in ordine crescente. Sorgenti 2 e 3 -> 23; sorgenti 4, 2 e 3 -> 234.
  // Sul sinottico c'e' una checkbox per sorgente: OK compone il numero e lo scrive sul
  // PLC (col log del parametro, come tutti gli altri setpoint), ANNULLA toglie tutte le
  // spunte senza scrivere niente.

  // Le quattro sorgenti, in ordine crescente: e' questo array a dare l'ordine delle
  // cifre, non l'ordine in cui l'utente spunta le caselle.
  readonly DISCHARGE_SOURCES: number[] = [1, 2, 3, 4];

  // Spunte delle checkbox, indicizzate come DISCHARGE_SOURCES.
  dischargeSelection: boolean[] = [];

  // Numero che verrebbe scritto con le spunte attuali (0 = nessuna sorgente).
  get dischargeSilosValue(): number {
    return this.DISCHARGE_SOURCES.reduce(
      (composto, sorgente, i) => this.dischargeSelection[i] ? composto * 10 + sorgente : composto, 0);
  }

  onDischargeSilosConfirm(): void {
    var tag = this.TagList.VAR_V318;
    if (tag == null) return;
    var valore = this.dischargeSilosValue;
    try { this.userService.logParameterTagValues("SILOS DISCHARGE: sili da scaricare", tag, valore, "", this.appService.user); } catch (e) { }
    tag.value = valore;
  }

  onDischargeSilosCancel(): void {
    this.clearDischargeSelection();
  }

  private clearDischargeSelection(): void {
    this.dischargeSelection = this.DISCHARGE_SOURCES.map(() => false);
  }

  // Spunte iniziali dal valore gia' scritto sul PLC: 234 -> sorgenti 2, 3 e 4.
  // Le cifre che non sono una sorgente valida vengono ignorate.
  private loadDischargeSelection(): void {
    this.clearDischargeSelection();
    var tag = this.TagList.VAR_V318;
    if (tag == null) return;
    String(Number(tag.value)).split("").forEach(cifra => {
      var i = this.DISCHARGE_SOURCES.indexOf(Number(cifra));
      if (i >= 0) this.dischargeSelection[i] = true;
    });
  }

  // #endregion

  // #region Reset del totalizzatore del nastro pesa B46 (DB190)
  // Il totalizzatore lo azzera l'operatore a inizio lotto: B46 su V203. Il pulsante nel
  // sinottico non chiama questo metodo di suo, passa dalla finestra di conferma swal del
  // template (stesso schema dei comandi globali della navbar), perche' il valore azzerato
  // non si recupera. Il log del parametro precede la scrittura, come per tutti gli altri
  // setpoint della pagina.
  // F34 non ha piu' il suo RESET: e' sparito dal disegno insieme al vecchio riquadro del
  // nastro pesa, quindi da questa pagina nessuno scrive piu' V503.
  private resetTotalizer(tag: TagsClient, descrizione: string): void {
    if (tag == null) return;
    try { this.userService.logParameterTagValues(descrizione, tag, 0, "kg", this.appService.user); } catch (e) { }
    tag.value = 0;
  }

  onResetTotalizerB46(): void {
    this.resetTotalizer(this.TagList.VAR_V203, "SILOS DISCHARGE: reset totalizzatore nastro pesa B46");
  }
  // #endregion

  // #region Navigazione verso le pagine collegate (label zona nel sinottico)

  // "Zona 2.2 Burley Dryer"
  goToZone2_2(): void {
    this.router.navigate(['/burley-dryer']);
  }

  // "Zona 3.3 Final Dryer"
  goToZone3_3(): void {
    this.router.navigate(['/final-dryer']);
  }

  // "Silo Fill": la pagina che riempie gli stessi quattro silos che questa scarica.
  goToSiloFill(): void {
    this.router.navigate(['/silo-fill']);
  }

  // #endregion

  // #region Allarmi e feedback di zona (DB121 - TO_HMI)
  // Stessi bit che fanno lampeggiare il riquadro della zona sulla dashboard: la
  // condizione sta in services/zone-alarm.service.ts, qui ci sono solo le scorciatoie per il
  // template. MOL_nok = scatto termico cumulativo, DAC_ok a 0 = sezionatore aperto.
  readonly ZONA: string = "3_2";

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

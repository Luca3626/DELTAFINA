import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

import { MatDialog } from '@angular/material/dialog';
import { MotorPlateComponent } from '../../device-plate/motor-plate/motor-plate.component';
import { MotorRevPlateComponent } from '../../device-plate/motor-rev-plate/motor-rev-plate.component';
import { ValvePlateComponent } from '../../device-plate/valve-plate/valve-plate.component';
import { ScalePlateComponent } from '../../device-plate/scale-plate/scale-plate.component';
import { PidPlateComponent } from '../../device-plate/pid-plate/pid-plate.component';

import { MotorModel } from '../../models/device/motor.models';
import { DeviceService } from '../../services/device.service';
import { HelpService } from '../../services/help.service';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsList } from '../../tags/tags-list';
import { TagsClient } from '../../tags/tags-client';
import { UserService } from '../../services/user.service';
import { ZoneAlarmService } from '../../services/zone-alarm.service';
import { SettingRow, SETUP_GROUP_PATHS, settingByCode, isSettingOn } from '../../settings/setup-settings';


@Component({
  selector: 'zona-2-1', // tslint:disable-line
  templateUrl: './zona-2-1.component.html',
  styleUrls: ['zona-2-1.css'],
})
export class Zona21Component implements OnInit {
  // Stato dello switcher "Mostra Nomi" nel titolo (mostra/nasconde le etichette dei device nel sinottico).
  showName: boolean = true;

  cmdVisible: boolean = true;

  // Apertura del menu "Comandi" nella testata (comandi di zona).
  cmdOpen: boolean = false;

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService, private router: Router) { }

  async ngOnInit() {
    // Precarica gli SVG animati per evitare flicker al primo cambio di xlink:href
    [Zona21Component.CONVEYOR_ANIM,
     Zona21Component.CONVEYOR_ANIM_REV,
     Zona21Component.CYLINDER_ANIM].forEach(u => { var i = new Image(); i.src = u; });
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
      return Zona21Component.CONVEYOR_OFF;
    if (motor.FDB_REVERSE != null && motor.FDB_REVERSE.value)
      return Zona21Component.CONVEYOR_ANIM_REV;
    if (motor.OUT_ALARM != null && motor.OUT_ALARM)
      return Zona21Component.CONVEYOR_ALARM;
    return Zona21Component.CONVEYOR_ON; // default: avanti (FDB_FORWARD o nessun feedback di verso)
  }

  getCylinderImg(motorName: string): string {
    var motor = this.findMotor(motorName);
    if (motor != null && motor.STATE != null && motor.RUNNING)
      return Zona21Component.CYLINDER_ANIM;
    return Zona21Component.CYLINDER_STATIC;
  }

  // #endregion

  // #region Utenze del percorso "Silo #3 e #4 verso Burley" (parametro C73)
  // B23 e B24 girano solo con quel percorso abilitato: a percorso disabilitato l'icona
  // resta quella di fermo, qualunque cosa dica la parola di stato del PLC. L'allarme
  // invece si vede sempre - un'utenza in blocco va segnalata comunque - e in quel caso
  // si lasciano i valori veri, cosi' l'<animate> del template lampeggia come sugli
  // altri motori. Il bit si pesca per sigla dalla lista condivisa dei parametri
  // (settings/setup-settings.ts), la stessa che alimenta la pagina Parametri: qui non
  // si ricopia il nome del tag.

  private static readonly MOTOR_BASE_OFF = "../../assets/svg/groov/motor2_base_blue.svg";
  private static readonly BLOWER_OFF = "../../assets/svg/groov/blower_blue.svg";

  get silo34VersoBurley(): boolean {
    const row: SettingRow = settingByCode(SETUP_GROUP_PATHS, "C73");
    return row != null && isSettingOn(row);
  }

  // icona = quella vera se il percorso e' abilitato o se l'utenza e' in allarme,
  // altrimenti quella di fermo.
  private gatedByC73(motor: MotorModel, icona: string, ferma: string): string {
    if (motor == null) return ferma;
    return (this.silo34VersoBurley || motor.OUT_ALARM) ? icona : ferma;
  }

  // B23: motore con base. I due getter sono il from e il to dell'<animate>.
  get svgB23(): string {
    return this.gatedByC73(this.motorList.B23, this.motorList.B23.SVG_MOTOR_BASE, Zona21Component.MOTOR_BASE_OFF);
  }

  get svgB23Alm(): string {
    return this.gatedByC73(this.motorList.B23, this.motorList.B23.SVG_MOTOR_BASE_ALM, Zona21Component.MOTOR_BASE_OFF);
  }

  // B24: ventilatore.
  get svgB24(): string {
    return this.gatedByC73(this.motorList.B24, this.motorList.B24.SVG_BLOWER, Zona21Component.BLOWER_OFF);
  }

  get svgB24Alm(): string {
    return this.gatedByC73(this.motorList.B24, this.motorList.B24.SVG_BLOWER_ALM, Zona21Component.BLOWER_OFF);
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
  // per V506 (Totalizzatore_tabacco_BCAC, il totalizzatore del nastro pesa B46), che a video
  // va diviso per dieci. Stessa formattazione di Casing Spray, che mostra lo stesso dato.
  daDecimi(tag: TagsClient): string {
    if (tag == null || tag.value == null) return "0.0";
    return (Number(tag.value) / 10).toFixed(1);
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

  // Bottone PID del sinottico: e' un pulsante HTML, quindi il nome del loop arriva come
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

  // #endregion

  // #region Comandi di zona (DB120 - FROM_HMI)
  // Stessa logica della dashboard: la zona 2.1 ha due bit toggle,
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

  // #region Navigazione verso le pagine collegate (label Burley/Final Dryer nel sinottico)

  goToBurleyDryer(): void {
    this.router.navigate(['/burley-dryer']);
  }

  goToFinalDryer(): void {
    this.router.navigate(['/final-dryer']);
  }

  // "BURLEY INFEED" = sinottico Zona 2.3
  goToZone2_3(): void {
    this.router.navigate(['/zona-2-3']);
  }

  // "Virginia Infeed to Silos" = sinottico Zona 1.0
  goToZone1_0(): void {
    this.router.navigate(['/zona-1-0']);
  }

  // "BDCC" = Burley Direct Conditioning Cylinder -> pagina DCC della linea Burley.
  // Prima puntava a '/dcc', rotta che non esiste piu' da quando la pagina e' stata
  // divisa in dcc-virginia e dcc-burley: il click finiva sulla NotFound.
  goToDccBurley(): void {
    this.router.navigate(['/dcc-burley']);
  }

  // "SILOS FILL" = sinottico di riempimento silos
  goToSiloFill(): void {
    this.router.navigate(['/silo-fill']);
  }

  // "SILOS DISCHARGE" = sinottico di scarico silos
  goToSiloDischarge(): void {
    this.router.navigate(['/silo-discharge']);
  }

  // Navigazione verso pagina Slicer Burley
  goToSlicerBurley(): void {
    this.router.navigate(['/slicer-burley']);
  }

  goToVirginiaInfeed(): void {
    this.router.navigate(['/zona-1-0'])
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

  // Quadro MCC della zona senza tensione (bit mCC*_SS_ok del DB121, logica invertita).
  mccAlarm(): boolean {
    return ZoneAlarmService.mccAlarm(this.ZONA);
  }

  allOn(): boolean {
    return ZoneAlarmService.allOn(this.ZONA);
  }

  // #endregion

}

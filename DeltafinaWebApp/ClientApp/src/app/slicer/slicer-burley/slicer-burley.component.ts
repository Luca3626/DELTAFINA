import { Component, ElementRef, OnInit } from '@angular/core';

import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, TickOptions, ChartLegendOptions } from 'chart.js';
import { ThemeSettingsService } from '../../../vendor/libs/theme-settings/theme-settings.service';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MotorPlateComponent } from '../../device-plate/motor-plate/motor-plate.component';
import { MotorRevPlateComponent } from '../../device-plate/motor-rev-plate/motor-rev-plate.component';
import { MotorModel } from '../../models/device/motor.models';
import { ValvePlateComponent } from '../../device-plate/valve-plate/valve-plate.component';
import { ValveModel } from '../../models/device/valve.models';
import { SiloPlateComponent } from '../../device-plate/silo-plate/silo-plate.component';
import { AnalogPlateComponent } from '../../device-plate/analog-plate/analog-plate.component';
import { SlicerWeighingPlateComponent } from '../../device-plate/slicer-weighing-plate/slicer-weighing-plate.component';

import { DeviceService } from '../../services/device.service';
import { HelpService } from '../../services/help.service';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsList } from '../../tags/tags-list';
import { TagsClient } from '../../tags/tags-client';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from '../../services/user.service';
import { SettingRow, SETUP_AREA_SYSTEM, SETUP_GROUP_SLICER, settingByCode,
         settingTag, isSettingOn, settingStateTxt } from '../../settings/setup-settings';


@Component({
  selector: 'slicer-burley', // tslint:disable-line
  templateUrl: './slicer-burley.component.html',
  styleUrls: ['slicer-burley.css'],
})
export class SlicerBurleyComponent implements OnInit {// implements AfterViewInit, OnDestroy {
  isRTL: boolean;

  lightOn: true;
  cmdVisible: boolean = true;

  // Apertura del menu "Comandi" nella testata (comandi di zona).
  cmdOpen: boolean = false;

  // Setpoint di portata oraria (V71 Virginia / V371 Burley): unico valore
  // scrivibile della finestra produzione. Parte dal valore gia' sul PLC.
  newFlowRateSetpoint: number;
  numberVisible: boolean;
  motoreAttivo = false;


  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  getBC47M1_x(limit_fwd: boolean): number {
    if (limit_fwd)
      return 358.51041;
    else
      return 358.51041;
  }

  async ngOnInit() {
    // La casella del setpoint parte dal valore gia' scritto sul PLC, cosi' un OK
    // dato senza digitare nulla non manda un valore vuoto.
    if (this.slicer != null)
      this.newFlowRateSetpoint = this.slicer.FLOW_RATE_SETPOINT;
    //DeviceService.motorList.loadMotors();
  }

  showName: boolean = true;

  get motorList() {
    return DeviceService.motorList;
  }

  get valveList() {
    return DeviceService.valveList;
  }

  get siloList() {
    return DeviceService.siloList;
  }

  // Istanza di linea: il template e' identico a quello del Virginia, cambia solo
  // il device che questo getter restituisce.
  get slicer() {
    return DeviceService.slicerList.slicerBurley;
  }

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService)
  {

  }

  openDialog(event): void {
  }

  openMotorDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_MOTOR", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var motorDev = DeviceService.motorList.motors.filter(x => x.name == name)[0];
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
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_MOTOR", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var motorDev = DeviceService.motorList.motors.filter(x => x.name == name)[0];
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
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "");
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
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("FILL_","");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var siloDev = DeviceService.siloList.silos.filter(x => x.description == name.toString())[0];
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

  // #region Comandi di zona (DB120 - FROM_HMI)
  // Stessa logica delle card della dashboard: due bit toggle,
  // BSL_State_ON (0=off, 1=on) e BSL_Mode_AUTO (0=man, 1=AUT).
  // Sullo slicer il bit di stato accende e spegne la macchina, non e' lo
  // start/stop di una zona: nel log e sui pulsanti si legge OFF/ON.
  // Il tag arriva dal template: log del parametro e poi scrittura.
  private setZoneBool(tag: TagsClient, descrizione: string, valore: boolean): void {
    if (tag == null) return;
    try { this.userService.logParameterTagValues(descrizione, tag, valore, "", this.appService.user); } catch (e) { }
    tag.value = valore;
  }

  onZoneMode(tag: TagsClient, zona: string, aut: boolean): void {
    this.setZoneBool(tag, zona + ": modo " + (aut ? "automatico" : "manuale"), aut);
  }

  onZoneState(tag: TagsClient, zona: string, on: boolean): void {
    this.setZoneBool(tag, zona + ": " + (on ? "on" : "off"), on);
  }
  // #endregion

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

  getFill(silo): string {
    //34,395832(y1): silo vuoto
    //11,377084(y2): silo pieno
    //34,395832(y1) - 11,377084(y2) = 23,018748
    let rValue: number = 34.395832;
    switch (silo) {

      //case "S13":
      //  rValue = (DeviceService.siloList.S13.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
      //  rValue = 34.395832 - +(rValue.toFixed(2));
      //  console.log("S13 calculated y2:", rValue);
      //  console.log("Transformation matrix:", document.getElementById("linearGradient_S13").getAttribute("gradientTransform"));
      //  break;
      //case "S14":
      //  rValue = (DeviceService.siloList.S14.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
      //  rValue = 34.395832 - +(rValue.toFixed(2));
      //  console.log("S14 calculated y2:", rValue);
      //  break;
      //case "S15":
      //  rValue = (DeviceService.siloList.S15.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
      //  rValue = 34.395832 - +(rValue.toFixed(2));
      //  break;
      //case "S16":
      //  rValue = (DeviceService.siloList.S16.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
      //  rValue = 34.395832 - +(rValue.toFixed(2));
      //  break;
      default:
        break;
    }
    return rValue.toString();
  }


  // #region Finestra produzione - setpoint di portata oraria
  // Stesso contratto degli altri setpoint dell'impianto: si digita il valore, si
  // conferma con OK, log del parametro e poi scrittura sul tag.
  onFlowRateSetpointConfirm(): void {
    var s = this.slicer;
    if (s == null || s.SET_FLOW_RATE == null || this.newFlowRateSetpoint == null) return;
    try { this.userService.logParameterTagValues("SLICER BURLEY: setpoint portata oraria", s.SET_FLOW_RATE, this.newFlowRateSetpoint, "kg/h", this.appService.user); } catch (e) { }
    s.FLOW_RATE_SETPOINT = this.newFlowRateSetpoint;
  }
  // #endregion


  // #region Finestra produzione - reset dei contatori di linea
  // Totalizzatore (V379) e numero casse (V390) sono i due contatori che l'operatore azzera
  // a inizio lotto: si scrivono insieme, con il log del parametro prima della scrittura
  // come per gli altri comandi della finestra. Ognuno viene scritto solo se il suo tag
  // esiste, cosi' se un domani una linea non avesse il conteggio casse l'altro azzeramento
  // funziona lo stesso.

  // Il pulsante non chiama questo metodo di suo: passa dalla finestra di conferma swal
  // del template (stesso schema dei comandi globali della navbar). I contatori sono di
  // lotto, un tocco per sbaglio li perderebbe senza modo di rimetterli.
  onResetTotalizerAndBoxCount(): void {
    var s = this.slicer;
    if (s == null) return;

    if (s.FDB_TOTALIZER != null) {
      try { this.userService.logParameterTagValues("SLICER BURLEY: reset totalizzatore", s.FDB_TOTALIZER, 0, "kg", this.appService.user); } catch (e) { }
      s.TOTALIZER = 0;
    }

    if (s.FDB_BOX_COUNT != null) {
      try { this.userService.logParameterTagValues("SLICER BURLEY: reset numero casse", s.FDB_BOX_COUNT, 0, "", this.appService.user); } catch (e) { }
      s.BOX_COUNT = 0;
    }
  }
  // #endregion


  // #region Finestra produzione - registro pesate casse
  // Le pesate non arrivano dal PLC ma dall'archivio (tabella SlicerWeighings, scritta da
  // SlicerWeighingTask a ogni cassa): il popup se le legge da solo da /api/slicer/GetWeighings,
  // qui gli si passa solo la linea, cosi' la pagina Burley mostra le sole casse del BSL.
  openWeighingsDialog(): void {
    const id: string = "WEIGHINGS_BSL";
    if (this.dialog.getDialogById(id) != null) return;

    // Popup largo come quello dei PID e delle analogiche: si apre centrato invece che
    // sul punto di click, che a questa larghezza lo manderebbe fuori schermo.
    const dialogRef = this.dialog.open(SlicerWeighingPlateComponent, {
      id: id,
      width: '1200px',
      maxWidth: '95vw',
      panelClass: 'plate-dialog',
      data: { lineCode: "BSL", line: "SLICER BURLEY" },
      hasBackdrop: false
    });
  }
  // #endregion


  // #region Finestra produzione - modo di taglio (C1000 del DB120 - FROM_HMI)
  // E' lo stesso bit della pagina Parametri (System setup > Modo di taglio slicer):
  // la riga arriva da settings/setup-settings.ts e non e' ricopiata qui, cosi' le due
  // viste non possono comandare bit diversi. Lo switcher scrive subito, senza OK, come
  // sulla pagina Parametri e sul pannello della dashboard: e' una scelta fra due modi,
  // non un valore da digitare.

  readonly cutModeRow: SettingRow = settingByCode(SETUP_GROUP_SLICER, "C1000");

  get cutModeOn(): boolean {
    return isSettingOn(this.cutModeRow);
  }

  get cutModeTxt(): string {
    return settingStateTxt(this.cutModeRow);
  }

  onCutModeToggle(newValue: any): void {

    const row: SettingRow = this.cutModeRow;
    if (row == null) return;

    const tag = settingTag(row);
    if (tag == null) return; // bit non (ancora) presente in TagsList

    const value: boolean = newValue === true || newValue === 'true';
    const description: string = SETUP_AREA_SYSTEM.logPrefix + " " + row.code + ": " + row.text;

    try {
      this.userService.logParameterTagValues(description, tag, value ? row.on : row.off, "", this.appService.user);
    } catch (e) { }

    tag.value = value;
  }
  // #endregion

}

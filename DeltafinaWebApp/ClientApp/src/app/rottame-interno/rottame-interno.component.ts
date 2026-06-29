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
import { MotorRevPlateComponent } from '../device-plate/motor-rev-plate/motor-rev-plate.component';
import { MotorModel } from '../models/device/motor.models';
import { ValvePlateComponent } from '../device-plate/valve-plate/valve-plate.component';
import { ValveModel } from '../models/device/valve.models';
import { HopperPlateComponent } from '../device-plate/hopper-plate/hopper-plate.component';
import { SiloPlateComponent } from '../device-plate/silo-plate/silo-plate.component';
import { ScalePlateComponent } from '../device-plate/scale-plate/scale-plate.component';

import { DeviceService } from '../services/device.service';
import { HelpService } from '../services/help.service';
import { SignalRService } from '../signalr-client/signalr.service';
import { TagsList } from '../tags/tags-list';
//import { InverterPlateComponent } from '../device-plate/inverter-plate/inverter-plate.component';
import { UserService } from '../services/user.service';


@Component({
  selector: 'rottame-interno', // tslint:disable-line
  templateUrl: './rottame-interno.component.html',
  styleUrls: ['rottame-interno.css'],
})
export class RottameInterno implements OnInit {// implements AfterViewInit, OnDestroy {
  isRTL: boolean;

  lightOn: true;
  cmdVisible: boolean = true;
  numberVisible: boolean;


  getFill(silo): string {
    //34.379864(y1): silo vuoto
    //17.991673(y2): silo pieno
    //34.379864(y1) - 17.991673(y2) = 16,388191
    let rValue: number = 34.1;
    switch (silo) {
      //case "4V355":
      //  rValue = (SignalRService.tagList.REAL_PLC_4V355_RD_PERC_ACT.value * 16.388191) / 100;
      //  rValue = 34.1 - +(rValue.toFixed(2));
      //  break;

      default:
        break;
    }
    return rValue.toString();
  }

  getScaleInAlm(name) {
    var rValue = false;//"../../assets/svg/groov/tank_conetop_wgradient.svg";
    switch (name) {
      
      case "S100":
        if (DeviceService.hopperList.S100.InAlarm)
          rValue = true;
        break;

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

  getEstrattoreImg(name): string {
    switch (name) {
      case "AE1":
        if (DeviceService.motorList.AE1A.RUNNING || DeviceService.motorList.AE1B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";

      case "AE2":
        if (DeviceService.motorList.AE2A.RUNNING || DeviceService.motorList.AE2B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";

      default:
        return "../../assets/svg/custom/my_extractor_big.svg";
    }
  }

  //getConvoyerImg(name): string {
  //  switch (name) {
  //    case "BC66":
  //      if (DeviceService.motorList.BC66.RUNNING)
  //        return "../../assets/svg/custom/my-conveyor_1000_green.svg";
  //      else
  //        return "../../assets/svg/custom/my-conveyor_1000.svg";
  //    case "BC52":
  //      if (DeviceService.motorList.BC52.RUNNING)
  //        return "../../assets/svg/custom/my-conveyor_400_green.svg";
  //      else
  //        return "../../assets/svg/custom/my-conveyor_400.svg";
  //    case "BC54":
  //      if (DeviceService.motorList.BC54.RUNNING)
  //        return "../../assets/svg/custom/my-conveyor_240_green.svg";
  //      else
  //        return "../../assets/svg/custom/my-conveyor_240.svg";
  //    case "EL53":
  //      if (DeviceService.motorList.EL53.RUNNING)
  //        return "../../assets/svg/custom/my_elevator_540_green.svg";
  //      else
  //        return "../../assets/svg/custom/my_elevator_540.svg";

  //    default:
  //      return "../../assets/svg/custom/my-conveyor_240.svg";
  //  }
  //}


  showName: boolean = true;

  setRottameLento() {
    //SignalRService.tagList.BOOL_PC_PULS_ROTT_INTERNO_ALTA_VELOCITA.value = false;
    //SignalRService.tagList.BOOL_PC_ALTA_VELOCITA_CATENA_BC400M1.value = false;
    //SignalRService.tagList.BOOL_PC_ALTA_VELOCITA_CATENA_BC401M1.value = false;
    //SignalRService.tagList.BOOL_PC_ALTA_VELOCITA_CATENA_BC402M1.value = false;
  }

  setRottameVeloce() {
    //SignalRService.tagList.BOOL_PC_PULS_ROTT_INTERNO_ALTA_VELOCITA.value = true;
  }

  setRottameFuori() {
      //SignalRService.tagList.BOOL_PC_ROTTAME_INTERNO_IN_AUT_SUL_PIAZZALE.value = true;
  }

  setRottameNastro() {
      //SignalRService.tagList.BOOL_PC_ROTTAME_INTERNO_IN_AUT_SUL_PIAZZALE.value = false;
  }


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

  get hopperList() {
    return DeviceService.hopperList;
  }

  get RottameEsternoState(): string {
    switch (SignalRService.tagList.FDB_STATO_C_R.value) {
      case 0:
        return "NESSUNA OPERAZIONE";
      case 1:
        return "ATTESA MESSA IN SERVIZIO";
      case 2:
        return "CARICAMENTO S1";
      case 3:
        return "CARICAMENTO S2";
      case 4:
        return "PULIZIA SU S1: " + SignalRService.tagList.FDB_CD_PUL_C_R.value + " s";
      case 5:
        return "PULIZIA SU S2: " + SignalRService.tagList.FDB_CD_PUL_C_R.value + " s";

      default:
        return "ERRORE PLC";
    }
  }

  onMAN() {
    try {
      this.userService.logParameterTagValues("Rottame interno: tutto in manuale", SignalRService.tagList.PC_CmdTuttoManRem, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_CmdTuttoManRem.value = true;
  }

  onLOC() {
    try {
      this.userService.logParameterTagValues("Rottame interno: tutto in semiautomatico", SignalRService.tagList.PC_CmdTuttoLoc, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_CmdTuttoLoc.value = true;
  }

  onAUT() {
    try {
      this.userService.logParameterTagValues("Rottame interno: tutto in automatico", SignalRService.tagList.PC_CmdTuttoAutRem, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_CmdTuttoAutRem.value = true;
  }

  onSTART() {
    try {
      this.userService.logParameterTagValues("Rottame interno: start ", SignalRService.tagList.PC_CmdTuttoInReadyAutRem, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_CmdTuttoInReadyAutRem.value = true;
  }

  onSTOP() {
    try {
      this.userService.logParameterTagValues("Rottame interno: stop ", SignalRService.tagList.PC_CmdTuttoInStop, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_CmdTuttoInStop.value = true;
  }

  onMAN_RE() {
    try {
      this.userService.logParameterTagValues("Carico rottame: tutto in manuale", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_MANREM, "true", "", this.appService.user);
    } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_MANREM.value = true;
  }

  onLOC_RE() {
    try {
      this.userService.logParameterTagValues("Carico rottame: tutto in semiautomatico", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_LOC, "true", "", this.appService.user);
    } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_LOC.value = true;
  }

  onAUT_RE() {
    try {
      this.userService.logParameterTagValues("Carico rottame: tutto in automatico", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_AUTREM, "true", "", this.appService.user);
    } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_AUTREM.value = true;
  }

  onSTART_RE() {
    try {
      this.userService.logParameterTagValues("Carico rottame: start ", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_START_AUT, "true", "", this.appService.user);
    } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_START_AUT.value = true;
  }

  onSTOP_RE() {
    try {
      this.userService.logParameterTagValues("Carico rottame: stop ", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_STOP, "true", "", this.appService.user);
    } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_STOP.value = true;
  }


  constructor(public dialog: MatDialog, private layoutService: LayoutService, private userService: UserService, private appService: AppService, public routerService: Router)
  {
    console.log("VALORE B4 Q_ACT:" + SignalRService.tagList.FDB_Q_ACT_B4.value);
    console.log("TIPO DI DATO:" + typeof (SignalRService.tagList.FDB_Q_ACT_B4.value));
    console.log("HOPPERLIST: " + this.scaleList.B4.FDB_PESO_ACT.value + "TIPO: " + typeof (this.scaleList.B4.FDB_PESO_ACT.value))
    //DeviceService.motorList.BC104M1.FWD_TEXT = "R2";
    //DeviceService.motorList.BC104M1.REV_TEXT = "R1";

    //DeviceService.motorList.DV99M1.FWD_TEXT = "TR1";
    //DeviceService.motorList.DV99M1.REV_TEXT = "FUORI";

  }

  openDialog(event): void {

  }

  goToDosaggioTrasporto() {
    this.routerService.navigate(['/dashboard']);
  }

  goToCaricoRottame() {
    this.routerService.navigate(['/carico-rottame']);
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

  openMotorRevDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_MOTOR", "").replace("_REV", "").replace("_FWD", "").replace("_ALM", "");
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

  openHopperDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_PERC", "").replace("FILL_", "").replace("_Weight", "").replace("_Unity", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var hopperDev = DeviceService.hopperList.hoppers.filter(x => x.name == name.toString())[0];
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 400, 330);
      if (hopperDev.name == "T24" || hopperDev.name == "T25") {
        const dialogRef = this.dialog.open(HopperPlateComponent, {
          id: name,
          width: '500px!important',
          data: { hopper: hopperDev },
          hasBackdrop: false,
          position: {
            top: position.top.toString() + 'px', left: position.left.toString() + 'px'
          }
        });
      }
      else {
        const dialogRef = this.dialog.open(HopperPlateComponent, {
          id: name,
          width: '350px!important',
          data: { hopper: hopperDev },
          hasBackdrop: false,
          position: {
            top: position.top.toString() + 'px', left: position.left.toString() + 'px'
          }
        });
      }

    }
  }

  openSiloDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "");
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

  openScaleDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_Unity", "").replace("_Weight", "");
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

}

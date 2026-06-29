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
import { HopperSPlateComponent } from '../device-plate/hoppers-plate/hoppers-plate.component';
import { SiloPlateComponent } from '../device-plate/silo-plate/silo-plate.component';

import { DeviceService } from '../services/device.service';
import { HelpService } from '../services/help.service';
import { SignalRService } from '../signalr-client/signalr.service';
import { TagsList } from '../tags/tags-list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from '../services/user.service';


@Component({
  selector: 'carico-silos', // tslint:disable-line
  templateUrl: './carico-silos.component.html',
  styleUrls: ['carico-silos.css'],
})
export class CaricoSilos implements OnInit {// implements AfterViewInit, OnDestroy {
  isRTL: boolean;

  lightOn: true;
  cmdVisible: boolean = true;
  numberVisible: boolean;


  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  getFill(silo): string {
    //44.038433(y1): silo vuoto
    //21.078468(y2): silo pieno
    //44.038433(y1) - 21.078468(y2) = 22.959965
    let rValue: number = 0;
    switch (silo) {
      case "S3":
        rValue = (DeviceService.siloList.S3.FDB_PERCENTAGE_ACT.value * 22.959965) / 100;
        rValue = 44.038433 - +(rValue.toFixed(2));
        break;
      case "S4":
        rValue = (DeviceService.siloList.S4.FDB_PERCENTAGE_ACT.value * 22.959965) / 100;
        rValue = 44.038433 - +(rValue.toFixed(2));
        break;
      case "S5":
        rValue = (DeviceService.siloList.S5.FDB_PERCENTAGE_ACT.value * 22.959965) / 100;
        rValue = 44.038433 - +(rValue.toFixed(2));
        break;
      case "S6":
        rValue = (DeviceService.siloList.S6.FDB_PERCENTAGE_ACT.value * 22.959965) / 100;
        rValue = 44.038433 - +(rValue.toFixed(2));
        break;
      case "S7":
        rValue = (DeviceService.siloList.S7.FDB_PERCENTAGE_ACT.value * 22.959965) / 100;
        rValue = 44.038433 - +(rValue.toFixed(2));
        break;
    //112.43326(y1): silo vuoto
    //89.473297(y2): silo pieno
    //112.43326(y1) - 89.473297(y2) = 22.959965
      case "S8":
        rValue = (DeviceService.siloList.S8.FDB_PERCENTAGE_ACT.value * 22.959965) / 100;
        rValue = 112.43326 - +(rValue.toFixed(2));
        break;
      case "S9":
        rValue = (DeviceService.siloList.S9.FDB_PERCENTAGE_ACT.value * 22.959965) / 100;
        rValue = 112.43326 - +(rValue.toFixed(2));
        break;
      case "S10":
        rValue = (DeviceService.siloList.S10.FDB_PERCENTAGE_ACT.value * 22.959965) / 100;
        rValue = 112.43326 - +(rValue.toFixed(2));
        break;
      case "S11":
        rValue = (DeviceService.siloList.S11.FDB_PERCENTAGE_ACT.value * 22.959965) / 100;
        rValue = 112.43326 - +(rValue.toFixed(2));
        break;
      case "S12":
        rValue = (DeviceService.siloList.S12.FDB_PERCENTAGE_ACT.value * 22.959965) / 100;
        rValue = 112.43326 - +(rValue.toFixed(2));
        break;

      //case "TF1":
      //  //29.368757(y1): silo vuoto
      //  //17.991673(y2): silo pieno
      //  //29.368757(y1) - 17.991673(y2) = 11,377084
      //  rValue = (DeviceService.hopperList.TF1.FDB_PERCENTAGE_ACT.value * 11.377084) / 100;
      //  rValue = 29.368757 - +(rValue.toFixed(2));
      //  break;
      //case "TF2":
      //  //29.368757(y1): silo vuoto
      //  //17.991673(y2): silo pieno
      //  //29.368757(y1) - 17.991673(y2) = 11,377084
      //  rValue = (DeviceService.hopperList.TF2.FDB_PERCENTAGE_ACT.value * 11.377084) / 100;
      //  rValue = 29.368757 - +(rValue.toFixed(2));
      //  break;

      //case "3V330":
      //  rValue = (SignalRService.tagList.REAL_PLC_3V330_RD_PERC_ACT.value * 21.3) / 100;
      //  rValue = 34 - +(rValue.toFixed(2));
      //  break;
      //case "3V335":
      //  rValue = (SignalRService.tagList.REAL_PLC_3V335_RD_PERC_ACT.value * 21.3) / 100;
      //  rValue = 34 - +(rValue.toFixed(2));
      //  break;

      //case "4V395":
      //  rValue = (SignalRService.tagList.REAL_PLC_4V395_RD_PERC_ACT.value * 23.018748) / 100;
      //  rValue = 34.395832 - +(rValue.toFixed(2));
      //  break;

      default:
        break;
    }
    return rValue.toString();
  }

  //get CaricoSilosState(): string {
  //  switch (SignalRService.tagList.INT_TO_HMI_STATO_CARICO_SABBIA.value) {
  //    case 0:
  //      return "NESSUN CARICO";
  //    case 1:
  //      return "AVVISO MESSA IN SERVIZIO";
  //    case 2:
  //      return "CARICO S1";
  //    case 3:
  //      return "CARICO S2";
  //    case 4:
  //      return "PULIZIA SU S1";
  //    case 5:
  //      return "PULIZIA SU S2";

  //    default:
  //      return "ERRORE PLC";
  //  }
  //}

  onMAN() {
    try {
      this.userService.logParameterTagValues("Carico sabbia: tutto in manuale", SignalRService.tagList.PC_ZONA_CARICO_SILOS_DA_CAMION_MANREM, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_SILOS_DA_CAMION_MANREM.value = true;
  }

  onLOC() {
    try {
      this.userService.logParameterTagValues("Carico sabbia: tutto in locale", SignalRService.tagList.PC_ZONA_CARICO_SILOS_DA_CAMION_LOC, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_SILOS_DA_CAMION_LOC.value = true;
  }

  onAUT() {
    try {
      this.userService.logParameterTagValues("Carico sabbia: tutto in automatico", SignalRService.tagList.PC_ZONA_CARICO_SILOS_DA_CAMION_AUTREM, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_SILOS_DA_CAMION_AUTREM.value = true;
  }

  onSTART() {
    try {
      this.userService.logParameterTagValues("Carico sabbia: start", SignalRService.tagList.PC_ZONA_CARICO_SILOS_DA_CAMION_START_AUT, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_SILOS_DA_CAMION_START_AUT.value = true;
  }

  onSTOP() {
    try {
      this.userService.logParameterTagValues("Carico sabbia: stop", SignalRService.tagList.PC_ZONA_CARICO_SILOS_DA_CAMION_STOP, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_SILOS_DA_CAMION_STOP.value = true;
  }

  async ngOnInit() {
    //DeviceService.motorList.loadMotors();
  }

  //getEstrattoreImg(name): string {
  //  switch (name) {
  //    case "EM46":
  //      if (DeviceService.motorList.EM46A.RUNNING && DeviceService.motorList.EM46B.RUNNING)
  //        return "../../assets/svg/custom/my_extractor_big_green.svg";
  //      else
  //        return "../../assets/svg/custom/my_extractor_big.svg";
  //    case "EM45":
  //      if (DeviceService.motorList.EM45A.RUNNING && DeviceService.motorList.EM45B.RUNNING)
  //        return "../../assets/svg/custom/my_extractor_big_green.svg";
  //      else
  //        return "../../assets/svg/custom/my_extractor_big.svg";
  //    case "EM44":
  //      if (DeviceService.motorList.EM44A.RUNNING && DeviceService.motorList.EM44B.RUNNING)
  //        return "../../assets/svg/custom/my_extractor_big_green.svg";
  //      else
  //        return "../../assets/svg/custom/my_extractor_big.svg";
  //    case "EM43":
  //      if (DeviceService.motorList.EM43A.RUNNING && DeviceService.motorList.EM43B.RUNNING)
  //        return "../../assets/svg/custom/my_extractor_big_green.svg";
  //      else
  //        return "../../assets/svg/custom/my_extractor_big.svg";
  //    case "EM42":
  //      if (DeviceService.motorList.EM42A.RUNNING && DeviceService.motorList.EM42B.RUNNING)
  //        return "../../assets/svg/custom/my_extractor_big_green.svg";
  //      else
  //        return "../../assets/svg/custom/my_extractor_big.svg";
  //    case "EM41":
  //      if (DeviceService.motorList.EM41A.RUNNING && DeviceService.motorList.EM41B.RUNNING)
  //        return "../../assets/svg/custom/my_extractor_big_green.svg";
  //      else
  //        return "../../assets/svg/custom/my_extractor_big.svg";

  //    default:
  //      return "../../assets/svg/custom/my_extractor_big.svg";
  //  }
  //}

  //getConvoyerImg(name): string {
  //  switch (name) {
  //    case "BC46":
  //      if (DeviceService.motorList.BC46.RUNNING)
  //        return "../../assets/svg/custom/my-conveyor_1000_green.svg";
  //      else
  //        return "../../assets/svg/custom/my-conveyor_1000.svg";
  //    case "BC47":
  //      if (DeviceService.motorList.BC47.RUNNING)
  //        return "../../assets/svg/custom/my-conveyor_150_green.svg";
  //      else
  //        return "../../assets/svg/custom/my-conveyor_150.svg";
  //    case "BC49":
  //      if (DeviceService.motorList.BC49.RUNNING)
  //        return "../../assets/svg/custom/my-conveyor_240_green.svg";
  //      else
  //        return "../../assets/svg/custom/my-conveyor_240.svg";
  //    case "EL48":
  //      if (DeviceService.motorList.EL48.RUNNING)
  //        return "../../assets/svg/custom/my_elevator_540_green.svg";
  //      else
  //        return "../../assets/svg/custom/my_elevator_540.svg";

  //    default:
  //      return "../../assets/svg/custom/my-conveyor_240.svg";
  //  }
  //}

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

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService)
  {
    //this.layoutService.toggleCollapsed();
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
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_VALVE", "");
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
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("FILL_", "");
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

  openHopperSDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var hopperSDev = DeviceService.hopperSList.hoppers.filter(x => x.name == name.toString())[0];
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 350, 330);
      const dialogRef = this.dialog.open(HopperSPlateComponent, {
        id: name,
        width: '350px!important',
        data: { hopperS: hopperSDev },
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

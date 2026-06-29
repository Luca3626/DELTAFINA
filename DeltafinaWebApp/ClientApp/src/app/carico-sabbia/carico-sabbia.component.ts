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
import { SettingRComponent } from '../device-plate/settingR-plate/settingR-plate.component';


@Component({
  selector: 'carico-sabbia', // tslint:disable-line
  templateUrl: './carico-sabbia.component.html',
  styleUrls: ['carico-sabbia.css'],
})
export class CaricoSabbia implements OnInit {// implements AfterViewInit, OnDestroy {
  isRTL: boolean;

  lightOn: true;
  cmdVisible: boolean = true;
  numberVisible: boolean;


  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  getBC47M1_x(limit_fwd: boolean): number {
    if (limit_fwd)
      return 358.51041;
    else
      return 358.51041;
  }

  get CaricoSabbiaState(): string {
    switch (SignalRService.tagList.FDB_STATO_C_S.value) {
      case 0:
        return "NESSUN CARICO";
      case 1:
        return "AVVISO MESSA IN SERVIZIO";
      case 2:
        return "CARICO S13";
      case 3:
        return "CARICO S14";
      case 4:
        return "CARICO S15";
      case 5:
        return "CARICO S16";
      case 6:
        return "PULIZIA VERSO S13: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
      case 7:
        return "PULIZIA VERSO S14: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
      case 8:
        return "PULIZIA VERSO S15: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
      case 9:
        return "PULIZIA VERSO S16: " + SignalRService.tagList.FDB_CD_PUL_C_S.value + " s";
      default:
        return "ERRORE PLC";
    }
  }

  onMAN() {
    try {
      this.userService.logParameterTagValues("Carico sabbia: tutto in manuale", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_MANREM, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_SABBIA_MANREM.value = true;
  }

  onLOC() {
    try {
      this.userService.logParameterTagValues("Carico sabbia: tutto in locale", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_LOC, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_SABBIA_LOC.value = true;
  }

  onAUT() {
    try {
      this.userService.logParameterTagValues("Carico sabbia: tutto in automatico", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_AUTREM, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_SABBIA_AUTREM.value = true;
  }

  onSTART() {
    try {
      this.userService.logParameterTagValues("Carico sabbia: start", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_START_AUT, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_SABBIA_START_AUT.value = true;
  }

  onSTOP() {
    try {
      this.userService.logParameterTagValues("Carico sabbia: stop", SignalRService.tagList.PC_ZONA_CARICO_SABBIA_STOP, "true", "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_ZONA_CARICO_SABBIA_STOP.value = true;
  }

  async ngOnInit() {
    //DeviceService.motorList.loadMotors();
  }

  getEstrattoreImg(name): string {
    switch (name) {
      case "AE6":
        if (DeviceService.motorList.AE6A.RUNNING || DeviceService.motorList.AE6B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS155":
        if (DeviceService.motorList.VS155A.RUNNING || DeviceService.motorList.VS155B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS154":
        if (DeviceService.motorList.VS154A.RUNNING || DeviceService.motorList.VS154B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS153":
        if (DeviceService.motorList.VS153A.RUNNING || DeviceService.motorList.VS153B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS152":
        if (DeviceService.motorList.VS152A.RUNNING || DeviceService.motorList.VS152B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS151":
        if (DeviceService.motorList.VS151A.RUNNING || DeviceService.motorList.VS151B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";

      default:
        return "../../assets/svg/custom/my_extractor_big.svg";
    }
  }

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

  get hopperSList() {
    return DeviceService.hopperSList;
  }

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService)
  {
    //this.layoutService.toggleCollapsed();

    //DeviceService.motorList.BC47M1.FWD_TEXT = "S3";
    //DeviceService.motorList.BC47M1.REV_TEXT = "S4";
    //DeviceService.motorList.BC47M1.INVERT_REV_FWD = true;
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

  //openSettingsDialog(event): void {
  //  const dialogRef = this.dialog.open(SettingRComponent, {
  //    width: '350px!important',
  //    data: { title: 'IMPOSTAZIONI CARICO SABBIA' }
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('Dialog chiuso', result);
  //  });
  //}

  openSettingsDialog() {
    this.dialog.open(SettingRComponent, {
      width: '1200px',
      height: '900px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'wide-dialog' ,
      data: { title: 'IMPOSTAZIONI CARICO SABBIA' },
      hasBackdrop: true,
      disableClose: false,
    });
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

  getFill(silo): string {
    //34,395832(y1): silo vuoto
    //11,377084(y2): silo pieno
    //34,395832(y1) - 11,377084(y2) = 23,018748
    let rValue: number = 34.395832;
    switch (silo) {

      case "S13":
        rValue = (DeviceService.siloList.S13.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        console.log("S13 calculated y2:", rValue);
        console.log("Transformation matrix:", document.getElementById("linearGradient_S13").getAttribute("gradientTransform"));
        break;
      case "S14":
        rValue = (DeviceService.siloList.S14.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        console.log("S14 calculated y2:", rValue);
        break;
      case "S15":
        rValue = (DeviceService.siloList.S15.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      case "S16":
        rValue = (DeviceService.siloList.S16.FDB_PERCENTAGE_ACT.value * 23.018748) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        break;
      default:
        break;
    }
    return rValue.toString();
  }

}

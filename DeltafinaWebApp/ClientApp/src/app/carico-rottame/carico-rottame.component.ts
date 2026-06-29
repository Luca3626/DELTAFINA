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
import { HopperRPlateComponent } from '../device-plate/hopperr-plate/hopperr-plate.component';
import { SiloPlateComponent } from '../device-plate/silo-plate/silo-plate.component';
import { SettingRComponent } from '../device-plate/settingR-plate/settingR-plate.component';

import { DeviceService } from '../services/device.service';
import { HelpService } from '../services/help.service';
import { SignalRService } from '../signalr-client/signalr.service';
import { TagsList } from '../tags/tags-list';
//import { InverterPlateComponent } from '../device-plate/inverter-plate/inverter-plate.component';
import { UserService } from '../services/user.service';


@Component({
  selector: 'carico-rottame', // tslint:disable-line
  templateUrl: './carico-rottame.component.html',
  styleUrls: ['carico-rottame.css'],
})
export class CaricoRottame implements OnInit {// implements AfterViewInit, OnDestroy {
  isRTL: boolean;

  lightOn: true;
  cmdVisible: boolean = true;
  numberVisible: boolean;


  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  async ngOnInit() {
    //DeviceService.motorList.loadMotors();
  }

  getBC55M1_x(limit_fwd: boolean): number {
    if (limit_fwd)
      return 383.03125;
    else
      return 377.03125;
  }

  getEstrattoreImg(name): string {
    switch (name) {
      case "VS121":
        if (DeviceService.motorList.VS121A.RUNNING || DeviceService.motorList.VS121B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS122":
        if (DeviceService.motorList.VS122A.RUNNING || DeviceService.motorList.VS122B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS123":
        if (DeviceService.motorList.VS123A.RUNNING || DeviceService.motorList.VS123B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS124":
        if (DeviceService.motorList.VS124A.RUNNING || DeviceService.motorList.VS124B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "VS125":
        if (DeviceService.motorList.VS125A.RUNNING || DeviceService.motorList.VS125B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "AE131":
        if (DeviceService.motorList.AE131A.RUNNING || DeviceService.motorList.AE131B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";
      case "AE3":
        if (DeviceService.motorList.AE3A.RUNNING || DeviceService.motorList.AE3B.RUNNING)
          return "../../assets/svg/custom/my_extractor_big_green.svg";
        else
          return "../../assets/svg/custom/my_extractor_big.svg";

      default:
        return "../../assets/svg/custom/my_extractor_big.svg";
    }
  }

  goToRottameInterno() {
    this.routerService.navigate(['/rottame-interno']);
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

  get hopperRList() {
    return DeviceService.hopperRList;
  }

  get CaricoRottameState(): string {
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
    this.userService.logParameterTagValues("Carico rottame: tutto in manuale", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_MANREM, "true", "", this.appService.user); } catch (e) { }
  SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_MANREM.value = true;
  }

  onLOC() {
    try {
      this.userService.logParameterTagValues("Carico rottame: tutto in locale", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_LOC, "true", "", this.appService.user); } catch (e) { }
  SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_LOC.value = true;
  }

  onAUT() {
    try {
      this.userService.logParameterTagValues("Carico rottame: tutto in automatico", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_AUTREM, "true", "", this.appService.user); } catch (e) { }
  SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_AUTREM.value = true;
  }

  onSTART() {
    try {
      this.userService.logParameterTagValues("Carico rottame: start ", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_START_AUT, "true", "", this.appService.user); } catch (e) { }
  SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_START_AUT.value = true;
  }

  onSTOP() {
    try {
      this.userService.logParameterTagValues("Carico rottame: stop ", SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_STOP, "true", "", this.appService.user); } catch (e) { }
  SignalRService.tagList.PC_ZONA_CARICO_ROTTAMI_ESTERNO_STOP.value = true;
  }

  constructor(public dialog: MatDialog, private layoutService: LayoutService, private userService: UserService, private appService: AppService, public routerService: Router)
  {

    //DeviceService.motorList.BC55M1.FWD_TEXT = "S1";
    //DeviceService.motorList.BC55M1.REV_TEXT = "S2";
    //DeviceService.motorList.BC55M1.INVERT_REV_FWD = true;

  }

  openDialog(event): void {

  }

  getFill(silo): string {
    //34,395832(y1): silo vuoto
    //11,377084(y2): silo pieno
    //34,395832(y1) - 11,377084(y2) = 23,018748
    let rValue: number = 34.395832;
    switch (silo) {

      case "S1":
        rValue = (DeviceService.siloList.S1.FDB_PERCENTAGE_ACT.value * 23.018749) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        console.log("S13 calculated y2:", rValue);
        break;
      case "S2":
        rValue = (DeviceService.siloList.S2.FDB_PERCENTAGE_ACT.value * 23.018749) / 100;
        rValue = 34.395832 - +(rValue.toFixed(2));
        console.log("S14 calculated y2:", rValue);
        break;

    }
    return rValue.toString();
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
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_MOTOR", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var motorDev = DeviceService.motorList.motors.filter(x => x.name == name)[0];
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 400, 330);
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

  openHopperRDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "");
    //var name = event.currentTarget.attributes["id"].value.replace(".", "_");
    if (name != null) {
      var hopperRDev = DeviceService.hopperRList.hoppers.filter(x => x.name == name.toString())[0];
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 350, 330);
      const dialogRef = this.dialog.open(HopperRPlateComponent, {
        id: name,
        width: '350px!important',
        data: { hopperR: hopperRDev },
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

  //openSettingsDialog(event): void {
  //  const dialogRef = this.dialog.open(SettingRComponent, {
  //    width: '350px!important',
  //    data: { title: 'IMPOSTAZIONI CARICO ROTTAME' }
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
      panelClass: 'wide-dialog',
      data: { title: 'IMPOSTAZIONI CARICO ROTTAME' },
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

}

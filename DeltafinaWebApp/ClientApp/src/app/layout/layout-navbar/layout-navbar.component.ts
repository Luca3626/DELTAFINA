import { Component, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { SoundService } from 'src/app/services/sound.service';
import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

import { timer } from 'rxjs';
import { AlarmService } from '../../services/alarm.service';
import { PlcService } from 'src/app/services/plc.service';


@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['layout-navbar.css'],
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent {
  isExpanded = false;
  isRTL: boolean;

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') hostClassMain = true;

  plcStateOk: boolean = true;
  indexAlive: number = 0;
  arrayFilled: boolean = false;
  aliveArray: Array<number> = new Array<number>(12);

  plcVipaStateOk: boolean = true;
  indexAliveVipa: number = 0;
  arrayFilledVipa: boolean = false;
  aliveArrayVipa: Array<number> = new Array<number>(12);

  isSilent: boolean = false;

  getIsAlive(): boolean {
    if (!this.firstTime) {
      if (this.arrayFilled) {
        let previousValue: number = this.aliveArray[0];
        let valueChange: boolean = false;
        if (this.alarmService.plcStateOk && this.requestToPLC_Running) {
          this.aliveArray.forEach(item => {
            if (item != previousValue)
              valueChange = true;
          });
          if (valueChange)
            return true;
          else
            return false;
        }
        else
          return false;
      }
      else
        return false;
    }
    else
      return true;
  }

  getIsAliveVipa(): boolean {
    if (!this.firstTimeVipa) {
      if (this.arrayFilledVipa) {
        let previousValue: number = this.aliveArrayVipa[0];
        let valueChange: boolean = false;
        if (this.alarmService.plcVipaStateOk && this.requestToPLC_Running) {
          this.aliveArrayVipa.forEach(item => {
            if (item != previousValue)
              valueChange = true;
          });
          if (valueChange)
            return true;
          else
            return false;
        }
        else
          return false;
      }
      else
        return false;
    }
    else
      return true;
  }

  requestToPLC_Running: boolean = true;

  firstTime: boolean = true;
  firstTimeVipa: boolean = true;

  get IsOpened(): boolean {
    if (this.signalrService.isOpened)
      return true;
    else
      return false;
  }

  get IsDatabaseOk(): boolean {
    if (this.alarmService.databaseStateOk)
      return true;
    else
      return false;
  }


  constructor(private appService: AppService, private layoutService: LayoutService, public routerService: Router,
    private soundService: SoundService, private alarmService: AlarmService, private signalrService: SignalRService,
    private plcService: PlcService) {
    this.isRTL = appService.isRTL;

    let mytimer = timer(1000, 5000);//300000 (5 minuti), 60000(1 minuto), 1000 (1 secondo)
    mytimer.subscribe(t => {
      this.oberserableTimer(t);
    });
  }

  get IsStatePLC_Ok(): boolean {
    if (this.alarmService.plcStateOk && this.requestToPLC_Running)
      return true;
    else
      return false;
  }

  get IsStatePlcVipa_Ok(): boolean {
    if (this.alarmService.plcVipaStateOk && this.requestToPLC_Running)
      return true;
    else
      return false;
  }

  async oberserableTimer(t) {
    try {
      //OMRON
      this.alarmService.plcStateOk = await this.alarmService.getPlcState("OMRON");
      this.aliveArray[this.indexAlive] = +SignalRService.tagList.FDB_PLC_HEART.value;
      if (this.indexAlive == 11) {
        this.indexAlive = 0;
        this.arrayFilled = true;
        this.firstTime = false;
      }
      else
        this.indexAlive++;

      //S7_300
      this.alarmService.plcVipaStateOk = await this.alarmService.getPlcState("S7_300");
      this.aliveArrayVipa[this.indexAliveVipa] = +SignalRService.tagList.FDB_PLC_HEART_VIPA.value;
      if (this.indexAliveVipa == 11) {
        this.indexAliveVipa = 0;
        this.arrayFilledVipa = true;
        this.firstTimeVipa = false;
      }
      else
        this.indexAliveVipa++;

      this.requestToPLC_Running = true;

      this.alarmService.databaseStateOk = await this.alarmService.getDatabaseState();

    } catch (e) {
      //this.requestToPLC_Running = false;
    }    
  }

  getHours(date: Date) {
    if (date.getHours().toString().length == 1)
      return "0" + date.getHours().toString();
    else
      return date.getHours().toString();
  }

  getMinutes(date: Date) {
    if (date.getMinutes().toString().length == 1)
      return "0" + date.getMinutes().toString();
    else
      return date.getMinutes().toString();
  }

  getHasNewAlarm(value): boolean {
    if (value) {
      this.soundService.playAlarm();
      return true;
    }
    else if (!this.firstTime && (!this.IsStatePLC_Ok || !this.getIsAlive()
      || !this.IsStatePlcVipa_Ok || !this.getIsAliveVipa()
      || !this.IsOpened || !this.IsDatabaseOk)) {
      if (!this.isSilent)
        this.soundService.playAlarm();//Attivo allarme acustico
      else
        this.soundService.stopAlarm();//Disattivo allarme acustico

      return true;
    }
    else {      
      this.soundService.stopAlarm();
      this.isSilent = false;
      return false;
    }
  }

  get TagList() {
    return SignalRService.tagList;
  }

  get UserName() {
    return this.appService.user.name + " " + this.appService.user.surname;
  }

  currentBg(): string {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav(): void {
    this.layoutService.toggleCollapsed();
  }

  goToProfile() {
    this.routerService.navigate(['/users/users-edit/' + this.appService.user.userId]);
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

  onAutoMode() {
    //SignalRService.tagList.BOOL_PC_GLOB_AUTREM.value = true;
  }

  //onManualMode() {
  //  SignalRService.tagList.BOOL_PC_GLOB_MANREM.value = true;
  //}

  onStart() {
    //SignalRService.tagList.BOOL_PC_GLOB_START.value = true;
  }

  //onStop() {
  //  SignalRService.tagList.BOOL_PC_GLOBAL_STOP.value = true;
  //}

  onReset() {
    SignalRService.tagList.PC_RESET_ALLARMI.value = true;//OMRON
    SignalRService.tagList.PC_ResetAllarmi.value = true;//VIPA
    SignalRService.tagList.PC_NEW_ALARM.value = false;
  }

  onSilent() {
    SignalRService.tagList.PC_TACITA_ALLARMI.value = true;
    SignalRService.tagList.PC_NEW_ALARM.value = false;
    this.isSilent = true;
  }

  doLogout() {
    this.appService.user.userId = '1165b310-9eeb-4052-a831-c800e5225d21';
    this.appService.user.portalFarmId = '2b9b9fb3-1d4f-410c-b822-00a669261d29';
    this.appService.user.portalFarmId = '2b9b9fb3-1d4f-410c-b822-00a669261d29';
    this.appService.user.userTypeId = 1;
    this.appService.user.name = "DELTAFINA";
    this.appService.user.surname = "GUEST";
    this.routerService.navigate(['/dashboard']);
  }

  doLogin() {
    this.routerService.navigate(['/auth/login']);
  }

}

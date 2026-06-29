import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../app.service';

//import { UUID } from 'uuid';
import { ARIA_LIVE_DELAY } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';

@Component({
  selector: 'alarms-settings-edit', // tslint:disable-line
  templateUrl: './alarms-settings-edit.component.html',
  styleUrls: [
    '../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-chips/ngx-chips.scss'
  ]
})
export class AlarmsSettingsEditComponent {

  page = 4;

  disabledSP = true;

  name: string = "Mancata comunicazione con quadro pompe di sbrinamento";

  selectZones = [ // tslint:disable
    { value: 'C1', label: 'Cella Ossa', timezone: 'Piano Lavorazione', flag: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
    { value: 'C2', label: 'Area Trasformazione', timezone: 'Piano Lavorazione', flag: 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
    { value: 'C3', label: 'Spogliatoi Uomini', timezone: 'Piano Primo', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' },
    { value: 'C3', label: 'Spogliatoi Donne', timezone: 'Piano Primo', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' }
  ]; // tslint:enable

  selectTags = [ // tslint:disable
    { value: 'C1', label: 'Priorità Alta | Intervenire entro 4 ore', timezone: 'Area Corridoio Trasformazione', flag: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
    { value: 'C2', label: 'Priorità Media | Intervenire entro in giornata', timezone: 'Area Corridoio Trasformazione', flag: 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
    { value: 'C3', label: 'Priorità Bassa | Intervenire entro 3 giorni', timezone: 'Area Corridoio Trasformazione', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' }
  ]; // tslint:enable

  selectUsers = [ // tslint:disable
    { value: 'C1', label: 'Paolo Rossi', timezone: 'Manutentori Elettrici', flag: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
    { value: 'C2', label: 'Mario Bianchi', timezone: 'Manutentori Elettrici', flag: 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
    { value: 'C3', label: 'Giuseppe Vedi', timezone: 'Manutentori Meccanici', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' },
    { value: 'C3', label: 'Lorenzo Rossi', timezone: 'Amministratori', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' },
    { value: 'C3', label: 'Maurizio Bianchi', timezone: 'Uffici', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' }
  ]; // tslint:enable

  items = ['emai_1@email.it', 'emai_2@email.it', 'emai_3@email.it'];

  multipleSelectZoneValue: Array<any>;// = ['C1'];
  multipleSelectTagValue: Array<any>;// = ['C1'];

  multipleSelectUserAlarmON: Array<any>;// = ['C1'];
  multipleSelectUserAlarmOFF: Array<any>;// = ['C1'];

  disabled = false;

  minSPValue = 0;
  maxSPValue = 1000;


  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Fasce orarie Piano Lavorazione | Ricetta Illuminazione PL ';   

  }

  ngOnDestroy() {

  }

  GetIsDisabledSetpoint(idStep): boolean {
    if (idStep == '0')
      return true;
    else
      return false;
  }

  GetSetpointMax(setpointType) {
    if (setpointType == 'Lux')
      return 1000;
    else
      return 100;
  }

  GetSetpointMin() {
    return 0;
  }

  OnStateChange(obj) {
    if (obj.idStep == '0')
      obj.setpoint = 0;
  }

  OnSetpointTypeChange(obj) {
    if (obj.setpointType == '%' && obj.setpoint > 100) 
      obj.setpoint = 100;
  }

  getStringValue(value: any): string {
    if (value.toString().length == 1)
      return "0" + value.toString();
    else
      return value.toString();
  }

  getDays(value: Array<any>): string {
    return value.filter(f => f.selected).map(m => m.name).join(", ");
    //return "";
  }

  checkVisibilitySpecialDays(specialDays: Array<any>): boolean {
    return specialDays.filter(f => f.selected).length > 0;
  }

  getStepName(id): string {
    if (id == "0")
      return "SPENTO";
    else if (id == "1")
      return "ACCESO";
  }

}

//class WorkingItem {
//    constructor(public name: string,
//        public to: string,
//        public days: string);

//}

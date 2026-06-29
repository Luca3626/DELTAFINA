import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlarmService } from 'src/app/services/alarm.service';
import { AlarmSettingModel, AlarmSettingGroupActionModel } from 'src/app/models/alarm.models';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.models';
import { ValueLabelDisableModel } from 'src/app/models/help.models';
import { ZoneService } from 'src/app/services/zone.service';
import { FilterService } from 'src/app/services/filter.service';


@Component({
  selector: 'alarms-settings-list', // tslint:disable-line
  templateUrl: './alarms-settings-list.component.html',
  styleUrls: [
    '../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-chips/ngx-chips.scss'
  ],
  styles: [`
    :host ::ng-deep ngb-accordion .card + .card {
      margin-top: .25rem;
    }
  `]//,
})
export class AlarmsSettingsListComponent {
  isRTL: boolean;

  //selectZones = [ // tslint:disable
  //  { value: 'C1', label: 'Cella Ossa', timezone: 'Piano Lavorazione', flag: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
  //  { value: 'C2', label: 'Area Trasformazione', timezone: 'Piano Lavorazione', flag: 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
  //  { value: 'C3', label: 'Spogliatoi Uomini', timezone: 'Piano Primo', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' },
  //  { value: 'C3', label: 'Spogliatoi Donne', timezone: 'Piano Primo', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' }
  //]; // tslint:enable

  //selectTags = [ // tslint:disable
  //  { value: 'C1', label: 'Priorità Alta | Intervenire entro 4 ore', timezone: 'Area Corridoio Trasformazione', flag: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
  //  { value: 'C2', label: 'Priorità Media | Intervenire entro in giornata', timezone: 'Area Corridoio Trasformazione', flag: 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
  //  { value: 'C3', label: 'Priorità Bassa | Intervenire entro 3 giorni', timezone: 'Area Corridoio Trasformazione', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' }
  //]; // tslint:enable  

  //items = ['emai_1@email.it', 'emai_2@email.it'];

  //multipleSelectZoneValue: Array<any>;// = ['C1'];
  //multipleSelectTagValue: Array<any>;// = ['C1'];

  //multipleSelectUserAlarmON: Array<any>;// = ['C1'];
  //multipleSelectUserAlarmOFF: Array<any>;// = ['C1'];

  disabled = false;

  zones: Array<string> = [];
  originalAlarmData: Array<AlarmSettingModel> = [];
  //alarmData: Array<AlarmSettingModel> = [];
  alarmActionData: AlarmSettingGroupActionModel;
  selectUsers: UserModel[] = [];

  selectZoneTypes: ValueLabelDisableModel[];
  selectZones: any;

  zoneTypeSelected;
  zoneSelected;


  constructor(private http: HttpClient, private appService: AppService, private router: Router, private modalService: NgbModal,
    private alarmService: AlarmService, private userService: UserService, public zoneService: ZoneService, public filterService: FilterService) {
    this.appService.pageTitle = 'Elenco allarmi Impianto| Gestione Allarmi';
    this.isRTL = appService.isRTL;

    this.alarmActionData = new AlarmSettingGroupActionModel();
    this.alarmActionData.alarmNotifyToUserOnAlarmList = new Array<string>();
    this.alarmActionData.alarmNotifyToUserOnResetList = new Array<string>();

    this.loadData();
  }

  // Table

  // Options
  dataUrl = 'assets/json/pages_articles_list.json';
  searchKeys = ['id', 'title'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 20;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  notifyToOnAlarm = [];
  notifyToOnReset = [];

  //articlesData: object[] = [];
  //originalArticlesData: object[] = [];

  async loadData() {
    this.selectUsers = await this.userService.getAll();
    this.selectZoneTypes = await this.zoneService.GetZoneTypeList();
    this.selectZones = await this.zoneService.GetZones();
    await this.onSaveClick();
  }

  async onZoneTypeFilterChange() {
    if (this.zoneTypeSelected != null)
      this.selectZones = await this.zoneService.GetZonesByZoneType(this.zoneTypeSelected);
    else
      this.selectZones = await this.zoneService.GetZones();

    //this.selectPlcs = [];
    //this.selectTags = [];
  }

  async onSaveClick() {

    this.originalAlarmData = await this.alarmService.GetAlarmSettingList();

    this.originalAlarmData = this.originalAlarmData.filter(x => x.textLang != null && x.textLang.length > 0);

    this.selectUsers = await this.userService.getAll();
    
    this.update();

    //this.http.get(this.dataUrl)
    //  .subscribe((data: any) => {
    //    this.originalArticlesData = data.slice(0);
    //    this.update();
    //  });
  }

  //loadData() {
  //  this.http.get(this.dataUrl)
  //    .subscribe((data: any) => {
  //      this.originalArticlesData = data.slice(0);
  //      this.update();
  //    });
  //}

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    //const data = this.filter(this.originalAlarmData);
    const data = this.applyFilters();

    this.totalItems = data.length;

    this.sort(data);
    this.alarmActionData.alarms = this.paginate(data);
  }

  //filter(data) {
  //  const filter = this.filterVal.toLowerCase();
  //  return !filter ?
  //    data.slice(0) :
  //    data.filter(d => {
  //      return Object.keys(d)
  //        .filter(k => this.searchKeys.includes(k))
  //        .map(k => String(d[k]))
  //        .join('|')
  //        .toLowerCase()
  //        .indexOf(filter) !== -1 || !filter;
  //    });
  //}

  sort(data) {
    data.sort((a: any, b: any) => {
      a = typeof (a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof (b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) { return this.sortDesc ? 1 : -1; }
      if (a > b) { return this.sortDesc ? -1 : 1; }
      return 0;
    });
  }

  paginate(data) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  setSort(key) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }

    this.currentPage = 1;
    this.update();
  }

  //onBnNewClick() {
  //  this.router.navigate(['/recipes/lux-pp-edit']);

  //}

  onKey(event: any) {

    if (event.target.name == 'fTextLang')
      this.filterService.alarmSettingFilters.text = event.target.value;
    else if (event.target.name == 'fZone')
      this.filterService.alarmSettingFilters.zone = event.target.value;
    else if (event.target.name == 'fPlcName')
      this.filterService.alarmSettingFilters.plcName = event.target.value;
    else if (event.target.name == 'fTagName')
      this.filterService.alarmSettingFilters.tagName = event.target.value;
    else if (event.target.name == 'fAlarmNotifyToUserOnAlarm')
      this.filterService.alarmSettingFilters.alarmNotifyToUserOnAlarm = event.target.value;
    else if (event.target.name == 'fAlarmNotifyToOnAlarm')
      this.filterService.alarmSettingFilters.alarmNotifyToOnAlarm = event.target.value;
    else if (event.target.name == 'fAlarmNotifyToUserOnReset')
      this.filterService.alarmSettingFilters.alarmNotifyToUserOnReset = event.target.value;
    else if (event.target.name == 'fAlarmNotifyToOnReset')
      this.filterService.alarmSettingFilters.alarmNotifyToOnReset = event.target.value;

    this.update();
  }

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalAlarmData) {

      isOk = true;

      if (this.filterService.alarmSettingFilters.text != null && this.filterService.alarmSettingFilters.text.length > 0 && (c.textLang == null || !c.textLang.toString().toUpperCase().match(this.filterService.alarmSettingFilters.text.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.alarmSettingFilters.zone != null && this.filterService.alarmSettingFilters.zone.length > 0 && (c.zone == null || !c.zone.toString().toUpperCase().match(this.filterService.alarmSettingFilters.zone.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.alarmSettingFilters.plcName != null && this.filterService.alarmSettingFilters.plcName.length > 0 && (c.plcName == null || !c.plcName.toString().toUpperCase().match(this.filterService.alarmSettingFilters.plcName.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.alarmSettingFilters.tagName != null && this.filterService.alarmSettingFilters.tagName.length > 0 && (c.tagName == null || !c.tagName.toString().toUpperCase().match(this.filterService.alarmSettingFilters.tagName.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.alarmSettingFilters.alarmNotifyToUserOnAlarm != null && this.filterService.alarmSettingFilters.alarmNotifyToUserOnAlarm.length > 0 && (c.alarmNotifyToUserOnAlarmList == null || !c.alarmNotifyToUserOnAlarmList.toString().toUpperCase().match(this.filterService.alarmSettingFilters.alarmNotifyToUserOnAlarm.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.alarmSettingFilters.alarmNotifyToOnAlarm != null && this.filterService.alarmSettingFilters.alarmNotifyToOnAlarm.length > 0 && (c.alarmNotifyToOnAlarmList == null || !c.alarmNotifyToOnAlarmList.toString().toUpperCase().match(this.filterService.alarmSettingFilters.alarmNotifyToOnAlarm.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.alarmSettingFilters.alarmNotifyToUserOnReset != null && this.filterService.alarmSettingFilters.alarmNotifyToUserOnReset.length > 0 && (c.alarmNotifyToUserOnResetList == null || !c.alarmNotifyToUserOnResetList.toString().toUpperCase().match(this.filterService.alarmSettingFilters.alarmNotifyToUserOnReset.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.alarmSettingFilters.alarmNotifyToOnReset != null && this.filterService.alarmSettingFilters.alarmNotifyToOnReset.length > 0 && (c.alarmNotifyToOnResetList == null || !c.alarmNotifyToOnResetList.toString().toUpperCase().match(this.filterService.alarmSettingFilters.alarmNotifyToOnReset.toUpperCase()))) {
        isOk = false;
      }

      if (isOk)
        tempArray.push(c);
    }

    return tempArray;
  }

  open(content, options = {}, title, isMan, isOn) {

    //this.modalTitle = title;
    //this.modalIsMan = isMan;
    //this.modalIsOn = isOn;

    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async onSave() {

    this.alarmActionData.alarmNotifyToOnAlarmList = new Array<string>();
    this.notifyToOnAlarm.forEach(x => {
      this.alarmActionData.alarmNotifyToOnAlarmList.push(x.value);
    });

    this.alarmActionData.alarmNotifyToOnResetList = new Array<string>();
    this.notifyToOnReset.forEach(x => {
      this.alarmActionData.alarmNotifyToOnResetList.push(x.value);
    });

    let response: any = await this.alarmService.UpdateAlarmSettings(this.alarmActionData);
    if (response.status == "Success")
      await this.onSaveClick();
    //else
    //  this.showToast("error", response.value, this.MSG_TOAST);
  }

  selectAll: boolean;
  onSelectAll() {
    this.alarmActionData.alarms.forEach(x => {
      x.selected = !this.selectAll;
    });
  }

}

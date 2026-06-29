import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

import { MaintenanceActivityModel } from 'src/app/models/maintenance.models'
import { FilterService } from 'src/app/services/filter.service'
import { MaintenanceService } from 'src/app/services/maintenance.service';


@Component({
  selector: 'planning-list', // tslint:disable-line
  templateUrl: './planning-list.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-chips/ngx-chips.scss'
  ],
  styles: [`
    :host ::ng-deep ngb-accordion .card + .card {
      margin-top: .25rem;
    }
  `]//,
})
export class PlanningListComponent {
  isRTL: boolean;

  constructor(private http: HttpClient, private appService: AppService, private router: Router,
    private maintenanceService: MaintenanceService, public filterService: FilterService) {
    this.appService.pageTitle = 'Lista Siti Produttivi - Pagina';
    this.isRTL = appService.isRTL;
    this.loadData();
  }

  // Filters
  filterVerified = 'Any';
  filterRole = 'Any';
  filterStatus = 'Any';
  filterLatestActivity = [null, null];


  // Table

  // Options
  dataUrl = '/api/maintenances/getlist';
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  activitiesData: MaintenanceActivityModel[] = [];
  originalMaintenancesData: MaintenanceActivityModel[] = [];

  async loadData() {
    this.originalMaintenancesData = await this.maintenanceService.getActivityList();
    this.update();
    //this.http.get(this.dataUrl)
    //  .subscribe((data: any) => {
    //    this.originalMaintenancesData = data.slice(0);
    //    this.update();
    //  });
  }

  update() {
    const data = this.applyFilters();

    this.totalItems = data.length;

    this.sort(data);
    this.activitiesData = this.paginate(data);
  }

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalMaintenancesData) {

      isOk = true;

      if (this.filterService.maintenanceActivityFilters.description != null && this.filterService.maintenanceActivityFilters.description.length > 0 && (c.description == null || !c.description.toString().toUpperCase().match(this.filterService.maintenanceActivityFilters.description.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.maintenanceActivityFilters.state != null && this.filterService.maintenanceActivityFilters.state.length > 0 && (c.state == null || !c.state.toString().toUpperCase().match(this.filterService.maintenanceActivityFilters.state.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.maintenanceActivityFilters.fromDate != null && this.filterService.maintenanceActivityFilters.fromDate.length > 0 && (c.fromDate == null || !c.fromDate.toString().toUpperCase().match(this.filterService.maintenanceActivityFilters.fromDate.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.maintenanceActivityFilters.toDate != null && this.filterService.maintenanceActivityFilters.toDate.length > 0 && (c.toDate == null || !c.toDate.toString().toUpperCase().match(this.filterService.maintenanceActivityFilters.toDate.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.maintenanceActivityFilters.repetitionType != null && this.filterService.maintenanceActivityFilters.repetitionType.length > 0 && (c.repetitionType == null || !c.repetitionType.toString().toUpperCase().match(this.filterService.maintenanceActivityFilters.repetitionType.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.maintenanceActivityFilters.adviseType != null && this.filterService.maintenanceActivityFilters.adviseType.length > 0 && (c.adviseType == null || !c.adviseType.toString().toUpperCase().match(this.filterService.maintenanceActivityFilters.adviseType.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.maintenanceActivityFilters.users != null && this.filterService.maintenanceActivityFilters.users.length > 0 && (c.users == null || !c.users.toString().toUpperCase().match(this.filterService.maintenanceActivityFilters.users.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.maintenanceActivityFilters.contacts != null && this.filterService.maintenanceActivityFilters.contacts.length > 0 && (c.contacts == null || !c.contacts.toString().toUpperCase().match(this.filterService.maintenanceActivityFilters.contacts.toUpperCase()))) {
        isOk = false;
      }

      if (isOk)
        tempArray.push(c);
    }

    return tempArray;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  onKey(event: any) {

    if (event.target.name == 'fDescription')
      this.filterService.maintenanceActivityFilters.description = event.target.value;
    else if (event.target.name == 'fState')
      this.filterService.maintenanceActivityFilters.state = event.target.value;
    else if (event.target.name == 'fFromDate')
      this.filterService.maintenanceActivityFilters.fromDate = event.target.value;
    else if (event.target.name == 'fToDate')
      this.filterService.maintenanceActivityFilters.toDate = event.target.value;
    else if (event.target.name == 'fRepetitionType')
      this.filterService.maintenanceActivityFilters.repetitionType = event.target.value;
    else if (event.target.name == 'fAdviseType')
      this.filterService.maintenanceActivityFilters.adviseType = event.target.value;
    else if (event.target.name == 'fUsers')
      this.filterService.maintenanceActivityFilters.users = event.target.value;
    else if (event.target.name == 'fContacts')
      this.filterService.maintenanceActivityFilters.contacts = event.target.value;

    this.update();
  }

  //update() {
  //  const data = this.filter(this.originalMaintenancesData);

  //  this.totalItems = data.length;

  //  this.sort(data);
  //  this.activitiesData = this.paginate(data);
  //}

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

  sort(data: any) {
    data.sort((a: any, b: any) => {
      a = typeof (a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof (b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) { return this.sortDesc ? 1 : -1; }
      if (a > b) { return this.sortDesc ? -1 : 1; }
      return 0;
    });
  }

  paginate(data: any) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  setSort(key: any) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }

    this.currentPage = 1;
    this.applyFilters();
  }

  onBnNewClick() {
    this.router.navigate(['/planning/edit']);
  }

  open(item: any) {
    this.router.navigate(['/planning/edit/' + item.id]);
  }

  public removeFilters() {
    this.filterService.resetMaintenanceActivityFilters();

    this.update();
  }

  formatDate(value: string): string {
    if (value) {
      let dt: Date = new Date(value);
      return this.formatDateItem(dt.getDate().toString()) + "-" + this.formatDateItem((dt.getMonth() + 1).toString()) + "-" + dt.getFullYear().toString()
        + " " + this.formatDateItem(dt.getHours().toString()) + ":" + this.formatDateItem(dt.getMinutes().toString());
    }
  }
  formatDateItem(value: string): string {
    if (value && value.length == 1)
      return "0" + value;
    else
      return value;
  }

}















//  isRTL: boolean;

//  selectZones = [ // tslint:disable
//    { value: 'C1', label: 'Cella Ossa', timezone: 'Piano Lavorazione', flag: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
//    { value: 'C2', label: 'Area Trasformazione', timezone: 'Piano Lavorazione', flag: 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
//    { value: 'C3', label: 'Spogliatoi Uomini', timezone: 'Piano Primo', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' },
//    { value: 'C3', label: 'Spogliatoi Donne', timezone: 'Piano Primo', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' }
//  ]; // tslint:enable

//  selectTags = [ // tslint:disable
//    { value: 'C1', label: 'Priorità Alta | Intervenire entro 4 ore', timezone: 'Area Corridoio Trasformazione', flag: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
//    { value: 'C2', label: 'Priorità Media | Intervenire entro in giornata', timezone: 'Area Corridoio Trasformazione', flag: 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
//    { value: 'C3', label: 'Priorità Bassa | Intervenire entro 3 giorni', timezone: 'Area Corridoio Trasformazione', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' }
//  ]; // tslint:enable

//  selectUsers = [ // tslint:disable
//    { value: 'C1', label: 'Paolo Rossi', timezone: 'Manutentori Elettrici', flag: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
//    { value: 'C2', label: 'Mario Bianchi', timezone: 'Manutentori Elettrici', flag: 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
//    { value: 'C3', label: 'Giuseppe Vedi', timezone: 'Manutentori Meccanici', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' },
//    { value: 'C3', label: 'Lorenzo Rossi', timezone: 'Amministratori', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' },
//    { value: 'C3', label: 'Maurizio Bianchi', timezone: 'Uffici', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' }
//  ]; // tslint:enable

//  items = ['emai_1@email.it', 'emai_2@email.it'];

//  multipleSelectZoneValue: Array<any>;// = ['C1'];
//  multipleSelectTagValue: Array<any>;// = ['C1'];

//  multipleSelectUserAlarmON: Array<any>;// = ['C1'];
//  multipleSelectUserAlarmOFF: Array<any>;// = ['C1'];

//  constructor(private http: HttpClient, private appService: AppService, private router: Router, private modalService: NgbModal) {
//    this.appService.pageTitle = 'Elenco allarmi Impianto| Gestione Allarmi';
//    this.isRTL = appService.isRTL;
//    this.loadData();
//  }

//  // Table

//  // Options
//  dataUrl = 'assets/json/pages_articles_list.json';
//  searchKeys = ['id', 'title'];
//  sortBy = 'id';
//  sortDesc = true;
//  perPage = 10;

//  filterVal = '';
//  currentPage = 1;
//  totalItems = 0;

//  articlesData: object[] = [];
//  originalArticlesData: object[] = [];

//  loadData() {
//    this.http.get(this.dataUrl)
//      .subscribe((data: any) => {
//        this.originalArticlesData = data.slice(0);
//        this.update();
//      });
//  }

//  get totalPages() {
//    return Math.ceil(this.totalItems / this.perPage);
//  }

//  update() {
//    const data = this.filter(this.originalArticlesData);

//    this.totalItems = data.length;

//    this.sort(data);
//    this.articlesData = this.paginate(data);
//  }

//  filter(data) {
//    const filter = this.filterVal.toLowerCase();
//    return !filter ?
//      data.slice(0) :
//      data.filter(d => {
//        return Object.keys(d)
//          .filter(k => this.searchKeys.includes(k))
//          .map(k => String(d[k]))
//          .join('|')
//          .toLowerCase()
//          .indexOf(filter) !== -1 || !filter;
//      });
//  }

//  sort(data) {
//    data.sort((a: any, b: any) => {
//      a = typeof (a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
//      b = typeof (b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

//      if (a < b) { return this.sortDesc ? 1 : -1; }
//      if (a > b) { return this.sortDesc ? -1 : 1; }
//      return 0;
//    });
//  }

//  paginate(data) {
//    const perPage = parseInt(String(this.perPage), 10);
//    const offset = (this.currentPage - 1) * perPage;

//    return data.slice(offset, offset + perPage);
//  }

//  setSort(key) {
//    if (this.sortBy !== key) {
//      this.sortBy = key;
//      this.sortDesc = false;
//    } else {
//      this.sortDesc = !this.sortDesc;
//    }

//    this.currentPage = 1;
//    this.update();
//  }

//  onBnNewClick() {
//    this.router.navigate(['/planning/edit']);

//  }

//  onKey(event: any) {

//    //this.totalAmountOrder = 0;

//    //if (event.target.name == 'fCode')
//    //  this.filterService.ordersFilters.code = event.target.value;
//    //else if (event.target.name == 'fDateOrder')
//    //  this.filterService.ordersFilters.dateOrder = event.target.value;
//    //else if (event.target.name == 'fOrderPurpose')
//    //  this.filterService.ordersFilters.orderPurpose = event.target.value;
//    //else if (event.target.name == 'fSupplier')
//    //  this.filterService.ordersFilters.supplier = event.target.value;
//    //else if (event.target.name == 'fCustomer')
//    //  this.filterService.ordersFilters.customer = event.target.value;
//    //else if (event.target.name == 'fJobCode')
//    //  this.filterService.ordersFilters.jobCode = event.target.value;
//    //else if (event.target.name == 'fContractCode')
//    //  this.filterService.ordersFilters.contractCode = event.target.value;
//    //else if (event.target.name == 'fJobDescription')
//    //  this.filterService.ordersFilters.jobDescription = event.target.value;
//    //else if (event.target.name == 'fDetails')
//    //  this.filterService.ordersFilters.details = event.target.value;
//    //else if (event.target.name == 'fAmountOrder')
//    //  this.filterService.ordersFilters.amountOrder = event.target.value;
//    //else if (event.target.name == 'fOrderState')
//    //  this.filterService.ordersFilters.orderState = event.target.value;

//    //this.applyFilters();
//  }

//  applyFilters() {
//    //let tempArray: Array<any> = [];
//    //let isOk: boolean;
//    //for (let c of this.singleData) {

//    //  isOk = true;

//    //  if (this.filterService.ordersFilters.code != null && this.filterService.ordersFilters.code.length > 0 && !c.code.toString().toUpperCase().match(this.filterService.ordersFilters.code.toUpperCase())) {
//    //    isOk = false;
//    //  }
//    //  if (this.filterService.ordersFilters.dateOrder != null && this.filterService.ordersFilters.dateOrder.length > 0 && !this.formatDate(c.dateOrder).toUpperCase().match(this.filterService.ordersFilters.dateOrder.toUpperCase())) {
//    //    isOk = false;
//    //  }
//    //  if (this.filterService.ordersFilters.orderPurpose != null && this.filterService.ordersFilters.orderPurpose.length > 0 && !c.orderPurpose.toString().toUpperCase().match(this.filterService.ordersFilters.orderPurpose.toUpperCase())) {
//    //    isOk = false;
//    //  }
//    //  if (this.filterService.ordersFilters.supplier != null && this.filterService.ordersFilters.supplier.length > 0 && (c.supplier == null || !c.supplier.toString().toUpperCase().match(this.filterService.ordersFilters.supplier.toUpperCase()))) {
//    //    isOk = false;
//    //  }
//    //  if (this.filterService.ordersFilters.customer != null && this.filterService.ordersFilters.customer.length > 0 && (c.customer == null || !c.customer.toString().toUpperCase().match(this.filterService.ordersFilters.customer.toUpperCase()))) {
//    //    isOk = false;
//    //  }
//    //  if (this.filterService.ordersFilters.jobCode != null && this.filterService.ordersFilters.jobCode.length > 0 && (c.jobCode == null || !c.jobCode.toString().toUpperCase().match(this.filterService.ordersFilters.jobCode.toUpperCase()))) {
//    //    isOk = false;
//    //  }
//    //  if (this.filterService.ordersFilters.contractCode != null && this.filterService.ordersFilters.contractCode.length > 0 && (c.contractCode == null || !c.contractCode.toString().toUpperCase().match(this.filterService.ordersFilters.contractCode.toUpperCase()))) {
//    //    isOk = false;
//    //  }
//    //  if (this.filterService.ordersFilters.jobDescription != null && this.filterService.ordersFilters.jobDescription.length > 0 && (c.jobDescription == null || !c.jobDescription.toString().toUpperCase().match(this.filterService.ordersFilters.jobDescription.toUpperCase()))) {
//    //    isOk = false;
//    //  }
//    //  if (this.filterService.ordersFilters.details != null && this.filterService.ordersFilters.details.length > 0 && (c.details == null || !c.details.toString().toUpperCase().match(this.filterService.ordersFilters.details.toUpperCase()))) {
//    //    isOk = false;
//    //  }
//    //  if (this.filterService.ordersFilters.amountOrder != null && this.filterService.ordersFilters.amountOrder.length > 0 && !c.amountOrder.toString().toUpperCase().match(this.filterService.ordersFilters.amountOrder.toUpperCase())) {
//    //    isOk = false;
//    //  }
//    //  if (this.filterService.ordersFilters.orderState != null && this.filterService.ordersFilters.orderState.length > 0 && !c.orderState.toString().toUpperCase().match(this.filterService.ordersFilters.orderState.toUpperCase())) {
//    //    isOk = false;
//    //  }

//    //  if (isOk) {
//    //    tempArray.push(c);
//    //    this.totalAmountOrder += c.amountOrder;
//    //  }
//    //}

//    //this.singleDatafiltered = tempArray;
//  }

//  open(content, options = {}, title, isMan, isOn) {

//    //this.modalTitle = title;
//    //this.modalIsMan = isMan;
//    //this.modalIsOn = isOn;

//    this.modalService.open(content, options).result.then((result) => {
//      console.log(`Closed with: ${result}`);
//    }, (reason) => {
//      console.log(`Dismissed ${this.getDismissReason(reason)}`);
//    });
//  }

//  private getDismissReason(reason: any): string {
//    if (reason === ModalDismissReasons.ESC) {
//      return 'by pressing ESC';
//    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//      return 'by clicking on a backdrop';
//    } else {
//      return `with: ${reason}`;
//    }
//  }

//}

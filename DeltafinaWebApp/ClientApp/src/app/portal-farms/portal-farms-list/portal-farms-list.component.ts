import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

import { PortalFarmModel } from '../../models/portal-farm.models'
import { FilterService } from '../../services/filter.service'
import { PortalFarmService } from 'src/app/services/portal-farm.service';

@Component({
  selector: 'app-portal-farms-list',
  templateUrl: './portal-farms-list.component.html'
})
export class PortalFarmsListComponent {
  isRTL: boolean;

  constructor(private http: HttpClient, private appService: AppService, private router: Router,
    private portalFarmService: PortalFarmService, public filterService: FilterService) {
    this.appService.pageTitle = 'Lista Aziende - Pagina';
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
  dataUrl = '/api/portalFarms/getlist';
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  portalFarmsData: PortalFarmModel[] = [];
  originalPortalFarmsData: PortalFarmModel[] = [];

  async loadData() {
    this.originalPortalFarmsData = await this.portalFarmService.getAll();
    this.update();
    //this.http.get(this.dataUrl)
    //  .subscribe((data: any) => {
    //    this.originalPortalFarmsData = data.slice(0);
    //    this.update();
    //  });
  }

  update() {
    const data = this.applyFilters();

    this.totalItems = data.length;

    this.sort(data);
    this.portalFarmsData = this.paginate(data);
  }

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalPortalFarmsData) {

      isOk = true;

      if (this.filterService.portalFarmFilters.code != null && this.filterService.portalFarmFilters.code.length > 0 && (c.code == null || !c.code.toString().toUpperCase().match(this.filterService.portalFarmFilters.code.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.portalFarmFilters.name != null && this.filterService.portalFarmFilters.name.length > 0 && (c.name == null || !c.name.toString().toUpperCase().match(this.filterService.portalFarmFilters.name.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.portalFarmFilters.taxCode != null && this.filterService.portalFarmFilters.taxCode.length > 0 && (c.taxCode == null || !c.taxCode.toString().toUpperCase().match(this.filterService.portalFarmFilters.taxCode.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.portalFarmFilters.vat != null && this.filterService.portalFarmFilters.vat.length > 0 && (c.vat == null || !c.vat.toString().toUpperCase().match(this.filterService.portalFarmFilters.vat.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.portalFarmFilters.email != null && this.filterService.portalFarmFilters.email.length > 0 && (c.email == null || !c.email.toString().toUpperCase().match(this.filterService.portalFarmFilters.email.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.portalFarmFilters.mobile != null && this.filterService.portalFarmFilters.mobile.length > 0 && (c.mobile == null || !c.mobile.toString().toUpperCase().match(this.filterService.portalFarmFilters.mobile.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.portalFarmFilters.city != null && this.filterService.portalFarmFilters.city.length > 0 && (c.city == null || !c.city.toString().toUpperCase().match(this.filterService.portalFarmFilters.city.toUpperCase()))) {
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

    if (event.target.name == 'fCode')
      this.filterService.portalFarmFilters.code = event.target.value;
    else if (event.target.name == 'fName')
      this.filterService.portalFarmFilters.name = event.target.value;
    else if (event.target.name == 'fTaxCode')
      this.filterService.portalFarmFilters.taxCode = event.target.value;
    else if (event.target.name == 'fVat')
      this.filterService.portalFarmFilters.vat = event.target.value;
    else if (event.target.name == 'fEmail')
      this.filterService.portalFarmFilters.email = event.target.value;
    else if (event.target.name == 'fPhone')
      this.filterService.portalFarmFilters.phone = event.target.value;
    else if (event.target.name == 'fMobile')
      this.filterService.portalFarmFilters.mobile = event.target.value;
    else if (event.target.name == 'fCity')
      this.filterService.portalFarmFilters.city = event.target.value;

    this.update();
  }

  //update() {
  //  const data = this.filter(this.originalPortalFarmsData);

  //  this.totalItems = data.length;

  //  this.sort(data);
  //  this.portalFarmsData = this.paginate(data);
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
      a = typeof(a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof(b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

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
    this.router.navigate(['/portal-farms/portal-farms-edit']);
  }

  open(item: any) {
    this.router.navigate(['/portal-farms/portal-farms-edit/' + item.id]);
  }

  select(item: PortalFarmModel) {
    this.appService.user.portalFarmId = item.id;
    this.appService.user.portalFarm = item.name;
    this.router.navigate(['/']);
  }

  public removeFilters() {
    this.filterService.resetPortalFarmFilters();

    this.update();
  }

}

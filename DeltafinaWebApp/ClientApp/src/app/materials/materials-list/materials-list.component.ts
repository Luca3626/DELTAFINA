import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

import { MaterialModel } from '../../models/material.models'
import { FilterService } from '../../services/filter.service'
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html'
})
export class MaterialsListComponent {
  isRTL: boolean;

  constructor(private http: HttpClient, private appService: AppService, private router: Router,
    private materialService: MaterialService, public filterService: FilterService) {
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
  dataUrl = '/api/materials/getlist';
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 50;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  materialsData: MaterialModel[] = [];
  originalmaterialsData: MaterialModel[] = [];

  async loadData() {
    this.originalmaterialsData = await this.materialService.getAll();
    this.update();
    //this.http.get(this.dataUrl)
    //  .subscribe((data: any) => {
    //    this.originalmaterialsData = data.slice(0);
    //    this.update();
    //  });
  }

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalmaterialsData) {

      isOk = true;

      if (this.filterService.materialFilters.code != null && this.filterService.materialFilters.code.length > 0 && (c.code == null || !c.code.toString().toUpperCase().match(this.filterService.materialFilters.code.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.materialFilters.name != null && this.filterService.materialFilters.name.length > 0 && (c.name == null || !c.name.toString().toUpperCase().match(this.filterService.materialFilters.name.toUpperCase()))) {
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
      this.filterService.materialFilters.code = event.target.value;
    else if (event.target.name == 'fName')
      this.filterService.materialFilters.name = event.target.value;

    this.update();
  }

  update() {
    const data = this.applyFilters();

    this.totalItems = data.length;

    //this.sort(data);
    this.materialsData = this.paginate(data);
  }

  //update() {
  //  const data = this.filter(this.originalmaterialsData);

  //  this.totalItems = data.length;

  //  this.sort(data);
  //  this.materialsData = this.paginate(data);
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
    this.router.navigate(['/materials/materials-edit']);
  }

  open(item: any) {
    this.router.navigate(['/materials/materials-edit/' + item.id]);
  }

  public removeFilters() {
    this.filterService.resetMaterialFilters();

    this.update();
  }

}

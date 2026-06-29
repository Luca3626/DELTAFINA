import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

import { SiloModel } from '../../models/warehouse/silo.models'
import { FilterService } from '../../services/filter.service'
import { SiloService } from 'src/app/services/silo.service';

@Component({
  selector: 'app-silos-list',
  templateUrl: './silos-list.component.html'
})
export class SilosListComponent {
  isRTL: boolean;

  constructor(private http: HttpClient, private appService: AppService, private router: Router,
    private siloService: SiloService, public filterService: FilterService) {
    this.appService.pageTitle = 'Lista Silos';
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
  dataUrl = '/api/silos/getlist';
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 50;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  silosData: SiloModel[] = [];
  originalsilosData: SiloModel[] = [];

  async loadData() {
    this.originalsilosData = await this.siloService.getAll();
    this.update();
    //this.http.get(this.dataUrl)
    //  .subscribe((data: any) => {
    //    this.originalsilosData = data.slice(0);
    //    this.update();
    //  });
  }

  update() {
    const data = this.applyFilters();

    this.totalItems = data.length;

    //this.sort(data);
    this.silosData = this.paginate(data);
  }

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalsilosData) {

      isOk = true;

      if (this.filterService.siloFilters.code != null && this.filterService.siloFilters.code.length > 0 && (c.code == null || !c.code.toString().toUpperCase().match(this.filterService.siloFilters.code.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.siloFilters.name != null && this.filterService.siloFilters.name.length > 0 && (c.name == null || !c.name.toString().toUpperCase().match(this.filterService.siloFilters.name.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.siloFilters.materialCode != null && this.filterService.siloFilters.materialCode.length > 0 && (c.materialCode == null || !c.materialCode.toString().toUpperCase().match(this.filterService.siloFilters.materialCode.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.siloFilters.material != null && this.filterService.siloFilters.material.length > 0 && (c.material == null || !c.material.toString().toUpperCase().match(this.filterService.siloFilters.material.toUpperCase()))) {
        isOk = false;
      }

      if (isOk)
        tempArray.push(c);
    }

    return tempArray;
  }

  //get totalPages() {
  //  return Math.ceil(this.totalItems / this.perPage);
  //}

  onKey(event: any) {

    if (event.target.name == 'fCode')
      this.filterService.siloFilters.code = event.target.value;
    else if (event.target.name == 'fName')
      this.filterService.siloFilters.name = event.target.value;
    else if (event.target.name == 'fMaterialCode')
      this.filterService.siloFilters.materialCode = event.target.value;
    else if (event.target.name == 'fMaterial')
      this.filterService.siloFilters.material = event.target.value;

    this.update();
  }

  //update() {
  //  const data = this.filter(this.originalsilosData);

  //  this.totalItems = data.length;

  //  this.sort(data);
  //  this.silosData = this.paginate(data);
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
    this.router.navigate(['/silos/silos-edit']);
  }

  open(item: any) {
    this.router.navigate(['/silos/silos-edit/' + item.id]);
  }

  public removeFilters() {
    this.filterService.resetSiloFilters();

    this.update();
  }

}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

import { TrendService } from 'src/app/services/trend.service';
import { FilterService } from 'src/app/services/filter.service';
import { TrendModel } from 'src/app/models/trend.models';


@Component({
  selector: 'trend-list', // tslint:disable-line
  templateUrl: './trend-list.component.html'
})
export class TrendListComponent {
  isRTL: boolean;

  constructor(private http: HttpClient, private appService: AppService, private router: Router, private trendService: TrendService, public filterService: FilterService) {
    this.appService.pageTitle = 'Lista Trend | Data Log';
    this.isRTL = appService.isRTL;
    this.loadData();
  }

  // Table

  // Options
  dataUrl = 'assets/json/pages_articles_list.json';
  searchKeys = ['id', 'title'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 50;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  trendsData: TrendModel[] = [];
  originalTrendsData: TrendModel[] = [];

  async loadData() {

    this.originalTrendsData = await this.trendService.GetTrends();
    this.update();

    //this.http.get(this.dataUrl)
    //  .subscribe((data: any) => {
    //    this.originalArticlesData = data.slice(0);
    //    this.update();
    //  });
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    //const data = this.filter(this.originalTrendsData);
    const data = this.applyFilters();

    this.totalItems = data.length;

    this.sort(data);
    this.trendsData = this.paginate(data);
  }

  filter(data) {
    const filter = this.filterVal.toLowerCase();
    return !filter ?
      data.slice(0) :
      data.filter(d => {
        return Object.keys(d)
          .filter(k => this.searchKeys.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(filter) !== -1 || !filter;
      });
  }

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

  onBnNewClick() {
    this.router.navigate(['/trend/trend-edit']);

  }

  onRowClick(item: any) {
    //this.router.navigate(['/trends/trend-edit/' + item.id]);
  }

  onKey(event: any) {

    if (event.target.name == 'fTagLogName')
      this.filterService.trendFilters.tagLogName = event.target.value;
    else if (event.target.name == 'fZoneName')
      this.filterService.trendFilters.zoneName = event.target.value;
    else if (event.target.name == 'fPlcName')
      this.filterService.trendFilters.plcName = event.target.value;
    else if (event.target.name == 'fTagPlcName')
      this.filterService.trendFilters.tagPlcName = event.target.value;
    else if (event.target.name == 'fDescription')
      this.filterService.trendFilters.description = event.target.value;
    else if (event.target.name == 'fTimeCycleForSave')
      this.filterService.trendFilters.timeCycleForSave = event.target.value;
    else if (event.target.name == 'fCountCycleForSave')
      this.filterService.trendFilters.countCycleForSave = event.target.value;
    else if (event.target.name == 'fEnabled')
      this.filterService.trendFilters.enabled = event.target.value;
    else if (event.target.name == 'fLastLog')
      this.filterService.trendFilters.lastLog = event.target.value;
    else if (event.target.name == 'fValueType')
      this.filterService.trendFilters.valueType = event.target.value;
    else if (event.target.name == 'fUnit')
      this.filterService.trendFilters.unit = event.target.value;

    this.update();
  }

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalTrendsData) {

      isOk = true;

      if (this.filterService.trendFilters.tagLogName != null && this.filterService.trendFilters.tagLogName.length > 0 && (c.tagLogName == null || !c.tagLogName.toString().toUpperCase().match(this.filterService.trendFilters.tagLogName.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.trendFilters.zoneName != null && this.filterService.trendFilters.zoneName.length > 0 && (c.zoneName == null || !c.zoneName.toString().toUpperCase().match(this.filterService.trendFilters.zoneName.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.trendFilters.plcName != null && this.filterService.trendFilters.plcName.length > 0 && (c.plcName == null || !c.plcName.toString().toUpperCase().match(this.filterService.trendFilters.plcName.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.trendFilters.tagPlcName != null && this.filterService.trendFilters.tagPlcName.length > 0 && (c.tagPlcName == null || !c.tagPlcName.toString().toUpperCase().match(this.filterService.trendFilters.tagPlcName.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.trendFilters.description != null && this.filterService.trendFilters.description.length > 0 && (c.description == null || !c.description.toString().toUpperCase().match(this.filterService.trendFilters.description.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.trendFilters.timeCycleForSave != null && this.filterService.trendFilters.timeCycleForSave.length > 0 && (c.timeCycleForSave == null || !c.timeCycleForSave.toString().toUpperCase().match(this.filterService.trendFilters.timeCycleForSave.toUpperCase()))) {
        isOk = false;
      }
      //if (this.filterService.trendFilters.countCycleForSave != null && this.filterService.trendFilters.countCycleForSave.length > 0 && (c.countCycleForSave == null || !c.countCycleForSave.toString().toUpperCase().match(this.filterService.trendFilters.countCycleForSave.toUpperCase()))) {
      //  isOk = false;
      //}
      if (this.filterService.trendFilters.enabled != null && this.filterService.trendFilters.enabled.length > 0 && (c.enabled == null || !c.enabled.toString().toUpperCase().match(this.filterService.trendFilters.enabled.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.trendFilters.lastLog != null && this.filterService.trendFilters.lastLog.length > 0 && (c.lastLog == null || !c.lastLog.toString().toUpperCase().match(this.filterService.trendFilters.lastLog.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.trendFilters.valueType != null && this.filterService.trendFilters.valueType.length > 0 && (c.valueType == null || !c.valueType.toString().toUpperCase().match(this.filterService.trendFilters.valueType.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.trendFilters.unit != null && this.filterService.trendFilters.unit.length > 0 && (c.unit == null || !c.unit.toString().toUpperCase().match(this.filterService.trendFilters.unit.toUpperCase()))) {
        isOk = false;
      }

      if (isOk)
        tempArray.push(c);
    }

    return tempArray;
  }

  public removeFilters() {
    this.filterService.resetTrendFilters();

    this.update();
  }

}

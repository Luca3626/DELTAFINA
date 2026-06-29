import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

import { FilterService } from 'src/app/services/filter.service';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsClient } from '../../tags/tags-client';


@Component({
  selector: 'tag-list', // tslint:disable-line
  templateUrl: './tag-list.component.html'
})
export class TagListComponent {
  isRTL: boolean;

  constructor(private http: HttpClient, private appService: AppService, private router: Router, public filterService: FilterService) {
    this.appService.pageTitle = 'Lista Tag | Data Log';
    this.isRTL = appService.isRTL;
    this.loadData();
  }

  // Table

  // Options
  dataUrl = 'assets/json/pages_articles_list.json';
  searchKeys = ['id', 'title'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 100;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  tagsData: TagsClient[] = [];
  originalTagsData: TagsClient[] = [];

  loadData() {

    this.originalTagsData = SignalRService.tagList.list;
    //this.originalTagsData = this.originalTagsData.concat(SignalRService.tagListQCCT.list);
 
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

    this.sortBy == 'id';
    this.sortDesc = false;
    this.sort(data);
    this.tagsData = this.paginate(data);
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

    if (event.target.name == 'fId')
      this.filterService.tagClientFilters.id = event.target.value;
    else if (event.target.name == 'fName')
      this.filterService.tagClientFilters.name = event.target.value;
    else if (event.target.name == 'fAddress')
      this.filterService.tagClientFilters.address = event.target.value;
    else if (event.target.name == 'fPlcName')
      this.filterService.tagClientFilters.plcName = event.target.value;
    else if (event.target.name == 'fSequence')
      this.filterService.tagClientFilters.sequence = event.target.value;
    else if (event.target.name == 'fDate')
      this.filterService.tagClientFilters.date = event.target.value;
    else if (event.target.name == 'fType')
      this.filterService.tagClientFilters.type = event.target.value;
    else if (event.target.name == 'fValue')
      this.filterService.tagClientFilters.value = event.target.value;

    this.update();
  }

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalTagsData) {

      isOk = true;

      if (this.filterService.tagClientFilters.id != null && this.filterService.tagClientFilters.id.length > 0 && (c.id == null || !c.id.toString().toUpperCase().match(this.filterService.tagClientFilters.id.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.tagClientFilters.name != null && this.filterService.tagClientFilters.name.length > 0 && (c.name == null || !c.name.toString().toUpperCase().match(this.filterService.tagClientFilters.name.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.tagClientFilters.address != null && this.filterService.tagClientFilters.address.length > 0 && (c.address == null || !c.address.toString().toUpperCase().match(this.filterService.tagClientFilters.address.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.tagClientFilters.plcName != null && this.filterService.tagClientFilters.plcName.length > 0 && (c.plc_name == null || !c.plc_name.toString().toUpperCase().match(this.filterService.tagClientFilters.plcName.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.tagClientFilters.sequence != null && this.filterService.tagClientFilters.sequence.length > 0 && (c.sequence == null || !c.sequence.toString().toUpperCase().match(this.filterService.tagClientFilters.sequence.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.tagClientFilters.date != null && this.filterService.tagClientFilters.date.length > 0 && (c.date == null || !c.date.toString().toUpperCase().match(this.filterService.tagClientFilters.date.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.tagClientFilters.type != null && this.filterService.tagClientFilters.type.length > 0 && (c.typeStr == null || !c.typeStr.toString().toUpperCase().match(this.filterService.tagClientFilters.type.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.tagClientFilters.value != null && this.filterService.tagClientFilters.value.length > 0 && (c.value == null || !c.value.toString().toUpperCase().match(this.filterService.tagClientFilters.value.toUpperCase()))) {
        isOk = false;
      }

      if (isOk)
        tempArray.push(c);
    }

    return tempArray;
  }

  public removeFilters() {
    this.filterService.resetTagClientFilters();

    this.update();
  }

}

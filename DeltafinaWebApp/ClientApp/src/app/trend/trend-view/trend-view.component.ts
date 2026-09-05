import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DragulaService } from 'ng2-dragula';
//import { UUID } from 'uuid';
import { ARIA_LIVE_DELAY } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';

import { ZoneService } from 'src/app/services/zone.service';
import { DaysSelectedModel, ValueLabelDisableModel } from 'src/app/models/help.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ZoneSelectedModel } from 'src/app/models/zone.models';
import { ProcessService } from 'src/app/services/process.service';
import { TrendQueryModel, TrendLogModel, TrendModel } from 'src/app/models/trend.models';
import { TrendService } from 'src/app/services/trend.service';
import { __await } from 'tslib';
import { FilterService } from 'src/app/services/filter.service';
import { CsvDataService } from 'src/app/services/csv.service';

@Component({
  selector: 'trend-view', // tslint:disable-line
  templateUrl: './trend-view.component.html',
  styleUrls: [
    '../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
    '../../../vendor/libs/ngb-timepicker/ngb-timepicker.scss',
    '../../../vendor/libs/ngx-color-picker/ngx-color-picker.scss',
    '../../../vendor/libs/ng2-dragula/ng2-dragula.scss',
    './drag-and-drop.scss',
    '../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss'
  ],
  styles: [`
    :host ::ng-deep ngb-accordion .card + .card {
      margin-top: .25rem;
    }
    host ::ng-deep .ngx-charts text {
      fill: #4a4a4a;
    }
    :host ::ng-deep .ngx-charts-outer ngx-charts-legend-entry > .active {
      color: #4a4a4a;
    }
  `]
})
export class TrendViewComponent implements OnInit {
  isRTL: boolean;

  readonly TITLE: string = "Visualizzazione Trend";
  readonly MSG_TOAST = "Editazione ricetta cella";

  myTitle: string = "Visualizza";

  selectTrends: Array<TrendModel>;
  selectZones: any;
  trendQuery: TrendQueryModel = new TrendQueryModel();
  modelFrom: NgbDateStruct;
  modelTo: NgbDateStruct;
  modelTime =
    {
      from: { hour: 0, minute: 0, second: 0 },
      to: { hour: 23, minute: 59, second: 59 }
    };
  displayMonths = 2;

  page = 4;
  
  trendsData: TrendLogModel[] = [];
  trendsFilteredData: TrendLogModel[] = [];
  originalTrendsData: TrendLogModel[] = [];

  selectZoneTypes: ValueLabelDisableModel[];


  searchKeys = ['id', 'title'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 1000;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;
  navigation = 'select';

  zoneType;

  autoScale: boolean;
  yScaleMin: number;
  yScaleMax: number;

  multiData = [];//[{
  //  name: 'Germany',
  //  series: [{
  //    name: '1990',
  //    value: 31476
  //  }, {
  //    name: '2000',
  //    value: 36953
  //  }, {
  //    name: '2010',
  //    value: 40632
  //  }]
  //}, {
  //  name: 'United States',
  //  series: [{
  //    name: '1990',
  //    value: 37060
  //  }, {
  //    name: '2000',
  //    value: 45986
  //  }, {
  //    name: '2010',
  //    value: 49737
  //  }]
  //}, {
  //  name: 'France',
  //  series: [{
  //    name: '1990',
  //    value: 29476
  //  }, {
  //    name: '2000',
  //    value: 34774
  //  }, {
  //    name: '2010',
  //    value: 36745
  //  }]
  //}, {
  //  name: 'United Kingdom',
  //  series: [{
  //    name: '1990',
  //    value: 26424
  //  }, {
  //    name: '2000',
  //    value: 32543
  //  }, {
  //    name: '2010',
  //    value: 36240
  //  }]
  //}];


  constructor(private appService: AppService, calendar: NgbCalendar, private route: ActivatedRoute, private router: Router, public toastrService: ToastrService,
    private trendService: TrendService, public filterService: FilterService, public zoneService: ZoneService) {//, private csvDataService: CsvDataService) {

    this.appService.pageTitle = this.TITLE;

    //this.fromDate = calendar.getToday();
    //this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.modelFrom = calendar.getToday();// new Date(this.dateAdapter.toModel(calendar.getToday()));
    this.modelTo = calendar.getNext(calendar.getToday(), 'd', 1);// new Date(this.dateAdapter.toModel(calendar.getNext(calendar.getToday(), 'd', 10)));
  }

  async ngOnInit() {

    this.selectZoneTypes = await this.zoneService.GetZoneTypeList();
    this.selectTrends = await this.trendService.GetTrends();
    this.selectZones = await this.zoneService.GetZones();

  }

  ngOnDestroy() {

    //this.dragulaService.destroy('bag');
  }

  async onZoneTypeFilterChange() {
    if (this.zoneType != null) 
      this.selectZones = await this.zoneService.GetZonesByZoneType(this.zoneType);
    else
      this.selectZones = await this.zoneService.GetZones();

    //this.selectPlcs = [];
    //this.selectTags = [];
  }

  async onZoneFilterChange() {
    if (this.trendQuery.zoneFilterList != null && this.trendQuery.zoneFilterList.length > 0) {

      this.trendQuery.tagLogNameList = [];

      let selectTrendsTmp: Array<TrendModel> = await this.trendService.GetTrends();
      let selectTrendsTmp2: Array<TrendModel> = new Array<TrendModel>();
      selectTrendsTmp.forEach(item => {
        if (this.trendQuery.zoneFilterList.includes(item.zoneName))
          selectTrendsTmp2.push(item);
      });
      this.selectTrends = selectTrendsTmp2;
    }
    else
      this.selectTrends = await this.trendService.GetTrends();
  }

  async onSaveClick() {
    await this.loadData();
  }

  async loadData() {

    this.trendQuery.startDate = new Date(this.modelFrom.year, this.modelFrom.month - 1, this.modelFrom.day, this.modelTime.from.hour, this.modelTime.from.minute);
    this.trendQuery.endDate = new Date(this.modelTo.year, this.modelTo.month - 1, this.modelTo.day, this.modelTime.to.hour, this.modelTime.to.minute);

    this.originalTrendsData = await this.trendService.GetLogging(this.trendQuery);


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
    this.trendsFilteredData = this.applyFilters();

    this.totalItems = this.trendsFilteredData.length;

    this.sort(this.trendsFilteredData);
    this.trendsData = this.paginate(this.trendsFilteredData);



    //Costruisco le serie
    this.multiData = [];
    this.trendQuery.tagLogNameList.forEach(item => {
      let result: TrendLogModel[] = this.trendsData.filter(x => x.tagLogName == item);

      if (result != null && result.length > 0) {
        let points: any = result.map(x => ({ name: x.logDate, value: x.logValue }));

        const maxValue = points.reduce((oa, u) => Math.max(oa, u.value), 0);
        const minValue = points.reduce((ya, u) => Math.min(ya, u.value), Number.MAX_VALUE);

        this.multiData.push({
          name: result[0].description + " (" + result[0].unit + ")",
          series: points,
          value: true
        });
      }
    });

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

  onKey(event: any) {

    if (event.target.name == 'fDescription')
      this.filterService.logTrendFilters.description = event.target.value;
    else if (event.target.name == 'fZoneName')
      this.filterService.logTrendFilters.zoneName = event.target.value;
    else if (event.target.name == 'fPlcName')
      this.filterService.logTrendFilters.plcName = event.target.value;
    else if (event.target.name == 'fLogValue')
      this.filterService.logTrendFilters.logValue = event.target.value;
    else if (event.target.name == 'fUnit')
      this.filterService.logTrendFilters.unit = event.target.value;
    else if (event.target.name == 'fLogDate')
      this.filterService.logTrendFilters.logDate = event.target.value;
    else if (event.target.name == 'fTagPlcName')
      this.filterService.logTrendFilters.tagPlcName = event.target.value;

    this.update();
  }

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalTrendsData) {

      isOk = true;

      if (this.filterService.logTrendFilters.description != null && this.filterService.logTrendFilters.description.length > 0 && (c.description == null || !c.description.toString().toUpperCase().match(this.filterService.logTrendFilters.description.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.logTrendFilters.zoneName != null && this.filterService.logTrendFilters.zoneName.length > 0 && (c.zoneName == null || !c.zoneName.toString().toUpperCase().match(this.filterService.logTrendFilters.zoneName.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.logTrendFilters.plcName != null && this.filterService.logTrendFilters.plcName.length > 0 && (c.plcName == null || !c.plcName.toString().toUpperCase().match(this.filterService.logTrendFilters.plcName.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.logTrendFilters.logValue != null && this.filterService.logTrendFilters.logValue.length > 0 && (c.logValue == null || !c.logValue.toString().toUpperCase().match(this.filterService.logTrendFilters.logValue.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.logTrendFilters.unit != null && this.filterService.logTrendFilters.unit.length > 0 && (c.unit == null || !c.unit.toString().toUpperCase().match(this.filterService.logTrendFilters.unit.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.logTrendFilters.logDate != null && this.filterService.logTrendFilters.logDate.length > 0 && (c.logDate == null || !c.logDate.toString().toUpperCase().match(this.filterService.logTrendFilters.logDate.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.logTrendFilters.tagPlcName != null && this.filterService.logTrendFilters.tagPlcName.length > 0 && (c.tagPlcName == null || !c.tagPlcName.toString().toUpperCase().match(this.filterService.logTrendFilters.tagPlcName.toUpperCase()))) {
        isOk = false;
      }

      if (isOk)
        tempArray.push(c);
    }

    return tempArray;
  }

  public removeFilters() {
    this.filterService.resetLogTrendFilters();

    this.update();
  }

  exportCSV() {
    let exportObjList: Array<any> = new Array<any>();

    let lDate: Date = new Date();

    let tmpArray: Array<any> = this.trendsFilteredData;

    exportObjList.push({
      zoneName: "Zona",
      description: "Descrizione",
      plcName: "PLC",
      logValue: "Valore",
      unit: "UdM",
      logDate: "Data Reg.",
      tagPlcName: "Tag"
    });

    for (let c of tmpArray) {

      lDate = new Date(c.logDate);

      exportObjList.push({
        zoneName: c.zoneName,
        description: c.description,
        plcName: c.plcName,
        logValue: c.logValue,
        unit: c.unit,
        logDate: lDate.getDate() + "-" + (lDate.getMonth() + 1) + "-" + lDate.getFullYear() + " " + this.getStringTwo(lDate.getHours()) + ":" + this.getStringTwo(lDate.getMinutes()),
        tagPlcName: c.tagPlcName,
      });
    }
    CsvDataService.exportToCsv("export_logging.csv", exportObjList, ";", false);
  }

  getStringTwo(value): string {
    if (value != null && value.toString().length == 1)
      return "0" + value.toString();
    else
      return value.toString();
  }

  onClickSetValueGraph(name) {
    this.multiData.forEach(item => {
      if (item.name == name) {
        item.value = true;

        this.update();
      }
    });
  }

  onClickSetVariationGraph(name) {

    let multiDataTmp: Array<any> = this.multiData;

    multiDataTmp.forEach(item => {
      if (item.name == name) {
        item.value = false;

        let newSeries: any = [];
        let tmpPrevious: number = item.series[0].value;
        let previous: number = item.series[0].value;

        item.series.forEach(n => {
          tmpPrevious = n.value;
          n.value = n.value - previous;
          previous = tmpPrevious;
        });
      }
    });

    this.multiData = [];

    multiDataTmp.forEach(item => {
      this.multiData.push(item);
    });
  }

  onClickApplyMin(name) {
    this.multiData.forEach(item => {
      if (item.name == name) {
        item.min = false;

        let newSeries: any = [];
        let previous: number = item.series[0].value;

        item.series.forEach(n => {
          newSeries.push({ name: n.name, value: n.value - previous });
          previous = n.value;
        });

        const maxValue = newSeries.reduce((oa, u) => Math.max(oa, u.value), 0);
        const minValue = newSeries.reduce((ya, u) => Math.min(ya, u.value), Number.MAX_VALUE);

        item.series = newSeries;
        item.min = minValue;
        item.max = maxValue;
      }
    });
  }

}

//}

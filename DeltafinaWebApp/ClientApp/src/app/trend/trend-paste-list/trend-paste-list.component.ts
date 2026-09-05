import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

import { TrendService } from 'src/app/services/trend.service';
import { FilterService } from 'src/app/services/filter.service';
import { TrendDetailModel, TrendModel } from 'src/app/models/trend.models';


@Component({
  selector: 'trend-paste-list', // tslint:disable-line
  templateUrl: './trend-paste-list.component.html'
})
export class TrendPasteListComponent {
  isRTL: boolean;

  name = "Paste it";
  val: any;
  displayedColumns: string[];
  dataSource: any[] = [];
  firstColumnDropdown: any[] = [];

  data(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let row_data = pastedText.split('\n');

    this.displayedColumns = ['TagPlcName', 'PlcName', 'ZoneName', 'TagLogName', 'Description', 'TimeCycleDetection', 'CountCycleDetection', 'TimeCycleForSave', 'CountCycleForSave', 'HysteresisValue', 'HysteresisType', 'MinValue', 'MaxValue', 'RoundDigit', 'Enabled', 'ValueType', 'Unit'];//  row_data[0].split('\t');
    //TAG NAME	PLCName	ZoneName	TagLogName	Descriptions	TimeCycleDetection	CountCycleDetection	TimeCycleForSave	CountCycleForSave	HysteresisValue	HysteresisType	MinValue	MaxValue	RoundDigit	Enabled	ValueType	Unit

    delete row_data[0];
    // Create table dataSource
    let data = [];

    row_data.forEach(row_data => {
      let row = {};//{ a: null, b: null, c: null, d: null, e: null, f: null };
      this.displayedColumns.forEach((a, index) => {
        //switch (index) {
        //  case 0:
        //    row.a = row_data.split('\t')[index]
        //    break;
        //  case 1:
        //    row.b = row_data.split('\t')[index]
        //    break;
        //  case 2:
        //    row.c = row_data.split('\t')[index]
        //    break;
        //  case 3:
        //    row.d = row_data.split('\t')[index]
        //    break;
        //  case 4:
        //    row.e = row_data.split('\t')[index]
        //    break;
        //  case 5:
        //    row.f = row_data.split('\t')[index]
        //    break;

        //  default:
        //}
        row[a] = row_data.split('\t')[index]
      });
      data.push(row);
    })
    this.dataSource = data;
  }

  backgroundColorList: Array<any> = new Array<any>();
  onGenerateClick() {
    // Itero la lista di trend
    this.backgroundColorList = new Array<any>();
    this.dataSource.forEach(async item => {
      // Per ogni trend faccio l'inserimento a database
      if (item.TagLogName != null)
        await this.addTrend(item);
    });

    // Volendo posso anche creare una barra di progresso per l'avanzamento nella procedura di creazione dei trend
  }

  async addTrend(trendItem): Promise<void> {
    let trendData: TrendDetailModel = new TrendDetailModel();
    trendData.countCycleDetection = +trendItem.CountCycleDetection;
    trendData.countCycleForSave = +trendItem.CountCycleForSave;
    trendData.creationDate = new Date();
    trendData.description = trendItem.Description;
    trendData.enabled = trendItem.Enabled == "1" ? true : false;
    trendData.hysteresisType = trendItem.HysteresisType;
    trendData.hysteresisValue = +trendItem.HysteresisValue;
    trendData.lastLog = null;
    trendData.lastUpdateDate = new Date();
    trendData.maxValue = trendItem.MaxValue == "NULL" ? null : +trendItem.MaxValue;
    trendData.minValue = trendItem.MinValue == "NULL" ? null : +trendItem.MinValue;
    trendData.plcName = trendItem.PlcName;
    trendData.roundDigit = +trendItem.RoundDigit;
    trendData.tagLogName = trendItem.TagLogName;
    trendData.tagPlcName = trendItem.TagPlcName;
    trendData.timeCycleDetection = trendItem.TimeCycleDetection;
    trendData.timeCycleForSave = trendItem.TimeCycleForSave;
    trendData.unit = trendItem.Unit;
    trendData.userId = this.appService.user.userId;
    trendData.valueType = trendItem.ValueType;
    trendData.zoneName = trendItem.ZoneName;

    let canGo: boolean = true;
    let newTrendData: TrendDetailModel = await this.trendService.getByTagLogName(trendData.tagLogName);
    if (newTrendData != null) {
      this.backgroundColorList.push({ tagLogName: trendData.tagLogName, bgColor: "bg-warning", textColor: "text-dark", value: "Trend exist, operation not completed!" });
      canGo = false;
    }
    if (canGo) {
      let response: any = await this.trendService.update(trendData);
      if (response.status == "Success")
        this.backgroundColorList.push({ tagLogName: trendData.tagLogName, bgColor: "bg-success", textColor: "text-white", value: "Operation completed successfully!" });
      else
        this.backgroundColorList.push({ tagLogName: trendData.tagLogName, bgColor: "bg-danger", textColor: "text-white", value: "Error: " + response.value });
    }
  }

  cleanList() {
    this.val = null;
    this.displayedColumns = [];
    this.dataSource = [];
    this.firstColumnDropdown = [];
    this.backgroundColorList = new Array<any>();
  }


  constructor(private http: HttpClient, private appService: AppService, private router: Router, private trendService: TrendService, public filterService: FilterService) {
    this.appService.pageTitle = 'Lista Trend | Data Log';
    this.isRTL = appService.isRTL;
  }

}

import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DragulaService } from 'ng2-dragula';
//import { UUID } from 'uuid';
import { ARIA_LIVE_DELAY } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';

import { TrendService } from 'src/app/services/trend.service';
import { ZoneService } from 'src/app/services/zone.service';
import { TrendDetailModel } from 'src/app/models/trend.models';
import { DaysSelectedModel, ValueLabelDisableModel, ResultIntValue } from 'src/app/models/help.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ZoneSelectedModel } from 'src/app/models/zone.models';
import { ProcessService } from 'src/app/services/process.service';
import { PlcService } from 'src/app/services/plc.service';
import { __await } from 'tslib';

@Component({
  selector: 'trend-edit', // tslint:disable-line
  templateUrl: './trend-edit.component.html',
  styleUrls: [
    '../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss'
  ],
  styles: [`
    :host ::ng-deep ngb-accordion .card + .card {
      margin-top: .25rem;
    }
  `]
})
export class TrendEditComponent implements OnInit {

  readonly TITLE: string = "Editazione Trend";
  readonly MSG_TOAST = "Editazione ricetta cella";

  myTitle: string = "Nuovo Trend";

  private sub: any;
  private tagLogName: string;

  name: string;

  //
  // ngx-toastr
  //
  title = '';
  message = '';
  type = 'success';
  tapToDismiss = true;
  closeButton = false;
  progressBar = false;
  preventDuplicates = false;
  newestOnTop = false;
  progressAnimation = 'decreasing';
  positionClass = 'toast-top-right';

  showToast(type: string, message: string, title: string) {
    const options = {
      tapToDismiss: this.tapToDismiss,
      closeButton: this.closeButton,
      progressBar: this.progressBar,
      progressAnimation: this.progressAnimation,
      positionClass: this.positionClass,
      rtl: this.appService.isRTL
    };

    // `newestOnTop` and `preventDuplicates` options must be set on global config
    this.toastrService.toastrConfig.newestOnTop = this.newestOnTop;
    this.toastrService.toastrConfig.preventDuplicates = this.preventDuplicates;

    this.toastrService[type](message, title, options);
  }

  selectZones: ValueLabelDisableModel[];
  selectZoneTypes: ValueLabelDisableModel[];
  selectPlcs: ValueLabelDisableModel[];
  selectTags: ValueLabelDisableModel[];
  

  trendData: TrendDetailModel;

  zoneType;


  constructor(private appService: AppService, calendar: NgbCalendar, private route: ActivatedRoute, private router: Router, public toastrService: ToastrService,
    private trendService: TrendService, private zoneService: ZoneService, private plcService: PlcService) {

    this.appService.pageTitle = this.TITLE;

    this.trendData = new TrendDetailModel();
    this.trendData.timeCycleDetection = "Minute";
    this.trendData.countCycleDetection = 5;
    this.trendData.hysteresisType = "Second";
    this.trendData.hysteresisValue = 0;
    this.trendData.roundDigit = -1
    this.trendData.userId = this.appService.user.userId;

    //this.pippo.
  }

  async ngOnInit() {

    this.selectZoneTypes = await this.zoneService.GetZoneTypeList();

    this.sub = this.route.params.subscribe( async params => {
      this.tagLogName = params['id'];
      if (this.tagLogName != null) {

        this.trendData = await this.trendService.getByTagLogName(this.tagLogName);

        this.myTitle = this.trendData.description;
      }

    });
  }

  ngOnDestroy() {

  }

  async onSubmit() {
    let response: any = await this.trendService.update(this.trendData);
    if (response.status == "Success")
      this.router.navigate(['/trend/trend-list']);
    //else
    //  this.toasterService.pop("error", "Editazione Attività", response.value);
  }
  
  async onZoneTypeFilterChange() {
    if (this.zoneType != null)
      this.selectZones = await this.zoneService.GetZonesByZoneType(this.zoneType);
    else
      this.selectZones = [];

    this.selectPlcs = [];
    this.selectTags = [];
  }

  async onZoneFilterChange() {
    if (this.trendData.zoneName != null)
      this.selectPlcs = await this.plcService.GetPlcListByZoneName(this.trendData.zoneName);
    else
      this.selectPlcs = [];

    this.selectTags = [];
  }

  async onPlcFilterChange() {
    if (this.trendData.plcName != null)
      this.selectTags = await this.plcService.GetTagstByPlc(this.trendData.plcName);
    else
      this.selectTags = [];
  }

  async onTagFilterChange() {
    this.trendData.tagLogName = this.trendData.tagPlcName;
  }

  async onDelete() {
    this.trendData.enabled = false;
    let response: any = await this.trendService.update(this.trendData);
    if (response.status == "Success")
      this.router.navigate(['/trend/trend-list']);
  }

  goToList() {
    this.router.navigate(['/trend/trend-list']);
  }

}

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneDirective } from 'ngx-dropzone-wrapper';
import { FileUploader } from 'ng2-file-upload';

import { timer } from 'rxjs';
import { AlarmModel, AlarmQueryModel } from '../models/alarm.models';
import { ResultIntValue } from '../models/help.models';
import { AlarmService } from '../services/alarm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'alarms', // tslint:disable-line
  templateUrl: './alarms.component.html',
  styleUrls: [
    '../../vendor/libs/ngx-dropzone-wrapper/ngx-dropzone-wrapper.scss',
    './file-upload.scss'
  ],
  styles: ['textarea[autosize] { min-height: 100px !important; }']
})
export class AlarmsComponent {// implements AfterViewInit {

  //
  // ngx-dropzone-wrapper
  //

  dropzoneConfig = {
    url: '/upload',
    parallelUploads: 2,
    maxFilesize: 50000,
    filesizeBase: 1000,
    addRemoveLinks: true,
    previewTemplate: `
<div class="dz-preview dz-file-preview">
  <div class="dz-details">
    <div class="dz-thumbnail">
      <img data-dz-thumbnail>
      <span class="dz-nopreview">No preview</span>
      <div class="dz-success-mark"></div>
      <div class="dz-error-mark"></div>
      <div class="dz-error-message"><span data-dz-errormessage></span></div>
      <div class="progress">
        <div class="progress-bar progress-bar-primary"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          data-dz-uploadprogress></div>
      </div>
    </div>
    <div class="dz-filename" data-dz-name></div>
    <div class="dz-size" data-dz-size></div>
  </div>
</div>`
  };

  //@ViewChild(DropzoneDirective, { static: false }) dropzoneInstance: DropzoneDirective;

  alarmsData: AlarmModel[] = [];
  originalAlarmsData: AlarmModel[] = [];
  perPage = 10;

  totalItems = 0;


  zones: ResultIntValue;


  query: AlarmQueryModel = new AlarmQueryModel();
  modelFrom: NgbDateStruct;
  modelTo: NgbDateStruct;  

  displayMonths = 2;

  useFilter: boolean;


  constructor(private appService: AppService, calendar: NgbCalendar, private modalService: NgbModal, private alarmService: AlarmService, public router: Router) {
    this.appService.pageTitle = 'Alarms';

    this.modelFrom = calendar.getToday();
    this.modelTo = calendar.getToday();

    let mytimer = timer(1000, 5000);//300000 (5 minuti), 60000(1 minuto), 1000 (1 secondo)
    mytimer.subscribe(t => {
      this.oberserableTimer(t);
    });


  }

  async oberserableTimer(t) {
    if(!this.useFilter)
      await this.loadData();
  }

  async loadData() {

    if (!this.useFilter)
      this.originalAlarmsData = await this.alarmService.getAllActiveAlarms();
    else {
      this.query.from = new Date(this.modelFrom.year, this.modelFrom.month - 1, this.modelFrom.day, 0, 0);
      this.query.to = new Date(this.modelTo.year, this.modelTo.month - 1, this.modelTo.day + 1, 0, 0);

      this.originalAlarmsData = await this.alarmService.GetAlarmsFiltered(this.query);
    }



    this.update();
  }

  async onClickFilter() {
    await this.loadData();
  }

  onKey(event: any) {

    if (event.target.name == 'fQueryText')
      this.query.queryText = event.target.value;

    this.update();
  }

  update() {
    const data = this.applyFilters();

    this.totalItems = data.length;

    //this.sort(data);
    this.alarmsData = data;//this.paginate(data);
  }

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalAlarmsData) {

      isOk = true;

      if (this.query != null && this.query.queryText != null && this.query.queryText.length > 0 && (!c.zone.toString().toUpperCase().match(this.query.queryText.toUpperCase()) && !c.machineUser.toString().toUpperCase().match(this.query.queryText.toUpperCase()))) {
        isOk = false;
      }

      //if (this.filterService.userFilters.userName != null && this.filterService.userFilters.userName.length > 0 && (c.userName == null || !c.userName.toString().toUpperCase().match(this.filterService.userFilters.userName.toUpperCase()))) {
      //  isOk = false;
      //}
      //if (this.filterService.userFilters.email != null && this.filterService.userFilters.email.length > 0 && (c.email == null || !c.email.toString().toUpperCase().match(this.filterService.userFilters.email.toUpperCase()))) {
      //  isOk = false;
      //}
      //if (this.filterService.userFilters.fullName != null && this.filterService.userFilters.fullName.length > 0 && (c.fullName == null || !c.fullName.toString().toUpperCase().match(this.filterService.userFilters.fullName.toUpperCase()))) {
      //  isOk = false;
      //}
      //if (this.filterService.userFilters.userType != null && this.filterService.userFilters.userType.length > 0 && (c.userType == null || !c.userType.toString().toUpperCase().match(this.filterService.userFilters.userType.toUpperCase()))) {
      //  isOk = false;
      //}
      //if (this.filterService.userFilters.phone != null && this.filterService.userFilters.phone.length > 0 && (c.phone == null || !c.phone.toString().toUpperCase().match(this.filterService.userFilters.phone.toUpperCase()))) {
      //  isOk = false;
      //}
      //if (this.filterService.userFilters.mobile != null && this.filterService.userFilters.mobile.length > 0 && (c.mobile == null || !c.mobile.toString().toUpperCase().match(this.filterService.userFilters.mobile.toUpperCase()))) {
      //  isOk = false;
      //}
      //if (this.filterService.userFilters.city != null && this.filterService.userFilters.city.length > 0 && (c.city == null || !c.city.toString().toUpperCase().match(this.filterService.userFilters.city.toUpperCase()))) {
      //  isOk = false;
      //}

      if (isOk)
        tempArray.push(c);
    }

    return tempArray;
  }

  uploader = new FileUploader({ url: 'https://evening-anchorage-3159.herokuapp.com/api/' });
  hasBaseDropZoneOver = false;

  fileOver(e: any) {
    this.hasBaseDropZoneOver = e;
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

}

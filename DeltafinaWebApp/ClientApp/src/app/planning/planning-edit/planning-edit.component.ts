import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../app.service';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';

//import { UUID } from 'uuid';
import { ARIA_LIVE_DELAY } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GenericResponse } from 'src/app/models/help.models';
import { UrlService } from 'src/app/services/url.service';
import { FileUploadModel } from 'src/app/models/file-upload.models';
import { MaintenanceActivityDetailModel } from 'src/app/models/maintenance.models';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { ToastrService } from 'ngx-toastr';//, IndividualConfig, ProgressAnimationType } from 'ngx-toastr';
//import { ToasterService } from 'angular2-toaster';//, IndividualConfig, ProgressAnimationType } from 'ngx-toastr';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';


const now = new Date();

@Component({
  selector: 'planning-edit', // tslint:disable-line
  templateUrl: './planning-edit.component.html',
  styleUrls: [
    '../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
    '../../../vendor/libs/ngb-timepicker/ngb-timepicker.scss',
    '../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-chips/ngx-chips.scss',
    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    './file-upload.scss'
  ],
  styles: [`
    :host ::ng-deep ngb-accordion .card + .card {
      margin-top: .25rem;
    }
    textarea[autosize] { min-height: 100px !important; }
  `]
})
export class PlanningEditComponent {
  isRTL: boolean;
  private toasterService: ToasterService;

  myTitle = "Nuova Manutenzione";
  activityData: MaintenanceActivityDetailModel = new MaintenanceActivityDetailModel();
  private sub: any;
  private maintenanceActivityId: string = "";

  //// TOASTER
  //public config: ToasterConfig =
  //  new ToasterConfig({
  //    showCloseButton: true,
  //    tapToDismiss: true//,
  //    //timeout: 0
  //  });

  disabled = false;
  selectUsers: any;
  selectContacts: any;

  uploader: FileUploader;// = new FileUploader({ url: 'https://evening-anchorage-3159.herokuapp.com/api/' });
  hasBaseDropZoneOver = false;

  page = 4;

  disabledSP = true;

  modelFrom: NgbDateStruct;
  modelTo: NgbDateStruct;
  modelTime =
    {
      from: { hour: 7, minute: 0, second: 0 },
      to: { hour: 8, minute: 0, second: 0 }
    };

  displayMonths = 2;
  navigation = 'select';
  tags = [];

  // TOASTER
  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true//,
      //timeout: 0
    });



  constructor(private toastServ: ToasterService, private appService: AppService, calendar: NgbCalendar, private router: Router, private route: ActivatedRoute, //private toasterService: ToasterService,
    private userService: UserService, private dateAdapter: NgbDateAdapter<string>, private urlService: UrlService, private maintenanceService: MaintenanceService) {
    this.appService.pageTitle = 'Pianificazione | Nuova Attività ';
    this.toasterService = toastServ;

    this.uploader = new FileUploader({ url: this.urlService.getUrlFileUploadActivityMaintenances() });

    this.modelFrom = calendar.getToday();// new Date(this.dateAdapter.toModel(calendar.getToday()));
    this.modelTo = calendar.getNext(calendar.getToday(), 'd', 1);// new Date(this.dateAdapter.toModel(calendar.getNext(calendar.getToday(), 'd', 10)));
    //this.activityData.portalFarmId = this.appService.user.portalFarmId;
  }

  async ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.maintenanceActivityId = params['id'];
      if (this.maintenanceActivityId != null)
        this.getById(this.maintenanceActivityId);
      else
        this.myTitle = "Nuova Manutenzione";
    });

    this.selectUsers = await this.userService.getAll();
    //this.selectContacts = await this.contactService.getValueLabelDisabledListByPortalFarmId(this.appService.user.portalFarmId);

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append("activityId", this.activityData.id);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      //let gResp: GenericResponse = response.JSON();//.json();

      if (response == "Success") {
        //this.toasterService.pop("success", "Caricamento file " + item.file.name, "Invio del file completato");
        this.maintenanceService.getActivityById(this.maintenanceActivityId).then(result => {
          this.activityData = result;
          this.tags = this.activityData.contacts.map(x => ({ display: x, value: x }));// map(x => { display: x, value: x });

        });
      }
      //else
      //  this.toasterService.pop("error", "Caricamento file " + item.file.name, status);
    };

  }

  async getById(id: any) {

    this.activityData = await this.maintenanceService.getActivityById(id);
    this.tags = this.activityData.contacts.map(x => ({ display: x, value: x }));// map(x => { display: x, value: x });

    let dtFrom: Date = new Date(this.activityData.fromDate);
    let dtTo: Date = new Date(this.activityData.toDate);
    this.modelFrom = {
      day: dtFrom.getDate(),
      month: dtFrom.getMonth() + 1,
      year: dtFrom.getFullYear()
    };
    this.modelTo = {
      day: dtTo.getDate(),
      month: dtTo.getMonth() + 1,
      year: dtTo.getFullYear()
    };
    this.modelTime.from = {
      hour: dtFrom.getHours(),
      minute: dtFrom.getMinutes(),
      second: 0
    };
    this.modelTime.to = {
      hour: dtTo.getHours(),
      minute: dtTo.getMinutes(),
      second: 0
    };
    this.myTitle = this.activityData.description;
  }

  async onSubmit() {
    this.activityData.fromDate = new Date(this.modelFrom.year, this.modelFrom.month - 1, this.modelFrom.day, this.modelTime.from.hour, this.modelTime.from.minute);
    this.activityData.toDate = new Date(this.modelTo.year, this.modelTo.month - 1, this.modelTo.day, this.modelTime.to.hour, this.modelTime.to.minute);
    this.activityData.contacts = this.tags.map(x => x.value);
    let response: any = await this.maintenanceService.updateActivity(this.activityData);
    if (response.status == "Success")
      this.router.navigate(['/planning/list']);
    else
      this.toasterService.pop("error", response.value, "Editazione manutenzione");
  }

  goToList() {
    this.router.navigate(['/planning/list']);
  }

  fileOver(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public async deleteFile(item: any) {

    let response: GenericResponse = await this.maintenanceService.deleteActivityFileById(item.id);
    if (response.status == "Success") {
      let index: number = this.activityData.otherUploadedFiles.findIndex(f => f.id == item.id);
      this.activityData.otherUploadedFiles.splice(index, 1);

      //this.toasterService.pop("success", "Eliminazione file " + item.name, "Eliminazione file completata");
    }
    //else
    //  this.toasterService.pop("error", "Eliminazione file " + item.name, response.value.toString());
  }

  ngOnDestroy() {

  }

}




















//  isRTL: boolean;

//  page = 4;

//  disabledSP = true;

//  fromDate: NgbDateStruct;
//  toDate: NgbDateStruct;


//  modelFrom: NgbDateStruct = {
//    year: now.getFullYear(),
//    month: now.getMonth() + 1,
//    day: now.getDate()
//  };


//  modelTo: NgbDateStruct = {
//    year: now.getFullYear(),
//    month: now.getMonth() + 1,
//    day: now.getDate()
//  };




//  name: string = "Mancata comunicazione con quadro pompe di sbrinamento";

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

//  items = ['emai_1@email.it', 'emai_2@email.it', 'emai_3@email.it'];

//  multipleSelectZoneValue: Array<any>;// = ['C1'];
//  multipleSelectTagValue: Array<any>;// = ['C1'];

//  multipleSelectUserAlarmON: Array<any>;// = ['C1'];
//  multipleSelectUserAlarmOFF: Array<any>;// = ['C1'];

//  disabled = false;

//  minSPValue = 0;
//  maxSPValue = 1000;

//  newItem =
//    {
//      from: { hour: 7, minute: 0, second: 0 },
//      to: { hour: 8, minute: 0, second: 0 }
//    };

//  displayMonths = 2;
//  navigation = 'select';


//  uploader = new FileUploader({ url: 'https://evening-anchorage-3159.herokuapp.com/api/' });
//  hasBaseDropZoneOver = false;


//  constructor(private appService: AppService, calendar: NgbCalendar) {
//    this.appService.pageTitle = 'Fasce orarie Piano Lavorazione | Ricetta Illuminazione PL ';   

//    this.fromDate = calendar.getToday();
//    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
//  }

//  ngOnDestroy() {

//  }

//  fileOver(e: any) {
//    this.hasBaseDropZoneOver = e;
//  }


//}

////class WorkingItem {
////    constructor(public name: string,
////        public to: string,
////        public days: string);

////}

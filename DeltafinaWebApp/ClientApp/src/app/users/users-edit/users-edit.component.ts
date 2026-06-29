import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../app.service';

import { Router, ActivatedRoute } from '@angular/router';//AGGGIUNTO
import { DatePipe } from '@angular/common';
import { UserDetailModel } from '../../models/user.models';
import { UserService } from '../../services/user.service';
import { ValueLabelDisableModel } from 'src/app/models/help.models';
import { PortalFarmService } from 'src/app/services/portal-farm.service';
import { ToastrService } from 'ngx-toastr';//, IndividualConfig, ProgressAnimationType } from 'ngx-toastr';
//import { ToasterService } from 'angular2-toaster';//, IndividualConfig, ProgressAnimationType } from 'ngx-toastr';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    '../../../vendor/styles/pages/users.scss',
    './users-edit.component.scss'
  ]//,
  //encapsulation: ViewEncapsulation.None
})
export class UsersEditComponent {
  isRTL: boolean;

  myTitle = "Nuovo Utente";
  userData: UserDetailModel = new UserDetailModel();
  private sub: any;
  private userId: string = "";

  addDashboard: boolean = false;
  addUsers: boolean = false;
  addWaitingRoom: boolean = false;


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
  //progressAnimation: ProgressAnimationType = 'decreasing';
  positionClass = 'toast-top-right';

  selectFarms: any;
  selectedValue: any;


  // TOASTER
  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true//,
      //timeout: 0
    });



  //showToast(type: string, message: string, title: string) {
  //  const options = {
  //    tapToDismiss: this.tapToDismiss,
  //    closeButton: this.closeButton,
  //    progressBar: this.progressBar,
  //    progressAnimation: this.progressAnimation,
  //    positionClass: this.positionClass,
  //    rtl: this.appService.isRTL
  //  };

  //  // `newestOnTop` and `preventDuplicates` options must be set on global config
  //  this.toastrService.toastrConfig.newestOnTop = this.newestOnTop;
  //  this.toastrService.toastrConfig.preventDuplicates = this.preventDuplicates;

  //  //this.toastrService[type](message, title, options);
  //}
  //showToast(type: string, message: string, title: string): void {
  //  const options: Partial<IndividualConfig> = {
  //    tapToDismiss: this.tapToDismiss,
  //    closeButton: this.closeButton,
  //    progressBar: this.progressBar,      
  //    progressAnimation: this.progressAnimation,
  //    positionClass: this.positionClass
  //  };

  //  // `newestOnTop` and `preventDuplicates` options must be set on global config
  //  this.toastrService.toastrConfig.newestOnTop = this.newestOnTop;
  //  this.toastrService.toastrConfig.preventDuplicates = this.preventDuplicates;

  //  this.toastrService.show(message, title, options, this.toastrService.toastrConfig.iconClasses[type]);
  //}

  private toasterService: ToasterService;





  disabled = false;
  selectOptions;
  //selectOptions = [ // tslint:disable
  //  { value: 'c3cb2393-e216-466d-bd46-f39ebb0f93ce', label: 'VERDUCCI', disabled: false },
  //  { value: 'PP', label: 'PIPPO', disabled: false },
  //  { value: 'PL', label: 'PLUTO', disabled: false },
  //  { value: 'TO', label: 'TOPOLINO', disabled: false },
  //  { value: 'MI', label: 'MINNI', disabled: false },
  //]; // tslint:enable
  singleSelectValue: string = "c3cb2393-e216-466d-bd46-f39ebb0f93ce";

  public userTypes: any;





  constructor(private toastServ: ToasterService, private userService: UserService, private appService: AppService, private router: Router, public toastrService: ToastrService, private route: ActivatedRoute,
    private portalFarmService: PortalFarmService) {
    this.appService.pageTitle = 'Editazione utente';
    this.isRTL = appService.isRTL;

    this.toasterService = toastServ;

    this.userData.portalFarmId = this.appService.user.portalFarmId;

    this.loadData();
  }

  async loadData() {
    this.userTypes = await this.userService.getUserTypeByUserTypeId(this.appService.user.userTypeId);
  }

  get isDisabled(): boolean {
    return false;
    //if (this.appService.user == null || this.appService.user.userTypeId > 1)
    //  return false;
    //else
    //  return true;
  }

  async onSubmit() {

    //if (this.userData.userId == null && (this.userData.password == null || this.userData.password.length == 0))
    //  this.showToast("error", "Per creare l'utente inserire una password" , "Editazione utente");
    let response: any = await this.userService.updateWithLogin(this.userData);
    if (response.status == "Success")
      this.router.navigate(['/users/users-list']);
    else
      //this.showToast("success", response.value, "Editazione utente");
      //this.toastrService.success('Hello world!', 'Toastr fun!');
      this.toasterService.pop("error", response.value, "Editazione utente");


    //let response: any = await this.userService.update(this.userData);
    //if (response.status == "Success") {

    //  this.showToast("success", "Utente salvato", "Editazione utente");

    //  this.userData.userId = response.value;

    //  response = await this.userService.addLoginInfo(this.userData);

    //  if (response.status == "Success")
    //    this.router.navigate(['/users/users-list']);
    //  else
    //    this.showToast("error", response.value, "Editazione utente");
    //}
    //else
    //  this.showToast("error", response.value, "Editazione utente");
  }

  async ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId != null)
        this.getById(this.userId);
      else
        this.myTitle = "Nuovo Utente";
    });

    //Recupero la lista delle aziende del portale
    this.selectFarms = await this.portalFarmService.getValueLabelDisabledList();
    //this.selectOptions = await this.portalFarmService.getValueLabelDisabledList();
  }

  async getById(id: any) {

    this.userData = await this.userService.getById(id);
    this.selectedValue = this.userData.portalFarmId;
    this.myTitle = this.userData.name + " " + this.userData.surname;
  }

  goToList() {
    this.router.navigate(['/users']);
  }

}

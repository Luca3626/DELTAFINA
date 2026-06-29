import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../app.service';

import { Router, ActivatedRoute } from '@angular/router';//AGGGIUNTO
import { DatePipe } from '@angular/common';
import { PortalFarmDetailModel } from '../../models/portal-farm.models';
import { PortalFarmService } from '../../services/portal-farm.service';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-portal-farms-edit',
  templateUrl: './portal-farms-edit.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
  ]
})
export class PortalFarmsEditComponent {
  isRTL: boolean;

  myTitle = "Nuova Azienda del Portale";
  portalFarmData: PortalFarmDetailModel = new PortalFarmDetailModel();
  private sub: any;
  private portalFarmId: string = "";


  // TOASTER
  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true//,
      //timeout: 0
    });

  disabled = false;


  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute,
    private toasterService: ToasterService, private portalFarmService: PortalFarmService) {
    this.appService.pageTitle = 'Editazione Azienda del Portale';
    this.isRTL = appService.isRTL;
  }

  //get isDisabled(): boolean {
  //  return false;
  //  //if (this.appService.portalFarm == null || this.appService.portalFarm.portalFarmTypeId > 1)
  //  //  return false;
  //  //else
  //  //  return true;
  //}

  public isDisabled(item: string): boolean {
    if (item != null && item.length > 1)
      return false;
    else
      return true;
  }

  onPhoneClick() {
    window.location.href = "#";//this.phone;
  }

  onMobileClick() {
    window.location.href = "#";//this.mobile;
  }

  onEmailClick() {
    window.location.href = "#";//this.email;
  }

  async onSubmit() {
    let response: any = await this.portalFarmService.update(this.portalFarmData);
    if (response.status == "Success")
      this.router.navigate(['/portal-farms/portal-farms-list']);
    else
      this.toasterService.pop("error", response.value, "Editazione Azienda del Portale");
  }

  async ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.portalFarmId = params['id'];
      if (this.portalFarmId != null)
        this.getById(this.portalFarmId);
      else
        this.myTitle = "Nuova Azienda del Portale";
    });

  }

  async getById(id: any) {

    this.portalFarmData = await this.portalFarmService.getById(id);
    this.myTitle = this.portalFarmData.name;
  }

  goToList() {
    this.router.navigate(['/portal-farms']);
  }

}

import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../app.service';

import { Router, ActivatedRoute } from '@angular/router';//AGGGIUNTO
import { DatePipe } from '@angular/common';
import { SiloModel } from '../../models/warehouse/silo.models';
import { SiloService } from '../../services/silo.service';
import { MaterialService } from '../../services/material.service';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DaysSelectedModel, ValueLabelDisableModel, ResultIntValue } from 'src/app/models/help.models';

@Component({
  selector: 'app-silos-edit',
  templateUrl: './silos-edit.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
  ]
})
export class SilosEditComponent {
  isRTL: boolean;

  myTitle = "Nuovo Silo";
  siloData: SiloModel = new SiloModel();
  private sub: any;
  private siloId: string = "";


  // TOASTER
  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true//,
      //timeout: 0
    });

  disabled = false;
  selectMaterials: ValueLabelDisableModel[];


  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute,
    private toasterService: ToasterService, private siloService: SiloService, private materialService: MaterialService) {
    this.appService.pageTitle = 'Editazione Cliente';
    this.isRTL = appService.isRTL;

    //this.siloData.code = "NEW";
    //this.siloData.portalFarmId = this.appService.user.portalFarmId;
  }

  //get isDisabled(): boolean {
  //  return false;
  //  //if (this.appService.customer == null || this.appService.customer.customerTypeId > 1)
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

  async onSubmit() {
    let response: any = await this.siloService.update(this.siloData);
    if (response.status == "Success")
      this.router.navigate(['/silos/silos-list']);
    else
      this.toasterService.pop("error", response.value, "Editazione Cliente");
  }

  async ngOnInit() {

    this.selectMaterials = await this.materialService.getValueLabelDisabledList();

    this.sub = this.route.params.subscribe(params => {
      this.siloId = params['id'];
      if (this.siloId != null)
        this.getById(this.siloId);
      else
        this.myTitle = "Nuovo Silo";
    });

  }

  async getById(id: any) {

    this.siloData = await this.siloService.getById(id);
    this.myTitle = this.siloData.code;
  }

  goToList() {
    this.router.navigate(['/silos/silos-list']);
  }

}

import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../app.service';

import { Router, ActivatedRoute } from '@angular/router';//AGGGIUNTO
import { DatePipe } from '@angular/common';
import { MaterialDetailModel } from '../../models/material.models';
import { MaterialService } from '../../services/material.service';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DaysSelectedModel, ValueLabelDisableModel, ResultIntValue } from 'src/app/models/help.models';

@Component({
  selector: 'app-materials-edit',
  templateUrl: './materials-edit.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
  ]
})
export class MaterialsEditComponent {
  isRTL: boolean;

  myTitle = "Inserisci Materiale";
  materialData: MaterialDetailModel = new MaterialDetailModel();
  private sub: any;
  private materialId: string = "";


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
    private toasterService: ToasterService, private materialService: MaterialService) {
    this.appService.pageTitle = 'Editazione Materiale';
    this.isRTL = appService.isRTL;

    this.materialData.materialTypeId = 1;
    //this.materialData.userId = this.appService.user.userId;
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
    let response: any = await this.materialService.update(this.materialData);
    if (response.status == "Success")
      this.router.navigate(['/materials/materials-list']);
    else
      this.toasterService.pop("error", response.value, "Editazione Cliente");
  }

  async ngOnInit() {

    this.selectMaterials = await this.materialService.getValueLabelDisabledList();

    this.sub = this.route.params.subscribe(params => {
      this.materialId = params['id'];
      if (this.materialId != null)
        this.getById(this.materialId);
      else
        this.myTitle = "Inserisci Materiale";
    });

  }

  async getById(id: any) {

    this.materialData = await this.materialService.getById(id);
    this.myTitle = this.materialData.code;
  }

  goToList() {
    this.router.navigate(['/materials/materials-list']);
  }

}

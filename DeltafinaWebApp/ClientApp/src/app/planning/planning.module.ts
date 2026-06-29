import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaphilightModule } from 'ng-maphilight'

import { DragulaModule } from 'ng2-dragula';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { PlanningRoutingModule } from './planning-routing.module';
import { PlanningEditComponent } from './planning-edit/planning-edit.component';
import { PlanningListComponent } from './planning-list/planning-list.component';


// *******************************************************************************
// Libs

//import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
//import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MaphilightModule,

    DragulaModule,
    NgSelectModule,
    TagInputModule,
    HttpClientModule,
    FileUploadModule,
    ToasterModule.forRoot(),

    PlanningRoutingModule
  ],
  declarations: [
    PlanningEditComponent,
    PlanningListComponent
  ],
  providers: [
    ToasterService
  ]
})
export class PlanningModule { }

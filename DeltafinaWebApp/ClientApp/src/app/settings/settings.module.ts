import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SortablejsModule } from 'ngx-sortablejs';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SettingsRoutingModule } from './settings-routing.module';
import { GeneralComponent } from './general/general.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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

    NgxChartsModule,

    SortablejsModule,
    NgSelectModule,
    HttpClientModule,

    SettingsRoutingModule,

    SweetAlert2Module
  ],
  declarations: [
    GeneralComponent,
    TagListComponent
  ]
})
export class SettingsModule { }

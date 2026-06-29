import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaphilightModule } from 'ng-maphilight'

import { DragulaModule } from 'ng2-dragula';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule } from '@angular/common/http';

import { AlarmsSettingsRoutingModule } from './alarms-settings-routing.module';
import { AlarmsSettingsEditComponent } from './alarms-settings-edit/alarms-settings-edit.component';
import { AlarmsSettingsListComponent } from './alarms-settings-list/alarms-settings-list.component';


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

    AlarmsSettingsRoutingModule
  ],
  declarations: [
    AlarmsSettingsEditComponent,
    AlarmsSettingsListComponent
  ]
})
export class AlarmsSettingsModule { }

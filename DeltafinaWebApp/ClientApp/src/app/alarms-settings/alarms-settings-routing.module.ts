import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmsSettingsEditComponent } from './alarms-settings-edit/alarms-settings-edit.component';
import { AlarmsSettingsListComponent } from './alarms-settings-list/alarms-settings-list.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'edit', component: AlarmsSettingsEditComponent },
    { path: 'list', component: AlarmsSettingsListComponent }
  ])],
  exports: [RouterModule]
})
export class AlarmsSettingsRoutingModule { }

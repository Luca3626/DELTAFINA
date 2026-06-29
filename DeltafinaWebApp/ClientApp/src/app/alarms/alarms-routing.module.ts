import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmsComponent } from './alarms.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: AlarmsComponent }
  ])],
  exports: [RouterModule]
})
export class AlarmsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard } from './dashboard.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: Dashboard }
  ])],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }

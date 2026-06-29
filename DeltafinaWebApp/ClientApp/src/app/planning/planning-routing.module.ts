import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanningEditComponent } from './planning-edit/planning-edit.component';
import { PlanningListComponent } from './planning-list/planning-list.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'edit', component: PlanningEditComponent },
    { path: 'edit/:id', component: PlanningEditComponent },
    { path: 'list', component: PlanningListComponent }
  ])],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }

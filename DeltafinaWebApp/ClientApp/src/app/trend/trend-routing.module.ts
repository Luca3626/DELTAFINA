import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrendEditComponent } from './trend-edit/trend-edit.component';
import { TrendListComponent } from './trend-list/trend-list.component';
import { TrendViewComponent } from './trend-view/trend-view.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'trend-list', component: TrendListComponent },
    { path: 'trend-edit', component: TrendEditComponent },
    { path: 'trend-edit/:id', component: TrendEditComponent },
    { path: 'trend-view', component: TrendViewComponent }
  ])],
  exports: [RouterModule]
})
export class TrendRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DosingsComponent } from './dosings.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DosingsComponent }
  ])],
  exports: [RouterModule]
})
export class DosingsRoutingModule { }

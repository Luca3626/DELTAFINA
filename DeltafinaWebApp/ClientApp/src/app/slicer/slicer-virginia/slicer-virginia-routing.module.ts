import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlicerVirginiaComponent } from './slicer-virginia.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: SlicerVirginiaComponent }
  ])],
  exports: [RouterModule]
})
export class SlicerVirginiaRoutingModule { }

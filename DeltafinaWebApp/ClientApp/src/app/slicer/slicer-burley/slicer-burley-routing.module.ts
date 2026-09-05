import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlicerBurleyComponent } from './slicer-burley.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: SlicerBurleyComponent }
  ])],
  exports: [RouterModule]
})
export class SlicerBurleyRoutingModule { }

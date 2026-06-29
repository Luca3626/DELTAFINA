import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RottameInterno } from './rottame-interno.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: RottameInterno }
  ])],
  exports: [RouterModule]
})
export class RottameInternoRoutingModule { }

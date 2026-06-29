import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaricoSilos } from './carico-silos.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CaricoSilos }
  ])],
  exports: [RouterModule]
})
export class CaricoSilosRoutingModule { }

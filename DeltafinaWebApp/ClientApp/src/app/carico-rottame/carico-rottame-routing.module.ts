import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaricoRottame } from './carico-rottame.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CaricoRottame }
  ])],
  exports: [RouterModule]
})
export class CaricoRottameRoutingModule { }

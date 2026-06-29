import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaricoSabbia } from './carico-sabbia.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CaricoSabbia }
  ])],
  exports: [RouterModule]
})
export class CaricoSabbiaRoutingModule { }

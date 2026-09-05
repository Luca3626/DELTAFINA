import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Zona10Component } from './zona-1-0.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: Zona10Component }
  ])],
  exports: [RouterModule]
})
export class Zona10RoutingModule { }

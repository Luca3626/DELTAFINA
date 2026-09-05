import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Zona23Component } from './zona-2-3.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: Zona23Component }
  ])],
  exports: [RouterModule]
})
export class Zona23RoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Zona21Component } from './zona-2-1.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: Zona21Component }
  ])],
  exports: [RouterModule]
})
export class Zona21RoutingModule { }

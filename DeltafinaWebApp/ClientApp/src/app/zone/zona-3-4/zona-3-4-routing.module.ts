import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Zona34Component } from './zona-3-4.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: Zona34Component }
  ])],
  exports: [RouterModule]
})
export class Zona34RoutingModule { }

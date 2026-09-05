import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InverterComponent } from './inverter.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: InverterComponent }
  ])],
  exports: [RouterModule]
})
export class InverterRoutingModule { }

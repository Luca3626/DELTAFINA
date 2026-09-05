import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiloDischargeComponent } from './silo-discharge.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: SiloDischargeComponent }
  ])],
  exports: [RouterModule]
})
export class SiloDischargeRoutingModule { }

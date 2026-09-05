import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BurleyDryerComponent } from './burley-dryer.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: BurleyDryerComponent }
  ])],
  exports: [RouterModule]
})
export class BurleyDryerRoutingModule { }

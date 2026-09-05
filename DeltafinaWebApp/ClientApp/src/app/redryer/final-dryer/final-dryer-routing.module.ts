import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FinalDryerComponent } from './final-dryer.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: FinalDryerComponent }
  ])],
  exports: [RouterModule]
})
export class FinalDryerRoutingModule { }
